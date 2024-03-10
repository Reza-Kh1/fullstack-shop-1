export type Session = {
  data: {
    user?:
    | {
      body: {
        name: string;
        password: null | string;
        email: string;
        phone: string;
        role?: "ADMIN" | "AUTHOR" | "USER";
        id: string;
      };
      product: [];
      token: string;
    }
    | null
    | undefined;
    expires: Date;
  } | null;
};
export type BoxProductType = {
  id: number;
  name: string;
  price: number | number;
  off: number | null;
  altImg: string | null;
  srcImg: string[];
  slug: string;
  description: string;
  totel: number | null;
  keycode: string;
  userId: string;
  categoryId: number;
};
export type ProductPageType = {
  data: {
    id: number
    name: string
    price: number
    off: null | number
    altImg: string
    slug: string
    description: string
    totel: string
    keycode: string
    updatedAt: Date,
    detailProduct: {
      srcImg: string[],
      title: string,
      keyward: string[],
      skillProduct: {
        name: string,
        skills: {
          name: string,
          text: string
        }[]
      }[]
      text: string
    },
    subCategory: {
      name: string
    }
  },
  review: number
};
export type ReviewsType = {
  name: string;
  date: Date ;
  text: string;
  count: number;
  id: number;
  reply?: {
    name?: string;
    date?: Date;
    text?: string;
    count?: number;
    id?: number;
  }[] | any;
};
