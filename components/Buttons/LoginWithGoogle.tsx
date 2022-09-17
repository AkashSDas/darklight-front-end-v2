import Google from "@public/icons/google.svg";

export const LoginWithGoogleButton = ({ label }: { label: string }) => {
  const handleClick = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/social-auth/google-login`,
      "_self"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="h-11 px-[2px] py-2 flex items-center bg-blue rounded-full hover:brightness-95 hover:animate-google-btn group"
    >
      <div className="px-2 py-2 flex items-center justify-center rounded-full bg-white group-hover:animate-google-icon">
        <Google />
      </div>
      <div className="mx-3 text-white">{label}</div>
    </button>
  );
};
