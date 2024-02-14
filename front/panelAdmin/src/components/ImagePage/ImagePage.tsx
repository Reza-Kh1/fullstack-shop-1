import { FaPlus } from "react-icons/fa6";
import { ImageType, PaginationType } from "../../types/type";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";

type PaginationImageType = {
  pagination: PaginationType | undefined;
  setPagination: (value: PaginationType) => void;
  allImage: ImageType[];
  setAll: (value: ImageType[]) => void;
};
export default function ImagePage({
  pagination,
  setPagination,
  allImage,
  setAll,
}: PaginationImageType) {
  const nextPageImage = () => {
    if (!pagination?.nextPage) return;
    axios
      .get("image?page=" + pagination?.nextPage)
      .then(({ data }) => {
        setPagination(data.pagination);
        if (!data.rows) return;
        setAll([...allImage, ...data.rows]);
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div className="mt-3 flex justify-center">
      {pagination?.nextPage && (
        <Button type="button" onClick={nextPageImage} className="bg-blue-200 py-2 text-base text-gray-900 font-medium px-3 rounded-md hover:bg-orange-200 transition-all ">
          نمایش بیشتر
          <i>
            <FaPlus className="inline mr-2" />
          </i>
        </Button>
      )}
    </div>
  );
}
