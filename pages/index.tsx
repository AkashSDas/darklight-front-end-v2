import { LongIconButton } from "@components/Buttons/LongIconButton";
import { NextPage } from "next";
import Google from "@public/icons/google.svg";
import Facebook from "@public/icons/facebook.svg";
import Twitter from "@public/icons/twitter.svg";
import { SignupWithGoogleButton } from "@components/Buttons/SignupWithGoogleButton";

const IndexPage: NextPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignupWithGoogleButton />
    </div>
  );
};

export default IndexPage;
