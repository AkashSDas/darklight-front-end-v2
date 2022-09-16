import { PropsWithChildren, useEffect, useRef } from "react";

import { useAppDispatch } from "@hooks/store";
import { userInitFetchThunk } from "@store/user/thunk";

export const SocialAuthPreFetch = ({ children }: PropsWithChildren<{}>) => {
  const dispatch = useAppDispatch();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      dispatch(userInitFetchThunk());
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  return <>{children}</>;
};
