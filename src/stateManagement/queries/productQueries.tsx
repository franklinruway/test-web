import { endpoints as ep } from '../../core/constants'
import { productDto } from '../models/product/productDto'


export const getProductsQuery = {
  query: () => {
    return ({
      url: ep.product.getProducts,
      method: 'GET',
    })
  },
  keepUnusedDataFor: 0,
  transformResponse: (response: any) => response,
}
export const getProductQuery = {
  query: (id: string) => {
    return ({
      url: ep.product.getProduct.replace(':id', id),
      method: 'GET',
    })
  },
  keepUnusedDataFor: 0,
  transformResponse: (response: any) => response,
}
export const getCategoriesQuery = {
  query: () => {
    return ({
      url: ep.product.getCategories,
      method: 'GET',
    })
  },
  keepUnusedDataFor: 0,
  transformResponse: (response: any) => response,
}
export const getCategoryProductsQuery = {
  query: (category: string) => {
    return ({
      url: ep.product.getCategoryProducts.replace(':category', category),
      method: 'GET',
    })
  },
  keepUnusedDataFor: 0,
  transformResponse: (response: any) => response,
}
export const addProductMutation = {
  query: (data: productDto) => {
    return ({
      url: ep.product.addProduct,
      data,
      method: 'POST',
    })
  }
}
export const updateProductMutation = {
  query: ({ id, data }: { id: string; data: productDto }) => {
    return ({
      url: ep.product.updateProduct.replace(':id', id),
      data,
      method: 'PUT',
    })
  }
}
export const deleteProductMutation = {
  query: (id: string) => {
    return ({
      url: ep.product.deleteProduct.replace(':id', id),
      method: 'DELETE',
    })
  }
}