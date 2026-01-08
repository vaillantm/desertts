import { loadProducts } from './data.js';
import { Cart } from './cart.js';
import { OrderManager } from './order.js';
import { Renderer } from './renderer.js';
class App {
    constructor() {
        this.products = [];
        this.cart = new Cart();
        this.orderManager = new OrderManager();
        this.renderer = new Renderer();
    }
    async initialize() {
        this.products = await loadProducts();
        this.render();
        this.attachGlobalEventListeners();
    }
    attachGlobalEventListeners() {
        const newOrderBtn = document.getElementById('new-order-btn');
        newOrderBtn?.addEventListener('click', () => this.handleNewOrder());
    }
    handleAddToCart(product) {
        this.cart.addItem(product);
        this.render();
    }
    handleIncreaseQuantity(name) {
        this.cart.increaseQuantity(name);
        this.render();
    }
    handleDecreaseQuantity(name) {
        this.cart.decreaseQuantity(name);
        this.render();
    }
    handleRemoveProduct(name) {
        this.cart.removeItem(name);
        this.render();
    }
    handleConfirmOrder() {
        const cartItems = this.cart.getItems();
        const total = this.cart.calculateTotal();
        this.orderManager.showConfirmModal(cartItems, total);
    }
    handleNewOrder() {
        this.cart.clear();
        this.orderManager.hideConfirmModal();
        this.render();
    }
    render() {
        this.renderer.renderProducts(this.products, this.cart.getItems(), (product) => this.handleAddToCart(product), (name) => this.handleIncreaseQuantity(name), (name) => this.handleDecreaseQuantity(name));
        this.renderer.renderCart(this.cart.getItems(), this.cart.calculateTotal(), (name) => this.handleRemoveProduct(name), () => this.handleConfirmOrder());
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.initialize();
});
