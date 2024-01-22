document.addEventListener('DOMContentLoaded', function () {
    // Función para obtener y mostrar noticias ATOM de terceros
    function obtenerNoticiasATOM() {
        fetch('/noticias-atom') // Reemplaza con la ruta real de tus noticias ATOM
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('atom-noticias-container');
                data.forEach(noticia => {
                    const div = document.createElement('div');
                    div.innerHTML = `<h3>${noticia.title}</h3><p>${noticia.content}</p><a href="${noticia.link}" target="_blank">Leer más</a>`;
                    container.appendChild(div);
                });
            })
            .catch(error => {
                console.error('Error al obtener noticias ATOM:', error);
            });
    }

    // Llamamos a la función para obtener y mostrar noticias ATOM
    obtenerNoticiasATOM();
});
