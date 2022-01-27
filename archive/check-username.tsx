// Hit the database for username match after each debounced change

import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import InputBox from "../components/input-box";

const InputUsername: React.FC<{
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({}) => {
  const [username, setUsername] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    checkUsername(username);
  }, [username]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        setIsValid(!exists);
        setLoading(false);
      }
    }, 600),
    []
  );

  return (
    <>
      <label className="font-serif text-sm pl-2">Username</label>
      <div>
        <InputBox
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    </>
  );
};
