import Link from "next/link";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/store";
import { selectToken } from "@store/base-auth/slice";
import { selectInitLoading } from "@store/login/slice";
import { refreshThunk } from "@store/login/thunk";

export const BaseAuthLoginPersist = ({ children }: PropsWithChildren<{}>) => {
  // To make sure that `token` i.e. access token has been set in the store
  // https://youtu.be/9YnZHQsWmJs?list=PL0Zuz27SZ-6P4dQUsoDatjEGpmBpcOW8V&t=1891
  const [success, setSuccess] = useState(true);

  const token = useAppSelector(selectToken);
  const initLoading = useAppSelector(selectInitLoading);
  const dispatch = useAppDispatch();

  /** To check if the useEffect already ran OR not */
  const effectRan = useRef(false);

  // This should run only once
  useEffect(() => {
    // To avoid issue with React 18 strict mode which mounts, unmounts and mounts again
    // https://youtu.be/9YnZHQsWmJs?list=PL0Zuz27SZ-6P4dQUsoDatjEGpmBpcOW8V&t=1807
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const refreshAccessToken = async () => {
        console.log("Refreshing access token");
        const response = await (await dispatch(refreshThunk())).payload;
        if (response === true) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      };

      // When you refresh the page, the token in the store is null and to set it
      // we've to run refresh access token
      if (!token) refreshAccessToken();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  if (initLoading) return <div>Loading...</div>;
  if ((!initLoading && !success) || !token)
    return (
      <div>
        <h1>Session expired. Please login</h1>
        <Link href="/auth/login">Login</Link>
      </div>
    );

  return <>{children}</>;
};
