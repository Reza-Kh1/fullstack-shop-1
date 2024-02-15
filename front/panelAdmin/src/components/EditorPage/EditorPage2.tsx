import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef, useState } from "react";
export default function EditorPage2() {
  const [isMounted, setIsMounted] = useState<boolean>();
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
    const ColorPlugin = (await import("editorjs-text-color-plugin")).default;
    const Link = (await import("@editorjs/link")).default;
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
          quote: Quote,
          code: Code,
          rawHtml: Raw,
          fontSize: FontSize,
          warning: Warning,
          Color: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              customPicker: true, // add a button to allow selecting any colour
            },
          },
          Marker: {
            class: Marker,
          },
          linkTool: {
            class: Link,
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: `${import.meta.env.VITE_PUBLIC_API}image`,
                byUrl: `http://localhost:5000/api-v1/image`,
              },
            },
            inlineToolbar: true,
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
        style={{ direction: "ltr" }}
      ></div>
      <button onClick={save} type="button">
        save
      </button>
    </>
  );
}
