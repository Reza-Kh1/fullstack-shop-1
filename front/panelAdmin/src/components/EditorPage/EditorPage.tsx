import axios from "axios";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { toast } from "react-toastify";

const Editor = () => {
  const [value, setValue] = useState("");
  const [open, setopen] = useState<boolean>(false);
  const [opens, setopens] = useState<boolean>(false);
  const [allImage, setAllimage] = useState();
  const [altValue, setAltValue] = useState("");
  const [imgClass, setImgClass] = useState("");
  const quillRef = useRef();

  useEffect(() => {
    getImage();
    let Font = Quill.import("formats/font");
    Font.whitelist = ["sansrif", "roboto", "iranSans"];
    Quill.register(Font, true);
    const CustomImage = Quill.import("formats/image");
    CustomImage.create = function (value) {
      let node = document.createElement("img");
      node.setAttribute("src", value.url);
      node.setAttribute("alt", value.alt);
      node.setAttribute("class", value.class);
      return node;
    };
    Quill.register(CustomImage, true);

    const Link = Quill.import("formats/link");
    Link.create = function (value) {
      let node = Link.create(value);
      node.setAttribute("rel", value.rel);
      return node;
    };
    Quill.register(Link, true);
  }, []);
  const getImage = () => {
    axios
      .get("image")
      .then(({ data }) => {
        setAllimage(data.rows);
      })
      .catch((err) => toast.error(err));
  };
  const addImage = (url) => {
    const quill = quillRef.current.getEditor();
    quill.focus();
    const selection = quill.getSelection();
    if (selection) {
      const cursorPosition = selection.index;
      quill.insertEmbed(cursorPosition, "image", {
        url,
        alt: altValue,
        class: imgClass,
      });
      quill.setSelection(cursorPosition + 1);
    }
  };
  const addLink = () => {
    const quill = quillRef.current.getEditor();
    quill.focus();
    const selection = quill.getSelection();
    if (selection) {
      const cursorPosition = selection.index;
      quill.insertText(cursorPosition, altValue, "link", imgClass);
      quill.setSelection(cursorPosition + altValue.length);
    }
  };
  const modules = {
    toolbar: [
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
      ["link", "image", "video"],
    ],
  };

  return (
    <>
      <div className="containers">
        <div className="row">
          <button onClick={() => setopen(true)}>image</button>
          <button onClick={() => setopens(true)}>link</button>
          <div className="editor">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              className="editor-input"
              value={value}
              onChange={setValue}
              modules={modules}
            />
          </div>
          <div className="preview">{value}</div>
        </div>
      </div>
      <Dialog
        open={open}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        handler={setopen}
        size={"md"}
      >
        <DialogBody className="overflow-y-auto bg-gray-700 rounded-md">
          {allImage &&
            allImage.map((i) => (
              <figure
                onClick={() =>
                  addImage(import.meta.env.VITE_PUBLIC_URL + i.url)
                }
                className="w-full relative bg-blue-gray-800 rounded-md"
                key={i.id}
              >
                <img
                  src={import.meta.env.VITE_PUBLIC_URL + i.url}
                  alt="uploade"
                  className="rounded-md shadow-md h-52 object-cover"
                />
              </figure>
            ))}
          <input
            type="text"
            onChange={({ target }) => setAltValue(target.value)}
            value={altValue}
          />
          <input
            type="text"
            placeholder="class"
            onChange={({ target }) => setImgClass(target.value)}
            value={imgClass}
          />
        </DialogBody>
      </Dialog>
      <Dialog
        open={opens}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        handler={setopens}
        size={"md"}
      >
        <DialogBody className="overflow-y-auto bg-gray-700 rounded-md">
          <input
            type="text"
            placeholder="href"
            onChange={({ target }) => setAltValue(target.value)}
            value={altValue}
          />
          <input
            type="text"
            placeholder="rel"
            onChange={({ target }) => setImgClass(target.value)}
            value={imgClass}
          />
          <button onClick={addLink}>add</button>
        </DialogBody>
      </Dialog>
    </>
  );
};
export default Editor;
