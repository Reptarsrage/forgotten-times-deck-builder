/*
  Warnings:

  - Added the required column `quantity` to the `DecksCards` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DecksCards" (
    "deckId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("deckId", "cardId"),
    CONSTRAINT "DecksCards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DecksCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DecksCards" ("cardId", "deckId") SELECT "cardId", "deckId" FROM "DecksCards";
DROP TABLE "DecksCards";
ALTER TABLE "new_DecksCards" RENAME TO "DecksCards";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
