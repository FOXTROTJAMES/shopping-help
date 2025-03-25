import { sql } from "drizzle-orm";
import { text,integer, sqliteTable } from "drizzle-orm/sqlite-core";

//id
//item
//quantity
//isle

export const Table = sqliteTable("table", {
  id: text("id").primaryKey(),
  item: text("item").notNull(),
  isle: text("isle").notNull(),
});
