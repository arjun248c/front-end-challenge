
let PRODUCTS = [
    { id: 1, name: 'Wireless Headphones', price: 129.99, stock: 45, category: 'Electronics' },
    { id: 2, name: 'Ergonomic Chair', price: 259.00, stock: 12, category: 'Furniture' },
    { id: 3, name: 'Mechanical Keyboard', price: 89.50, stock: 28, category: 'Electronics' },
    { id: 4, name: 'Water Bottle', price: 15.00, stock: 100, category: 'Accessories' },
];

export const getProducts = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...PRODUCTS];
};

export const addProduct = async (product) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newProduct = { ...product, id: Date.now() };
    PRODUCTS = [...PRODUCTS, newProduct];
    return newProduct;
};

export const updateProduct = async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    PRODUCTS = PRODUCTS.map(p => p.id === id ? { ...p, ...updates } : p);
    return PRODUCTS.find(p => p.id === id);
};

export const deleteProduct = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    PRODUCTS = PRODUCTS.filter(p => p.id !== id);
    return true;
};
