-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "maxProducts" INTEGER NOT NULL DEFAULT 5,
    "plan" TEXT NOT NULL DEFAULT 'free',
    "role" TEXT NOT NULL DEFAULT 'reseller',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketplaceProduct" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "costPrice" DOUBLE PRECISION NOT NULL,
    "suggestedPrice" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "supplierId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brand" TEXT DEFAULT 'Sem Marca',
    "categoryId" TEXT,
    "categoryName" TEXT,
    "ean" TEXT,
    "listingType" TEXT DEFAULT 'gold_special',
    "sku" TEXT,

    CONSTRAINT "MarketplaceProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketplaceImportHistory" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "imported" INTEGER NOT NULL,
    "duplicates" INTEGER NOT NULL,
    "errors" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketplaceImportHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResellerProduct" (
    "id" TEXT NOT NULL,
    "resellerId" TEXT NOT NULL,
    "marketplaceProductId" TEXT NOT NULL,
    "customPrice" DOUBLE PRECISION,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResellerProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Mercado Livre',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "marketplace" TEXT NOT NULL DEFAULT 'mercadolivre',
    "marketplaceId" TEXT,
    "permalink" TEXT,
    "status" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "mlCategoryId" TEXT,
    "resellerProductId" TEXT,
    "brand" TEXT,
    "costPrice" DOUBLE PRECISION,
    "ean" TEXT,
    "height" DOUBLE PRECISION,
    "length" DOUBLE PRECISION,
    "model" TEXT,
    "shortDescription" TEXT,
    "sku" TEXT,
    "weight" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentId" TEXT,
    "externalReference" TEXT,
    "customerEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buyerName" TEXT,
    "externalOrderId" TEXT,
    "marketplace" TEXT NOT NULL DEFAULT 'mercadolivre',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "shippingStatus" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Integration" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "externalUserId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accessTokenExpiresAt" TIMESTAMP(3),

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "paymentDate" TIMESTAMP(3),
    "paymentMethod" TEXT,
    "recurrence" TEXT,
    "reference" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "FinanceTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemLog" (
    "id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- CreateIndex
CREATE INDEX "MarketplaceProduct_supplierId_idx" ON "MarketplaceProduct"("supplierId");

-- CreateIndex
CREATE INDEX "MarketplaceProduct_supplierId_sku_idx" ON "MarketplaceProduct"("supplierId", "sku");

-- CreateIndex
CREATE INDEX "MarketplaceImportHistory_supplierId_idx" ON "MarketplaceImportHistory"("supplierId");

-- CreateIndex
CREATE INDEX "MarketplaceImportHistory_createdAt_idx" ON "MarketplaceImportHistory"("createdAt");

-- CreateIndex
CREATE INDEX "ResellerProduct_resellerId_idx" ON "ResellerProduct"("resellerId");

-- CreateIndex
CREATE INDEX "ResellerProduct_marketplaceProductId_idx" ON "ResellerProduct"("marketplaceProductId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_marketplaceId_key" ON "Product"("marketplaceId");

-- CreateIndex
CREATE INDEX "Product_userId_idx" ON "Product"("userId");

-- CreateIndex
CREATE INDEX "Product_status_idx" ON "Product"("status");

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "Product"("createdAt");

-- CreateIndex
CREATE INDEX "Order_sellerId_idx" ON "Order"("sellerId");

-- CreateIndex
CREATE INDEX "Order_productId_idx" ON "Order"("productId");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Order_externalOrderId_marketplace_key" ON "Order"("externalOrderId", "marketplace");

-- CreateIndex
CREATE INDEX "Integration_userId_idx" ON "Integration"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Integration_provider_userId_key" ON "Integration"("provider", "userId");

-- CreateIndex
CREATE INDEX "FinanceTransaction_userId_idx" ON "FinanceTransaction"("userId");

-- CreateIndex
CREATE INDEX "FinanceTransaction_type_idx" ON "FinanceTransaction"("type");

-- CreateIndex
CREATE INDEX "FinanceTransaction_status_idx" ON "FinanceTransaction"("status");

-- CreateIndex
CREATE INDEX "FinanceTransaction_createdAt_idx" ON "FinanceTransaction"("createdAt");

-- CreateIndex
CREATE INDEX "FinanceTransaction_dueDate_idx" ON "FinanceTransaction"("dueDate");

-- CreateIndex
CREATE INDEX "SystemLog_service_idx" ON "SystemLog"("service");

-- CreateIndex
CREATE INDEX "SystemLog_status_idx" ON "SystemLog"("status");

-- CreateIndex
CREATE INDEX "SystemLog_createdAt_idx" ON "SystemLog"("createdAt");

-- AddForeignKey
ALTER TABLE "MarketplaceProduct" ADD CONSTRAINT "MarketplaceProduct_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketplaceImportHistory" ADD CONSTRAINT "MarketplaceImportHistory_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResellerProduct" ADD CONSTRAINT "ResellerProduct_marketplaceProductId_fkey" FOREIGN KEY ("marketplaceProductId") REFERENCES "MarketplaceProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResellerProduct" ADD CONSTRAINT "ResellerProduct_resellerId_fkey" FOREIGN KEY ("resellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_resellerProductId_fkey" FOREIGN KEY ("resellerProductId") REFERENCES "ResellerProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceTransaction" ADD CONSTRAINT "FinanceTransaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceTransaction" ADD CONSTRAINT "FinanceTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

