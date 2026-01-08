import type { Dessert, CartItem } from './types.js';

export class Cart {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getItemCount(): number {
    return this.items.length;
  }

  findItem(dessertId: string): CartItem | undefined {
    return this.items.find(item => item.dessert.id === dessertId);
  }

  addItem(dessert: Dessert): void {
    const existingItem = this.findItem(dessert.id);
    if (existingItem) {
      // If item exists, increase quantity
      this.increaseQuantity(dessert.id);
    } else {
      // Add new item
      const newItem: CartItem = {
        dessert,
        quantity: 1,
        addedAt: new Date()
      };
      this.items.push(newItem);
    }
  }

  increaseQuantity(dessertId: string): void {
    this.items = this.items.map(item => {
      if (dessertId === item.dessert.id) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
  }

  decreaseQuantity(dessertId: string): void {
    this.items = this.items.map(item => {
      if (dessertId === item.dessert.id) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    }).filter(item => item.quantity > 0);
  }

  removeItem(dessertId: string): void {
    this.items = this.items.filter(item => item.dessert.id !== dessertId);
  }

  calculateTotal(): string {
    return this.items.reduce((total, item) => total + (item.quantity * item.dessert.price), 0).toFixed(2);
  }

  clear(): void {
    this.items = [];
  }
}
