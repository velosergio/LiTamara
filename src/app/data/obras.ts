export interface Obra {
  slug: string;
  title: string;
  technique: string;
  dimensions: string;
  year: string;
  description: string;
  images: string[];
  series?: string;
}

export const obras: Obra[] = [
  {
    slug: "fragmentada",
    title: "Fragmentada",
    technique: "Serie fotográfica sobre tela",
    dimensions: "90 × 70 cm",
    year: "2019",
    description:
      "Fragmentada escudriña las profundidades del dolor, naciendo a partir de una pérdida significativa: la de una mujer fundamental en mi vida. Este dolor, que me rompía y quebraba internamente, se convirtió en el impulso para buscar formas de sobrellevar la perdida, el dolor y el duelo. La obra se desarrolló en colaboración con una red de mujeres cercanas que me acompañaron en este proceso: mis amigas, mis tías y mi madre, quienes aportaron su fuerza y sus vivencias para dar forma a esta creación.",
    images: [
      "/obras/fragmentada_1.jpeg",
      "/obras/fragmentada_2.jpeg",
      "/obras/fragmentada_3.jpeg",
    ],
  },
  {
    slug: "montes-de-maria",
    title: "Montes de María",
    technique: "Serie fotográfica — Impresión sobre tela",
    dimensions: "Tamaño variable",
    year: "2022",
    description:
      "Montes de María fue realizada de forma colaborativa con las mujeres del Cabildo La Esmeralda, del municipio de Colosó, como resultado de la Beca de Creación otorgada por la Bolsa de Estímulos del Fondo Mixto de Sucre en 2022. A través de esta conexión, se construyó un paisaje colectivo que se materializó en el cuerpo, fusionando experiencia personal y colectiva en una expresión artística común.",
    images: [
      "/obras/montesdemaria_1.jpeg",
      "/obras/montesdemaria_2.png",
      "/obras/montesdemaria_3.png",
    ],
  },
  {
    slug: "pliegues",
    title: "Pliegues",
    technique: "Fotografía — Impresión sobre tela",
    dimensions: "2,00 × 1,30 m",
    year: "2024",
    description:
      "Pliegues es un homenaje al cuerpo, a este cuerpo que habito y que muchas veces paso por alto en la rutina diaria. Cuando nacemos la piel es lisa, sin marcas. Con los años aparecen arrugas, líneas y pliegues que surgen con la risa, el dolor, el llanto o el paso del tiempo. Cada línea guarda una historia y nos recuerda que el cuerpo es también un territorio donde la vida se escribe y se transforma.",
    images: ["/obras/pliegues_1.jpeg", "/obras/pliegues_2.jpeg"],
  },
  {
    slug: "olor-a-monte",
    title: "Olor a Monte",
    technique: "Instalación sensorial",
    dimensions: "20 × 15 × 20 cm / 11 cajas",
    year: "2023",
    description:
      "Olor a Monte es un proyecto de investigación-creación realizado en la comunidad de Las Marías, San Antonio de Palmito, Sucre. La obra propone un ejercicio colaborativo de intercambio de saberes para fortalecer la memoria ancestral, explorando la relación cosmogónica entre los habitantes y las plantas del territorio Zenú.",
    images: [
      "/obras/oloramonte_1.jpeg",
      "/obras/oloramonte_2.jpeg",
      "/obras/oloramonte_3.jpeg",
      "/obras/oloramonte_4.jpeg",
    ],
  },
  {
    slug: "cerco-para-una-llama",
    title: "Cerco para una Llama",
    technique: "Ensamblaje escultórico con alambre de púas, cera y vela",
    dimensions: "20 × 30 cm",
    year: "2019",
    description:
      "Cerco para una llama presenta una vela encendida contenida dentro de una estructura construida con alambres retorcidos, púas y cera derretida. La obra establece una tensión entre la fragilidad de la llama y la dureza del cerco que la rodea. La llama puede entenderse como una metáfora del cuerpo, la memoria, la fe o el deseo; una presencia frágil que persiste a pesar del encierro.",
    images: [
      "/obras/cercoparaunallama_1.jpeg",
      "/obras/cercoparaunallama_2.jpeg",
      "/obras/cercoparaunallama_3.png",
    ],
  },
  {
    slug: "cuerpo-votivo",
    title: "Cuerpo Votivo",
    technique: "Bordado, impresión, tinción y materiales orgánicos",
    dimensions: "Variable",
    year: "2024",
    description:
      "Cuerpo votivo es una serie en la que exploro el cuerpo femenino como lugar de dolor, memoria, sacrificio y transformación. La serie retoma elementos visuales de la iconografía religiosa —el sudario, la urna, la sangre, la herida, la reliquia y la ofrenda— para construir una espiritualidad situada en el cuerpo femenino.",
    images: ["/obras/cuerpovotivo.jpeg"],
  },
  {
    slug: "mater",
    title: "Mater",
    technique:
      "Pigmentos naturales sobre lienzo (bija, achiote, café, remolacha, flor de Jamaica, cúrcuma, tanino de manglar y limón)",
    dimensions: "90 × 90 cm",
    year: "2026",
    description:
      "Mater representa el cuerpo femenino como origen, herida y territorio sagrado. La vulva, ubicada en el centro de la composición y contenida por un marco ornamental, adquiere la presencia de una reliquia o una imagen votiva. Los tonos rojos, ocres y terrosos evocan la sangre menstrual, la carne y la tierra.",
    images: ["/obras/mater_1.jpeg", "/obras/mater_2.png"],
  },
  {
    slug: "sudario-femme",
    title: "Sudario Femme",
    technique: "Impresión de maquillaje en papel de cocina",
    dimensions: "50 × 40 cm",
    year: "2022",
    description:
      "Sudario Femme es el reflejo de la máscara que llevo puesta, de los roles que la sociedad patriarcal me impone y que constantemente me define. La noción de ser mujeres empoderadas y dignas no se ha liberado de la idea de la mujer perfecta. Frente a esta realidad, solo queda el dolor de subsistir, llevando la máscara social de la perfección.",
    images: ["/obras/sudariofemme_1.jpeg", "/obras/sudariofemme_2.jpeg"],
  },
  {
    slug: "sacre",
    title: "Sacré",
    technique: "Pigmento de achiote y bordado",
    dimensions: "40 × 70 cm",
    year: "2025",
    description:
      "Sacré surge de una exploración personal sobre el cuerpo y las huellas que deja la experiencia en la materia. En el centro aparece un útero bordado acompañado por una forma que recuerda una corona de espinas. La imagen establece un diálogo con la iconografía de la pasión de Cristo, trasladando esa noción de sacrificio y dolor al cuerpo femenino.",
    images: ["/obras/sacre_1.jpeg", "/obras/sacre_2.jpeg"],
  },
  {
    slug: "rojo-residual",
    title: "Rojo Residual",
    technique: "Fotografía sobre lienzo",
    dimensions: "90 × 70 cm",
    year: "2024",
    series: "Dolor en Sí",
    description:
      "Rojo residual presenta manchas suspendidas entre lo orgánico, lo sanguíneo y lo abstracto, como fragmentos internos que han sido expulsados, detenidos o revelados sobre la superficie. El rojo aparece como materia viva: fluido, herida, ciclo, resto y presencia.",
    images: [
      "/obras/rojoresidual_1.jpeg",
      "/obras/rojoresidual_2.jpeg",
      "/obras/rojoresidual_3.jpeg",
    ],
  },
  {
    slug: "cuando-la-sangre-baja",
    title: "Cuando la Sangre Baja, el Dolor Desaparece",
    technique:
      "Fotografía — Instalación — Pintura por capilaridad con pigmentos naturales",
    dimensions: "Medidas variables",
    year: "2024",
    series: "Dolor en Sí",
    description:
      "Este proyecto explora la memoria del dolor menstrual vivido durante 32 años, no solo como una experiencia física, sino también como un eco emocional y psicológico que trasciende al tiempo y se conecta con dolores colectivos heredados y culturalmente compartidos.",
    images: [
      "/obras/cuandolasangrebaja_1.jpeg",
      "/obras/cuandolasangrebaja_2.jpeg",
    ],
  },
  {
    slug: "ritmos-cotidianos",
    title: "Ritmos Cotidianos",
    technique: "Pigmentos naturales (bija) sobre tela",
    dimensions: "30 piezas de 20 × 15 cm",
    year: "2024",
    series: "Dolor en Sí",
    description:
      "Ritmos cotidianos surge de una memoria heredada: los relatos de mi abuela sobre el periodo, en un tiempo en que no existían toallas higiénicas y las mujeres usaban trapitos para contener la sangre menstrual. La obra está compuesta por 30 piezas textiles que evocan esa práctica íntima, doméstica y repetida.",
    images: [
      "/obras/ritmoscotidianos_1.jpeg",
      "/obras/ritmoscotidianos_2.jpeg",
      "/obras/ritmoscotidianos_3.jpeg",
      "/obras/ritmoscotidianos_4.jpeg",
    ],
  },
  {
    slug: "fuera-de-si",
    title: "Fuera de Sí, Desde Adentro",
    technique: "Pigmento de achiote sobre interlón",
    dimensions: "1,20 × 0,90 m",
    year: "2024",
    series: "Dolor en Sí",
    description:
      "Fuera de sí, desde adentro surge de una reflexión sobre las cargas heredadas del dolor en el linaje materno. La obra está realizada sobre interlón, una tela delgada que mi abuela utilizaba en la costura, activando una relación directa con su memoria, con los oficios domésticos y con una herencia femenina atravesada por el cuidado, el silencio y la resistencia.",
    images: ["/obras/fueradesi_1.png", "/obras/fueradesi_2.jpeg"],
  },
  {
    slug: "hasta-hacerlo-otro",
    title: "Hasta Hacerlo Otro",
    technique: "Pigmento natural (bija) sobre tela",
    dimensions: "40 × 30 cm (5 piezas)",
    year: "2024",
    series: "Dolor en Sí",
    description:
      "Hasta hacerlo otro está compuesta por cinco cuadros que aluden a los días del periodo menstrual. A través de manchas, veladuras y tonos rojos, la obra transforma la sangre y el dolor en una secuencia visual donde el dolor cambia de densidad, se acumula, se oscurece, se expande, se diluye y finalmente deja una huella.",
    images: [
      "/obras/hastahacerlootro_1.jpeg",
      "/obras/hastahacerlootro_2.jpeg",
      "/obras/hastahacerlootro_3.jpeg",
    ],
  },
  {
    slug: "crepuscular",
    title: "Crepuscular",
    technique: "Pigmentos naturales sobre lienzo (bija, achiote y tierra roja)",
    dimensions: "90 × 90 cm cada lienzo (tríptico)",
    year: "2025",
    description:
      "Crepuscular es una obra compuesta por tres lienzos que evocan el tránsito entre la luz y la oscuridad. Nace de ese limbo en el que a veces me encuentro como artista, un espacio de aridez creativa donde las ideas se detienen y la búsqueda se vuelve silenciosa. Propone un estado de tránsito: una meditación sobre la vulnerabilidad del pensamiento creativo.",
    images: ["/obras/crepuscular.png"],
  },
  {
    slug: "tanino",
    title: "Tanino",
    technique: "Pigmento de mangle sobre tela — Capilaridad",
    dimensions: "Medidas variables",
    year: "2025",
    description:
      "El tanino, savia oscura del manglar, se desplaza sobre la tela como si siguiera el curso de un río. El pigmento corre, se acumula, se oxida y se expande con el tiempo, formando manchas que evocan raíces, corrientes de agua y tierra húmeda. La obra permite que la propia materia revele su geografía.",
    images: ["/obras/tanino.jpeg"],
  },
  {
    slug: "tanino-ii",
    title: "Tanino II",
    technique: "Pigmento de mangle sobre tela — Capilaridad",
    dimensions: "Medidas variables",
    year: "2025",
    description:
      "Tanino II desplaza la obra hacia una dimensión más inestable y móvil. La tela, suspendida y colgada en el espacio, introduce una relación con el vaivén de la marea. La mancha del tanino se expande como un rastro orgánico que remite al flujo del agua en el manglar.",
    images: ["/obras/tainoii_1.jpeg", "/obras/tainoii_2.jpeg"],
  },
  {
    slug: "instrucciones-para-sostener-lo-roto",
    title: "Instrucciones para Sostener lo Roto",
    technique:
      "Instalación escultórica — Fragmentos de bahareque, barro, cañas y horcones de madera",
    dimensions: "Medidas variables",
    year: "2024",
    description:
      "Instrucciones para sostener lo roto es una instalación realizada con fragmentos de una casa de bahareque. Sus muros son trasladados al espacio expositivo y apoyados sobre horcones inclinados. La obra no intenta reconstruir la vivienda, sino preguntarse cómo se sostiene aquello que ya llegó a su fin. Sostener no significa reparar: significa acompañar el peso de lo que queda.",
    images: ["/obras/instruccionesparasostenerloroto.jpeg"],
  },
  {
    slug: "materia-cromatica",
    title: "Materia Cromática",
    technique:
      "Pigmentos naturales (bija, achiote, tanino de manglar, tierra roja)",
    dimensions: "Variable",
    year: "2024",
    description:
      "En estas obras exploro el color como una materia orgánica, sensible y cambiante. El pigmento no funciona únicamente como un recurso para producir color. Su densidad, procedencia y capacidad de transformación participan en la construcción de cada obra. Las superficies registran capas, residuos y cambios de tonalidad que convierten la materia en huella y memoria.",
    images: ["/obras/materiacromatica.jpeg"],
  },
];
