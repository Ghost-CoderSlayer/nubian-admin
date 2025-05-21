import { useEffect, useState } from "react";
import ItemList from "./itemList"

export default function CartList() {
    const [items, setItems] = useState<string[]>([]);
    const [syncMessage, setSyncMessage] = useState("");

    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "wishlistItems" && e.newValue) {
                setItems(JSON.parse(e.newValue));
                setSyncMessage("Wishlist synced from another tab");
                setTimeout(() => setSyncMessage(""), 1500);
            }
        };
        window.addEventListener("storage", handleStorage)

        const stored = localStorage.getItem("wishlistItems");
            if (stored) setItems(JSON.parse(stored));
            else {
                const timer = setTimeout(() => {
                    const initial = ["Baddy Sudan Jeans - 50,000SP", "Hoodie - 70,000SP"];
                    setItems(initial)
                    localStorage.setItem("wishlistItems", JSON.stringify(initial));
                }, 500);
                return () => {
                    clearTimeout(timer);
                    window.removeEventListener("storage", handleStorage)
                }
            }
    }, []);

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
        localStorage.setItem("wishlistItems", JSON.stringify(updated));
    };

    const restoreItems = () => {
        const original = ["Baddy Sudan Jeans - 50,000SP", "Hoodie - 70,000SP"];
        setItems(original);
        localStorage.setItem("wishlistItems", JSON.stringify(original));
    }

    return <ItemList items={items} onRemove={removeItem} onRestore={restoreItems} syncMessage={syncMessage} type="wishlist" />
}