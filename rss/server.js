const express = require('express');
const axios = require('axios');
const parseString = require('xml2js').parseString;
const app = express();
const port = 3000;

// Ruta para obtener datos del feed RSS de Marca.com
app.get('/noticias-rss-marca', async (req, res) => {
    try {
        const response = await axios.get('https://e00-marca.uecdn.es/rss/portada.xml');  // RSS de Marca.com
        const xmlData = response.data;

        // Parseamos el XML a formato JSON
        parseString(xmlData, (err, result) => {
            if (err) {
                throw err;
            }

            // Los datos de noticias ahora están en 'result'
            const noticias = result.rss.channel[0].item;

            // Transformamos el formato para adaptarlo a tus necesidades
            const noticiasTransformadas = noticias.map(noticia => ({
                titulo: noticia.title[0],
                resumen: noticia.description[0],
                enlace: noticia.link[0]
            }));

            // Renderizamos una página HTML con el contenido del feed RSS
            const htmlContent = `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <title>Noticias RSS de Marca.com</title>
                </head>
                <body>
                    <h1>Noticias RSS de Marca.com</h1>
                    ${noticiasTransformadas.map(noticia => `
                        <div>
                            <h3>${noticia.titulo}</h3>
                            <p>${noticia.resumen}</p>
                            <a href="${noticia.enlace}" target="_blank">Leer más</a>
                        </div>
                    `).join('')}
                </body>
                </html>
            `;

            // Respondemos con la página HTML generada
            res.send(htmlContent);
        });
    } catch (error) {
        console.error('Error al obtener noticias RSS de Marca.com:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
