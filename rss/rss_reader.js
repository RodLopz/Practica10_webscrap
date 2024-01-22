document.addEventListener('DOMContentLoaded', function () {
    function obtenerNoticiasRSSMarca() {
        fetch('/noticias-rss-marca')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('rss-noticias-container-marca');
                data.forEach(noticia => {
                    const div = document.createElement('div');
                    div.innerHTML = `<h3>${noticia.titulo}</h3><p>${noticia.resumen}</p><a href="${noticia.enlace}" target="_blank">Leer más</a>`;
                    container.appendChild(div);
                });
            })
            .catch(error => {
                console.error('Error al obtener noticias RSS de Marca.com:', error);
            });
    }

    obtenerNoticiasRSSMarca();
});
