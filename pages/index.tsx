import { NextPage } from "next";

import { BaseAuthLoginPersist } from "@components/BaseAuthLoginPersist";
import { useAppSelector } from "@hooks/store";
import { fetchFromAPI } from "@lib/service";
import { selectToken } from "@store/base-auth/slice";
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

  const logoutUser = async () => {
    if (token) {
      const response = await fetchFromAPI("/base-auth/logout", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    }
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
    </div>
  );
};

export default IndexPage;
