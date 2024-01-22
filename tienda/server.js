const express = require('express');
const app = express();
const port = 3000; app.use(express.static('.'));

// Sirve los archivos estáticos de tu proyecto 
app.get('/productos', (req, res) => {
    res.sendFile(__dirname + '/productos.json');
});




app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
}); 