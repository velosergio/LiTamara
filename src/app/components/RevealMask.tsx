"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_radius;

// simplex-style noise (3D)
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  vec3 shift = vec3(100.0);
  for (int i = 0; i < 5; i++) {
    v += a * snoise(p);
    p = p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = uv;
  p.x *= aspect;

  float t = u_time * 0.12;

  // warped noise layers for fluid feel
  float n1 = fbm(vec3(p * 2.5, t));
  float n2 = fbm(vec3(p * 2.5 + n1 * 0.8, t + 5.0));
  float n3 = fbm(vec3(p * 3.0 + n2 * 0.6, t * 0.7 + 10.0));

  float noise = n2 * 0.6 + n3 * 0.4;

  // color palette — deep reds, dark magentas, blood tones
  vec3 c1 = vec3(0.77, 0.12, 0.12);  // #c41e1e base red
  vec3 c2 = vec3(0.55, 0.08, 0.10);  // darker blood
  vec3 c3 = vec3(0.35, 0.04, 0.06);  // deep maroon
  vec3 c4 = vec3(0.85, 0.18, 0.14);  // brighter accent

  float blend = noise * 0.5 + 0.5;
  vec3 col = mix(c3, c2, smoothstep(0.2, 0.5, blend));
  col = mix(col, c1, smoothstep(0.45, 0.7, blend));
  col = mix(col, c4, smoothstep(0.72, 0.95, blend) * 0.4);

  // reveal hole — mouse-driven
  vec2 mouseUV = u_mouse / u_resolution;
  mouseUV.x *= aspect;
  float dist = length(p - mouseUV);
  float hole = smoothstep(u_radius * 0.4, u_radius * 1.1, dist);

  // distort edge of the hole with noise for organic boundary
  float edgeNoise = snoise(vec3(p * 8.0, t * 2.0)) * 0.03;
  hole = smoothstep(u_radius * 0.35 + edgeNoise, u_radius * 1.15 + edgeNoise, dist);

  gl_FragColor = vec4(col, hole);
}
`;

export default function RevealMask() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const smoothMouse = useRef({ x: -9999, y: -9999 });
  const radiusRef = useRef(0);
  const targetRadius = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type) as WebGLShader;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram() as WebGLProgram;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uRadius = gl.getUniformLocation(prog, "u_radius");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const LERP = 0.08;
    const RAD_LERP = 0.06;
    const aspectNorm = () =>
      (Math.min(canvas.width, canvas.height) * 0.18) /
      (canvas.width > canvas.height ? canvas.width : canvas.height);

    const setPointer = (clientX: number, clientY: number) => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      mouse.current.x = clientX * dpr;
      mouse.current.y = (window.innerHeight - clientY) * dpr;
      // Slightly larger reveal hole on phones so a finger isn't too precise
      const mobileBoost = window.matchMedia("(max-width: 640px)").matches
        ? 1.35
        : 1;
      targetRadius.current = aspectNorm() * mobileBoost;
    };

    const onMove = (e: PointerEvent) => {
      setPointer(e.clientX, e.clientY);
    };
    const onLeave = () => {
      targetRadius.current = 0;
    };
    const onTouchEnd = () => {
      // Keep the hole briefly so a tap still peeks; then close
      targetRadius.current = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("pointerup", onTouchEnd, { passive: true });
    window.addEventListener("pointercancel", onTouchEnd, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const start = performance.now();
    let raf = 0;

    const draw = () => {
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * LERP;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * LERP;
      radiusRef.current +=
        (targetRadius.current - radiusRef.current) * RAD_LERP;

      const t = (performance.now() - start) / 1000;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, smoothMouse.current.x, smoothMouse.current.y);
      gl.uniform1f(uRadius, radiusRef.current);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onTouchEnd);
      window.removeEventListener("pointercancel", onTouchEnd);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="reveal-mask" />;
}
