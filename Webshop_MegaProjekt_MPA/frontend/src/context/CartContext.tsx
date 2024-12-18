import React, { createContext, useContext, useState } from "react";

export interface Product {
    id: number,
    name: string,
    imageUrl: string,
    material: string,
    description: string,
    price: number, 
}


interface CartContextType {
productItmes: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [productItmes, setCartItems] = useState<Product[]>([]);
  const addToCart = (item: Product) => {
    productItmes.push(item);
  };
  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index !== -1) {
        const updatedCart = [...prev];
        updatedCart.splice(index, 1); 
        return updatedCart;
      }
      return prev;})
  };
  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider value={{ productItmes, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}