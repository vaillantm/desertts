import type { Dessert } from './types.js';

export async function loadProducts(): Promise<Dessert[]> {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch data.json: ${response.statusText}`);
    }
    const desserts: Dessert[] = await response.json();
    return desserts;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}
