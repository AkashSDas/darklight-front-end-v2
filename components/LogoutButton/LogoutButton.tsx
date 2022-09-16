import { useAppDispatch } from "@hooks/store";
import { logoutThunk } from "@store/login/thunk";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const logoutUser = async () => await dispatch(logoutThunk());

  const styles = "text-grey hover:bg-smoke py-2 px-4 rounded-full";

  return (
    <button onClick={logoutUser} className={styles}>
      Logout
    </button>
  );
};
