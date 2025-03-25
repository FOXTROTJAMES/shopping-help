"use client";

import { useState, useEffect } from "react";
import { getRow, insertRow } from "./dbquery";

interface Item {
  id: number;
  name: string;
  isle: string;
}

export default function ShoppingList() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState<string>("");
  const unknownIsle = "Unknown Isle";

  // Load saved items from localStorage when the component mounts
  useEffect(() => {
    const savedItems = localStorage.getItem("myList");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(items));
  }, [items]);

  const getisle = async (item: string): Promise<string> => {
    try {
      const rows = await getRow(item);
      if (rows.length > 0) {
        return rows[0].isle;
      }
    } catch (e) {
      console.log(e);
    }

    return unknownIsle;
  };

  const addItem = async () => {
    if (input.trim() !== "") {
      // capatlise input
      const isleNr = await getisle(input.toUpperCase());
      const newItem = { id: Date.now(), name: input.toUpperCase(), isle: isleNr };
      const sortedItems = [...items, newItem].sort((a, b) => a.isle.localeCompare(b.isle));

      setItems(sortedItems);

      
      setInput("");
    }
  };

  const removeItem = (id: number) => {
    // if isle is unkonw ask if they now the isle
    if (items.find((item) => item.id === id)?.isle === unknownIsle) {
      const isle = prompt("What is the isle?");
      if (isle) {
        insertRow(items.find((item) => item.id === id)!.name, isle);
      }
    }

    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <input
          className="border-2 m-2"
          type="text"
          placeholder="Enter an item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={addItem}
          className="bg-black text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-green-500"
        >
          Add
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {items.map((item) => (
          <li
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
            key={item.id}
            onClick={() => removeItem(item.id)}
          >
            <p className="text-gray-600 text-center uppercase font-bold">
              {item.name}
            </p>
            <p className="text-gray-400 text-center">{item.isle}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
