const socket = io.connect();

const render=(data)=>{
    console.log(data);
    const html = data.messages.map((elem,index)=>{
        return(
            `<div>
                <strong class="text-primary">${elem.author}</strong>:
                <span class="text-danger">[${elem.date}]<span>
                <em class="text-success">${elem.text}</em>
            </div>`)
    }).join(" ")

    document.getElementById("messages").innerHTML=html

    const ps = data.products.map((p)=>{
        return(`<tr>    
                    <td>${p.id}</td>
                    <td>${p.title}</td>
                    <td>${p.price}</td>
                    <td><img src="${p.thumbnail}" height="30px"></td>
                </tr>`)
    }).join(" ")

    document.getElementById("tbdy").innerHTML=ps
}


const addMessage=(e)=>{
    
    const fecha = new Date().toLocaleDateString()+ ' ' +new Date().toTimeString()
    const fyh = fecha.split(' ');
    let mensaje = {
        author:document.getElementById('username').value,
        text:document.getElementById('texto').value,
        date:fyh[0]+' '+fyh[1]
    }

    console.log("hola")
    socket.emit('new-message',mensaje);
    limpiarInput()
    return false;
}
const limpiar=()=>{
    document.getElementById("title").value=' ';
    document.getElementById("price").value=' ';
    document.getElementById("thumbnail").value=' ';
}
const limpiarInput=()=>{
    document.getElementById("texto").value=' ';
}
const addProduct=(e)=>{
    let title =document.getElementById("title").value;
    let price=document.getElementById("price").value;
    let thumbnail=document.getElementById("thumbnail").value;
    const product ={
        title:title,
        price:price,
        thumbnail:thumbnail
    }
    limpiar()
    socket.emit('new-product',product);
    return false;
}
socket.on('messages',(data)=>{render(data)})