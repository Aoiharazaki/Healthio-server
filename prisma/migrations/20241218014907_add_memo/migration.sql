-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "detail" TEXT DEFAULT '',
    "memo" TEXT DEFAULT '',
    "isCompleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Todo" ("detail", "id", "isCompleted", "memo", "title") SELECT "detail", "id", "isCompleted", "memo", "title" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
