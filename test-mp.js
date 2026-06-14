const { MercadoPagoConfig, Payment } = require('mercadopago')

const client = new MercadoPagoConfig({
accessToken: 'TEST-7497664436144745-052021-9503bb725ba2dff4e71f952b92c0ead9-539310035',
})

async function test() {
try {
const payment = new Payment(client)

```
const result = await payment.create({
  body: {
    transaction_amount: 10,
    description: 'Teste PIX',
    payment_method_id: 'pix',
    payer: {
      email: 'teste@teste.com',
    },
  },
})

console.log('SUCESSO:')
console.dir(result, { depth: null })
```

} catch (error) {
console.log('ERRO COMPLETO:')
console.dir(error, { depth: null })
}
}

test()
