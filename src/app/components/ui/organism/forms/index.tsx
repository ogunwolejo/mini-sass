"use client";

import {NamedExoticComponent, memo} from "react";
import {SignInForm} from "@/app/components/ui/organism/forms/auth/signin.form";
import {SignUpForm} from "@/app/components/ui/organism/forms/auth/signup.form";

type Props = {
  action: "signIn" | "signUp";
};

const AuthForm: NamedExoticComponent<Props> = memo(({action}) =>
  action === "signIn" ? <SignInForm /> : <SignUpForm />,
);

export default AuthForm;
