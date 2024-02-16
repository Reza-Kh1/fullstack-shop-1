import { useForm } from "react-hook-form";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import InputForm from "../InputForm/InputForm";
import { useEffect, useState } from "react";
import { CategoryType, ProductType } from "../../types/type";
import { Checkbox, Option, Select } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import SelectImage from "../SelectImage/SelectImage";
import { FaTrash } from "react-icons/fa6";
import DetailProduct from "../DetailProduct/DetailProduct";

export default function CreateProduct() {
  const { register, handleSubmit } = useForm<ProductType>();
  const [category, setCategory] = useState<CategoryType[]>();
  const [selectCategory, setSelectCategory] = useState<string>();
  const [imgProduct, setImgProduct] = useState<{ url: string }[]>([]);
  const [status, setStatus] = useState<boolean>();
  const [detail, setDetail] = useState<ProductType>();
  const createAction = (form: ProductType) => {
    if (!selectCategory) return toast.error("دسته را مشخص کنید");
    const id = category?.find((i) => i.name === selectCategory);
    const body = {
      name: form.name,
      price: Number(form.price) === 0 ? null : Number(form.price),
      off: Number(form.off) === 0 ? null : Number(form.off),
      altImg: form.altImg ? form.altImg : null,
      srcImg: imgProduct.length ? imgProduct : null,
      slug: form.slug,
      total: Number(form.totel) === 0 ? null : Number(form.totel),
      description: form.description,
      categoryId: id?.id ? id.id : null,
      status: status || false,
    };
    axios
      .post("product", body)
      .then(({ data }) => {
        setDetail(data.data);
        toast.success("محصول با موفقیت ثبت شد");
      })
      .catch((err) => {
        toast.error(err);
      });
    // reset();
    // setSelectCategory("");
    // setImgProduct([]);
    // setStatus(false);
  };
  const getData = () => {
    axios
      .get("sub-category")
      .then(({ data }) => setCategory(data.data))
      .catch(() => toast.error("دریافت دسته ها با خطا روبرو شد!"));
  };
  const deleteImage = (i: string) => {
    const newImg = imgProduct.filter((id) => id.url !== i);
    setImgProduct(newImg);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full">
      <form className="flex flex-wrap" onSubmit={handleSubmit(createAction)}>
        <div className="w-1/2 p-2">
          <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
            نام محصول
          </label>
          <InputForm
            name="name"
            placeholder="اجباری"
            register={register}
            required
            type="text"
          />
        </div>
        <div className="w-1/2 p-2">
          <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
            قیمت محصول
          </label>
          <InputForm
            name="price"
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9]/g, "")
                .replace(/^0+/, "");
            }}
            placeholder="اختیاری"
            register={register}
            type="text"
          />
        </div>
        <div className="w-1/2 p-2">
          <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
            تخفیف
          </label>
          <InputForm
            name="off"
            placeholder="اختیاری"
            register={register}
            type="text"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
        </div>
        <div className="w-1/2 p-2">
          <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
            تعداد
          </label>
          <InputForm
            name="total"
            placeholder="اختیاری"
            classLabel=""
            register={register}
            type="text"
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9]/g, "")
                .replace(/^0+/, "");
            }}
          />
        </div>
        <div className="w-1/2 p-2">
          <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
            اسلاگ
          </label>
          <InputForm
            name="slug"
            placeholder="غیر تکراری و انگلیسی"
            register={register}
            required
            type="text"
          />
        </div>
        <div className="w-1/2 p-2">
          <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
            عنوان عکس
          </label>
          <InputForm
            name="altImg"
            placeholder="اختیاری"
            register={register}
            type="text"
          />
        </div>
        <div className="w-1/2 p-2">
          <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
            توضیحات
          </label>
          <textarea
            placeholder="اجباری"
            {...register("description", { required: true })}
            className="w-full p-2 rounded-md"
            rows={6}
          ></textarea>
        </div>
        <div className="w-1/2 p-2 flex flex-wrap">
          <div className="w-2/6 flex flex-col justify-center">
            <div
              style={{ direction: "ltr" }}
              className="flex items-center w-full mb-3"
            >
              {category && (
                <Select
                  onChange={(value: string) => setSelectCategory(value)}
                  label="انتخاب دسته اصلی"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  value={selectCategory}
                >
                  {category.map((i) => (
                    <Option value={i.name} key={i.id}>
                      {i.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
            <div>
              <SelectImage setImage={setImgProduct} image={imgProduct} />
            </div>
          </div>
          <div className="w-4/6 grid grid-cols-2 gap-2 p-2 items-center">
            {imgProduct &&
              imgProduct.map((i, index) => (
                <figure
                  key={index}
                  className="w-full relative h-32 bg-blue-gray-800 rounded-md"
                >
                  <img
                    src={import.meta.env.VITE_PUBLIC_URL + i.url}
                    className="w-full rounded-md shadow-md h-full object-cover"
                    alt=""
                  />
                  <i
                    onClick={() => deleteImage(i.url)}
                    className="absolute bottom-2 left-2 text-red-500 p-2 transition-all bg-[#f0f8ff3d] hover:bg-gray-900 hover:text-gray-100 rounded-md cursor-pointer"
                  >
                    <FaTrash className="text-lg" />
                  </i>
                </figure>
              ))}
          </div>
        </div>
        <div className="w-full flex justify-between">
          <SubmitBtn
            type="submit"
            classPlus={"w-1/12 flex justify-center text-base"}
            value="ثبت"
          />
          <Checkbox
            defaultChecked={status}
            onChange={() => setStatus((prev) => !prev)}
            label="منتشر شود ؟"
          />
        </div>
        {/* {detail?.id && <DetailProduct  />} */}
      </form>
      <DetailProduct id={4} />
    </div>
  );
}
