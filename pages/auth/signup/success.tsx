import { useAppSelector } from "@hooks/store";
import { selectUser } from "@store/user/slice";

const SuccessPage = () => {
  const user = useAppSelector(selectUser);

  return <div>{JSON.stringify(user)}</div>;
};

export default SuccessPage;
