import { checkUsernameAvailableThunk } from "@store/signup-new/thunk";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./store";

/**
 * Hook to check if a username is available
 * @param username username to check if available
 * @param check if true, will check if username is available else not
 * @returns {Object} {usernameAvailable: boolean, usernameChecking: boolean}
 */
export const useUsernameAvailability = (
  username: string,
  check: boolean,
  l
) => {
  const { usernameAvailable, usernameChecking } = useAppSelector(
    (state) => state.signupNew
  );
  const dispatch = useAppDispatch();
  const effectRan = useRef(false);

  const checkUsername = useCallback(
    debounce(async (name) => {
      console.log("hi", name, check, l);
      if (check && l) {
        console.log("inn");
        await dispatch(checkUsernameAvailableThunk(name));
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      checkUsername(username);
    }

    return () => {
      effectRan.current = true;
    };
  }, [username]);

  return { usernameAvailable, usernameChecking };
};

/**
 * Hook to check if a email is available
 * @param email email to check if available
 * @param check if true, will check if email is available else not
 * @returns {Object} {emailAvailable: boolean, emailChecking: boolean}
 */
export const useEmailAvailability = (email: string, check: boolean) => {
  const { emailAvailable, emailChecking } = useAppSelector(
    (state) => state.signupNew
  );
  const dispatch = useAppDispatch();

  const checkEmail = useCallback(
    debounce(async (mail) => {
      if (check) {
        await dispatch(checkUsernameAvailableThunk(mail));
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkEmail(email);
  }, [email]);

  return { emailAvailable, emailChecking };
};
