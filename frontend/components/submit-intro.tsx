import router from "next/router";
import React, { useContext } from "react";
import AnimatedButton from "./animated-button";
import { SignInContext, AuthContext } from "./context/auth-provider";

const StepHeading = ({ children }) => (
  <h2 className="text-md mb-2 mt-5 font-bold">{children}</h2>
);

interface SubmitIntroProps {
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmitIntro = ({ setReady }: SubmitIntroProps) => {
  const { userAuth, setShowSignIn } = useContext(AuthContext);

  return (
    <>
      <StepHeading>
        We want to make writing as easy as possible for you. Here’s how to write
        for HERD…
      </StepHeading>
      <StepHeading>1. Choose a topic</StepHeading>
      <p>
        The freedom is yours, but we’d recommend checking our current content
        for inspiration on style and substance.
      </p>
      <StepHeading>2. Five minute read</StepHeading>
      <p>
        This is our rough guideline to ensure your article is as appealing and
        engaging as possible to our readers. This usually equates to around 800
        – 1000 words.
      </p>
      <StepHeading>3. Title</StepHeading>
      <p>
        Choose a title you feel is fitting for the article you have just
        written. Struggling? Drop us a message, we’re happy to help.
      </p>
      <StepHeading>4. Cover photo and article images</StepHeading>
      <p>
        All articles need a cover photo. This can be an online non-copyright
        image, an illustration or a picture you personally own. For
        non-copyright images we recommend using Unsplash. For images saved to
        your device, you can use{" "}
        <a className="text-blue-800" target="_blank" href="https://imgbb.com/">
          https://imgbb.com/
        </a>{" "}
        to get an image link. You can insert images in the main body of your
        article by pasting a link.
      </p>
      <StepHeading>5. Questions</StepHeading>
      <p>
        We’re always happy to help. Just drop us a direct message on Instagram
        and we’ll be able to assist you.
      </p>
      <StepHeading>5. Submission</StepHeading>
      <p>
        Once you're happy with your draft, submit it and we'll check over it
        before approving it for the HERD.
      </p>
      <div className="text-center">
        <AnimatedButton
          variant="primary-outline"
          onClick={() => {
            if (userAuth) {
              setReady(true);
            } else {
              setShowSignIn(true);
            }
          }}
          className="mt-10 mb-5 px-8 py-3 uppercase"
        >
          <h4>I'm ready to write!</h4>
        </AnimatedButton>
      </div>
    </>
  );
};

export default SubmitIntro;
