document.addEventListener('DOMContentLoaded', function () {
    // Función para obtener y mostrar noticias RSS de Marca.com
    function obtenerNoticiasRSSMarca() {
        fetch('/noticias-rss-marca') // Reemplaza con la ruta real de tus noticias RSS de Marca.com
            .then(response => response.json())
            .then(data => {
                const containerNoticias = document.getElementById('rss-noticias-container-marca');
                data.forEach(noticia => {
                    const div = document.createElement('div');
                    div.innerHTML = `<h3>${noticia.titulo}</h3><p>${noticia.resumen}</p><a href="${noticia.enlace}" target="_blank">Leer más</a>`;
                    containerNoticias.appendChild(div);
                });
            })
            .catch(error => {
                console.error('Error al obtener noticias RSS de Marca.com:', error);
            });
    }

    // Llamamos a la función para obtener y mostrar noticias RSS de Marca.com
    obtenerNoticiasRSSMarca();
});
