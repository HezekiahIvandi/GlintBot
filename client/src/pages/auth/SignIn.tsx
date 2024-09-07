import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div>
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
