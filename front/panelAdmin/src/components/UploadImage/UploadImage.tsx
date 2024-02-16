import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";
type UploadImageType = {
  setUpload?: (value: string) => void;
};
export default function UploadImage({ setUpload }: UploadImageType) {
  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files;
    if (!newFile) return;
    const formData = new FormData();
    for (let file of newFile) {
      formData.append("image", file);
    }
    axios
      .post("image", formData)
      .then(({ data }) => {
        toast.success("عکس با موفقیت افزوده شد");
        if (data.file.url && setUpload) {
          setUpload(data.file.url || "");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <label
      htmlFor="plus"
      className="w-full py-5 h-full rounded-md bg-orange-400 flex justify-center items-center shadow-md cursor-pointer"
    >
      <input type="file" onChange={uploadImage} id="plus" hidden />
      <i>
        <FaFileUpload className="text-gray-50 text-3xl" />
      </i>
    </label>
  );
}
