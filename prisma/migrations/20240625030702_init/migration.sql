-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "subtype" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "invokeFor" INTEGER,
    "devotion" TEXT,
    "devotionCount" INTEGER,
    "health" INTEGER,
    "power" INTEGER,
    "cost" INTEGER,
    "versionId" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardMeta" (
    "id" TEXT NOT NULL,
    "ttsCardId" TEXT NOT NULL,
    "faceURL" TEXT NOT NULL,
    "backURL" TEXT NOT NULL,
    "numWidth" INTEGER NOT NULL,
    "numHeight" INTEGER NOT NULL,
    "backIsHidden" BOOLEAN NOT NULL,
    "uniqueBack" BOOLEAN NOT NULL,
    "type" INTEGER NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "CardMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecksCards" (
    "deckId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "DecksCards_pkey" PRIMARY KEY ("deckId","cardId")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardMeta_cardId_key" ON "CardMeta"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "Version_name_key" ON "Version"("name");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardMeta" ADD CONSTRAINT "CardMeta_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecksCards" ADD CONSTRAINT "DecksCards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecksCards" ADD CONSTRAINT "DecksCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
