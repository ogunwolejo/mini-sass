"use client";

import {memo, useState} from "react";
import {Label} from "@/app/components/ui/atoms/label";
import {Button} from "@/app/components/ui/atoms/button";
import {Input} from "@/app/components/ui/atoms/input";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {IconButton} from "@/app/components/ui/atoms/icon.button";
import {FcGoogle} from "react-icons/fc";
import {FaFacebookF} from "react-icons/fa";
import {FaLinkedinIn} from "react-icons/fa";
import {HiOutlineEye, HiOutlineEyeSlash} from "react-icons/hi2";
import {emailSchema, passwordSchema} from "@/lib/zod.schema";
import {ErrorMessage} from "@/app/components/ui/atoms/error.message";
import {useSignIn} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {CLERK_ERROR_MSG} from "@/lib/clerk.utils";
import ShowLoader from "@/app/components/ui/atoms/showLoader";
import {error} from "next/dist/build/output/log";
import {OAuthStrategy} from "@clerk/types";

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export const SignInForm = memo(() => {
  const [securePassword, setSecurePassword] = useState<boolean>(false);
  const {isLoaded, signIn, setActive} = useSignIn();
  const router = useRouter();
  const [processing, setProcessing] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleTogglePasswordSecurity = () => {
    setSecurePassword((cur) => !cur);
  };
  const handleOnSubmit = async (data: z.infer<typeof schema>) => {
    if (!isLoaded) {
      setError("root", {
        message: CLERK_ERROR_MSG,
      });
      return;
    }

    try {
      setProcessing(true);
      if (!signIn) {
        setError("root", {
          message: CLERK_ERROR_MSG,
        });
        return;
      }

      const {email, password} = data;
      const attemptSignIn = await signIn.create({
        password,
        identifier: email,
      });

      if (attemptSignIn.status === "complete") {
        await setActive({session: attemptSignIn.createdSessionId});
        router.replace("/dashboard");
      } else {
        throw new Error(
          "Authentication failed. Please check your credentials.",
        );
      }
    } catch (e: unknown) {
      setError("root", {
        message: e.message || "An unexpected error occurred.",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleSocialAuthSignIn = async(strategy: OAuthStrategy) => {
    if (!isLoaded) {
      setError("root", {
        message: CLERK_ERROR_MSG,
      });
      return;
    }

    try {
      setProcessing(true);
      if (!signIn) {
        setError("root", {
          message: CLERK_ERROR_MSG,
        });
        return;
      }

      await signIn.authenticateWithRedirect({
        strategy,
        continueSignUp: true,
        redirectUrlComplete: window.location.origin,
        redirectUrl: `${window.location.origin}/dashboard`,
      });
    } catch (err: unknown) {
      let errorMessage = "Try again later, serve down";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "errors" in err) {
        const clerkError = err as {
          errors: Array<{code: string; message: string}>;
        };
        errorMessage = clerkError.errors[0]?.message || errorMessage;
      }

      setError("root", {message: errorMessage});
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div id="sign_in_form_container" className="bg-transparent">
      <div className="mx-auto w-auto lg:w-[50%] xl:w-[40%]">
        <form
          id="sigin_form"
          className="flex flex-col justify-start items-start space-y-8 lg:space-y-12 w-full p-3"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div id="welcome-container" className="space-y-2">
            <h4
              id="wel_bck_header"
              className="font-bold font-helvetica text-2xl lg:text-4xl capitalize text-teal lg:tracking-wider"
            >
              Welcome back
            </h4>
            <p className="font-medium font-helvetica text-gray-400 text-sm lg:text-base">
              Enter your email and password to sign in
            </p>
          </div>

          <div
            id="email_container"
            className="flex flex-col justify-start items-start space-y-2 w-full"
          >
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Your email address"
              {...register("email")}
            />
            {errors.email && errors.email.message && (
              <ErrorMessage message={errors.email.message} />
            )}
          </div>
          <div
            id="password_container"
            className="flex flex-col justify-start items-start space-y-2 w-full"
          >
            <Label>Password</Label>
            <Input
              name="password"
              type={securePassword ? "password" : "text"}
              placeholder="Your email address"
              className="font-normal"
              {...register("password")}
              icon={
                <IconButton
                  type="button"
                  onClick={handleTogglePasswordSecurity}
                  icon={
                    !securePassword ? (
                      <HiOutlineEye className="size-4 lg:size-5" />
                    ) : (
                      <HiOutlineEyeSlash className="size-4 lg:size-5" />
                    )
                  }
                />
              }
            />
            {errors.password && errors.password.message && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>

          <Button
            disabled={processing}
            id="submit_btn"
            type="submit"
            className="text-white text-xs bg-teal uppercase w-full h-[45px] rounded-xl cursor-pointer gap-3"
          >
            Sign in
            <ShowLoader canShow={processing} size="sm" color="text-white" />
          </Button>

          <p className="text-center text-sm font-helvetica font-light w-full">
            Don't have an account?{" "}
            <span className="font-medium text-teal">
              <Link id="signup-link" href="/auth/signup" prefetch>
                Sign up
              </Link>
            </span>
          </p>

          <div
            id="social_auth_container"
            className="grid grid-cols-3 gap-3 mx-auto w-[50%]"
          >
            <div className="inline-flex justify-center item-center border size-12 rounded-full border-teal">
              <IconButton type="button" icon={<FcGoogle />} onClick={handleSocialAuthSignIn.bind(null, "oauth_google")} />
            </div>
            <div className="inline-flex justify-center item-center border size-12 rounded-full border-teal">
              <IconButton type="button" icon={<FaFacebookF />} onClick={handleSocialAuthSignIn.bind(null, "oauth_facebook")} />
            </div>
            <div className="inline-flex justify-center item-center border size-12 rounded-full border-teal">
              <IconButton type="button" icon={<FaLinkedinIn />} onClick={handleSocialAuthSignIn.bind(null, "oauth_linkedin")} />
            </div>
          </div>

          {errors.root && errors.root.message && (
              <ErrorMessage message={errors.root.message} />
          )}
        </form>
      </div>
    </div>
  );
});

SignInForm.displayName = "SignInForm";
