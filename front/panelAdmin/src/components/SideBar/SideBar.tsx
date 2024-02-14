import React from "react";
import { FaCartShopping, FaImage, FaShop, FaUsers } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { FaMailBulk } from "react-icons/fa";
import { BsBoxArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RiUserSettingsLine } from "react-icons/ri";
import { Button } from "@material-tailwind/react";
import { SelectUserType } from "../../types/type";
import { TbCurrencyDollarOff } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import { logOut } from "../../utils/slices/user";

export default function SideBar() {
  const selectUser = useSelector((state: SelectUserType) => state.user);
  const dispatch = useDispatch();
  const LinkSideBar = ({
    url,
    value,
    icon,
  }: {
    url: string;
    value: string;
    icon: React.ReactNode;
  }) => {
    return (
      <NavLink to={url}>
        <Button
          className={
            "py-2 px-3 text-start text-base font-medium w-full text-gray-50 rounded-md shadow-sm bg-gradient-to-r from-[#212121] to-orange-600 hover:bg-orange-100 hover:mr-1 transition-all"
          }
        >
          {icon}
          {value}
        </Button>
      </NavLink>
    );
  };
  const navigate = useNavigate();
  const signOut = () => {
    axios
      .get("user/logout")
      .then(() => {
        toast.success("با موفقیت از حساب خارج شدین"),
          dispatch(logOut()),
          navigate("/");
      })
      .catch(() => toast.error("با خطا روبرو شدیم دوباره تلاش کنید"));
  };
  return (
    <>
      <div className="flex flex-col p-2 gap-2 side-bar fixed w-2/12 mt-1">
        <span className="bg-gradient-to-r text-start shadow-md to-[#5e1d28] text-gray-50 from-[#212121] px-3 py-2 rounded-md">
          پنل {selectUser.role === "ADMIN" ? "ادمین" : "نویسنده"}{" "}
          {selectUser.name}
        </span>
        <LinkSideBar
          value={"داشبورد"}
          url={"dashboard"}
          icon={<MdDashboard className="inline ml-2 text-gray-50" />}
        />
        <LinkSideBar
          value={"کاربران"}
          url={"user"}
          icon={<FaUsers className="inline ml-2 text-gray-50" />}
        />
        <LinkSideBar
          value={"دسته بندی"}
          url={"category"}
          icon={<BiSolidCategoryAlt className="inline ml-2 text-gray-50" />}
        />
        <LinkSideBar
          value={"عکس ها"}
          url={"upload"}
          icon={<FaImage className="inline ml-2 text-gray-50" />}
        />
        <LinkSideBar
          value={"نظرات"}
          url={"review"}
          icon={<FaMailBulk className="inline ml-2 text-gray-50" />}
        />
        <LinkSideBar
          value={"محصولات"}
          url={"product"}
          icon={<FaShop className="inline ml-2 text-gray-50" />}
        />
        <LinkSideBar
          value={"پروفایل"}
          url={"profile"}
          icon={<RiUserSettingsLine className="inline ml-2 text-gray-50" />}
        />
        <LinkSideBar
          value={"تخفیف ها"}
          url={"off"}
          icon={<TbCurrencyDollarOff className="inline ml-2 text-gray-50" />}
        />
        <LinkSideBar
          value={"سبد خرید"}
          url={"cart"}
          icon={<FaCartShopping className="inline ml-2 text-gray-50" />}
        />
        <button
          onClick={signOut}
          type="submit"
          className="bg-gradient-to-r text-start shadow-md to-[#5e1d28] text-gray-50 from-[#212121]  px-3 py-2 rounded-md hover:mr-1 transition-all"
        >
          <BsBoxArrowRight className="inline ml-2 text-gray-50" />
          خروج
        </button>
      </div>
    </>
  );
}
