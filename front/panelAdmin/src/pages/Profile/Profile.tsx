import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputForm from "../../components/InputForm/InputForm";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { MdTitle } from "react-icons/md";
import { Button } from "@material-tailwind/react";
type profileType = {
  role?: "ADMIN" | "USER" | "AUTHOR";
  name: string;
  phone: string;
  email: string;
};
export default function Profile() {
  const { register, handleSubmit, setValue } = useForm<profileType>();
  const [allData, setAllData] = useState<profileType>();
  const [open, setOpen] = useState<boolean>(false);
  const getData = () => {
    axios
      .get("user/profile")
      .then(({ data }) => {
        setAllData(data.data);
        setValue("name", data.data.name);
        setValue("email", data.data.email);
        setValue("phone", data.data.phone);
      })
      .catch(() => {
        toast.error("دوباره وارد سیستم شوید");
      });
  };
  const editUser = (form: profileType) => {
    if (!form.email || !form.name || !form.phone)
      return toast.warning("فیلدهای لازم را پر کنید");
    const body = {
      name: form.name,
      phone: form.phone,
      email: form.email,
    };
    axios
      .put("user/123", body)
      .then(() => {
        toast.success("اطلاعات با موفقیت به روزرسانی شد");
        setOpen(false);
        getData();
      })
      .catch(() => toast.error("اطلاعات به روز نشد"));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-8/12 p-4 bg-blue-gray-500 shadow-md rounded-md">
          <div>
            {open ? (
              <form
                className="flex items-center justify-center flex-wrap"
                onSubmit={handleSubmit(editUser)}
              >
                <div className="w-full items-center">
                  <span className="text-gray-100 text-lg">ویرایش اطلاعات</span>
                </div>
                <div className="w-4/12 p-2">
                  <InputForm
                    name="name"
                    type="text"
                    register={register}
                    label="نام کاربری"
                    icon={<MdTitle />}
                    required
                  />
                </div>
                <div className="w-4/12 p-2">
                  <InputForm
                    name="phone"
                    type="text"
                    register={register}
                    label="شماره تلفن"
                    icon={<MdTitle />}
                    required
                  />
                </div>
                <div className="w-4/12 p-2">
                  <InputForm
                    name="email"
                    type="text"
                    register={register}
                    label="ایمیل کاربری"
                    icon={<MdTitle />}
                    required
                  />
                </div>
                <div className="flex mt-4 w-full justify-between">
                  <Button
                    variant="gradient"
                    color="green"
                    className="px-12"
                    onClick={handleSubmit(editUser)}
                  >
                    ثبت
                  </Button>
                  <Button
                    variant="gradient"
                    color="red"
                    className="px-12"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    انصراف
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex flex-wrap">
                  <div className="w-6/12 p-2 mt-2">
                    <span className="block text-gray-50">نام کاربری :</span>
                    <span className="px-3 mt-1 block py-1 rounded-md bg-gray-300">
                      {allData?.name}
                    </span>
                  </div>
                  <div className="w-6/12 p-2 mt-2">
                    <span className="block text-gray-50">ایمیل :</span>
                    <span className="px-3 mt-1 block py-1 rounded-md bg-gray-300">
                      {allData?.email}
                    </span>
                  </div>
                  <div className="w-6/12 p-2 mt-2">
                    <span className="block text-gray-50">شماره تلفن :</span>
                    <span className="px-3 mt-1 block py-1 rounded-md bg-gray-300">
                      {allData?.phone}
                    </span>
                  </div>
                  <div className="w-6/12 p-2 mt-2">
                    <span className="block text-gray-50">موقعیت کاربری :</span>
                    <span className="px-3 mt-1 block py-1 rounded-md bg-gray-300">
                      {allData?.role}
                    </span>
                  </div>
                </div>
                <div className="text-right w-full mt-4">
                  <Button
                    variant="gradient"
                    color="deep-orange"
                    className="px-12"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    ویرایش
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
