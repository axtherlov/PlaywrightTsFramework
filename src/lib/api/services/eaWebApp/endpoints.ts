export const ProductServiceEndpoints = {
    getProducts: "Product/GetProducts",
    getProductById: (id: string) => `Product/GetProductById/${id}`,
    createProduct: "Product/Create",
};
