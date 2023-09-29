const http = require('http')
const fs = require('fs')

const mime = {
  'html': 'text/html',
  'css': 'text/css',
  'jpg': 'image/jpg',
  'ico': 'image/x-icon',
  'mp3': 'audio/mpeg3',
  'mp4': 'video/mp4'
}

const servidor = http.createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:8888' + pedido.url)
  let camino = 'public' + url.pathname
  if (camino == 'public/')
    camino = 'public/index.html'
  encaminar(pedido, respuesta, camino)
})

servidor.listen(8888)


function encaminar(pedido, respuesta, camino) {
  console.log(camino)
  switch (camino) {
    case 'public/recuperardatos': {
      recuperar(pedido, respuesta)
      break
    }
    default: {
      fs.stat(camino, error => {
        if (!error) {
          fs.readFile(camino, (error, contenido) => {
            if (error) {
              respuesta.writeHead(500, { 'Content-Type': 'text/plain' })
              respuesta.write('Error interno')
              respuesta.end()
            } else {
              const vec = camino.split('.')
              const extension = vec[vec.length - 1]
              const mimearchivo = mime[extension]
              respuesta.writeHead(200, { 'Content-Type': mimearchivo })
              respuesta.write(contenido)
              respuesta.end()
            }
          })
        } else {
          respuesta.writeHead(404, { 'Content-Type': 'text/html' })
          respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>')
          respuesta.end()
        }
      })
    }
  }
}


function recuperar(pedido, respuesta) {
  let info = ''
  pedido.on('data', datosparciales => {
    info += datosparciales
  })
  pedido.on('end', () => {
    const formulario = new URLSearchParams(info)
    console.log(formulario)
    respuesta.writeHead(200, { 'Content-Type': 'text/html' })
    let a =formulario.get('nombre');

    let verificador="",
    primeravez=0,
    cartel="",
    letras =['a', 'e', 'i','o', 'u','A', 'E', 'I','O', 'U', ' ' ];

    verificador=verificador.toString();

    a=a.toString().split("");
    

    for (var i = 0 ; i < a.length; i++) {

    if(letras.includes(a[i]) ==true){
    if(a[i]=="a"){
    a[i]= a[i] +"pa";
    }
    if(a[i]=="e"){
    a[i]= a[i] +"pe";
    }
    if(a[i]=="i"){
    a[i]= a[i] +"pi";
    }
    if(a[i]=="o"){
    a[i]= a[i] +"po";
    }
    if(a[i]=="u"){
    a[i]= a[i] +"pu";
    }
    if(a[i]=="A"){
    a[i]= a[i] +"pa";
    }
    if(a[i]=="E"){
    a[i]= a[i] +"pe";
    }
    if(a[i]=="I"){
    a[i]= a[i] +"pi";
    }
    if(a[i]=="O"){
    a[i]= a[i] +"po";
    }
    if(a[i]=="U"){
    a[i]= a[i] +"pu";
    }
    }
    cartel=cartel +a[i];
    console.log(cartel);
}

    const pagina =
    `<!doctype html><html><head></head><body>
     Nombre de usuario:${cartel}<br>
     <a href="index.html">Retornar</a>
     </body></html>`
    respuesta.end(pagina)
  })
}

console.log('Servidor web iniciado')