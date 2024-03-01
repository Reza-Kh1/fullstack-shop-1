export type Session = {
    data: {
      user?: {
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
      } | null | undefined;
      expires: Date;
    } | null;
  };