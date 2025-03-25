import { db } from ".";
import { Table } from "./schema";
import { eq } from "drizzle-orm";

export async function getRow(item: string) {
    const result = await db.select().from(Table).where(eq(Table.item, item)).execute();
    return result; // Ensure that `rows` is correctly typed
}

export async function insertRow(item: string, isle: string) {
    await db.insert(Table).values({ id: crypto.randomUUID(), item, isle }).execute();
}

