"use client";

import { useEffect, useState } from "react";
import ItemList from "./itemList";

export default function CartList() {
  const [items, setItems] = useState<string[]>([]);
  const [syncMessage, setSyncMessage] = useState("");

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "cartItems" && e.newValue) {
        setItems(JSON.parse(e.newValue));
        setSyncMessage("Cart synced from another tab");
        setTimeout(() => setSyncMessage(""), 1500);
      }
    };
    window.addEventListener("storage", handleStorage);

    const stored = localStorage.getItem("cartItems");
    if (stored) setItems(JSON.parse(stored));
    else {
      const timer = setTimeout(() => {
        const initial = ["T-Shirt - $20", "Jeans - $45"];
        setItems(initial);
        localStorage.setItem("cartItems", JSON.stringify(initial));
      }, 500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("storage", handleStorage);
      };
    }
  }, []);

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const restoreItems = () => {
    const original = ["T-Shirt - $20", "Jeans - $45"];
    setItems(original);
    localStorage.setItem("cartItems", JSON.stringify(original));
  };

  return <ItemList items={items} onRemove={removeItem} onRestore={restoreItems} syncMessage={syncMessage} type="cart" />;
}