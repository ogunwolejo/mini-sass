import AuthForm from "@/app/components/ui/organism/forms";

const SignUpPage = () => {
  return (
    <div
      id="sign-up-page"
      className="w-full h-full min-h-screen bg-background box-border pt-5"
    >
      <section
        id="bg-top"
        className="relative bg-teal rounded-xl w-auto mx-5 h-[530px]"
      >
        <div
          id="sign-up-form-container"
          className="absolute bottom-[-60%] lg:bottom-[-75%] left-1 md:left-1.5 lg:left-[25%] xl:left-[38%] w-[98%] lg:w-[500px] xl:w-[452px] shadow-xl border-none z-50 bg-white rounded-xl h-[713px]"
        >
          <AuthForm action="signUp" />
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
