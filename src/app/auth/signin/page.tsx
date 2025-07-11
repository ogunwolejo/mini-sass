import AuthForm from "@/app/components/ui/organism/forms";

const SignInPage = () => {
  return (
    <div
      id="sign-in-page"
      className="w-full h-full min-h-screen bg-background box-border"
    >
      <div className="w-full h-full flex flex-col md:flex-row justify-center md:justify-start items-center">
        <section id="sign_in_form_section" className="w-full md:w-[60%]">
          <AuthForm action="signIn" />
        </section>
        <section
          id="sign_in_empty_right_side"
          className="h-full hidden md:block"
        >
          <div className="absolute top-0 right-0 w-[40%] h-[80%] bg-teal rounded-bl-xl"></div>
        </section>
      </div>
    </div>
  );
};

export default SignInPage;
