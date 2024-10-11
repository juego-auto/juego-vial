> [!IMPORTANT]
> Nuestro videojuego sigue en desarrollo, por lo que probablemente encuentres errores. Daremos un aviso cuando el simulador se encuentre en su versión más estable.

🚦 Videojuego de Seguridad Vial Interactivo

Bienvenido al Videojuego de Seguridad Vial, un proyecto desarrollado por Nico, Abi, Brisa y Leila para el municipio de Merlo, con el objetivo de educar sobre las reglas del tráfico y la seguridad en las carreteras de una manera interactiva y divertida. A lo largo del juego, los jugadores podrán avanzar niveles, responder preguntas sobre situaciones reales de conducción y mejorar sus conocimientos de seguridad vial.

🎯 Objetivo del Proyecto:

El videojuego está diseñado para educar a los usuarios en temas de seguridad vial. A través de preguntas interactivas en cada nivel, los jugadores aprenden sobre normas de tráfico y prácticas seguras mientras se divierten.

📋 Características Principales:

Niveles Progresivos: Cada nivel está bloqueado hasta que completes el anterior con éxito. Esto fomenta el aprendizaje gradual y asegura que el jugador esté preparado para desafíos más complejos.

Preguntas Interactivas: Cada nivel presenta preguntas con imágenes y múltiples opciones de respuesta, relacionadas con situaciones de conducción.

Progreso Guardado: El juego utiliza localStorage para guardar el avance del jugador, permitiendo retomar el juego desde donde lo dejó.

Diseño Visual Dinámico: El fondo animado y la interfaz limpia hacen que el aprendizaje sea visualmente atractivo y entretenido.

📒 Archivos y estructura del proyecto:

/sources          -> Archivos multimedia (imágenes y videos)
  - cursor.png      -> Imagen del cursor
    - fondo.mp4       -> Video de fondo
      - questionX.jpg   -> Imágenes de las preguntas

  
/styles           -> Archivos CSS para el diseño

  - styles.css      -> Archivo principal de estilos

/questions        -> Página para las preguntas del juego

  - index.html      -> HTML para las preguntas

/script.js        -> Lógica del juego en JavaScript

/db.json          -> Archivo JSON con las preguntas y respuestas

/index.html       -> Página principal con el menú de niveles


🚀 Cómo Jugar

Usa las teclas WASD o las flechas del teclado para navegar por el menú de niveles.

Selecciona un nivel desbloqueado para comenzar. Si intentas acceder a un nivel bloqueado, se te pedirá completar los anteriores.

Responde correctamente a las preguntas presentadas en cada nivel. Cada pregunta ofrece tres opciones de respuesta.

Avanza niveles y sigue aprendiendo mientras completas el juego.

📂 Instalación

Si deseas descargar el proyecto y ejecutarlo localmente, sigue estos pasos:

Clona el repositorio:

1-
Copiar código

git clone https://github.com/juego-auto/juego-vial.git

Navega al directorio del proyecto:

cd juego-vial

Abre el archivo index.html en tu navegador preferido.

👥 Equipo de Desarrollo

Este proyecto fue creado por:

Nico

Abi

Brisa

Leila

📝 Licencia

Este proyecto está licenciado bajo los términos de la Licencia MIT.
