export const endpoints = {
  user: {
    login: '/auth/login',
  },
  product: {
    getProducts: '/products',
    getProduct: '/products/:id',
    addProduct: '/products',
    getCategories: '/products/categories',
    getCategoryProducts: '/products/category/:category',
    updateProduct: '/products/:id',
    deleteProduct: '/products/:id',
  },
  category: {
    
  },
}
