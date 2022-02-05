import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-custom-build";
import { SubmitPostData } from "../pages/edit-post";
import styles from "./post-content/post-body.module.css";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "strikethrough",
    "highlight",
    "|",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "insertTable",
    "|",
    "alignment",
    "outdent",
    "indent",
    "horizontalLine",
    "|",
    "imageInsert",
    "mediaEmbed",
    "findAndReplace",
    "undo",
    "redo",
    "sourceEditing",
  ],
  image: {
    toolbar: ["toggleImageCaption", "imageTextAlternative", "linkImage"],
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableCellProperties",
      "tableProperties",
    ],
  },
  alignment: {
    options: ["left", "center"],
  },
  mediaEmbed: { previewsInData: true },
};

interface EditorProps {
  postData: SubmitPostData;
  setPostData: React.Dispatch<React.SetStateAction<SubmitPostData>>;
}

const Editor = ({ postData, setPostData }: EditorProps) => {
  return (
    <>
      <div className={`mx-auto max-w-3xl ${styles.content}`}>
        <CKEditor
          editor={CustomEditor}
          config={editorConfiguration}
          data={postData.content}
          onChange={(_, editor) => {
            const data = editor.getData();
            setPostData({ ...postData, content: data });
          }}
        />
      </div>
    </>
  );
};

export default Editor;
