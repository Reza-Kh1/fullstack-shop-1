import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import InputForm from "../InputForm/InputForm";
import { MdTitle } from "react-icons/md";
import { FaExclamation } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
type PropsBasicCategory = {
  setAllData: (value: BasicCategoryType[]) => void;
  allData: BasicCategoryType[];
};
export type BasicCategoryType = {
  id: number;
  name: string;
  categories: {
    slug: string;
    name: string;
  }[];
};
export default function BasicCategory({
  setAllData,
  allData,
}: PropsBasicCategory) {
  const [editId, setEditId] = useState<number | null>(null);
  const { register, handleSubmit, reset, getValues, setValue } = useForm<any>();
  const deleteCategory = (id: number) => {
    axios
      .delete(`basic-category/${id}`)
      .then(() => {
        toast.success("دسته حذف شد");
        getData();
      })
      .catch(() => toast.error("دسته حذف نشد"));
  };
  const createCategory = (form: { name: string }) => {
    if (!form.name) toast.warning("تمام فیلد هارو پر کنید");
    const body = {
      name: form.name,
    };
    axios
      .post("basic-category", body)
      .then(() => {
        toast.success("دسته افزوده شد");
        reset();
        getData();
      })
      .catch(() => toast.error("با مشکل روبرو شدیم"));
  };
  const editCategory = (id: number) => {
    const value = id.toString();
    const name = getValues(value);
    const body = {
      name,
    };
    axios
      .put(`basic-category/${id}`, body)
      .then(() => {
        getData();
        toast.success("دسته به روزرسانی شد");
        setEditId(null);
      })
      .catch(() => toast.error("دسته به روز رسانی نشد"));
  };
  const getData = () => {
    axios
      .get("basic-category")
      .then(({ data }) => {
        setAllData(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("دریافت اطلاعات با مشکل روبرو شد");
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
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
            {allData &&
              allData.map((i, index) => (
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
                  {i.id === editId ? (
                    <td>
                      <div className="w-full">
                        <InputForm
                          register={register}
                          name={i.id.toString()}
                          placeholder="نام دسته را وارد کنید"
                          type="text"
                          icon={<MdTitle className="inline" />}
                        />
                      </div>
                    </td>
                  ) : (
                    <>
                      <td
                        scope="row"
                        className="text-center py-4 font-medium whitespace-nowrap text-white"
                      >
                        {i?.name}
                      </td>
                    </>
                  )}
                  <td
                    scope="row"
                    className="text-center py-4 font-medium whitespace-nowrap text-white"
                  >
                    {i.categories.length}
                  </td>
                  <td className="py-4">
                    {i.id === editId ? (
                      <Button
                        onClick={() => {
                          editCategory(i.id);
                        }}
                        className="mx-auto block"
                        type="button"
                        variant="gradient"
                        color="deep-orange"
                      >
                        ذخیره
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setEditId(i.id);
                          setValue(i.id.toString(), i.name);
                        }}
                        className="mx-auto block"
                        type="button"
                        variant="gradient"
                        color="blue"
                      >
                        ویرایش
                      </Button>
                    )}
                  </td>
                  <td className="py-4">
                    <SubmitBtn
                      type="button"
                      value="حذف"
                      classPlus={
                        "to-[#7b0015] from-[#6c3d3d] hover:from-[#3c2223] hover:to-[#6c0718] mx-auto"
                      }
                      onClick={() => {
                        deleteCategory(i.id);
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
          onSubmit={handleSubmit(createCategory)}
          className="flex flex-wrap"
        >
          <div className="w-1/2 p-2">
            <InputForm
              register={register}
              name="name"
              placeholder="نام دسته را وارد کنید"
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
    </div>
  );
}
