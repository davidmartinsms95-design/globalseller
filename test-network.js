const net = require('net')

const socket = net.createConnection(
  {
    host: '52.1.58.3',
    port: 5432,
  },
  () => {
    console.log('CONECTOU NO IPV4')
    socket.end()
  }
)

socket.setTimeout(10000)

socket.on('timeout', () => {
  console.log('TIMEOUT')
  socket.destroy()
})

socket.on('error', (err) => {
  console.error('ERRO:', err.message)
})