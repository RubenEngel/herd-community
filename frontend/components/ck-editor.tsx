import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomEditor from "../ckeditor5/build/ckeditor";
import { SubmitPostData } from "../pages/submit";

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
      <div className="max-w-3xl mx-auto">
        <CKEditor
          // {...props}
          editor={CustomEditor}
          config={editorConfiguration}
          data={postData.content}
          onChange={(_, editor) => {
            const data = editor.getData();
            setPostData({...postData, content: data});
          }}
          // onReady={(editor) => {
          //   console.log("Editor is ready to use!", editor);
          // }}
        />
      </div>
    </>
  );
};

export default Editor;
