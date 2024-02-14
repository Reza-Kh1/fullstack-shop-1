import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import InputForm from "../../components/InputForm/InputForm";
import { FaArrowDown, FaArrowUp, FaExclamation } from "react-icons/fa6";
import { PaginationType, UserType } from "../../types/type";
import { useForm } from "react-hook-form";
import { MdTitle } from "react-icons/md";
import {
  Button,
  Dialog,
  DialogBody,
  Option,
  Select,
} from "@material-tailwind/react";
import Pagination from "../../components/Pagination/Pagination";
import SearchUser from "../../components/SearchUser/SearchUser";
type CreateUserType = {
  name: string;
  email: string;
  password: string;
  phone: string;
  nameEdit: string;
  emailEdit: string;
  phoneEdit: string;
  passwordEdit: string;
};
export default function User() {
  const [allUser, setAllUser] = useState<UserType[]>();
  const [search, setSearch] = useState<CreateUserType>();
  const { register, handleSubmit, reset } = useForm<CreateUserType>();
  const [count, setCount] = useState<number>();
  const [paginations, setPagination] = useState<PaginationType>();
  const [selectRole, setSelectRole] = useState<string>();
  const [editUser, setEditUser] = useState<UserType>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const getData = (url?: string) => {
    if (!url) {
      url = `user?page=${page}`;
    }
    if (search) {
      url = `user/search?page=${page}&${search}`;
      
    }    
    axios
      .get(url)
      .then(({ data }) => {
        setPagination(data.data.pagination);
        setCount(data.data.count);
        setAllUser(data.data.rows);
      })
      .catch((err) => toast.error(err));
  };
  const createUserAction = (form: CreateUserType) => {
    if (
      !selectRole ||
      !form.email ||
      !form.name ||
      !form.password ||
      !form.phone
    )
      return toast.error("تمام فیلد ها را پر کنید");
    const body = {
      ...form,
      role: selectRole,
    };

    axios
      .post("user", body)
      .then(() => {
        getData(), toast.success("کاربر ثبت شد");
        reset();
        setSelectRole("");
      })
      .catch(() => toast.error("احتمالا اطلاعات کاربر تکراری است"));
  };
  const EdituserAction = (form: CreateUserType) => {
    const body = {
      name: form.nameEdit,
      email: form.emailEdit,
      password: form.passwordEdit,
      role: selectRole,
      id: editUser?.id,
    };
    axios
      .put("user/123", body)
      .then(() => {
        toast.success("عملیات موفقیت آمیز بود"), getData();
      })
      .catch((err) => toast.error("کاربر ثبت نشد"));
    CloseModel();
    setSelectRole("");
  };
  const deleteuserAction = () => {
    axios
      .delete("user/" + editUser?.id)
      .then(() => {
        toast.success("کاربر حذف شد"), getData();
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const CloseModel = () => {
    reset();
    setOpenModal(false);
    setDeleteModal(false);
  };
  useEffect(() => {
    getData();
  }, [page, search]);
  return (
    <>
      <div className="w-full">
        <div
          onClick={() => setOpenSearch((prev) => !prev)}
          className="bg-orange-200  py-3 px-3 rounded-md shadow-md flex justify-between items-center cursor-pointer hover:bg-orange-300 transition-all"
        >
          <h3>بخش سرچ باکس</h3>
          <i>{openSearch ? <FaArrowDown /> : <FaArrowUp />}</i>
        </div>
        {openSearch && <SearchUser setSearch={setSearch} />}
        <div>
          <div className="my-5">
            <h3 className="bg-blue-200 py-3 px-3 rounded-md shadow-md">
              {count} کاربر ثبت نام کرده اند
            </h3>
            <table className="w-full responsive text-sm text-left rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
              <thead className="text-xs text-gray-700 uppercase  bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="text-center py-3 text-base">
                    #
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    نام
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    ایمیل
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    شماره تلفن
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    نقش
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    تاریخ عضویت
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    ویرایش
                  </th>
                  <th scope="col" className="text-center py-3 pl-3 text-base">
                    حذف
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUser &&
                  allUser.map((i, index) => (
                    <tr
                      key={index}
                      className="border-b bg-gray-800 border-gray-700  hover:bg-[#383939]"
                    >
                      <td
                        scope="row"
                        className="text-center py-4 font-medium whitespace-nowrap text-white"
                      >
                        {index + 1}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 font-medium whitespace-nowrap text-white"
                      >
                        {i?.name}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 font-medium whitespace-nowrap text-white"
                      >
                        {i?.email}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 font-medium whitespace-nowrap text-white"
                      >
                        {i.phone}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 font-medium whitespace-nowrap text-white"
                      >
                        {i.role === "USER"
                          ? "کاربر"
                          : i.role === "ADMIN"
                          ? "ادمین"
                          : "نویسنده"}
                      </td>
                      <td
                        scope="row"
                        className="text-center py-4 font-medium whitespace-nowrap text-white"
                      >
                        {new Date(i.createdAt).toLocaleDateString("fa")}
                      </td>
                      <td className="py-4">
                        <SubmitBtn
                          type="button"
                          value="ویرایش"
                          classPlus={"mx-auto"}
                          onClick={() => {
                            setSelectRole(i.role);
                            setOpenModal(true), setEditUser(i);
                          }}
                          icon={
                            <FaExclamation className="inline text-gray-50 mr-1" />
                          }
                        />
                      </td>
                      <td className="py-4">
                        <SubmitBtn
                          type="button"
                          value="حذف"
                          classPlus={
                            "to-[#7b0015] from-[#6c3d3d] hover:from-[#3c2223] hover:to-[#6c0718] mx-auto"
                          }
                          onClick={() => {
                            setDeleteModal(true), setEditUser(i);
                          }}
                          icon={
                            <FaExclamation className="inline text-gray-50 mr-1" />
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {paginations && (
              <Pagination
                pagination={paginations}
                setPage={setPage}
                page={page}
              />
            )}
            <h3 className="bg-orange-200 my-2 w-1/6 py-2 px-3 rounded-md shadow-md mt-5">
              افزودن کاربر جدید
            </h3>
            <form
              className="flex flex-wrap"
              onSubmit={handleSubmit(createUserAction)}
            >
              <div className="w-1/2 p-2">
                <InputForm
                  register={register}
                  name="name"
                  placeholder="نام کاربر را وارد کنید"
                  type="text"
                  icon={<MdTitle className="inline" />}
                />
              </div>
              <div className="w-1/2 p-2">
                <InputForm
                  register={register}
                  name="email"
                  placeholder="ایمیل کاربر"
                  type="text"
                  icon={<MdTitle className="inline" />}
                />
              </div>
              <div className="w-1/2 p-2">
                <InputForm
                  register={register}
                  name="phone"
                  placeholder="شماره تلفن"
                  type="text"
                  icon={<MdTitle className="inline" />}
                />
              </div>
              <div className="w-1/2 p-2">
                <InputForm
                  register={register}
                  name="password"
                  placeholder="پسورد"
                  type="text"
                  icon={<MdTitle className="inline" />}
                />
              </div>
              <div className="flex justify-between w-full">
                <div className="w-1/6 mt-3">
                  <SubmitBtn
                    value="افزودن دسته"
                    type="submit"
                    classPlus={"w-full flex justify-center"}
                  />
                </div>
                <div
                  className="w-1/6 p-2 flex items-end"
                  style={{ direction: "ltr" }}
                >
                  <Select
                    onChange={(value: string) => setSelectRole(value)}
                    label="انتخاب نقش کاربری"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                    vlaue={selectRole}
                  >
                    <Option value={"USER"}>کاربر</Option>
                    <Option value={"AUTHOR"}>نویسنده</Option>
                    <Option value={"ADMIN"}>ادمین</Option>
                  </Select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Dialog
        open={deleteModal}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        handler={CloseModel}
        size={"sm"}
      >
        <DialogBody className="overflow-y-auto bg-gray-400 rounded-md">
          <table className="w-full responsive text-sm text-left rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
            <thead className="text-xs text-gray-700 uppercase  bg-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-center py-3 text-base">
                  نام
                </th>
                <th scope="col" className="text-center py-3 text-base">
                  ایمیل
                </th>
                <th scope="col" className="text-center py-3 text-base">
                  شماره تلفن
                </th>
                <th scope="col" className="text-center py-3 text-base">
                  نقش
                </th>
              </tr>
            </thead>
            <tbody>
              {allUser && (
                <tr className="border-b bg-gray-800 border-gray-700  hover:bg-[#383939]">
                  <td
                    scope="row"
                    className="text-center py-4 font-medium whitespace-nowrap text-white"
                  >
                    {editUser?.name}
                  </td>
                  <td
                    scope="row"
                    className="text-center py-4 font-medium whitespace-nowrap text-white"
                  >
                    {editUser?.email}
                  </td>
                  <td
                    scope="row"
                    className="text-center py-4 font-medium whitespace-nowrap text-white"
                  >
                    {editUser?.phone}
                  </td>
                  <td
                    scope="row"
                    className="text-center py-4 font-medium whitespace-nowrap text-white"
                  >
                    {editUser?.role}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between mt-4 w-full">
            <Button
              onClick={() => {
                setDeleteModal(false), deleteuserAction();
              }}
              variant="gradient"
              color="blue"
              className="mr-1"
            >
              <span>حذف</span>
            </Button>
            <Button variant="gradient" color="red" onClick={CloseModel}>
              <span>بستن</span>
            </Button>
          </div>
        </DialogBody>
      </Dialog>
      <Dialog
        open={openModal}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        handler={CloseModel}
        size={"md"}
      >
        <DialogBody className="overflow-y-auto bg-gray-800 rounded-md">
          <form
            onSubmit={handleSubmit(EdituserAction)}
            className="flex flex-wrap"
          >
            {editUser && (
              <>
                <div className="w-1/2 p-2">
                  <InputForm
                    register={register}
                    name="nameEdit"
                    label="نام کاربر"
                    value={editUser?.name || ""}
                    placeholder="نام کاربر را وارد کنید"
                    type="text"
                    icon={<MdTitle className="inline" />}
                  />
                </div>
                <div className="w-1/2 p-2">
                  <InputForm
                    register={register}
                    label="ایمیل کاربر"
                    name="emailEdit"
                    value={editUser?.email || ""}
                    placeholder="ایمیل کاربر"
                    type="text"
                    icon={<MdTitle className="inline" />}
                  />
                </div>
                <div className="w-1/2 p-2">
                  <InputForm
                    register={register}
                    name="passwordEdit"
                    label="پسورد کاربر"
                    placeholder="پسورد"
                    type="text"
                    icon={<MdTitle className="inline" />}
                  />
                </div>
                <div
                  className="w-1/2 p-2 flex items-end text-gray-50"
                  style={{ direction: "ltr" }}
                >
                  <Select
                    onChange={(value: string) => setSelectRole(value)}
                    label="انتخاب نقش کاربری"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                    value={selectRole}
                    className={"text-gray-50"}
                  >
                    <Option value={"USER"}>کاربر</Option>
                    <Option value={"AUTHOR"}>نویسنده</Option>
                    <Option value={"ADMIN"}>ادمین</Option>
                  </Select>
                </div>
              </>
            )}
            <div className="flex justify-between mt-4 w-full">
              <Button
                type="submit"
                variant="gradient"
                color="blue"
                className="mr-1"
              >
                <span>ثبت تغییرات</span>
              </Button>
              <Button variant="gradient" color="red" onClick={CloseModel}>
                <span>بستن</span>
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
