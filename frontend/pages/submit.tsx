import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
// import Editor from '../components/editor';

const Editor = dynamic(() => import("../components/editor"), {
  ssr: false,
});

const StepHeading = ({ children }) => (
  <h2 className="text-md font-bold mb-2 mt-5">{children}</h2>
);

function Submit() {
  const [ready, setReady] = useState(false);

  return (
    <div className="max-w-screen-sm mx-auto">
      <h1 className="text-3xl text-center text-bold">Submit an Article</h1>
      {!ready ? (
        <>
          <StepHeading>
            We want to make writing as easy as possible for you. Here’s how to
            write for HERD…
          </StepHeading>
          <StepHeading>1. Choose a topic</StepHeading>
          <p>
            The freedom is yours, but we’d recommend checking our current
            content for inspiration on style and substance.
          </p>
          <StepHeading>2. Five minute read</StepHeading>
          <p>
            This is our rough guideline to ensure your article is as appealing
            and engaging as possible to our readers. This usually equates to
            around 800 – 1000 words.
          </p>
          <StepHeading>3. Title</StepHeading>
          <p>
            Choose a title you feel is fitting for the article you have just
            written. Struggling? Drop us a message, we’re happy to help.
          </p>
          <StepHeading>4. Cover photo</StepHeading>
          <p>
            All articles need a cover photo. This can be an online non-copyright
            image, an illustration or a picture you personally own. For
            non-copyright images we recommend using Unsplash.
          </p>
          <StepHeading>5. Questions</StepHeading>
          <p>
            We’re always happy to help. Just drop us a direct message on
            Instagram or get in touch via the above email and we’ll be able to
            assist you.
          </p>
          <StepHeading>5. Submission</StepHeading>
          <p>
            Once you're happy with your draft, submit it and we'll check over it
            before hopefully approving it for the HERD.
          </p>
          <div className="text-center">
            <button
              onClick={() => setReady(true)}
              className="bg-green-600 text-white p-3 mt-10 mb-5 rounded-lg mx-auto"
            >
              Understood, let's go!
            </button>
          </div>
        </>
      ) : (
        <div>
          <Editor />
        </div>
      )}
    </div>
  );
}

export default Submit;
