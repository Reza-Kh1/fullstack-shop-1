import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import ImagePage from "../ImagePage/ImagePage";
import { ImageType, PaginationType } from "../../types/type";
import { FaTrash } from "react-icons/fa6";
import UploadImage from "../UploadImage/UploadImage";
type EditorType = {
  setEditor: (value: string) => void;
  editor: string;
};
const Editor = ({ setEditor, editor }: EditorType) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [open, setopen] = useState<boolean>(false);
  const [allImage, setAllimage] = useState<ImageType[]>();
  const [pagination, setPagination] = useState<PaginationType>();
  const [altValue, setAltValue] = useState("");
  const [imgClass, setImgClass] = useState("");
  const quillRef = useRef<any>();
  let number = 0;
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];
  const getImage = () => {
    axios
      .get("image")
      .then(({ data }) => {
        setAllimage(data.rows);
        setPagination(data.pagination);
      })
      .catch((err) => toast.error(err));
  };
  const addImage = () => {
    const quill = quillRef.current.getEditor();
    quill.focus();
    const selection = quill.getSelection();
    if (selection) {
      const cursorPosition = selection.index;
      quill.insertEmbed(cursorPosition, "image", {
        url: imageUrl,
        alt: altValue,
        class: imgClass,
      });
      quill.setSelection(cursorPosition + 1);
    }
  };
  const modules = {
    toolbar: {
      container: [
        ["link", "video", "image"],
        [{ font: ["sansrif", "roboto", "iranSans"] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
      ],
      imageResize: {
        displaySize: true,
      },
    },
  };
  useEffect(() => {
    getImage();
    let Font = Quill.import("formats/font");
    Font.whitelist = ["sansrif", "roboto", "iranSans"];
    Quill.register(Font, true);
    const CustomImage = Quill.import("formats/image");
    CustomImage.create = function (value: {
      url: string;
      alt: string;
      class: string;
    }) {
      let node = document.createElement("img");
      node.setAttribute("src", value.url);
      node.setAttribute("alt", value.alt);
      node.setAttribute("class", value.class);
      return node;
    };
    CustomImage.value = function (node: any) {
      return {
        url: node.getAttribute("src"),
        alt: node.getAttribute("alt"),
        class: node.getAttribute("class"),
      };
    };
    Quill.register(CustomImage, true);
    if (!number) {
      number++;
      const openDialog = () => setopen(true);
      const gor = document.querySelector(".ql-toolbar");
      const button = document.createElement("button");
      button.onclick = openDialog;
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
      <path d="M.002 2.5A1.5 1.5 0 0 1 1.5 1h13a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 .002 13.5V2.5zm1.5-.5a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-13z"/>
      <path d="M4.5 10.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-2zm2.5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>`;
      gor?.appendChild(button);
    }
  }, []);
  return (
    <>
      <div className="box-editor" style={{ direction: "ltr" }}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          formats={formats}
          value={editor}
          onChange={setEditor}
          modules={modules}
        />
      </div>
      <Dialog
        open={open}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        handler={setopen}
        size={"lg"}
      >
        <DialogBody className="bg-gray-900 rounded-t-md">
          {imageUrl ? (
            <>
              <span className="text-lg">عکس انتخاب شده</span>
              <figure className="relative w-1/3 mt-3">
                <img
                  src={imageUrl}
                  alt="uploade"
                  className="rounded-md h-52 w-full object-cover"
                />
                <i
                  onClick={() => setImageUrl(null)}
                  className="absolute bottom-2 left-2 text-red-500 p-2 transition-all bg-[#f0f8ff3d] hover:bg-gray-900 hover:text-gray-100 rounded-md cursor-pointer"
                >
                  <FaTrash className="text-lg" />
                </i>
              </figure>
            </>
          ) : (
            <div className="overflow-y-auto h-96 dialog-upload grid grid-cols-3 gap-3">
              {allImage &&
                allImage.map((i) => (
                  <figure
                    onClick={() =>
                      setImageUrl(import.meta.env.VITE_PUBLIC_URL + i.url)
                    }
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
          )}
          {!imageUrl && allImage && (
            <ImagePage
              allImage={allImage}
              setAll={setAllimage}
              pagination={pagination}
              setPagination={setPagination}
            />
          )}
        </DialogBody>
        <DialogFooter className="bg-gray-900 rounded-b-md flex justify-between">
          <div className="px-1 w-4/12">
            <input
              className="p-2 w-full text-sm rounded-md focus-visible:outline-none focus-visible:shadow-gray-700 shadow-md"
              type="text"
              onChange={({ target }) => setAltValue(target.value)}
              value={altValue}
              placeholder="کپشن عکس"
            />
          </div>
          <div className="px-1 w-4/12">
            <input
              type="text"
              className="p-2 w-full text-sm mr-2 rounded-md focus-visible:outline-none focus-visible:shadow-gray-700 shadow-md"
              placeholder="کلاس های عکس"
              onChange={({ target }) => setImgClass(target.value)}
              value={imgClass}
            />
          </div>
          <div className="px-1 w-2/12">
            <UploadImage setUpload={setImageUrl} />
          </div>
          <div className="px-1 w-1/12">
            <Button variant="gradient" color="blue" onClick={addImage}>
              افزودن
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default Editor;
