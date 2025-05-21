"use client";

interface ItemListProps {
  $1syncMessage?: string;
  type?: 'cart' | 'wishlist';
}

export default function ItemList({ items, onRemove, onRestore, syncMessage, type = 'cart' }: ItemListProps) {
  return (
    <div>
      {syncMessage && (
        <div id="toast" className={`fixed bottom-6 left-6 px-4 py-2 rounded shadow-md text-xs z-50 animate-fade-in-out transition-opacity duration-1000 ease-in-out flex items-center gap-2 ${type === 'wishlist' ? 'bg-purple-100 border border-purple-400 text-purple-700' : 'bg-green-100 border border-green-400 text-green-700'}`} role="alert">
          <span>$1</span>
          <button
            onClick={() => document.getElementById('toast')?.remove()}
            className="text-green-800 text-lg leading-none hover:text-red-600"
          >
            ×
          </button>
        </div>
      )}
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="border rounded p-2 flex justify-between items-center">
            <span>{item}</span>
            <button
              onClick={() => onRemove(index)}
              className="text-xs text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-muted-foreground">
            No items. <button onClick={onRestore} className="text-blue-600 hover:underline ml-1">Restore</button>
          </li>
        )}
      </ul>
    </div>
  );
}