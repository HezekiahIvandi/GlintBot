import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex w-full justify-center mt-[4rem]">
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
