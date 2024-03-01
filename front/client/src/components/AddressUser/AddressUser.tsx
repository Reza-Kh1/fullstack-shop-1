"use client";
import React, { useEffect, useState } from "react";
// import SubmitButton from "../Button/SubmitButton";
import { fetchApi } from "@/action/fetchApi";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import InputCustom from "../InputCustom/InputCustom";
type dataTypeAddres = {
  name: string;
  address: string;
  city: string;
  id: number;
  phone: string;
  postalCode: string;
  town: string;
};
export default function AddressUser() {
  const { data }: any = useSession();
  const [dataForm, setDataForm] = useState<dataTypeAddres | null>(null);
  let num = 0;
  const getData = async () => {
    if (num) return;
    num++;
    const token = data?.user?.token;
    if (token) {
      const res = await fetchApi({ url: "address", cache: "no-store", token });
      if (res.error) {
        toast.warning(res.error);
      } else {
        setDataForm(res.data);
      }
    }
  };
  const createAddress = async (form: FormData) => {
    const name = form.get("name") as string;
    const phone = form.get("phone") as string;
    const city = form.get("city") as string;
    const town = form.get("town") as string;
    const postalCode = form.get("postal") as string;
    const address = form.get("address") as string;
    const url = dataForm?.id ? `address/${dataForm?.id}` : "address";
    const method = dataForm?.id ? "PUT" : "POST";
    const body = {
      name,
      phone,
      city,
      town,
      postalCode,
      address,
    };
    const token = data?.user?.token;
    if (token) {
      const res = await fetchApi({
        url,
        body,
        method,
        token,
      });
      if (res.error) {
        toast.warning(res.error);
      } else {
        toast.success(res.message || "عملیات موفقیت آمیز بود");
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full mt-5">
      <div className="w-full p-2 rounded-md bg-bg-head-dark dark:bg-bg-head-light shadow-md mb-4">
        <h3 className="text-h1-light dark:text-h1-dark">
          آدرس خود را وارد کنید
        </h3>
      </div>
      <form action={createAddress}>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <InputCustom
              defaultValue={dataForm?.name}
              value="نام تحویل گیرنده :"
              name="name"
              placeholder="اسم و فامیل کامل نوشته شود"
            />
          </div>
          <div>
            <InputCustom
              defaultValue={dataForm?.phone}
              value="شماره تلفن :"
              name="phone"
              placeholder="09390199977"
            />
          </div>
          <div>
            <InputCustom
              defaultValue={dataForm?.city}
              value="شهر خود را وارد کنید :"
              name="city"
              placeholder="تهران"
            />
          </div>
          <div>
            <InputCustom
              value="شهرستان :"
              defaultValue={dataForm?.town}
              name="town"
              placeholder="شهریار"
            />
          </div>
          <div>
            <InputCustom
              defaultValue={dataForm?.postalCode}
              value="کدپستی :"
              name="postal"
              placeholder="187559624"
            />
          </div>
        </div>
        <div>
          <InputCustom
            value="آدرس خود را دقیق وارد نمایید :"
            textarea
            rows={6}
            defaultValue={dataForm?.address}
            placeholder={"تهران-خیابان ستارخان-کوچه لاله-پلاک 13-واحد4"}
            name={"address"}
          />
        </div>
        <div className="w-full">
          {/* <SubmitButton
            color="green"
            value="ذخیره"
            types="submit"
            classs="w-1/6"
          /> */}
        </div>
      </form>
    </div>
  );
}
