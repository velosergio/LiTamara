import RedCursor from "./components/RedCursor";

export default function Home() {
  return (
    <div className="relative flex min-h-dvh flex-1 items-center justify-center overflow-hidden bg-[var(--red-bg)]">
      <RedCursor />
      <h1 className="select-none px-6 text-center font-medium tracking-[0.12em] text-[clamp(1.25rem,6vw,4rem)] text-[var(--red-text)]">
        Li Tamara
      </h1>
    </div>
  );
}
