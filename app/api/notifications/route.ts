import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      type: 'success',
      title: 'Produto publicado',
      message: 'Seu anúncio foi publicado no Mercado Livre.',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Estoque baixo',
      message: 'Um produto possui menos de 5 unidades.',
    },
    {
      id: 3,
      type: 'info',
      title: 'Pedido recebido',
      message: 'Você recebeu um novo pedido.',
    },
  ])
}