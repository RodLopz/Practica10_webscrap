document.addEventListener('DOMContentLoaded', function () {
    fetch('/productos')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('productos');

            data.forEach(prod => {
                const div = document.createElement('div');
                div.className = 'producto';
                div.innerHTML = `<h2>${prod.titulo}</h2>
                                 <img src="${prod.imagen}" alt="${prod.titulo}">
                                 <p>${prod.precio}</p>`;

                container.appendChild(div);
            });
        });
});
