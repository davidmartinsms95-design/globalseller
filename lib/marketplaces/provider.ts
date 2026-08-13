export interface MarketplaceProduct {
  id: string
  title: string
  price: number
  stock: number
  status?: string
  image?: string
  permalink?: string
}

export interface MarketplaceOrder {
  id: string
  status: string
  total: number
  createdAt?: string
  marketplaceProductId?: string | null
  buyerName?: string | null
  customerEmail?: string | null
  shippingStatus?: string | null
  quantity?: number
}

export interface MarketplaceProvider {
  getProducts(
  userId: string,
): Promise<MarketplaceProduct[]>

  getOrders(
  userId: string,
): Promise<MarketplaceOrder[]>

 getCategories(
    userId: string,
    query: string,
  ): Promise<unknown>

  publishProduct(
    userId: string,
    productId: string,
  ): Promise<unknown>

    publishResellerProduct(
    userId: string,
    resellerProductId: string,
  ): Promise<unknown>

  updatePrice(
    productId: string,
    price: number,
  ): Promise<void>

  updateStock(
    productId: string,
    quantity: number,
  ): Promise<void>

  updateStatus(
    productId: string,
    status: string,
  ): Promise<void>
}
