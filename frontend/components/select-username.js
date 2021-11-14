import React, { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../lib/context";
import debounce from "lodash.debounce";
import { firestore } from "../lib/firebase";

function SelectUsername() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tooShort, setTooShort] = useState(true);
  const [status, setStatus] = useState("");

  const { user, userName } = useContext(UserContext);

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
      setTooShort(true);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
      setTooShort(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.collection("users").doc(user.uid);
    const newUsernameDoc = firestore.collection("usernames").doc(formValue);
    let oldUsernameDoc = null;

    const userDocData = await userDoc.get();
    if (userDocData.exists) {
      const oldUsername = userDocData.data().username;
      oldUsernameDoc = firestore.collection("usernames").doc(oldUsername);
    }

    // Commit both docs together as a batch write and delete old username.
    const batch = firestore.batch();
    if (oldUsernameDoc) batch.delete(oldUsernameDoc);
    batch.set(newUsernameDoc, { uid: user.uid });
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    await batch.commit();

    setStatus("Username set successfully");
    setTimeout(() => {
      setStatus("");
    }, 1000);
  };

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 600),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  return (
    <div className="m-8 text-center">
      <section>
        <h3>Select Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder={username || "usernames"}
            value={formValue}
            onChange={onChange}
            type="text"
            className="text-xl text-center border-b-2 border-primary m-2"
          />
          <UsernameMessage
            username={username}
            formValue={formValue}
            isValid={isValid}
            loading={loading}
            tooShort={tooShort}
          />
          <p className="text-green-600">{status}</p>
          <div>
            <button
              type="submit"
              disabled={!isValid}
              className="bg-primary text-md text-secondary py-1 px-3 rounded-md m-2 focused:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function UsernameMessage({ formValue, isValid, loading, tooShort, username }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid && formValue !== username) {
    return <p className="text-green-600">{formValue} is available!</p>;
  } else if (formValue && tooShort) {
    return <p>That username is too short</p>;
  } else if (formValue && !isValid) {
    return <p className="text-red-600">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}

export default SelectUsername;