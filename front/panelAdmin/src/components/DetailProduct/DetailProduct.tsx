import { useForm } from "react-hook-form";
import InputForm from "../InputForm/InputForm";
import SelectImage from "../SelectImage/SelectImage";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function DetailProduct({ id }: { id: number }) {
  const { register, handleSubmit } = useForm();
  const [imgProduct, setImgProduct] = useState<{ url: string }[]>([]);
  const navigate = useNavigate();
  const createAction = () => {
    const body = {};
    axios
      .post(`product/detail/${id}`, body)
      .then(() => {
        toast.success("محصول ثبت شد"), navigate("/admin/product");
      })
      .catch(() => {
        toast.error(401);
      });
  };
  const deleteImage = (i: string) => {
    const newImg = imgProduct.filter((id) => id.url !== i);
    setImgProduct(newImg);
  };
  return (
    <div className="w-full mt-3">
      <h3 className="bg-blue-200 py-3 px-3 rounded-md shadow-md">
        اطلاعات محصول خود را تکمیل کنید
      </h3>
      <form className="flex flex-wrap" onSubmit={handleSubmit(createAction)}>
        <div className="w-1/2 p-2">
          <label className="block mb-1 mt-3 text-sm font-medium text-gray-800">
            سر برگ محصول
          </label>
          <InputForm
            name="title"
            placeholder="اجباری"
            register={register}
            required
            type="text"
          />
        </div>
        <div className="w-1/2 p-2">
          <div>
            <SelectImage setImage={setImgProduct} image={imgProduct} />
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
        </div>
      </form>
    </div>
  );
}

// "title": "ss",
// "keyward": ["qwq","qwdqw"],
// "srcImg": ["b skdbaksj","dsjadui"],
// "skillProduct": "ww",
// "text": "ee"
