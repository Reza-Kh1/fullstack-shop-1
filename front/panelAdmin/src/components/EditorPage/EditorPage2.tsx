import EditorJS from "@editorjs/editorjs";
import { Dialog, DialogBody } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa6";
import { toast } from "react-toastify";
export default function EditorPage2() {
  const [isMounted, setIsMounted] = useState<boolean>();
  const [value, setValue] = useState("");
  const [open, setopen] = useState<boolean>(false);
  const [allImage, setAllimage] = useState();
  const [altValue, setAltValue] = useState("");
  const [imgClass, setImgClass] = useState("");

  const ref = useRef<EditorJS>();
  const initEditor = async () => {
    const EditorJs = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Table = (await import("@editorjs/table")).default;
    const Checklist = (await import("@editorjs/checklist")).default;
    const Delimiter = (await import("@editorjs/delimiter")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const List = (await import("@editorjs/list")).default;
    const Marker = (await import("@editorjs/marker")).default;
    const Paragraph = (await import("@editorjs/paragraph")).default;
    const Quote = (await import("@editorjs/quote")).default;
    const Image = (await import("@editorjs/image")).default;
    const Raw = (await import("@editorjs/raw")).default;
    const Warning = (await import("@editorjs/warning")).default;
    const Code = (await import("@editorjs/code")).default;
    const FontSize = (await import("editorjs-inline-font-size-tool")).default;
    const TextColor = (await import("editorjs-text-color-plugin")).default;
    if (!ref.current) {
      const editor = new EditorJs({
        holder: "editorjs",
        tools: {
          header: {
            class: Header,
          },
          table: Table,
          checklist: Checklist,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          list: List,
          marker: Marker,

          quote: Quote,
          code: Code,
          rawHtml: Raw,
          fontSize: FontSize,
          textColor: TextColor,
          warning: Warning,
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: "http://localhost:5000/api-v1/image",
              },
            },
          },
        },
        inlineToolbar: true,
      });
      ref.current = editor;
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initEditor();
    };
    if (isMounted) {
      init();
      return () => {
        if (ref.current) {
          ref.current.destroy();
        }
      };
    }
  }, [isMounted]);
  const save = () => {
    if (ref.current) {
      ref.current.save().then((data) => {
        console.log(data);
        console.log("json", JSON.stringify(data));
      });
    }
  };
  return (
    <>
      <div
        id="editorjs"
        className="max-w-full min-h-screen border shadow-md"
      ></div>
      <button onClick={save} type="button">
        save
      </button>
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
    </>
  );
}
