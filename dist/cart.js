export class Cart {
    constructor() {
        this.items = [];
    }
    getItems() {
        return this.items;
    }
    isEmpty() {
        return this.items.length === 0;
    }
    getItemCount() {
        return this.items.length;
    }
    findItem(name) {
        return this.items.find(item => item.name === name);
    }
    addItem(product) {
        const newItem = { ...product, quantity: 1 };
        this.items.push(newItem);
    }
    increaseQuantity(name) {
        this.items = this.items.map(item => {
            if (name === item.name) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });
    }
    decreaseQuantity(name) {
        this.items = this.items.map(item => {
            if (name === item.name) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }
            return item;
        }).filter(item => item.quantity > 0);
    }
    removeItem(name) {
        this.items = this.items.filter(product => product.name !== name);
    }
    calculateTotal() {
        return this.items.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2);
    }
    clear() {
        this.items = [];
    }
}
