# Portfolio de William Gutierrez

Presentación cinematográfica de proyectos controlada por scroll. HTML, CSS y JavaScript estáticos, compatibles con GitHub Pages y sin compilación.

## Publicar

Conserva una copia de tu sitio actual. Sube el contenido de esta carpeta a la raíz del repositorio `obedgut/miPortafolio` y conserva la configuración de GitHub Pages. Espera a que finalice la publicación y recarga sin caché.

El paquete no contiene la configuración ni los identificadores del alojamiento del demo.

## Experiencia

Cada proyecto se presenta como una escena de producto: titulares por palabras, acercamiento de la interfaz, secuencia de planos animados y explicación del enfoque. El scroll avanza y retrocede por las escenas. No hay arrastre, carrusel, contadores, numeración de secciones ni viñetas.

La sección de tecnologías se presenta en seis escenas de eclipse controladas por scroll y revela sus textos progresivamente: IA aplicada y vibe coding primero, después Next.js, WordPress, React y Vite, JavaScript, Kotlin, Swift, React Native, Odoo, .NET, Laravel y n8n; WhatsApp API cierra la secuencia. Las tecnologías se presentan como habilidades; Grupo Innova cuenta además con un caso detallado de automatización y panel.

## Vídeos

`films/` contiene cinco presentaciones MP4 H.264 de 6.4 segundos, compuestas exclusivamente con capturas existentes del portfolio. Son composiciones animadas, no grabaciones de interacción con los sistemas. Las composiciones MP4 se conservan como recursos; la introducción actual utiliza una imagen del agujero negro. Los proyectos animan directamente las capturas originales como planos de cámara; las otras composiciones se conservan como recursos. Las imágenes de portada mantienen el contenido visible antes de la carga.

Skyfleeter no tiene vídeo ni capturas inventadas: conserva una presentación tipográfica y la explicación de sus contribuciones.

## Movimiento y accesibilidad

El botón Pausar y la preferencia del sistema de movimiento reducido muestran una versión estática legible. Los enlaces funcionan con teclado y las tecnologías se leen en el orden del documento. Las palabras animadas conservan el texto completo para lectores de pantalla. Se preservan los idiomas español e inglés y los CV originales.

## Archivos

`index.html`: portada y secciones.

`app.js`: escenas, sincronización de vídeo, división de titulares en palabras, idiomas y habilidades.

`styles.css`: tipografía, composición y adaptación a pantallas.

`projects-data.js` y `narratives.js`: contribuciones y enfoque de los proyectos.

`proyecto.html`: detalle de los casos, sin viñetas ni contadores.

`films/`, `images/`, `fonts/`, `vendor/`, `icons/`, `assets/`: recursos locales.

Para probar localmente usa un servidor HTTP. El vídeo del hero se carga completo antes de activar el recorrido. Se reproduce desde un recurso local del navegador para poder saltar entre fotogramas incluso si el servidor no admite solicitudes Range. Durante la carga permanece visible su póster. Abrir los HTML directamente puede limitar vídeos e iconos por las restricciones del navegador.

Las escenas de proyectos recorren 400vh de scroll en escritorio y 380vh en móvil, con capturas ampliadas y tiempos separados para evitar superponer titulares e imágenes.

Los nombres de tecnologías y lenguajes responden al hover con elevación suave, color y subrayado. El movimiento se desactiva al pausar o con movimiento reducido.

Los vídeos y las transformaciones de cada escena comparten una única línea de tiempo de scroll, con suavizado conjunto para mantener la sincronización al avanzar, detenerse o retroceder.

Los proyectos mantienen las imágenes grandes durante más recorrido; la transición entre proyectos ocupa solo 20vh y funde la escena saliente antes de mostrar el siguiente titular.

Dirección visual: titulares grandes que salen sin encogerse, movimiento de cámara sobre capturas originales, tres planos con pausas de lectura por proyecto y cierres centrados en la contribución de William. Los planos se detienen al detener el scroll; no simulan interacciones que no fueron grabadas. En móvil, las interfaces web pasan de una vista completa a un acercamiento para leer sus detalles. La escena de IA conecta idea, criterio y producto; el cierre presenta nombre, especialidades y contacto.

Las tecnologías tienen una presentación propia con el recurso visual `images/eclipse.png`: la luz se desplaza con el scroll y cada nombre revela una explicación mediante hover, teclado o toque. IA abre la secuencia y WhatsApp API la cierra. Pausar muestra todos los grupos sin fijar la pantalla.

El hero anticipa el eclipse con un horizonte luminoso. El hover, foco o toque sobre las tecnologías activa un destello en la corona, usando `images/eclipse-flare.png`. Las máscaras de palabras tienen margen para evitar recortes de letras y la composición se adapta también a pantallas bajas.

El hero utiliza un único vídeo local: `films/black-hole-journey.mp4`. Es un render 3D artístico creado para el portfolio: disco en movimiento, cámara que avanza hacia el agujero, destello y oscuridad dentro de una sola toma. No utiliza los clips de NASA de la versión anterior ni hace zoom de una imagen desde la web.

Los primeros seis segundos forman el bucle inicial. Al avanzar, se conserva el fotograma actual, se completa esa fase del giro mientras sale el texto y el scroll recorre la misma película hasta entrar. El giro y el avance están unidos en los fotogramas. Al detener el scroll queda fija toda la escena y al retroceder se recorre la misma toma hacia atrás. Pausar, movimiento reducido y cambiar de pestaña detienen la reproducción. El póster es el primer fotograma del mismo vídeo.

En tecnologías, el destello revela el logo del nombre activo. Vite sustituye a React y Vite; React se suma a Next.js, JavaScript y WordPress. React Native se mantiene en móvil. Las categorías sin marca propia (IA, Vibe coding, Webhooks, APIs) usan su nombre tipográfico. Los logos se incluyen localmente desde Simple Icons 16.24.1 (CC0).

## Grupo Innova y retorno al recorrido
Grupo Innova aparece primero. El caso incorpora las 17 capturas suministradas, organizadas por función y con datos personales, conversaciones y valores operativos sensibles ocultos en los propios archivos publicados. Las capturas sin censura no se incluyen. Las imágenes con datos privados se editaron con la herramienta de imágenes, conservando la estructura y los controles; las demás se mantienen como fueron aportadas.

“Ver cómo lo abordé” guarda el punto del recorrido y el estado de la galería. “Volver al recorrido” recupera esa posición; también se contempla Atrás del navegador. La información de retorno se guarda solo en la sesión de la pestaña.


Actualización: entrada astronómica sincronizada con la carga del video, Imprimaenlinea.com como segundo proyecto y regreso flotante en todos los casos. El proyecto documenta WordPress, WooCommerce, Ubuntu y la responsabilidad sobre cinco sitios del grupo.

Entrada cinematográfica: prólogo de video local con movimiento de cámara, título personal y fundido sincronizado al hero. No incluye botón de salto. Respeta movimiento reducido y omite el prólogo al volver a un proyecto.
