import { useEffect, useState } from "react";
import { ImageType, PaginationType } from "../../types/type";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa6";
import ImagePage from "../../components/ImagePage/ImagePage";
import UploadImage from "../../components/UploadImage/UploadImage";

export default function Upload() {
  const [paginations, setPaginations] = useState<PaginationType>();
  const [count, setCount] = useState<number>(0);
  const [allImage, setAllImage] = useState<ImageType[]>([]);
  const getData = () => {
    axios
      .get("image")
      .then(({ data }) => {
        setPaginations(data.pagination),
          setCount(data.count),
          setAllImage(data.rows);
      })
      .catch((err) => toast.error(err));
  };
  const deleteImage = (id: number) => {
    axios
      .delete("image/" + id)
      .then(() => {
        toast.success("عکس با موفقیت حذف شد");
        const newImage = allImage?.filter((i) => i.id !== id);
        setAllImage(newImage);
        if (count) {
          setCount((prev) => prev - 1);
        }
      })
      .catch(() => {
        toast.error("عکس حذف نشد");
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full">
      <div className="my-5">
        <h3 className="bg-blue-200 py-3 px-3 rounded-md shadow-md">
          {count?.toLocaleString("fa")} عکس
        </h3>
        <div className="grid grid-cols-4 gap-3 mt-5">
          {allImage &&
            allImage.map((i) => (
              <figure
                className="w-full relative bg-blue-gray-800 rounded-md"
                key={i.id}
              >
                <img
                  src={import.meta.env.VITE_PUBLIC_URL + i.url}
                  alt="uploade"
                  className="rounded-md shadow-md h-52 object-cover"
                />
                <i
                  onClick={() => deleteImage(i.id)}
                  className="absolute bottom-2 left-2 text-red-500 p-2 transition-all bg-[#f0f8ff3d] hover:bg-gray-900 hover:text-gray-100 rounded-md cursor-pointer"
                >
                  <FaTrash className="text-lg" />
                </i>
              </figure>
            ))}
        </div>
        <ImagePage
          setPagination={setPaginations}
          pagination={paginations}
          setAll={setAllImage}
          allImage={allImage}
        />
        <span className="bg-blue-200 py-3 px-3 rounded-md shadow-md block mt-5">
          افزودن عکس جدید
        </span>
        <div className="w-2/12 mt-5 h-28">
          <UploadImage />
        </div>
      </div>
    </div>
  );
}
