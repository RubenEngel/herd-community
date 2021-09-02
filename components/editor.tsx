import React, { Component } from 'react';
// When you add the ckeditor5 folder you can import it this way
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfiguration = {
  // toolbar: ['bold', 'italic', '|', 'undo'],
};

const Editor = (props) => (
  <div className="max-w-3xl m-auto mt-10 h-75-screen">
    <CKEditor
      {...props}
      editor={ClassicEditor}
      config={editorConfiguration}
      data="<p>Hello from CKEditor 5!</p>"
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor);
      }}
    />
  </div>
);

export default Editor;
