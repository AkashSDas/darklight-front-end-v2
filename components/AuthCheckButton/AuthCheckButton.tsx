import { useAppSelector } from "@hooks/store";
import { fetchFromAPI } from "@lib/service";
import { selectToken } from "@store/base-auth/slice";

export const LogoutButton = () => {
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

  const styles = "text-grey hover:bg-smoke py-2 px-4 rounded-full";

  return (
    <button onClick={handleClick} className={styles}>
      Check Auth
    </button>
  );
};
