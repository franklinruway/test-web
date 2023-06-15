import apiSlice from './apiSlice'
import {
  getProductsQuery,
  getCategoriesQuery,
  getCategoryProductsQuery,
  getProductQuery,
  addProductMutation,
  updateProductMutation,
  deleteProductMutation
} from '../../stateManagement/queries';

export const productApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query(getProductsQuery),
    getProduct: build.query(getProductQuery),
    getCategories: build.query(getCategoriesQuery),
    getCategoryProducts: build.query(getCategoryProductsQuery),
    addProduct: build.mutation(addProductMutation),
    updateProduct: build.mutation(updateProductMutation),
    deleteProduct: build.mutation(deleteProductMutation),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetCategoryProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productApi
//States

export default productApi;