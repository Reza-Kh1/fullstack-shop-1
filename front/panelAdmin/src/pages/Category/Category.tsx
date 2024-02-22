import { FaExclamation } from "react-icons/fa6";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryType, SubCategoryType } from "../../types/type";
import InputForm from "../../components/InputForm/InputForm";
import { useForm } from "react-hook-form";
import { MdTitle } from "react-icons/md";
import {
  Button,
  Dialog,
  DialogBody,
  Option,
  Select,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
 import DialogImage from "../../components/DialogImage/DialogImage";
type CreateCategoryType = {
  categoryname: string | null | undefined;
  categoryslug: string | null | undefined;
  subcategoryname: string | null | undefined;
  subcategoryslug: string | null | undefined;
  subcategoryalt: string | null | undefined;
};
type EditCategoryType = {
  editname: string | null;
  editslug: string | null;
  editalt: string | null;
};
export default function Category() {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [subCategory, setSubCategory] = useState<SubCategoryType[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deletModal, setDeletModal] = useState<boolean>(false);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [editCategory, setEditCategory] = useState<any>();
  const [imageSubCategor, setImageSubCategory] = useState<string | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);
  const {
    register: create,
    handleSubmit: handleCreate,
    reset: resetCreate,
  } = useForm<CreateCategoryType>();
  const {
    register: edit,
    handleSubmit: handleEdit,
    reset: resetEdit,
  } = useForm<EditCategoryType>();
  const getSubCategory = () => {
    axios
      .get("sub-category")
      .then(({ data }) => {
        setSubCategory(data.data);
      })
      .catch((err) => console.log(err));
  };
  const getCategory = () => {
    axios
      .get("category")
      .then(({ data }) => {
        setCategory(data.data);
      })
      .catch((err) => console.log(err));
  };
  const categoryCreate = (form: CreateCategoryType) => {
    let body: any = {};
    let url = "";
    if (form.categoryname && form.categoryslug) {
      url = "category";
      body.name = form.categoryname;
      body.slug = form.categoryslug;
    } else {
      if (!selectCategory || !category.length) return;
      const { id }: any = category.find((i) => i.name === selectCategory);
      url = "sub-category";
      body.name = form.subcategoryname;
      body.slug = form.subcategoryslug;
      body.altImg = form.subcategoryalt;
      body.srcImg = imageSubCategor || null;
      body.categoryId = id;
    }
    axios
      .post(url, body)
      .then(({ data }) => {
        toast.success(data.message);
        if (url === "category") {
          getCategory();
        } else {
          getSubCategory();
          resetCreate();
        }
        resetCreate();
        resetEdit();
        setImageSubCategory(null);
      })
      .catch((err) => {
        console.log(err), toast.error(err.message);
      });
    setSelectCategory("");
  };
  const editCategoryAction = (form: EditCategoryType) => {
    let body: any = {};
    let url: string = "";
    if (form.editalt) {
      if (!selectCategory || !category.length) return;
      const { id }: any = category.find((i) => i.slug === selectCategory);
      url = "sub-category/";
      body.name = form.editname;
      body.slug = form.editslug;
      body.altImg = form.editalt;
      body.srcImg = imageSubCategor || null;
      body.categoryId = id;
    } else {
      url = "category/";
      body.name = form.editname;
      body.slug = form.editslug;
    }
    resetEdit();
    axios
      .put(url + editCategory.id, body)
      .then(({ data }) => {
        toast.success(data.message);
        if (url === "category/") {
          getCategory();
        } else {
          getSubCategory();
          resetCreate();
        }
        resetCreate();
        setImageSubCategory(null);
      })
      .catch((err) => {
        console.log(err), toast.error(err.message);
      });
    setSelectCategory("");
  };
  const deletCategory = () => {
    let url: string = "";
    if (editCategory.subCategories) {
      url = "category/";
    } else {
      url = "sub-category/";
    }
    axios
      .delete(url + editCategory.id)
      .then(({ data }) => {
        toast.success(data.message);
        if (url === "category/") {
          getCategory();
        } else {
          getSubCategory();
          resetCreate();
        }
        CloseModal();
      })
      .catch(() => {
        toast.error("دسته حذف نشد زیر مجموعه هارو پاک کنید");
      });
  };
  const CloseModal = () => {
    setDeletModal(false);
    setOpenModal(false);
    resetCreate();
    resetEdit();
  };
  useEffect(() => {
    getCategory();
    getSubCategory();
  }, []);
  return (
    <>
      <div className="w-full">
        <div>
          <h3 className="bg-blue-200 py-3 px-3 rounded-md shadow-md">
            دسته اصلی
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
                  اسلاگ
                </th>
                <th scope="col" className="text-center py-3 text-base">
                  زیر دسته
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
              {category &&
                category.map((i, index) => (
                  <tr
                    key={index}
                    className="border-b bg-gray-800 border-gray-700  hover:bg-[#383939]"
                  >
                    <td
                      scope="row"
                      className="text-center py-4 font-medium whitespace-nowrap text-white"
                    >
                      {index}
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
                      {i?.slug}
                    </td>
                    <td
                      scope="row"
                      className="text-center py-4 font-medium whitespace-nowrap text-white"
                    >
                      {i.subCategories.length}
                    </td>
                    <td className="py-4">
                      <SubmitBtn
                        type="button"
                        value="ویرایش"
                        classPlus={"mx-auto"}
                        onClick={() => {
                          setOpenModal(true), setEditCategory(i);
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
                          setDeletModal(true), setEditCategory(i);
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
          <h3 className="bg-orange-200 my-2 w-1/6 py-2 px-3 rounded-md shadow-md">
            افزودن دسته جدید
          </h3>
          <form
            onSubmit={handleCreate(categoryCreate)}
            className="flex flex-wrap"
          >
            <div className="w-1/2 p-2">
              <InputForm
                register={create}
                name="categoryname"
                placeholder="نام دسته را وارد کنید"
                type="text"
                icon={<MdTitle className="inline" />}
              />
            </div>
            <div className="w-1/2 p-2">
              <InputForm
                register={create}
                name="categoryslug"
                placeholder="اسلاگ دسته را وارد کنید"
                type="text"
                icon={<MdTitle className="inline" />}
              />
            </div>
            <div className="w-1/6 mt-3">
              <SubmitBtn
                value="افزودن دسته"
                type="submit"
                classPlus={"w-full flex justify-center"}
              />
            </div>
          </form>
        </div>
        <div className="my-5 border-t border-gray-800 border-1 pt-5">
          <h3 className="bg-blue-200 py-3 px-3 rounded-md shadow-md">
            زیر دسته ها
          </h3>
          <table className="w-full responsive text-sm text-left  rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
            <thead className="text-xs text-gray-700 uppercase  bg-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-center py-3 text-base">
                  #
                </th>
                <th scope="col" className="text-center py-3 text-base">
                  دسته
                </th>
                <th scope="col" className="text-center py-3 text-base">
                  اسلاگ
                </th>
                <th scope="col" className="text-center py-3 text-base">
                  دسته مادر
                </th>
                <th scope="col" className="text-center py-3 text-base">
                  عکس
                </th>
                <th scope="col" className="text-center py-3 text-base">
                  عنوان عکس
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
              {subCategory &&
                subCategory.map((i, index) => (
                  <tr
                    key={index}
                    className="border-b bg-gray-800 border-gray-700  hover:bg-[#383939]"
                  >
                    <td
                      scope="row"
                      className="text-center py-4 font-medium whitespace-nowrap text-white"
                    >
                      {index}
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
                      {i?.slug}
                    </td>
                    <td
                      scope="row"
                      className="text-center py-4 font-medium whitespace-nowrap text-white"
                    >
                      {i.category?.name}
                    </td>
                    <td scope="row">
                      <img
                        src={i?.srcImg || "/image/back.webp"}
                        className="w-24 table mx-auto rounded-md"
                        alt="alt"
                      />
                    </td>
                    <td
                      scope="row"
                      className="text-center py-4 font-medium whitespace-nowrap text-white"
                    >
                      {i?.altImg}
                    </td>
                    <td className="py-4">
                      <SubmitBtn
                        onClick={() => {
                          setSelectCategory(i.category.slug || "");
                          setEditCategory(i), setOpenModal(true);
                        }}
                        type="button"
                        value="ویرایش"
                        classPlus={"mx-auto"}
                        icon={
                          <FaExclamation className="inline text-gray-50 mr-1" />
                        }
                      />
                    </td>
                    <td className="py-4">
                      <SubmitBtn
                        onClick={() => {
                          setEditCategory(i);
                          setDeletModal(true);
                        }}
                        type="button"
                        value="حذف"
                        classPlus={
                          "to-[#7b0015] from-[#6c3d3d] hover:from-[#3c2223] hover:to-[#6c0718] mx-auto"
                        }
                        icon={
                          <FaExclamation className="inline text-gray-50 mr-1" />
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h3 className="bg-orange-200 my-2 w-1/6 py-2 px-3 rounded-md shadow-md">
            افزودن دسته جدید
          </h3>
          <form
            onSubmit={handleCreate(categoryCreate)}
            className="flex flex-wrap items-center justify-between"
          >
            <div className="w-1/3 p-2">
              <InputForm
                register={create}
                name="subcategoryname"
                placeholder="نام دسته را وارد کنید"
                type="text"
                icon={<MdTitle className="inline" />}
              />
            </div>
            <div className="w-1/3 p-2">
              <InputForm
                register={create}
                name="subcategoryslug"
                placeholder="اسلاگ دسته را وارد کنید"
                type="text"
                icon={<MdTitle className="inline" />}
              />
            </div>
            <div className="w-1/3 p-2">
              <InputForm
                register={create}
                name="subcategoryalt"
                placeholder="عنوان تصویر دسته را وارد کنید"
                type="text"
                icon={<MdTitle className="inline" />}
              />
            </div>
            {category && (
              <div
                className="w-1/6 p-2 flex items-end"
                style={{ direction: "ltr" }}
              >
                <Select
                  onChange={(value: string) => setSelectCategory(value)}
                  label="انتخاب دسته اصلی"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  {category.map((i, index) => (
                    <Option value={i.name} key={index}>
                      {i.name}
                    </Option>
                  ))}
                </Select>
              </div>
            )}
            <div className="w-1/6 p-2">
              <SubmitBtn
                type="button"
                onClick={() => setShowImage(true)}
                value="انتخاب عکس"
                classPlus={"w-full flex justify-center"}
              />
            </div>
            <div className="w-2/6 p-2">
              <img
                src={imageSubCategor ? imageSubCategor : "/image/back.webp"}
                className="w-6/12 table mx-auto rounded-md shadow-md"
                alt="alt"
              />
            </div>
            <div className="w-full mt-3">
              <SubmitBtn
                value="افزودن دسته"
                type="submit"
                classPlus={"w-2/12 flex justify-center"}
              />
            </div>
          </form>
        </div>
      </div>
      <Dialog
        open={deletModal}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        handler={setDeletModal}
        size={"xs"}
      >
        <DialogBody className="overflow-y-auto bg-gray-700 rounded-md">
          {editCategory && (
            <table className="w-full responsive text-sm text-left rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
              <thead className="text-xs text-gray-700 uppercase  bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="text-center py-3 text-base">
                    نام
                  </th>
                  <th scope="col" className="text-center py-3 text-base">
                    اسلاگ
                  </th>
                  {editCategory?.category?.name && (
                    <th scope="col" className="text-center py-3 text-base">
                      دسته مادر
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-gray-800 border-gray-700  hover:bg-[#383939]">
                  <td
                    scope="row"
                    className="text-center py-4 font-medium whitespace-nowrap text-white"
                  >
                    {editCategory.name}
                  </td>
                  <td
                    scope="row"
                    className="text-center py-4 font-medium whitespace-nowrap text-white"
                  >
                    {editCategory.slug}
                  </td>
                  {editCategory?.category?.name && (
                    <td scope="col" className="text-center py-3 text-base">
                      {editCategory.category.name}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          )}
          <div className="flex justify-between mt-4">
            <Button
              onClick={deletCategory}
              variant="gradient"
              color="green"
              className="mr-1"
            >
              <span>حذف</span>
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={() => setDeletModal(false)}
            >
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
        handler={CloseModal}
        size={"md"}
      >
        <DialogBody className="overflow-y-auto bg-gray-700 rounded-md">
          <form
            onSubmit={handleEdit(editCategoryAction)}
            className="flex flex-wrap"
          >
            {editCategory && (
              <>
                <div className="w-1/2 p-2">
                  <InputForm
                    label="نام دسته"
                    register={edit}
                    name="editname"
                    value={editCategory.name}
                    placeholder="نام دسته را وارد کنید"
                    type="text"
                    icon={<MdTitle className="inline" />}
                  />
                </div>
                <div className="w-1/2 p-2">
                  <InputForm
                    label="اسلاگ دسته"
                    register={edit}
                    value={editCategory?.slug}
                    name="editslug"
                    placeholder="اسلاگ دسته را وارد کنید"
                    type="text"
                    icon={<MdTitle className="inline" />}
                  />
                </div>
                {editCategory.category && (
                  <>
                    <div className="w-1/2 p-2">
                      <InputForm
                        register={edit}
                        label="عنوان عکس"
                        value={editCategory?.altImg || ""}
                        name="editalt"
                        placeholder="عنوان عکس را وارد کنید"
                        type="text"
                        icon={<MdTitle className="inline" />}
                      />
                    </div>
                    <div
                      className="w-1/2 p-2 flex items-end text-gray-100 rounded-md"
                      style={{ direction: "ltr" }}
                    >
                      <Select
                        className={"text-gray-50"}
                        onChange={(value: string) => setSelectCategory(value)}
                        label="انتخاب دسته اصلی"
                        animate={{
                          mount: { y: 0 },
                          unmount: { y: 25 },
                        }}
                        value={selectCategory || ""}
                        defaultValue={editCategory?.category.slug || ""}
                      >
                        {category &&
                          category.map((i, index) => (
                            <Option value={i.slug} key={index}>
                              {i.name}
                            </Option>
                          ))}
                      </Select>
                    </div>
                    <div className="w-full p-2">
                      <img
                        onClick={() => setShowImage(true)}
                        src={
                          imageSubCategor ? imageSubCategor : "/image/back.webp"
                        }
                        className="w-6/12 table mx-auto cursor-pointer rounded-md shadow-md"
                        alt="alt"
                      />
                    </div>
                  </>
                )}
              </>
            )}
            <div className="flex justify-between mt-4 w-full">
              <Button
                onClick={() => setOpenModal(false)}
                type="submit"
                variant="gradient"
                color="blue"
                className="mr-1"
              >
                <span>ثبت تغییرات</span>
              </Button>
              <Button variant="gradient" color="red" onClick={CloseModal}>
                <span>بستن</span>
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
      <DialogImage
        setUrl={setImageSubCategory}
        setOpen={setShowImage}
        open={showImage}
      />
    </>
  );
}
