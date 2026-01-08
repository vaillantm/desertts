export async function loadProducts() {
    try {
        const response = await fetch('data.json');
        const products = await response.json();
        return products;
    }
    catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
}
