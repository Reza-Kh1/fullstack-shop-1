import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";

export default function UploadImage() {
  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const formData = new FormData();
    for (let file of files) {
      formData.append("file", file);
    }
    axios
      .post("image", formData)
      .then(() => {
        toast.success("عکس ها ذخیره شدند");
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <div>
      <span className="bg-blue-200 py-3 px-3 rounded-md shadow-md block mt-5">
        افزودن عکس جدید
      </span>
      <label
        htmlFor="plus"
        className="w-2/12 h-28 rounded-md bg-orange-400 flex justify-center items-center shadow-md mt-3 cursor-pointer"
      >
        <input type="file" multiple onChange={uploadImage} id="plus" hidden />
        <i>
          <FaFileUpload className="text-gray-50 text-3xl" />
        </i>
      </label>
    </div>
  );
}
