import { useEffect, useState } from "react";
import { ImageType, PaginationType } from "../../types/type";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ImagePage from "../ImagePage/ImagePage";
import UploadImage from "../UploadImage/UploadImage";
import axios from "axios";
import { toast } from "react-toastify";
type DialogImageType = {
  setOpen: (value: boolean) => void;
  open: boolean;
  setUrl: (value: string) => void;
};
export default function DialogImage({
  setOpen,
  open,
  setUrl,
}: DialogImageType) {
  const [allImage, setAllimage] = useState<ImageType[]>();
  const [pagination, setPagination] = useState<PaginationType>();
  const getImage = () => {
    axios
      .get("image")
      .then(({ data }) => {
        setPagination(data.pagination), setAllimage(data.rows);
      })
      .catch((err) => toast.error(err));
  };
  useEffect(() => {
    getImage();
  }, []);
  return (
    <Dialog
      open={open}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      handler={setOpen}
      size={"lg"}
    >
      <DialogBody className="bg-gray-900 rounded-t-md">
        <div className="overflow-y-auto h-96 dialog-upload grid grid-cols-3 gap-3">
          {allImage &&
            allImage.map((i) => (
              <figure
                onClick={() => setUrl(import.meta.env.VITE_PUBLIC_URL + i.url)}
                className="w-full relative cursor-pointer"
                key={i.id}
              >
                <img
                  src={import.meta.env.VITE_PUBLIC_URL + i.url}
                  alt="uploade"
                  className="rounded-md h-40 object-cover"
                />
              </figure>
            ))}
        </div>
        {allImage && (
          <ImagePage
            allImage={allImage}
            setAll={setAllimage}
            pagination={pagination}
            setPagination={setPagination}
          />
        )}
      </DialogBody>
      <DialogFooter className="bg-gray-900 rounded-b-md flex justify-between">
        <div className="px-1 w-2/12">
          <UploadImage setUpload={setUrl} />
        </div>
      </DialogFooter>
    </Dialog>
  );
}
