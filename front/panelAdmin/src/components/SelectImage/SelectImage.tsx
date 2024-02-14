import { Dialog, DialogBody } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ImageType, PaginationType } from "../../types/type";
import ImagePage from "../ImagePage/ImagePage";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
type SelectImageType = {
  setImage: (value: { url: string }[]) => void;
  image: { url: string }[];
};
export default function SelectImage({ setImage, image }: SelectImageType) {
  const [open, setOpen] = useState<boolean>(false);
  const [allImages, setAllImage] = useState<ImageType[]>([]);
  const [paginations, setPaginations] = useState<PaginationType>();
  const getIamge = () => {
    axios
      .get("image")
      .then(({ data }) => {
        setPaginations(data.pagination), setAllImage(data.rows);
      })
      .catch(() => {
        toast.error("دانلود عکس با خطا روبرو شد");
      });
  };
  const clickHandler = (url: string) => {
    const check = image.some((i) => i.url === url);
    if (check) return toast.error("این عکس قبلا انتخاب شده است");
    setImage([...image, { url }]);
  };
  useEffect(() => {
    getIamge();
  }, []);
  return (
    <>
      <div className="w-full">
        <SubmitBtn
          value="انتخاب عکس"
          classPlus={"w-full flex justify-center"}
          type="button"
          onClick={() => setOpen(true)}
        />
      </div>
      <Dialog
        open={open}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        handler={setOpen}
        size={"lg"}
      >
        <DialogBody className="overflow-y-auto bg-gray-700 rounded-md">
          <div className="grid grid-cols-4 gap-3 mt-5">
            {allImages &&
              allImages.map((i) => (
                <figure
                  onClick={() => clickHandler(i.url)}
                  className="w-full relative bg-blue-gray-800 rounded-md cursor-pointer"
                  key={i.id}
                >
                  <img
                    src={import.meta.env.VITE_PUBLIC_URL + i.url}
                    alt="uploade"
                    className="rounded-md shadow-md h-52 object-cover"
                  />
                </figure>
              ))}
          </div>
          <div>
            <ImagePage
              setAll={setAllImage}
              allImage={allImages}
              pagination={paginations}
              setPagination={setPaginations}
            />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
