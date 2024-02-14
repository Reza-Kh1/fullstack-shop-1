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
  categoryId: null;
};
export type ImageType = {
  id: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};
