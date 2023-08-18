import axios, { CancelTokenSource } from 'axios';
import { CommentResponse, Products, SearchResult } from '../@types/types';
import { COMMENT_API_URL, ORDER_API_URL, PRODUCTS_API_URL, SEARCH_API_URL } from '../constants';

type CommentRequest = {
  rating: number;
  productId: number;
  name: string;
  email: string;
  comment: string;
};

type OrderRequest = {
  phone: string;
  email: string;
  lastName: string;
  name: string;
  patronymic: string;
  address: string;
  products: OrderRequestProduct[];
};

export type OrderRequestProduct = {
  id: number;
  quantity: number;
  price: number;
};

export type CatalogQueryParams = {
  order: string;
  price?: {
    min?: number;
    max?: number;
  };
  newest?: boolean;
  onSale?: boolean;
  man?: string;
  cat?: string;
  props?: string;
  page?: number;
  q?: string;
};

export const addCommentRequest = async (comment: CommentRequest): Promise<CommentResponse> => {
  const { data } = await axios.post(COMMENT_API_URL, { ...comment });
  return data;
};

export const makeOrderRequest = async (order: OrderRequest): Promise<any> => {
  const { data } = await axios.post(ORDER_API_URL, { ...order });
  return data;
};

export const getCommentsRequest = async (productId: number): Promise<CommentResponse[]> => {
  const { data } = await axios.get(COMMENT_API_URL, { params: { productId } });
  return data;
};

export const searchProductsRequest = async (
  query: string,
  cancelTokenSource: CancelTokenSource
): Promise<SearchResult[]> => {
  const { data } = await axios.get(SEARCH_API_URL, { cancelToken: cancelTokenSource.token, params: { q: query } });
  return data;
};

export const getProductsRequest = async (query: CatalogQueryParams): Promise<Products> => {
  const { data } = await axios.get(PRODUCTS_API_URL, { params: { ...query } });
  return data;
};
