-- CreateTable
CREATE TABLE "SubscriptionPayment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentId" TEXT,
    "externalReference" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currencyId" TEXT NOT NULL DEFAULT 'BRL',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentMethod" TEXT,
    "statusDetail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "SubscriptionPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPayment_paymentId_key" ON "SubscriptionPayment"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPayment_externalReference_key" ON "SubscriptionPayment"("externalReference");

-- CreateIndex
CREATE INDEX "SubscriptionPayment_userId_idx" ON "SubscriptionPayment"("userId");

-- CreateIndex
CREATE INDEX "SubscriptionPayment_status_idx" ON "SubscriptionPayment"("status");

-- CreateIndex
CREATE INDEX "SubscriptionPayment_createdAt_idx" ON "SubscriptionPayment"("createdAt");

-- AddForeignKey
ALTER TABLE "SubscriptionPayment" ADD CONSTRAINT "SubscriptionPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
