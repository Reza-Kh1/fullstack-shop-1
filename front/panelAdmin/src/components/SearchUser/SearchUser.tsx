import { useForm } from "react-hook-form";
import InputForm from "../InputForm/InputForm";
import { MdTitle } from "react-icons/md";
import { Option, Select } from "@material-tailwind/react";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import { useState } from "react";
type CreateUserType = {
  name: string;
  email: string;
  phone: string;
};
export default function SearchUser({
  setSearch,
}: {
  setSearch: (value: any) => void;
}) {
  const [selectRole, setSelectRole] = useState<string>();
  const [selectOrder, setSelectOrder] = useState<string>();
  const { register, handleSubmit, reset } = useForm<CreateUserType>();
  const searchUser = (form: CreateUserType) => {
    const params = new URLSearchParams();
    if (form.name) {
      params.append("name", form.name);
    }
    if (form.email) {
      params.append("email", form.email);
    }
    if (selectOrder) {
      params.append("order", selectOrder);
    }
    if (selectRole) {
      params.append("role", selectRole);
    }
    if (form.phone) {
      params.append("phone", form.phone);
    }
    const query = params.toString();
    setSearch(query);
  };

  return (
    <div>
      <div>
        <form className="flex flex-wrap justify-between" onSubmit={handleSubmit(searchUser)}>
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
              value={selectRole}
            >
              <Option value={"USER"}>کاربر</Option>
              <Option value={"AUTHOR"}>نویسنده</Option>
              <Option value={"ADMIN"}>ادمین</Option>
            </Select>
          </div>
          <div
            className="w-1/6 p-2 flex items-end"
            style={{ direction: "ltr" }}
          >
            <Select
              onChange={(value: string) => setSelectOrder(value)}
              label="مرتب سازی براساس"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              value={selectOrder}
            >
              <Option value={"ASC"}>قدیمی ترین</Option>
              <Option value={"DESC"}>جدید ترین</Option>
            </Select>
          </div>
          <div className="w-full flex justify-between mb-3">
            <div className="w-1/6 mt-3">
              <SubmitBtn
                value="اعمال فیلتر"
                type="submit"
                classPlus={"w-full flex justify-center"}
              />
            </div>
            <div className="w-1/6 mt-3">
              <SubmitBtn
                classPlus={
                  "to-[#7b0015] from-[#6c3d3d] hover:from-[#3c2223] hover:to-[#6c0718] mx-auto w-full flex justify-center"
                }
                onClick={() => {
                  setSearch(null),
                    reset(),
                    setSelectOrder(""),
                    setSelectRole("");
                }}
                value="حذف فیلتر"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
