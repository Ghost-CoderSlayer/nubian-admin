"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { Menu, ShoppingCart, User, Heart } from "lucide-react";
import CartList from "@/app/(screens)/shop/components/mockcart";
import WishlistList from "@/app/(screens)/shop/components/wishlist";
import categoryTree from "@/app/data/categories";

function NavMenu() {
  const router = useRouter();

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm relative">
      <button 
        onClick={() => router.push('/')}
        className="hover:text-yellow-600 transition-colors duration-200 cursor-pointer"
      >
        Home
      </button>
      <div className="group relative">
        <button
          onClick={() => router.push('/shop')}
          className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200 cursor-pointer"
        >
          Shop
        </button>
        <div className="absolute left-0 top-full mt-2 hidden group-hover:flex group-focus-within:flex gap-6 bg-white border rounded shadow-md p-4 z-50 transition ease-in-out duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
          {categoryTree.map((cat) => (
            <div key={cat.title} className="min-w-[120px]">
              <h4 className="font-semibold mb-1 text-sm">{cat.title}</h4>
              <ul className="space-y-1">
                {cat.children.map((child) => (
                  <li 
                    key={child} 
                    className="text-xs hover:underline cursor-pointer"
                    onClick={() => router.push(`/shop?category=${encodeURIComponent(child)}`)}
                  >
                    <span className="block px-1 py-0.5 hover:text-yellow-600">
                      {child}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => router.push('/sale')}
        className="hover:text-yellow-600 transition-colors duration-200 cursor-pointer"
      >
        On Sale
      </button>
      <button
        onClick={() => router.push('/brands')}
        className="hover:text-yellow-600 transition-colors duration-200 cursor-pointer"
      >
        Brands
      </button>
      <button
        onClick={() => router.push('/locals')}
        className="hover:text-yellow-600 transition-colors duration-200 cursor-pointer"
      >
        Locals
      </button>
    </nav>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const [showClear, setShowClear] = useState(false);


  const handleSearch = (val: string) => {
    setShowClear(true);
    if (!val.trim()) return;
    const history = JSON.parse(
      typeof window !== 'undefined'
        ? localStorage.getItem("recentSearches") || "[]"
        : "[]"
    );
    const updated = [val, ...history.filter((item: string) => item !== val)].slice(0, 5);
    if (typeof window !== 'undefined') {
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      setRecentSearches(updated);
    }
  };

  const clearSearchHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("recentSearches");
      setRecentSearches([]);
      setShowClear(false);
    }
  };

  return (
    <>
      <header className="w-full border-b px-6 md:px-20 py-4 flex items-center justify-between bg-background">
        <div className="flex items-center gap-12">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image src="/logoicon.png" alt="Logo" width={32} height={32} />
            <h1 className="text-xl font-bold text-yellow-500">NUBIAN</h1>
          </button>
          <NavMenu />
        </div>

        <div className="flex-1 flex justify-center relative">
          <div className="hidden md:block w-full max-w-md">
            <Command>
              <CommandInput
                placeholder="Search for products..."
                onFocus={() => setShowRecent(true)}
                onBlur={() => setTimeout(() => setShowRecent(false), 150)}
                onValueChange={handleSearch}
              />
              <CommandList />
            </Command>

            {showRecent && recentSearches.length > 0 && (
              <div className="absolute top-full mt-2 w-full max-w-md bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in transition-all">
                <div className="p-2 text-sm text-muted-foreground flex justify-between items-center">
                  Recent Searches
                  {showClear && (
                    <button
                      onClick={clearSearchHistory}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-100" onClick={() => setShowRecent(false)}>
                  {recentSearches.map((item, index) => (
                    <div key={index} className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <span className="text-sm font-semibold">Search</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <div className="p-4 relative">
                <Command>
                  <CommandInput
                    placeholder="Search for products..."
                    onFocus={() => setShowRecent(true)}
                    onBlur={() => setTimeout(() => setShowRecent(false), 150)}
                    onValueChange={handleSearch}
                  />
                  <CommandList />
                </Command>

                {showRecent && recentSearches.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in transition-all">
                    <div className="p-2 text-sm text-muted-foreground flex justify-between items-center">
                      Recent Searches
                      {showClear && (
                        <button
                          onClick={clearSearchHistory}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="divide-y divide-gray-100" onClick={() => setShowRecent(false)}>
                      {recentSearches.map((item, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-yellow-500 hover:text-yellow-600">
                <ShoppingCart className="w-5 h-5 text-yellow-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4 text-sm">
                <h2 className="text-lg font-semibold mb-2">Shopping Cart</h2>
                <CartList />
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-yellow-500 hover:text-yellow-600">
                <Heart className="w-5 h-5 text-yellow-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4 text-sm">
                <h2 className="text-lg font-semibold mb-2">Wishlist</h2>
                <WishlistList />
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5 text-yellow-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4 text-sm">
                <h2 className="text-lg font-semibold mb-2">Your Account</h2>
                <p>Not signed in.</p>
                <Button variant="outline" className="mt-2">Sign In</Button>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5 text-yellow-500" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-6">
                <button 
                  onClick={() => {
                    router.push('/shop');
                    setOpen(false);
                  }}
                  className="text-left hover:text-primary transition-colors"
                >
                  Shop
                </button>
                <button 
                  onClick={() => {
                    router.push('/sale');
                    setOpen(false);
                  }}
                  className="text-left hover:text-primary transition-colors"
                >
                  On Sale
                </button>
                <button 
                  onClick={() => {
                    router.push('/new-arrivals');
                    setOpen(false);
                  }}
                  className="text-left hover:text-primary transition-colors"
                >
                  New Arrivals
                </button>
                <button 
                  onClick={() => {
                    router.push('/brands');
                    setOpen(false);
                  }}
                  className="text-left hover:text-primary transition-colors"
                >
                  Brands
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>{children}</main>
    </>
  );
}