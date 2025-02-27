'use client'

import { useState } from "react";

interface Item {
    id: number;
    name: string;
  }

export default function ShoppingList() {
    const [items, setItems] = useState<Item[]>([]);
    const [input, setInput] = useState<string>("");

    const addItem = () => {
        if (input.trim() !== '') {
            setItems([...items, { id: Date.now(), name: input }]);
            setInput('');
        }
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const sendToDatabase = async () => {
        try {
            const response = await fetch('/api/saveList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items })
            });
            if (response.ok) {
                alert('List sent successfully!');
            } else {
                alert('Failed to send list');
            }
        } catch (error) {
            console.error('Error sending list:', error);
            alert('Error sending list');
        }
    };

    return (
        <div>
            <p>text go here</p>
            <input
                type="text"
                placeholder="Enter an item"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addItem}>Add</button>
            <p> </p>
            <button onClick={sendToDatabase}>Send to Database</button>
            <ul>
                {items.map(item => (
                    <li key={item.id} onClick={() => removeItem(item.id)}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
