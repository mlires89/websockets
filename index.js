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


const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
  })

server.on('error', (error) => console.error(`Error en Servidor ${error}`))

server.on('error',(err)=>{
  console.log(err)
  })

io.on('connection',async (socket)=>{
  console.log('se conecto un cliente')
  const productos = await contenedor.getData()
  socket.emit('messages',{messages,products:productos})

  socket.on('new-message',(data)=>{
      messages=[...messages,data]
      console.log(messages)
      let todo ={messages:messages,products:productos}
      io.sockets.emit('messages',todo)
  })
  socket.on('new-product',async (data)=>{
    await contenedor.save(data)
    const productos = await contenedor.getData()    
    let todo ={messages:messages,products:productos}
    io.sockets.emit('messages',todo)
  })
  
})