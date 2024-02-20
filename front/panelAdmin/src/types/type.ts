export type SelectUserType = {
  user: {
    role: string;
    name: string;
    phone: string;
    isLoggin: boolean;
  };
};

export type SubCategoryType = {
  id: number;
  name: string;
  slug: string;
  altImg: string | null;
  srcImg: string | null;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number | null;
  category: { name: string | null; slug: string | null };
};

export type CategoryType = {
  slug: string;
  name: string;
  id: 1;
  subCategories: {
    name: string;
    slug: string;
    altImg: string | null;
    srcImg: string | null;
  }[];
};

export type UserType = {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: "ADMIN" | "USER" | "AUTHOR";
  createdAt: string;
  updatedAt: string;
};
export type PaginationType = {
  allPage: number;
  prevPage: number | null;
  nextPage: number | null;
};
export type ProductType = {
  id: number;
  name: string;
  price: number;
  off: number | null;
  altImg: string | null;
  srcImg: string[] | null;
  slug: string;
  description: string;
  totel: null | number;
  updatedAt: Date;
  createdAt?: Date;
  categoryId: null;
  subCategory: {
    name: string;
  };
  user?: {
    name?: string;
  };
};
export type ProductDetailType = {
  id: number;
  srcImg: string[];
  title: string;
  keyward: string[];
  skillProduct: { name: string; skills: { name: string; text: string }[] }[];
  text: string;
  postId: 2;
};
export type ImageType = {
  id: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};
export type ReviewsType = {
  id: number;
  comment: string;
  name: string;
  email: string | null;
  phone: string;
  status: boolean;
  createdAt: Date;
  replyId: string | null;
  product: {
    name: string;
    slug: string;
  } | null;
};
export type OffType = {
  id: number
  name: string
  offer: number
  filterCount: number
  start: Date
  end: Date
  total: number
  updatedAt: Date
  user: {
    name: string
  }
}