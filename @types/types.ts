interface PaginationData {
  current_page: number;
  last_page: number;
  links: PaginationLink[];
  next_page_url?: string;
  prev_page_url?: string;
}

export type PaginationLink = {
  active: boolean;
  label: string;
  url: string;
};

export interface Products extends PaginationData {
  data: ProductListType[];
}

export interface EntityInterface {
  id: number;
  name: string;
}

export interface FiltersType {
  categories: CategoryType[];
  manufacturers: ManufacturerType[];
  properties: PropertyType[];
}

export type ManufacturerType = EntityInterface;

export type PropertyType = EntityInterface & {
  type: { id: number; name: string };
  values: string[];
};

export type ProductCardType = EntityInterface & {
  description: string;
  sale: { id: number; percent: number } | null;
  images: ImageType[];
  rating: number;
  price: PriceType;
  properties: Property[];
  comments: CommentResponse[];
  measure: Measure;
};

export type CommentResponse = EntityInterface & {
  email: string;
  comment: string;
  date: string;
  rating: number;
};

export type ProductListType = EntityInterface & {
  description: string;
  sale: { id: number; percent: number } | null;
  image: ImageType;
  rating: number;
  price: PriceType;
  measure: Measure;
};

export type Measure = {
  name: string;
  shorten: string;
  package: number;
};

export type SaleItemType = EntityInterface & {
  image: ImageType;
  rating: number;
  price: PriceType;
  category: CategoryType;
  measure: Measure;
};

export type ImageType = {
  uuid: string;
  fileName: string;
  url: string;
  main: boolean;
};

export type PriceType = {
  active: number;
  old: number;
};

export type Property = EntityInterface & {
  value: string;
};

export interface SalesType {
  percent: number;
  products: SaleItemType[];
}

export type CategoryType = EntityInterface & {
  icon: {
    dark: string;
    light: string;
  };
};

export type SearchResult = EntityInterface & {
  image: ImageType;
  price: PriceType;
  category: EntityInterface;
};
