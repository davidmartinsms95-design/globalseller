export class MarketplaceError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message)

    this.name = 'MarketplaceError'
  }
}

export function ensureResponseOk(
  ok: boolean,
  status: number,
  message: string,
): void {
  if (!ok) {
    throw new MarketplaceError(
      message,
      status,
    )
  }
}