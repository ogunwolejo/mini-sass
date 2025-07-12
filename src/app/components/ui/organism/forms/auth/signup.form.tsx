"use client";

import {memo, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {emailSchema, passwordSchema} from "@/lib/zod.schema";
import {IconButton} from "@/app/components/ui/atoms/icon.button";
import {FcGoogle} from "react-icons/fc";
import {FaFacebookF, FaLinkedinIn} from "react-icons/fa";
import {Label} from "@/app/components/ui/atoms/label";
import {Input} from "@/app/components/ui/atoms/input";
import {HiOutlineEye, HiOutlineEyeSlash} from "react-icons/hi2";
import {Button} from "@/app/components/ui/atoms/button";
import Link from "next/link";
import {ErrorMessage} from "@/app/components/ui/atoms/error.message";
import {useSignUp} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {OAuthStrategy} from "@clerk/types";
import ShowLoader from "@/app/components/ui/atoms/showLoader";
import {CLERK_ERROR_MSG} from "@/lib/clerk.utils";

const schema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .refine((value) => value.trim().split(/\s+/).length >= 2, {
      message: "Please enter both first and last name",
    })
    .transform((name) => {
      return name
        .trim()
        .split(/\s+/)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");
    }),
  email: emailSchema,
  password: passwordSchema,
});

export const SignUpForm = memo(() => {
  const {isLoaded, signUp} = useSignUp();
  const router = useRouter();
  const [securePassword, setSecurePassword] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const handleTogglePasswordSecurity = () => {
    setSecurePassword((cur) => !cur);
  };

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
      name: "",
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof schema>) => {
    if (!isLoaded) {
      setError("root", {
        message: CLERK_ERROR_MSG,
      });
      return;
    }

    const {email, password, name} = data;
    try {
      setProcessing(true);
      if (!signUp) {
        setError("root", {
          message: CLERK_ERROR_MSG,
        });
        return;
      }

      //splitting name
      const [firstName, lastName, ...rest] = name.split(" ");
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      //router.push("/auth/verify-email");
    } catch (err) {
      if (err.errors) {
        err.errors.forEach((error: any) => {
          if (error.code === "form_identifier_exists") {
            setError("name", {
              type: "manual",
              message: "Email already exists. Please sign in instead.",
            });
          } else {
            setError("root", error.message);
          }
        });
      } else {
        setError("root", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleSocialAuthSignUp = async (strategy: OAuthStrategy) => {
    if (!isLoaded) {
      setError("root", {
        message: CLERK_ERROR_MSG,
      });
      return;
    }

    try {
      setProcessing(true);
      if (!signUp) {
        setError("root", {
          message: CLERK_ERROR_MSG,
        });
        return;
      }

      await signUp.authenticateWithRedirect({
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
    <div id="sign_up_form_container" className="w-full h-full">
      <form
        id="sign_up_form"
        className="w-full h-full py-8 px-3 md:px-6 flex flex-col justify-start items-start space-y-6"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <section className="w-full space-y-4">
          <h5 className="text-center capitalize font-helvetica font-semibold text-gray700 tex-lg lg:text-xl">
            Register with
          </h5>
          <div
            id="social_auth_container"
            className="grid grid-cols-3 gap-3 mx-auto w-[50%]"
          >
            <div className="inline-flex justify-center item-center border border-gray-200 size-12 rounded-xl">
              <IconButton
                type="button"
                icon={<FcGoogle />}
                onClick={handleSocialAuthSignUp.bind(null, "oauth_google")}
              />
            </div>
            <div className="inline-flex justify-center item-center border border-gray-200 size-12 rounded-xl">
              <IconButton
                type="button"
                icon={<FaFacebookF />}
                onClick={handleSocialAuthSignUp.bind(null, "oauth_facebook")}
              />
            </div>
            <div className="inline-flex justify-center item-center border border-gray-200 size-12 rounded-xl">
              <IconButton
                type="button"
                icon={<FaLinkedinIn />}
                onClick={handleSocialAuthSignUp.bind(null, "oauth_linkedin")}
              />
            </div>
          </div>
          <h6 className="text-center font-bold text-gray-600 font-helvetica">
            or
          </h6>
        </section>
        <div
          id="name_container"
          className="flex flex-col justify-start items-start space-y-2 w-full"
        >
          <Label htmlFor="email">Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Your full name"
            {...register("name")}
          />
          {errors.name && errors.name.message && (
            <ErrorMessage message={errors.name.message} />
          )}
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
          className="text-white text-xs bg-teal uppercase w-full !h-[45px] rounded-xl cursor-pointer gap-3"
        >
          Sign up
          <ShowLoader canShow={processing} size="sm" color="text-white" />
        </Button>

        <p className="text-center text-sm font-helvetica font-light w-full">
          Already have an account?{" "}
          <span className="font-medium text-teal">
            <Link id="signup-link" href="/auth/signin" prefetch>
              Sign in
            </Link>
          </span>
        </p>

        {errors.root && errors.root.message && (
          <ErrorMessage message={errors.root.message} />
        )}
      </form>
    </div>
  );
});

SignUpForm.displayName = "SignUpForm";
