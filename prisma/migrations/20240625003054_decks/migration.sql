-- CreateTable
CREATE TABLE "DecksCards" (
    "deckId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    PRIMARY KEY ("deckId", "cardId"),
    CONSTRAINT "DecksCards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DecksCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
