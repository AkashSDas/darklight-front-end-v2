import { useAppDispatch } from "@hooks/store";
import { logoutThunk } from "@store/login/thunk";
import { socialLoggingOutThunk } from "@store/user/thunk";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const logoutUser = async () => {
    await dispatch(logoutThunk());
    await dispatch(socialLoggingOutThunk());
  };

  const styles = "text-grey hover:bg-smoke py-2 px-4 rounded-full";

  return (
    <button onClick={logoutUser} className={styles}>
      Logout
    </button>
  );
};
