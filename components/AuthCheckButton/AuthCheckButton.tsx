import { useAppSelector } from "@hooks/store";
import { fetchFromAPI } from "@lib/service";
import { selectToken } from "@store/base-auth/slice";
import { selectUser } from "@store/user/slice";
import toast from "react-hot-toast";

export const AuthCheckButton = () => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);

  const handleClick = async () => {
    if (token || user) {
      const response = await fetchFromAPI("/base-auth/check-auth", {
        method: "GET",
        headers: {
          authorization: token ? `Bearer ${token}` : null,
        },
      });

      if (response.error) {
        toast.error(response.msg);
      } else {
        toast.success(response.msg);
      }
    }
  };

  const styles = "text-grey hover:bg-smoke py-2 px-4 rounded-full";

  return (
    <button onClick={handleClick} className={styles}>
      Check Auth
    </button>
  );
};
