-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    CONSTRAINT "Card_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CardMeta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ttsCardId" TEXT NOT NULL,
    "faceURL" TEXT NOT NULL,
    "backURL" TEXT NOT NULL,
    "numWidth" INTEGER NOT NULL,
    "numHeight" INTEGER NOT NULL,
    "backIsHidden" BOOLEAN NOT NULL,
    "uniqueBack" BOOLEAN NOT NULL,
    "type" INTEGER NOT NULL,
    "cardId" TEXT NOT NULL,
    CONSTRAINT "CardMeta_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "CardMeta_cardId_key" ON "CardMeta"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "Version_name_key" ON "Version"("name");
