import type { GamesPageCopy } from "@/content/games-page";
import type {
  IntentLandingPageCopy,
  IntentLandingPageLabels,
  IntentLandingPageSlug,
} from "@/content/intent-landing-pages";

/**
 * The landing pages in Spanish.
 *
 * Written for what people type into a search box in Spanish ("ver películas juntos online",
 * "app para ver películas en pareja a distancia", "juegos online para jugar con amigos"), not
 * word for word from the English. "Tú" throughout, and wording that reads naturally in both
 * Spain and Latin America: no vosotros or ustedes verb forms, "equipo" or "PC" rather than
 * ordenador/computadora, "teléfono" rather than móvil/celular. Game names are the app's own.
 */

export const intentLabels: IntentLandingPageLabels = {
  home: "Inicio",
  bestFor: "Ideal para",
  youNeed: "Necesitas",
  worthKnowing: "Conviene saber",
  readGuide: "Leer la guía",
  faqEyebrow: "Preguntas frecuentes",
  faqTitle: "Respuestas rápidas y sencillas.",
  openPage: "Abrir página",
};

const watchTogether: IntentLandingPageCopy = {
  metadataTitle: "Ver películas juntos online: gratis, sin descargar",
  metadataDescription:
    "Ver películas y series juntos online, gratis en el navegador. Abre una sala privada, sincroniza un enlace, comparte pantalla o reproduce tus archivos.",
  breadcrumbName: "Ver juntos",
  schemaFeatures: [
    "Reproducción sincronizada para todos los espectadores",
    "Enlaces de sala privados, sin cuenta para los invitados",
    "Chat en vivo y reacciones junto al video",
    "Pantalla compartida para los servicios que bloquean la inserción",
    "Transmisión de archivos locales desde el equipo del anfitrión",
    "Funciona en el navegador, en PC y en teléfono",
  ],
  kicker: "Ver juntos",
  title: "Ver juntos online",
  titleAccent: "con quien quieras, desde cualquier navegador.",
  intro:
    "Movmash es una página para ver películas juntos online: abre una sala privada, comparte un enlace y mira películas, series o videos al mismo tiempo, con reproducción sincronizada, chat y reacciones. Los invitados entran desde el navegador, sin instalar nada.",
  ctaLabel: "Empezar a ver juntos",
  secondaryCtaLabel: "Ver cómo funciona",
  heroSignals: ["Ver juntos online", "Enlaces de sala privados", "Sin instalar apps"],
  media: {
    heroAlt: "Amigos preparándose para ver algo juntos online",
    heroCaption:
      "Primero el ambiente de una reunión entre amigos; después, una sala sencilla a la que todos entran sin esfuerzo.",
    stepsAlt: "Amigos entrando a una sala para ver juntos online",
    featureAlt: "Amigos reunidos para ver algo juntos online",
  },

  overview: {
    eyebrow: "Qué significa",
    title: "Qué implica de verdad ver juntos online.",
    paragraphs: [
      "Ver algo en compañía por internet parece sencillo hasta que lo intentas. Dos personas le dan al play al mismo video con unos segundos de diferencia y pasan el resto de la noche intentando volver a sincronizarse. Alguien comparte pantalla y el audio no llega. Otra persona está en el teléfono y el enlace no abre. Lo difícil no es la película: es seguir en el mismo segundo.",
      "Una página para ver juntos lo resuelve con un solo reloj compartido. En lugar de que cada persona controle su propia copia, la sala mantiene una única posición de reproducción. Cuando alguien pausa, se pausa para todos. Cuando alguien llega veinte minutos tarde, cae justo donde va la sala y no al principio. Esa es toda la diferencia entre ver a la misma hora y ver de verdad películas juntos online.",
      "Movmash pone ese reloj compartido en una sala privada que abres en una pestaña del navegador. Tú eliges cómo llega el video: un enlace compatible, tu pantalla o un archivo que ya tienes en tu equipo. Todo lo demás no cambia: una sala, un enlace, reproducción sincronizada, y el chat y las reacciones junto al video en vez de en otra app.",
      "Los invitados no necesitan cuenta y nadie instala nada. Envías un enlace, lo abren y la sala ya funciona. Crear la sala requiere iniciar sesión con Google para que siga siendo tuya; entrar a una no requiere nada.",
    ],
  },

  modesEyebrow: "Tres formas de ver",
  modesTitle: "Elige cómo llega el video a la pantalla.",
  modesCopy:
    "Cada noche pide algo distinto. Un enlace compatible es el camino más fluido, la pantalla compartida cubre los servicios que no permiten la inserción directa y los archivos locales cubren todo lo que nunca estuvo en internet.",
  modes: [
    {
      name: "Pega un enlace compatible",
      summary:
        "Pega una URL de una plataforma compatible y la sala se encarga de la reproducción para todos a la vez. Es la opción más limpia: cada persona transmite el video por su cuenta y con su propia calidad, mientras la sala mantiene compartida la línea de tiempo.",
      bestFor: "YouTube, Vimeo, Twitch, Dailymotion y transmisiones HLS directas",
      needs: "Solo el enlace",
      limit: "Solo funciona con plataformas que permiten la reproducción insertada",
    },
    {
      name: "Comparte tu pantalla",
      summary:
        "Reproduce el video en tu equipo y transmítelo a la sala. Como la sala muestra tu pantalla en lugar de insertar un servicio, es lo que cubre las plataformas de suscripción que bloquean la inserción directa.",
      bestFor: "Netflix, Disney+, Prime Video y cualquier otra cosa que se abra en un navegador",
      needs: "Una pestaña del navegador, una ventana o la pantalla completa para compartir",
      limit:
        "Comparte una pestaña del navegador para que el audio funcione; al compartir una ventana o la pantalla completa suele perderse",
    },
    {
      name: "Transmite un archivo local",
      summary:
        "Reproduce un archivo de video directamente desde tu equipo en la sala. El archivo se transmite a las personas de la sala mientras se reproduce y nunca se sube ni se guarda en nuestros servidores.",
      bestFor: "Descargas, videos caseros, montajes y todo lo que no está en un servicio de streaming",
      needs: "Un archivo de video en el equipo del anfitrión",
      limit: "El anfitrión tiene que quedarse en la sala, porque el archivo se reproduce desde su equipo",
    },
  ],

  benefitEyebrow: "Por qué funciona mejor",
  benefitTitle: "Todos se acomodan rápido.",
  benefitCopy:
    "La sala se vuelve familiar enseguida, así que la gente deja de averiguar cosas y empieza a ver.",
  benefits: [
    {
      title: "En el mismo segundo",
      description:
        "La sala mantiene una sola posición de reproducción para todos. Pausa, adelanta o llega tarde y sigue siendo compartida, así que nadie reacciona a una escena a la que el resto de la sala todavía no ha llegado.",
    },
    {
      title: "Los invitados entran rápido",
      description:
        "Envía un enlace y trae a la gente sin convertir la noche de cine en tiempo de configuración. Sin cuenta, sin descargas y sin permisos que explicarle a nadie.",
    },
    {
      title: "Flexible cuando cambian los planes",
      description:
        "Si un enlace no se puede insertar, pasa a la pantalla compartida. Si el archivo nunca estuvo en internet, transmítelo en local. No dependes de un solo método toda la noche.",
    },
    {
      title: "La conversación queda cerca",
      description:
        "El chat y las reacciones están junto al video y no en otra app, así que nadie mira en una ventana y habla en otra.",
    },
  ],

  scenarioEyebrow: "Úsalo para",
  scenarioTitle: "Hecho para más de un tipo de noche.",
  scenarioCopy:
    "La misma sala funciona tanto para dos personas con tres husos horarios de diferencia como para un grupo que quiere ver el mismo episodio la noche del estreno.",
  scenarios: [
    {
      title: "Noche de cine con amigos",
      description:
        "Elige algo, comparte el enlace de la sala y empieza con todos a la vez en lugar de contar hacia atrás en un chat de grupo esperando que todos le den al play al mismo tiempo.",
    },
    {
      title: "Estrenos y series que se vuelven a ver",
      description:
        "Mira las series la noche en que salen, o vuelve a una favorita de siempre con quienes mejor se saben los diálogos.",
    },
    {
      title: "Ver a distancia",
      description:
        "Mantén una noche fija con tu pareja, un hermano o un amigo en otro país cuando la alternativa es ver la misma película por separado y comentarla por mensajes.",
    },
  ],

  platformsEyebrow: "Qué se puede ver",
  platformsTitle: "Funciona con las fuentes que ya usas.",
  platformsCopy:
    "Algunas plataformas se reproducen directamente en la sala. Otras no permiten la reproducción insertada en ningún sitio: para esas está la pantalla compartida, que cubre prácticamente cualquier servicio que puedas abrir en un navegador.",
  platformGroups: [
    {
      label: "Se reproduce directamente desde un enlace",
      items: ["YouTube", "Vimeo", "Twitch", "Dailymotion", "Transmisiones HLS directas"],
      note: "Pega la URL y la sala sincroniza la reproducción para todos.",
    },
    {
      label: "Se ve con pantalla compartida",
      items: ["Netflix", "Disney+", "Prime Video", "Max", "Hulu", "Crunchyroll"],
      note: "Estos servicios bloquean la reproducción insertada, así que se comparte la pestaña. Cada persona necesita su propia suscripción.",
    },
    {
      label: "Directo desde tu equipo",
      items: ["Archivos MP4 y MKV", "Descargas", "Videos caseros", "Montajes propios"],
      note: "Se transmite desde tu equipo a la sala. Nunca se sube ni se guarda en nuestros servidores.",
    },
  ],

  stepsEyebrow: "Cómo funciona",
  stepsTitle: "Abre Movmash, comparte un enlace y dale al play.",
  stepsCopy:
    "Tres pasos, y solo el primero necesita una cuenta. Partiendo de cero, la mayoría de las salas ya están viendo algo en menos de un minuto.",
  steps: [
    {
      title: "Abre una sala",
      description:
        "Inicia sesión con Google y crea una sala. Elige si vas a pegar un enlace, compartir tu pantalla o reproducir un archivo local.",
    },
    {
      title: "Comparte un enlace",
      description:
        "Envía el enlace de la sala por donde ya hablas con tu gente: chat, mensaje directo, grupo. Los invitados lo abren en cualquier navegador y ya están dentro, sin cuenta y sin instalar nada.",
    },
    {
      title: "Dale al play",
      description:
        "A partir de ahí la reproducción es compartida. Pausa para ir por algo de comer, retrocede a la frase que nadie entendió, y toda la sala se mueve contigo.",
    },
  ],

  faqs: [
    {
      question: "¿Cómo veo una película online con amigos?",
      answer:
        "Abre una sala en Movmash, elige la fuente y envía el enlace de la sala a quien vaya a unirse. Lo abren en un navegador y entran a la sala ya sincronizados con el punto en el que estás. Si la película está en un servicio que no permite la inserción, comparte la pestaña del navegador en lugar de pegar un enlace; lo demás funciona igual.",
    },
    {
      question: "¿Los invitados necesitan una cuenta para ver juntos?",
      answer:
        "No. Los invitados entran desde el navegador con el enlace de la sala y nada más. Crear una sala requiere iniciar sesión con Google para que la sala quede ligada a ti, pero las personas que invitas nunca tienen que registrarse.",
    },
    {
      question: "¿Hay alguna página gratis para ver películas juntos online?",
      answer:
        "Sí. Movmash es una página gratis para ver películas juntos: tiene un plan gratuito, funciona en el navegador y puedes abrir una sala sin pagar ni descargar nada. Las salas gratuitas están pensadas para dos personas, lo que cubre la mayoría de las sesiones a distancia. Los planes de pago son los que suben el límite de participantes, además del tiempo de reproducción, las videollamadas y la calidad de la pantalla compartida.",
    },
    {
      question: "¿Cuántas personas pueden ver juntas en una sala?",
      answer:
        "Las salas gratuitas admiten dos participantes. Las salas Premium están hechas para grupos grandes de más de cincuenta personas, así que todo un grupo de amigos puede ver en la misma sala.",
    },
    {
      question: "¿Podemos ver Netflix o Disney+ juntos?",
      answer:
        "Sí, con la pantalla compartida. Los servicios de suscripción bloquean la reproducción insertada en todas partes, así que ninguna herramienta puede traerlos desde un enlace. Comparte la pestaña del navegador y la sala ve lo que tú ves. Aun así, cada persona necesita su propia suscripción al servicio.",
    },
    {
      question: "¿Puedo ver archivos de video locales con amigos?",
      answer:
        "Sí. Puedes transmitir un archivo de video directamente desde tu equipo a la sala, lo que cubre descargas, videos caseros y todo lo que nunca estuvo en un servicio de streaming. El archivo se transmite mientras se reproduce: nunca lo subimos ni lo guardamos en nuestros servidores.",
    },
    {
      question: "¿Tengo que descargar una app?",
      answer:
        "No. Movmash funciona en el navegador, en PC y en teléfono. No hay nada que instalar para el anfitrión ni para los invitados, y esa suele ser la diferencia entre una noche que empieza y una noche que acaba resolviendo problemas técnicos.",
    },
    {
      question: "¿Por qué mi pantalla compartida no tiene sonido?",
      answer:
        "Casi siempre porque se compartió una ventana o la pantalla completa en lugar de una pestaña del navegador. Compartir una pestaña es el único modo que lleva el audio de forma fiable; si la gente ve el video pero no lo oye, detén la pantalla compartida y elige esa pestaña en concreto.",
    },
    {
      question: "¿La sala es privada?",
      answer:
        "Sí. Las salas son privadas por defecto y solo pueden entrar las personas que tienen el enlace de invitación. No hay un directorio público y nada aparece en listas ni se puede explorar.",
    },
    {
      question: "¿Podemos ver juntos desde un teléfono?",
      answer:
        "Sí. Los invitados pueden entrar y ver desde el navegador del teléfono con el mismo enlace. Ser anfitrión resulta más cómodo en un PC, sobre todo si compartes pantalla o transmites un archivo local.",
    },
    {
      question: "¿Qué se puede hacer además de ver?",
      answer:
        "Todas las salas tienen chat y reacciones, y hay juegos que se juegan en la misma sala sin salir de ella: Tres en raya, Conecta 4 y un rompecabezas cooperativo. Están en el plan gratuito, así que son una buena forma de llenar el rato mientras llegan todos.",
    },
  ],

  guidesEyebrow: "Para profundizar",
  guidesTitle: "Guías para ver juntos.",
  guidesCopy:
    "Lecturas más largas sobre lo que vale la pena hacer bien: qué herramienta hace qué, cómo manejar las plataformas que bloquean la inserción y cómo reproducir tus propios archivos en una sala.",
  guides: [
    {
      title: "Cómo ver películas juntos a distancia",
      description: "Seis formas comparadas con honestidad: salas, extensiones de sincronización, pantalla compartida y más.",
    },
    {
      title: "Páginas para ver películas con amigos, comparadas",
      description: "Qué es cada tipo, qué le pide a cada persona y qué reemplazó a Rabb.it.",
    },
    {
      title: "Ver una película descargada con amigos",
      description: "Transmite un video desde tu propio equipo a la sala en sincronía, sin subirlo y sin esperar.",
    },
    {
      title: "Cómo ver YouTube juntos",
      description: "El punto de partida más simple: un enlace compatible, una sala y reproducción sincronizada.",
    },
    {
      title: "Cómo usar Movmash",
      description: "Paso a paso: elegir una fuente, compartir el enlace y ver en sincronía.",
    },
    {
      title: "Ver películas juntos gratis",
      description: "Qué cubre de verdad el plan gratuito y dónde entra la pantalla compartida.",
    },
  ],
  exploreLinks: [
    {
      title: "Cita a distancia",
      description: "La versión para dos, más cálida, del mismo flujo de sala.",
    },
    {
      title: "Juegos para jugar juntos",
      description: "Juegos gratis en el navegador que funcionan dentro de la sala en la que ya estás.",
    },
    {
      title: "Blog de Movmash",
      description: "Guías prácticas e ideas para ver en compañía.",
    },
  ],
  finalTitle: "Abre una sala y mira algo con tu gente esta noche.",
  finalCopy: "Movmash hace que ver juntos sea simple, claro y fácil de empezar desde el primer clic.",
  finalSignals: ["Enlaces de sala privados", "Sin descargas", "Funciona en el navegador"],
};

const longDistanceDateNight: IntentLandingPageCopy = {
  metadataTitle: "App para ver películas en pareja a distancia",
  metadataDescription:
    "App para ver películas en pareja a distancia: una cita en una sala privada con reproducción sincronizada y chat. Gratis para dos, sin instalar nada.",
  breadcrumbName: "Cita a distancia",
  schemaFeatures: [
    "Salas privadas para dos en el plan gratuito",
    "Reproducción sincronizada con un solo reloj compartido",
    "Chat en vivo y reacciones junto al video",
    "Entrada desde el navegador, sin cuenta para quien se une",
    "Pantalla compartida para Netflix, Disney+ y Prime Video",
    "Transmisión de archivos locales desde el equipo del anfitrión",
  ],
  kicker: "Cita a distancia",
  title: "Una cita a distancia",
  titleAccent: "que de verdad se siente como una cita.",
  intro:
    "Abre una sala privada para dos, comparte un enlace y mira películas en pareja a distancia con reproducción sincronizada, chat y reacciones. Las salas para dos son gratis, y la persona que se une no necesita cuenta.",
  ctaLabel: "Abrir sala para la cita",
  secondaryCtaLabel: "Ver cómo funciona",
  heroSignals: ["Sala privada para dos", "Gratis para dos personas", "Entrada fácil desde el navegador"],
  media: {
    heroAlt: "Pareja a distancia pasando tiempo en compañía por internet",
    heroCaption: "Una sala más suave para las noches que deben sentirse tranquilas antes que técnicas.",
    stepsAlt: "Pareja a distancia en una cita de película",
    featureAlt: "Pareja en una acogedora cita a distancia",
  },
  insideRoom: {
    eyebrow: "Dentro de la sala",
    title: "Tan clara que la atención se queda en la noche, no en la interfaz.",
  },

  overview: {
    eyebrow: "Por qué es distinto",
    title: "Ver a distancia tiene sus propios problemas.",
    paragraphs: [
      "Ver algo con tu pareja en otra ciudad no es el mismo problema que una sesión en grupo, y las herramientas pensadas para grupos suelen pasar por alto lo que de verdad falla. Son dos personas, normalmente al final de un día largo, muchas veces en husos horarios distintos, intentando pasar una hora sintiendo que están en la misma habitación. La tecnología solo tiene que hacer una cosa: quitarse de en medio.",
      "Lo que falla casi nunca es el video. Es que una de las dos personas va tres horas por delante y ya está cansada. Son los diez minutos decidiendo qué ver y otros diez logrando que se reproduzca en los dos lados. Es escribir las reacciones en otra app mientras corre la película, de modo que en teoría es ver lo mismo y en la práctica cada uno lo ve por su cuenta. Para cuando funciona, la noche que había que cuidar ya casi se fue.",
      "Una sala para dos arregla la mitad mecánica de eso. La reproducción sigue un solo reloj compartido, así que una pausa es una pausa para los dos y nadie va treinta segundos por delante sin decirlo. El chat y las reacciones están junto al video y no en otra ventana. Y entrar es un enlace: la persona al otro lado lo abre y simplemente está ahí, sin cuenta, sin instalación y sin que haya que explicarle nada.",
      "Las salas para dos están en el plan gratuito, y vale la pena decirlo sin rodeos porque es justo el caso por el que cobra la mayoría de estas herramientas. Aquí dos personas no son un nivel de prueba. Es la forma del producto, y resulta ser exactamente la forma de una relación a distancia.",
    ],
  },

  modesEyebrow: "Poner la película en pantalla",
  modesTitle: "Tres formas de empezar, según lo que vayas a ver.",
  modesCopy:
    "La mayoría de las citas son con un servicio de suscripción, así que la pantalla compartida es la que conviene aprender. Las otras dos están para cuando es algo más simple o algo que ya tienes.",
  modes: [
    {
      name: "Comparte tu pantalla",
      summary:
        "Reproduce la película en tu equipo y transmítela a la sala. Es el camino para los servicios que la mayoría de las parejas usa de verdad, porque ninguno permite insertar un video en otro sitio.",
      bestFor: "Netflix, Disney+, Prime Video, Max y cualquier cosa en un navegador",
      needs: "Cada persona sigue necesitando su propia suscripción",
      limit: "Comparte la pestaña del navegador y no toda la pantalla: es la única forma de que llegue el sonido",
    },
    {
      name: "Pega un enlace compatible",
      summary:
        "Pega una URL y la sala sincroniza la reproducción para los dos. Es más ligero que compartir pantalla porque cada lado lo transmite directamente, algo que ayuda con una conexión débil.",
      bestFor: "YouTube, Vimeo, Twitch, Dailymotion y transmisiones directas",
      needs: "Solo el enlace",
      limit: "Solo funciona donde la plataforma permite la reproducción insertada",
    },
    {
      name: "Reproduce un archivo local",
      summary:
        "Transmite un video directamente desde tu equipo a la sala. Útil para lo que nunca estuvo en un servicio: una descarga, una favorita de siempre, algo que hiciste tú.",
      bestFor: "Descargas, videos caseros, cualquier cosa sin conexión",
      needs: "El archivo en el equipo de quien organiza",
      limit: "Quien organiza tiene que quedarse en la sala, porque se reproduce desde su equipo",
    },
  ],

  benefitEyebrow: "Pensado para la comodidad de una cita",
  benefitTitle: "Más espacio para la cita de verdad.",
  benefitCopy: "Nada debería sentirse técnico cuando el objetivo es simplemente pasar tiempo en pareja.",
  benefits: [
    {
      title: "Más cerca que escribirse durante una película",
      description:
        "La reproducción sincronizada y unas reacciones ligeras hacen que la noche se sienta compartida y no partida. Reaccionas al mismo segundo, no a un mensaje sobre una escena que ya pasó.",
    },
    {
      title: "Privada por defecto",
      description:
        "A la sala solo se llega con el enlace que envías. No hay directorio, nada es público y no llega nadie que no haya sido invitado.",
    },
    {
      title: "Fácil de entrar de los dos lados",
      description:
        "Sin instalación y sin cuenta para quien se une, lo que te ahorra esos primeros diez minutos incómodos explicando dónde está cada cosa.",
    },
    {
      title: "Flexible cuando cambian los planes",
      description:
        "Usa un enlace, pasa a la pantalla compartida o transmite un archivo local. Si el plan de la noche cambia, la sala no tiene por qué cambiar.",
    },
  ],

  scenarioEyebrow: "Úsalo para",
  scenarioTitle: "Las noches que vale la pena cuidar.",
  scenarioCopy:
    "Las parejas que lo mantienen suelen convertirlo en algo fijo en lugar de organizarlo cada vez.",
  scenarios: [
    {
      title: "Una noche fija cada semana",
      description:
        "La misma noche, el mismo enlace de sala, sin negociar. Un ritual sobrevive a una semana ocupada de una forma en que “a ver si vemos algo algún día” nunca lo hace.",
    },
    {
      title: "Citas sorpresa",
      description:
        "Envía un enlace sin avisar y convierte una noche cualquiera en algo mejor. Funciona porque del otro lado no hay nada que preparar.",
    },
    {
      title: "Volver a ver lo de siempre",
      description:
        "Una película que ambos ya vieron dos veces es la elección correcta cuando lo importante es la compañía y no la película. Nadie tiene que concentrarse para sentirse cerca.",
    },
  ],

  guidesEyebrow: "Para profundizar",
  guidesTitle: "Guías para parejas a distancia.",
  guidesCopy:
    "Lecturas más largas sobre cómo hacer que la distancia pese menos: ideas para citas, las apps que vale la pena tener y por qué ayuda ver cosas en pareja.",
  guides: [
    {
      title: "25 ideas para citas a distancia",
      description: "Ideas para citas virtuales que aguantan más allá de la primera semana, no una lista de novedades.",
    },
    {
      title: "Cómo ver Netflix juntos a distancia",
      description: "Netflix no tiene una función propia para ver en grupo. Esto es lo que funciona en 2026, comparado con honestidad.",
    },
    {
      title: "Las mejores apps para parejas a distancia",
      description: "Once apps para noches de cine sincronizadas, conexión diaria y noches de juegos.",
    },
    {
      title: "Por qué importa ver películas en pareja a distancia",
      description: "Sincronía emocional, recuerdos compartidos y compañía en las horas tranquilas que crea la distancia.",
    },
    {
      title: "Cómo mantener una relación a distancia",
      description: "Actividades compartidas en vez de novedades, pequeños rituales que se repiten y husos horarios.",
    },
    {
      title: "Ver películas juntos gratis",
      description: "La versión general de la configuración, para amigos y grupos además de parejas.",
    },
  ],

  stepsEyebrow: "Cómo funciona",
  stepsTitle: "Abre Movmash, envía el enlace y ponte cómodo.",
  stepsCopy:
    "La preparación sigue siendo tranquila, incluso si una de las dos personas nunca ha usado Movmash y lo hace medio dormida.",
  steps: [
    {
      title: "Abre una sala",
      description:
        "Inicia sesión con Google y crea una sala privada. Elige si vas a compartir tu pantalla, pegar un enlace o reproducir un archivo.",
    },
    {
      title: "Envía el enlace",
      description:
        "Tu pareja lo abre en el navegador que tenga delante, en un portátil o en un teléfono. Sin cuenta, sin instalación y sin instrucciones de tu parte.",
    },
    {
      title: "Mira y reacciona",
      description:
        "Dale al play. A partir de ahí la reproducción es compartida, así que pausar para hablar no obliga a volver a sincronizar después.",
    },
  ],

  faqs: [
    {
      question: "¿Cómo puede una pareja ver películas online?",
      answer:
        "Abre una sala privada, elige cómo llega la película a la pantalla y envíale el enlace a tu pareja. Para un servicio de suscripción como Netflix o Disney+ se comparte la pestaña del navegador, porque ninguno permite la reproducción insertada. Para YouTube o un enlace directo puedes pegar la URL y la sala sincroniza los dos lados automáticamente.",
    },
    {
      question: "¿Es gratis para dos personas?",
      answer:
        "Sí. Las salas para dos están en el plan gratuito, que cubre la mayoría de las sesiones a distancia. Los planes de pago suben el límite de participantes, el tiempo de reproducción, las videollamadas y la calidad de la pantalla compartida, nada de lo cual necesita por fuerza una pareja.",
    },
    {
      question: "¿Mi pareja necesita una cuenta?",
      answer:
        "No. Abre el enlace de la sala en un navegador y ya está dentro. Solo inicia sesión, con Google, quien crea la sala, para que quede ligada a esa persona.",
    },
    {
      question: "¿Podemos ver Netflix juntos a distancia?",
      answer:
        "Sí, con la pantalla compartida. Netflix no tiene una función propia para ver en grupo y bloquea la reproducción insertada, así que ninguna herramienta puede traerlo desde un enlace: se hace compartiendo la pestaña. Aun así, cada persona necesita su propia cuenta de Netflix.",
    },
    {
      question: "¿Y si estamos en husos horarios distintos?",
      answer:
        "Elige el horario según quién madruga más en lugar de buscar el punto medio, y mantenlo fijo de una semana a otra para que nadie tenga que recalcular. Una película más corta en una noche difícil es mejor que cancelar: una hora en compañía vale más que un plan perfecto de tres horas que nunca ocurre.",
    },
    {
      question: "¿El video sigue sincronizado si uno de los dos pausa?",
      answer:
        "Sí. La sala mantiene una sola posición de reproducción para los dos, así que una pausa es una pausa para ambos. Se puede parar para hablar o retroceder a la frase que ninguno entendió sin que nadie tenga que contar hacia atrás para volver a coincidir.",
    },
    {
      question: "¿Podemos hablar mientras vemos?",
      answer:
        "Todas las salas tienen chat de texto y reacciones junto al video. Los planes de pago añaden videollamadas y llamadas de voz dentro de la sala, algo que unas parejas prefieren para una cita y a otras les estorba para ver la película.",
    },
    {
      question: "¿Se puede hacer desde un teléfono?",
      answer:
        "Sí. Entrar funciona desde el navegador del teléfono con el mismo enlace, así que da igual si una persona está en un portátil y la otra en la cama con el teléfono. Organizar es más fácil en un PC, sobre todo para compartir pantalla.",
    },
    {
      question: "¿La sala es privada?",
      answer:
        "Sí. Las salas son privadas por defecto y solo puede entrar quien tiene el enlace. No hay un listado público ni nada que se pueda explorar.",
    },
    {
      question: "¿Qué deberíamos ver?",
      answer:
        "Decídelo antes de la llamada y no durante: decidir es lo que se come la noche. Una serie que se sigue en pareja elimina la elección por completo, y por eso las noches fijas de cada semana suelen acabar siendo una serie y no una película.",
    },
    {
      question: "¿Esto es solo para parejas?",
      answer:
        "Para nada. Esta página está escrita pensando en parejas, pero la misma sala sirve para amigos, hermanos o cualquiera que comparta una película desde lugares distintos. La página para ver juntos cubre la versión para grupos.",
    },
  ],

  exploreLinks: [
    {
      title: "Ver juntos online",
      description: "La configuración más amplia para grupos, estrenos de episodios y noches tranquilas en casa.",
    },
    {
      title: "Juegos para jugar juntos",
      description: "Juegos gratis en el navegador que funcionan en la misma sala, para cuando termina la película.",
    },
    {
      title: "Blog de Movmash",
      description: "Ideas para citas y guías para ver en compañía.",
    },
  ],
  finalTitle: "Que la próxima noche de cine a distancia sea más fácil de empezar.",
  finalCopy: "Movmash mantiene la sala simple, privada y lo bastante cálida para que la cita sea lo principal.",
  finalSignals: ["Enlaces de sala privados", "Gratis para dos personas", "Entrada fácil desde el navegador"],
};

export const intentPages: Record<IntentLandingPageSlug, IntentLandingPageCopy> = {
  "watch-together": watchTogether,
  "long-distance-date-night": longDistanceDateNight,
};

export const gamesPage: GamesPageCopy = {
  metadataTitle: "Juegos online para jugar con amigos, sin descargar",
  metadataDescription:
    "Juegos online gratis para jugar con amigos con un solo enlace: Tres en raya, Conecta 4 y un rompecabezas cooperativo. En el navegador, sin descargar nada.",
  breadcrumbHome: "Inicio",
  breadcrumbName: "Juegos",
  listName: "Juegos online para jugar con amigos en Movmash",
  kicker: "Juegos · Gratis · Sin descargas",
  title: "Juegos online para jugar con amigos,",
  titleAccent: "con un solo enlace.",
  intro:
    "Juegos que funcionan dentro de una sala de Movmash. Envía el enlace, tu amigo lo abre en cualquier navegador y a jugar. Sin app, sin registro para los invitados y sin costo.",
  cta: "Abrir una sala y jugar",
  videoLabel: "Video de demostración de Movmash",
  cardLabel: "Jugar {name} en Movmash",
  liveTitle: "Tres juegos ya disponibles,",
  liveTitleLink: "y vienen más",
  liveCopy: "Todos son gratis, funcionan en el navegador y se abren dentro de la sala en la que ya estás.",
  overviewEyebrow: "Por qué dentro de la sala",
  overviewTitle: "Lo que de verdad hace falta para jugar juntos online.",
  overview: [
    "Jugar con alguien que está en otra ciudad casi nunca se frena por el juego en sí: se frena por todo lo que lo rodea. Una persona tiene cuenta y la otra no. La app está en la plataforma equivocada. Hay una descarga, luego una actualización, luego un inicio de sesión, y para cuando todos por fin están dentro, los veinte minutos que había para compartir ya se fueron.",
    "Esa carga es la razón por la que tantas noches de juegos a distancia dejan de ocurrir sin que nadie lo decida. Los juegos de Movmash están hechos al revés: funcionan dentro de la sala en la que ya estás, en el navegador, con el mismo enlace que usabas para ver algo. Nadie instala nada y los invitados no crean una cuenta.",
    "Eso también significa que no hay que elegir entre ver y jugar. La sala hace las dos cosas. Pon algo, juega una ronda de Conecta 4 mientras carga el siguiente episodio y vuelve a la película: la misma pestaña, las mismas personas, nada que cerrar ni volver a abrir entre una cosa y otra.",
    "Los tres juegos están en el plan gratuito. Los planes de pago aumentan el tamaño de la sala, el tiempo de reproducción, las videollamadas y la calidad de la pantalla compartida; no bloquean los juegos ni añaden otros.",
  ],
  detailsTitle: "Una mirada más de cerca a cada uno",
  detailsCopy: "Cómo se siente jugar cada juego y una cosa que conviene saber antes de empezar.",
  worthKnowing: "Conviene saber:",
  play: "Jugar {name}",
  readGuide: "Leer la guía completa",
  broader:
    "¿Quieres la versión más amplia? {guide} explica la configuración de principio a fin, y {watch} cubre el lado del video de la misma sala.",
  broaderWithoutGuide: "Para el lado del video de la misma sala, mira {watch}.",
  broaderGuideLabel: "Juegos para jugar con amigos a distancia",
  broaderWatchLabel: "ver juntos online",
  stepsTitle: "Empezar una partida lleva más o menos un minuto",
  steps: [
    {
      title: "Abre una sala",
      description:
        "Inicia sesión con Google y crea una sala. No hace falta decidir entre ver y jugar: los juegos viven en la misma sala en los dos casos.",
    },
    {
      title: "Envía el enlace",
      description:
        "Compártelo por donde hables normalmente. Quien lo abre entra desde el navegador, sin cuenta y sin instalar nada, en un teléfono o en un PC.",
    },
    {
      title: "Elige un juego",
      description:
        "Abre la zona de juegos dentro de la sala y elige. Los juegos de uno contra uno empiezan en cuanto entra el segundo jugador; el rompecabezas admite hasta ocho.",
    },
  ],
  faqTitle: "Preguntas sobre jugar juntos",
  faqs: [
    {
      question: "¿Los juegos son gratis?",
      answer:
        "Sí, los tres están en el plan gratuito, sin periodo de prueba y sin cobro por juego. Los planes de pago añaden tamaño de sala, tiempo de reproducción, videollamadas y calidad de pantalla compartida; no desbloquean juegos ni añaden otros.",
    },
    {
      question: "¿Mis amigos necesitan una cuenta para jugar?",
      answer:
        "No. Los invitados entran desde el navegador con el enlace de la sala y empiezan a jugar enseguida. Solo inicia sesión, con Google, quien crea la sala, para que quede ligada a esa persona.",
    },
    {
      question: "¿Hay que descargar algo?",
      answer:
        "No. Todos los juegos funcionan en el navegador, en PC y en teléfono. No hay nada que instalar, nada que actualizar y nada que funcione en una sola plataforma.",
    },
    {
      question: "¿Cuántas personas pueden jugar a la vez?",
      answer:
        "Tres en raya y Conecta 4 son juegos por turnos para dos jugadores. El rompecabezas es cooperativo y admite hasta ocho personas trabajando en el mismo tablero al mismo tiempo.",
    },
    {
      question: "¿Podemos ver algo y jugar en la misma sala?",
      answer:
        "Sí, y esa es la razón de ponerlos en la sala y no en una página aparte. Juega entre episodios o mientras la gente va llegando, y luego vuelve al video sin cerrar nada.",
    },
    {
      question: "¿Se puede jugar en un teléfono?",
      answer:
        "Sí. Los juegos funcionan en el navegador del teléfono con el mismo enlace de sala, así que da igual si una persona está en un portátil y la otra en un teléfono.",
    },
    {
      question: "¿Qué juegos vienen después?",
      answer:
        "Hay más en camino. Los tres de aquí son los que hoy están disponibles y estables: preferimos listar lo que de verdad funciona antes que un plan de futuro que todavía no se puede jugar.",
    },
  ],
  games: {
    "tic-tac-toe": {
      shortBlurb: "Tres en línea. Más o menos un minuto por ronda.",
      imageAlt: "Tres en raya online en una sala de Movmash: un tablero de 3 por 3 con marcas X y O",
      detail:
        "El que todo el mundo ya conoce, y justo por eso sirve para calentar. Una ronda dura más o menos un minuto, así que llena el hueco mientras la última persona todavía busca el enlace, y nunca hay que explicárselo a nadie.",
      tip: "Si empiezas tú, abre en una esquina. Le deja a tu rival una sola respuesta que mantiene el empate (el centro), así que gana más partidas contra un rival descuidado que cualquier otra primera jugada.",
    },
    "connect-4": {
      shortBlurb: "Suelta fichas y alinea cuatro. La partida más larga.",
      imageAlt: "Conecta 4 multijugador online en Movmash: un tablero azul con fichas rojas y amarillas",
      detail:
        "El duelo más largo, y el que tiene profundidad de verdad. Las partidas duran entre cinco y diez minutos, lo que lo hace más adecuado para una pausa en serio entre episodios que para rellenar un hueco.",
      tip: "Juega pronto la columna central. Las fichas que pones ahí forman parte de más cuatros posibles que en cualquier otra columna, y controlarla obliga a tu rival a responderte durante el resto de la partida.",
    },
    jigsaw: {
      shortBlurb: "Una imagen y hasta ocho personas resolviéndola.",
      imageAlt:
        "Rompecabezas cooperativo online en Movmash: piezas sueltas a la izquierda y una cuadrícula a medio resolver a la derecha",
      detail:
        "El tranquilo, y el único juego de aquí que admite más de dos personas. Hasta ocho pueden trabajar en el mismo tablero a la vez, con niveles de dificultad e imagen a elegir, así que se estira hasta llenar una llamada larga en lugar de acabarse en un minuto.",
      tip: "Reparte el tablero en vez de rebuscar todos en el mismo montón. Una persona en los bordes mientras las demás se quedan con una zona de color cada una es mucho más rápido que ocho personas compitiendo por la misma pieza.",
    },
  },
};
