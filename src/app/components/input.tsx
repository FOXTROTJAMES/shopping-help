'use client'

import { useState, useEffect } from "react";

interface Item {
    id: number;
    name: string;
}

export default function ShoppingList() {
    const [items, setItems] = useState<Item[]>([]);
    const [input, setInput] = useState<string>("");

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
            <p className="text-center">A tool for managing your shopping and keeping things in budget</p>
            <div className="flex items-center justify-center">
                <input className="border-2 m-2"
                    type="text"
                    placeholder="Enter an item"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={addItem} className="bg-black text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-green-500">Add</button>
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-black text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-green-500"
                    onClick={sendToDatabase}>Sort your items
                </button>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {items.map((item, index) => (
                    <li className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
                        key={item.id}
                        onClick={() => removeItem(item.id)}>
                        <p className="text-gray-600 text-center uppercase font-bold">
                            {item.name}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
