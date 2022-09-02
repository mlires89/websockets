const app = require('./app.js')
const PORT =  process.env.PORT || 8080;
const {Server:HttpServer} = require('http')
const {Server:IOServer} = require('socket.io')
const httpServer = new HttpServer(app)


const Contenedor = require('./src/contenedor')
//Creo una instancia de la clase para poder invocar sus metodos posteriormente
const contenedor = new Contenedor.Contenedor('./src/productos.txt')
const io = new IOServer(httpServer)

let messages = []

const prodTest = [
    {  
      title:"Escuadra",
      price:123.45,
      thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      id:1
    },
    {
      title:"Calculadora",
      price:234.56,
      thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
      id:2
    },
    {
      title:"Globo Terráqueo",
      price:345.67,
      thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
      id:4
    }
  ]

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
  })

server.on('error', (error) => console.error(`Error en Servidor ${error}`))

server.on('error',(err)=>{
  console.log(err)
  })

io.on('connection',(socket)=>{
  console.log('se conecto un cliente')
  socket.emit('messages',{messages,products:prodTest})

  socket.on('new-message',(data)=>{
      messages=[...messages,data]
      console.log(messages)
      let todo ={messages:messages,products:prodTest}
      io.sockets.emit('messages',todo)
  })
  socket.on('new-product', (data)=>{
    console.log(data)
    contenedor.save(data)
    let todo ={messages:messages,products:prodTest}
    io.sockets.emit('messages',todo)
  })
  
})