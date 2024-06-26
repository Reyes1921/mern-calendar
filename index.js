require("dotenv").config()
const express = require("express")
const {dbConnection} = require("./database/config")
const cors = require("cors")
const app = express()

//Base de datos
dbConnection()

//CORS
app.use(cors())

//Directorio Publico
app.use(express.static("./src/public"))

//Lectura y parseo del body
app.use(express.json())

//Rutas
app.use("/api/auth", require("./src/routes/auth"))
app.use("/api/events", require("./src/routes/events"))

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/src/public/index.html")
})

//Escuchar Peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})
