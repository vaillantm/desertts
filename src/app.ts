import { loadProducts } from './data.js';
import { Cart } from './cart.js';
import { OrderManager } from './order.js';
import { Renderer } from './renderer.js';
import type { Dessert } from './types.js';

class App {
  private products: Dessert[] = [];
  private cart: Cart;
  private orderManager: OrderManager;
  private renderer: Renderer;

  constructor() {
    this.cart = new Cart();
    this.orderManager = new OrderManager();
    this.renderer = new Renderer();
  }

  async initialize(): Promise<void> {
    this.products = await loadProducts();
    this.render();
    this.attachGlobalEventListeners();
  }

  private attachGlobalEventListeners(): void {
    const newOrderBtn = document.getElementById('new-order-btn');
    newOrderBtn?.addEventListener('click', () => this.handleNewOrder());
  }

  private handleAddToCart(dessert: Dessert): void {
    this.cart.addItem(dessert);
    this.render();
  }

  private handleIncreaseQuantity(dessertId: string): void {
    this.cart.increaseQuantity(dessertId);
    this.render();
  }

  private handleDecreaseQuantity(dessertId: string): void {
    this.cart.decreaseQuantity(dessertId);
    this.render();
  }

  private handleRemoveProduct(dessertId: string): void {
    this.cart.removeItem(dessertId);
    this.render();
  }

  private handleConfirmOrder(): void {
    const cartItems = this.cart.getItems();
    const total = this.cart.calculateTotal();
    this.orderManager.showConfirmModal(cartItems, total);
  }

  private handleNewOrder(): void {
    this.cart.clear();
    this.orderManager.hideConfirmModal();
    this.render();
  }

  private render(): void {
    this.renderer.renderProducts(
      this.products,
      this.cart.getItems(),
      (dessert) => this.handleAddToCart(dessert),
      (dessertId) => this.handleIncreaseQuantity(dessertId),
      (dessertId) => this.handleDecreaseQuantity(dessertId)
    );

    this.renderer.renderCart(
      this.cart.getItems(),
      this.cart.calculateTotal(),
      (dessertId) => this.handleRemoveProduct(dessertId),
      () => this.handleConfirmOrder()
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.initialize();
});
