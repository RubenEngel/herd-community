import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
// import Editor from '../components/editor';

const Editor = dynamic(() => import('../components/editor'), {
  ssr: false,
});

function Submit() {
  return (
    <>
      <h1>Submit an Article</h1>
      <h2>
        We want to make writing as easy as possible for you. Here’s how to write
        for HERD…
      </h2>
      <h2>1. Choose a topic</h2>
      <p>
        The freedom is yours, but we’d recommend checking our current content
        for inspiration on style and substance.
      </p>
      <h2>2. Five minute read</h2>
      <p>
        This is our rough guideline to ensure your article is as appealing and
        engaging as possible to our readers. This usually equates to around 800
        – 1000 words.
      </p>
      <h2>3. Title</h2>
      <p>
        Choose a title you feel is fitting for the article you have just
        written. Struggling? Drop us a message, we’re happy to help.
      </p>
      <h2>4. Cover photo</h2>
      <p>
        All articles need a cover photo. This can be an online non-copyright
        image, an illustration or a picture you personally own. For
        non-copyright images we recommend using Unsplash.
      </p>
      <h2>5. Questions</h2>
      <p>
        We’re always happy to help. Just drop us a direct message on Instagram
        or get in touch via the above email and we’ll be able to assist you.
      </p>
      <div>
        <Editor />
      </div>
    </>
  );
}

export default Submit;
