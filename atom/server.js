const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const app = express();
const port = 3000;

// Ruta para obtener datos del feed ATOM de terceros
app.get('/noticias-atom', async (req, res) => {
    try {
        const response = await axios.get('https://www.bbc.com/mundo/ultimas_noticias/index.xml');  // Reemplaza con la URL real del feed ATOM
        const xmlData = response.data;

        // Parseamos el XML a formato JSON
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xmlData);

        // Los datos de noticias ahora están en 'result'
        const entries = result.feed.entry;

        // Transformamos el formato para adaptarlo a tus necesidades
        const noticiasTransformadas = entries.map(entry => ({
            titulo: entry.title[0]._,
            resumen: entry.summary[0]._,
            enlace: entry.link[0].$.href
        }));

        // Renderizamos una página HTML con el contenido del feed ATOM
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Noticias ATOM</title>
            </head>
            <body>
                <h1>Noticias ATOM</h1>
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
    } catch (error) {
        console.error('Error al obtener noticias ATOM:', error);
        res.status(500).send('Error interno del servidor: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
