//requiriendo dependencias 
const cors = require('cors')
const express = require('express');
var bodyParser = require('body-parser');
const http = require('http')
const config = require('./Config/config')
//instancia de express
const app = express()
const server = http.createServer(app)

// Cargar ficheros rutas
var noteRoutes = require('./Routes/noteRoutes');

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


app.use(cors())

// Añadir perfijos a rutas / cargar rutas
app.use('/api/',noteRoutes);

//iniciando el server 
const PORT = config.PORT


//corriendo el servidor de socket io
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


