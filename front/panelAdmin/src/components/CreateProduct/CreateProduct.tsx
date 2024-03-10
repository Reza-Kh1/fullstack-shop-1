import { useForm } from "react-hook-form";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import InputForm from "../InputForm/InputForm";
import { useEffect, useState } from "react";
import { CategoryType, ProductDetailType, ProductType } from "../../types/type";
import { Button, Checkbox, Option, Select } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa6";
import DetailProduct from "../DetailProduct/DetailProduct";
import DialogImage from "../DialogImage/DialogImage";
import EndOff from "../EndOff/EndOff";
export default function CreateProduct({ infoProduct }: { infoProduct?: any }) {
  const { register, handleSubmit, setValue, getValues } = useForm<ProductType>();
  const [category, setCategory] = useState<CategoryType[]>();
  const [moreInfo, setMoreInfo] = useState<string[]>([])
  const [endOff, setEndOff] = useState<any>()
  const [selectCategory, setSelectCategory] = useState<string>(
    infoProduct?.subCategory?.name || ""
  );
  const [allImage, setAllImage] = useState<string[]>([]);
  const [imgProduct, setImgProduct] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(infoProduct?.status || false);
  const [response, setResponse] = useState<ProductDetailType | null>(null);
  const [idProduct, setIdProduct] = useState<any>();
  const createAction = (form: ProductType) => {
    if (!selectCategory) return toast.error("دسته را مشخص کنید");
    const id = category?.find((i) => i.name === selectCategory);
    const body = {
      name: form.name,
      price: Number(form.price) === 0 ? null : Number(form.price),
      off: Number(form.off) === 0 ? null : Number(form.off),
      altImg: form.altImg ? form.altImg : null,
      srcImg: allImage,
      slug: form.slug,
      totel: Number(form.totel) === 0 ? null : Number(form.totel),
      description: form.description,
      categoryId: id?.id ? id.id : null,
      status: status || false,
      endOff,
      moreInfo
    };    
    if (infoProduct?.slug) {
      axios
        .put(`product/${infoProduct?.slug}`, body)
        .then(() => {
          toast.success("محصول با موفقیت به روزرسانی شد");
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      axios
        .post("product", body)
        .then(({ data }) => {
          setIdProduct(data.data.id);
          toast.success("محصول با موفقیت ثبت شد");
        })
        .catch((err) => {
          toast.error(err);
          console.log(err);
          
        });
    }
  };
  const getData = () => {
    axios
      .get("sub-category")
      .then(({ data }) => setCategory(data.data))
      .catch(() => toast.error("دریافت دسته ها با خطا روبرو شد!"));
  };
  const deleteImage = (i: string) => {
    const newImg = allImage.filter((id) => id !== i);
    setAllImage(newImg);
  };
  const deleteHandler = (value: string) => {
    const newData = moreInfo.filter((item) => item !== value)
    setMoreInfo(newData)
  }
  const createHandler = () => {
    const value = getValues("more")
    setMoreInfo([...moreInfo, value])
    setValue("more", "")
  }
  useEffect(() => {
    if (imgProduct) {
      allImage.push(imgProduct);
    }
  }, [imgProduct]);
  useEffect(() => {
    getData();
    if (infoProduct) {
      infoProduct?.srcImg;
      setValue("totel", infoProduct?.totel || 0);
      setValue("off", infoProduct?.off || 0);
      setValue("price", infoProduct?.price || 0);
      setValue("name", infoProduct?.name || "");
      setValue("description", infoProduct?.description || "");
      setValue("slug", infoProduct?.slug || "");
      setValue("altImg", infoProduct?.altImg || "");
      setEndOff(infoProduct?.endOff)
      setMoreInfo(infoProduct?.moreInfo || [])
      if (infoProduct.detailProduct) {
        setResponse(infoProduct?.detailProduct || null);
      }
      setIdProduct(infoProduct.id);
      setAllImage(infoProduct?.srcImg);
    }
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
        <div className="w-1/3 p-2">
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
        <div className="w-1/3 p-2">
          <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
            زمان تخفیف
          </label>
          <EndOff date={endOff} setDate={setEndOff} />
        </div>
        <div className="w-1/3 p-2">
          <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
            تعداد
          </label>
          <InputForm
            name="totel"
            placeholder="اختیاری"
            classLabel=""
            register={register}
            type="text"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
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
              <SubmitBtn
                type="button"
                value="انتخاب عکس"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
          <div className="w-4/6 grid grid-cols-2 gap-2 p-2 items-center">
            {allImage &&
              allImage.map((i, index) => (
                <figure
                  key={index}
                  className="w-full relative h-32 bg-blue-gray-800 rounded-md"
                >
                  <img
                    src={i}
                    className="w-full rounded-md shadow-md h-full object-cover"
                    alt=""
                  />
                  <i
                    onClick={() => deleteImage(i)}
                    className="absolute bottom-2 left-2 text-red-500 p-2 transition-all bg-[#f0f8ff3d] hover:bg-gray-900 hover:text-gray-100 rounded-md cursor-pointer"
                  >
                    <FaTrash className="text-lg" />
                  </i>
                </figure>
              ))}
          </div>
        </div>
        <div className="w-full p-2">
          <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
            ایتم ویژه
          </label>
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-4/12">
              <textarea
                placeholder="وزن : 150 گرم"
                {...register("more")}
                className="w-full p-2 rounded-md"
                rows={1}
              ></textarea>
              <Button varient="gradient" color="blue" className="px-3 py-2" onClick={createHandler}>افزودن</Button>
            </div>
            <div className="flex flex-wrap w-8/12 gap-2 pr-2">
              {moreInfo.length ? (
                <>
                  {moreInfo.map((i, index) => (
                    <div key={index} className="p-2 flex rounded items-center bg-gray-100">
                      <p className="text-xs ml-1">
                        {i}
                      </p>
                      <i
                        onClick={() => deleteHandler(i)}
                        className="text-red-500 p-2 transition-all bg-[#f0f8ff3d] hover:bg-gray-900 hover:text-gray-100 rounded-md cursor-pointer"
                      >
                        <FaTrash className="text-lg" />
                      </i>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
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
      </form>
      {response ? (
        <DetailProduct detail={response} id={idProduct} />
      ) : idProduct ? (
        <DetailProduct id={idProduct} />
      ) : null}
      <DialogImage open={open} setOpen={setOpen} setUrl={setImgProduct} />
    </div>
  );
}
