import { NextPage } from "next";

import { useAppSelector } from "@hooks/store";
import { selectToken } from "@store/base-auth/slice";
import { selectUser } from "@store/user/slice";

const IndexPage: NextPage = () => {
  const user = useAppSelector(selectUser);
  return (
    <div>
      <h1>{JSON.stringify(user)}</h1>
    </div>
  );
};

export default IndexPage;
