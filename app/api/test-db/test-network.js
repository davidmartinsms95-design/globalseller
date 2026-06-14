const net = require('net')

const socket = net.createConnection(
  {
    host: 'ep-cool-salad-aqwx98v6.c-8.us-east-1.aws.neon.tech',
    port: 5432,
  },
  () => {
    console.log('CONECTOU')
    socket.end()
  }
)

socket.on('error', (err) => {
  console.error('ERRO:', err)
})