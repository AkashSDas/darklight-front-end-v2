import { useEffect, useRef, useState } from "react";

import { selectToken } from "@store/base-auth/slice";
import { selectInitLoading } from "@store/login/slice";
import { refreshThunk } from "@store/login/thunk";

import { useAppDispatch, useAppSelector } from "./store";
import toast from "react-hot-toast";

/**
 * This hook will run only once i.e. during the page's initial load
 */
export const useTokenRefresh = () => {
  const accessToken = useAppSelector(selectToken);
  const initLoading = useAppSelector(selectInitLoading);

  // To make sure that `token` i.e. access token has been set in the store
  // https://youtu.be/9YnZHQsWmJs?list=PL0Zuz27SZ-6P4dQUsoDatjEGpmBpcOW8V&t=1891
  const [isAccessTokenSet, setIsAccessTokenSet] = useState(true);

  /** To check if the useEffect already ran OR not */
  const effectRan = useRef(false);

  const dispatch = useAppDispatch();

  // This should run only once
  useEffect(() => {
    // To avoid issue with React 18 strict mode which mounts, unmounts and mounts again
    // https://youtu.be/9YnZHQsWmJs?list=PL0Zuz27SZ-6P4dQUsoDatjEGpmBpcOW8V&t=1807
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const refreshAccessToken = async () => {
        const response = await (await dispatch(refreshThunk())).payload;
        if (response === true) {
          setIsAccessTokenSet(true);
        } else {
          setIsAccessTokenSet(false);
        }
      };

      // When you refresh the page, the token in the store is null and to set it
      // we've to run refresh access token
      if (!accessToken) refreshAccessToken();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  // const effectRan2 = useRef(false);
  // useEffect(() => {
  //   if (effectRan2.current === true || process.env.NODE_ENV !== "development") {
  //     if ((!initLoading && !isAccessTokenSet) || !accessToken) {
  //       toast.error("Session expired. Please login");
  //     }
  //   }

  //   return () => {
  //     effectRan2.current = true;
  //   };
  // }, [initLoading, isAccessTokenSet, accessToken]);

  return { isAccessTokenSet, initLoading, accessToken };
};
