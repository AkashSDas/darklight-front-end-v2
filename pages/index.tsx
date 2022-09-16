import { NextPage } from "next";

import { BaseAuthLoginPersist } from "@components/BaseAuthLoginPersist";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { fetchFromAPI } from "@lib/service";
import { selectToken } from "@store/base-auth/slice";
import { logoutThunk } from "@store/login/thunk";
import { selectUser } from "@store/user/slice";

const IndexPage: NextPage = () => {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);

  const handleClick = async () => {
    if (token) {
      const response = await fetchFromAPI("/base-auth/check-auth", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    }
  };

  const dispatch = useAppDispatch();
  const logoutUser = async () => {
    await dispatch(logoutThunk());
  };

  return (
    <div>
      <h1>{JSON.stringify(user)}</h1>

      <button
        onClick={handleClick}
        className="text-grey hover:bg-smoke py-2 px-4 rounded-full"
      >
        Check Auth
      </button>

      <BaseAuthLoginPersist>
        <h1>Protected Page</h1>
      </BaseAuthLoginPersist>

      <button
        onClick={logoutUser}
        className="text-grey hover:bg-smoke py-2 px-4 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default IndexPage;
