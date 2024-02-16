import CreateProduct from "../components/CreateProduct/CreateProduct";
import SingleProduct from "../components/SingleProduct/SingleProduct";
import Admin from "../pages/Admin/Admin";
import Auth from "../pages/Auth/Auth";
import Cart from "../pages/Cart/Cart";
import Category from "../pages/Category/Category";
import Dashboard from "../pages/Dashboard/Dashboard";
import Off from "../pages/Off/Off";
import Product from "../pages/Product/Product";
import Profile from "../pages/Profile/Profile";
import Review from "../pages/Review/Review";
import Upload from "../pages/Upload/Upload";
import User from "../pages/User/User";

export default [
  { path: "/", element: <Auth /> },
  {
    path: "/admin/",
    element: <Admin />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
      { path: "product/admin/:id", element: <SingleProduct /> },
      { path: "upload", element: <Upload /> },
      { path: "user", element: <User /> },
      { path: "review", element: <Review /> },
      { path: "profile", element: <Profile /> },
      { path: "Cart", element: <Cart /> },
      { path: "Off", element: <Off /> },
      { path: "create-product", element: <CreateProduct /> },
    ],
  },
  { path: "/*", element: <div>notfound</div> },
];
