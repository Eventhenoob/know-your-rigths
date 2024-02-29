"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password should be alteast 8 characters long." }),
    confirmPassword: z
      .string({ required_error: "Please Confirm the password" })
      .min(8, { message: "Password should be alteast 8 characters long." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type FormData = z.infer<typeof schema>;

const forgotpassword = () => {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { status } = useSession();
  const [OtpToCheck, setOtpToCheck] = useState<string | null>(null);
  const [canSendOtp, setCanSendOtp] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [showError, setShowError] = useState("");
  const [showSuccess, setShowSuccess] = useState("");

  const toggleShowError = (message: string) => {
    setShowError(message);
    setTimeout(() => {
      setShowError("");
    }, 4000);
  };

  const toggleShowSuccess = (message: string) => {
    setShowSuccess(message);
    setTimeout(() => {
      setShowSuccess("");
    }, 4000);
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await axios.patch("/api/user/forgotpassword", {
        isValid,
        email: data.email,
        password: data.password,
        key: "H@O230Cbh@50",
      });
      toggleShowSuccess("Password Updated Successfully!");
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 409) {
          toggleShowError(
            `${error.response.data.error}: ${error.response.data.message}`
          );
        } else {
          toggleShowError("An error occurred. Please try again later.");
        }
      } else {
        toggleShowError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <>
      {status === "unauthenticated" && (
        <main className="flex w-screen h-screen text-white p-4 font-heading ">
          {showError && (
            <p className="bg-red-600 p-4 fixed w-screen top-20 left-1 z-30 text-black font-heading ">
              {showError}
            </p>
          )}
          {showSuccess && (
            <p className="bg-green-600 p-4 fixed w-screen top-20 left-1 z-30 text-white font-heading ">
              {showSuccess}
            </p>
          )}
          <form
            onSubmit={handleSubmit(async (data) => handleFormSubmit(data))}
            className="lg:w-3/6 overflow-x-hidden rounded-lg lg:h-[40rem] m-auto overflow-y-scroll customScroll p-5 text-white bg-gray-950 pb-10 flex flex-col  items-center mt-8 lg:mt-0"
          >
            <h1 className="text-white mt-4 text-4xl  text-center">
              Forgot password
            </h1>
            <div className="w-full mt-10">
              <label htmlFor="email" className="text-white  text-xs mb-2 block">
                Email<span className="text-red-600">*</span>
              </label>

              <input
                disabled={isValid}
                {...register("email")}
                type="email"
                id="email"
                className="disabled:bg-slate-500 bg-gray-800 w-full outline-2 p-3 pl-4 text-sm text-slate-300 outline-none rounded-xl"
              />
              {errors.email && <p className="">{errors.email.message}</p>}

              {!isValid && (
                <button
                  disabled={!canSendOtp || !OtpToCheck === null || isValid}
                  type="button"
                  className={
                    "text-white font-retro font-thin bg-blue-600 transition-all duration-300 p-2 text-xs uppercase mt-4 block hover:bg-blue-700 rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed "
                  }
                  onClick={() => {
                    const email = getValues().email;
                    if (
                      email != "" &&
                      email.length >= 4 &&
                      email.includes("@")
                    ) {
                      axios
                        .post("/api/user/otp", { email, key: "H@O230Cbh@50" })
                        .then((res) => {
                          setOtpToCheck(res.data.otpCode);
                          setCanSendOtp(false);
                          setTimeout(() => setCanSendOtp(true), 60 * 1000);
                          toggleShowSuccess(
                            "otp has been sent to the given mail."
                          );
                        })
                        .catch((e: any) => {
                          toggleShowError(e.message);
                        });
                    } else {
                      toggleShowError("Provided Email is invalid");
                    }
                  }}
                >
                  Send otp
                </button>
              )}

              <label
                htmlFor="otp"
                className="text-white mt-4 text-xs mb-2 block"
              >
                Otp<span className="text-red-600">*</span>
              </label>
              <input
                disabled={canSendOtp || OtpToCheck === null || isValid}
                onChange={(e) => {
                  const otpCode = e.target.value;
                  if (otpCode.length === 6) {
                    if (OtpToCheck === otpCode) {
                      setIsValid(true);
                      toggleShowSuccess("Otp verified");
                    } else {
                      toggleShowError("Otp didn't matched with the input");
                    }
                  }
                }}
                maxLength={6}
                id="otp"
                type="number"
                className="disabled:bg-slate-500 bg-gray-800 removeScroll max-w-[5rem] outline-2 p-3 pl-4 text-sm text-slate-300 outline-none rounded-xl"
              />
            </div>

            <div className="w-full mt-10">
              <label
                htmlFor="password"
                className="text-white  text-xs mb-2 block"
              >
                New Password<span className="text-red-600">*</span>
              </label>

              <input
                {...register("password")}
                type="password"
                id="password"
                className="disabled:bg-slate-500 bg-gray-800 w-full outline-2 p-3 pl-4 text-sm text-slate-300 outline-none rounded-xl"
              />
              {errors.password && <p className="">{errors.password.message}</p>}
            </div>

            <div className="w-full mt-10">
              <label
                htmlFor="confirmPassword"
                className="text-white  text-xs mb-2 block"
              >
                Confirm Password<span className="text-red-600">*</span>
              </label>

              <input
                {...register("confirmPassword")}
                type="password"
                id="confirmPassword"
                className="disabled:bg-slate-500 bg-gray-800 w-full outline-2 p-3 pl-4 text-sm text-slate-300 outline-none rounded-xl"
              />
              {errors.confirmPassword && (
                <p className="">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              className={
                "text-white m-10 w-full font-retro font-thin bg-blue-600 transition-all duration-300 p-3 text-sm uppercase block hover:bg-blue-700 rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed "
              }
              onClick={() => {}}
            >
              Submit
            </button>
          </form>
        </main>
      )}
      {status == "authenticated" && (
        <main className="mainStylesDefault">
          <p className="text-2xl text-main-color font-heading">
            Invalid Access of page. you are already logged in.
          </p>
        </main>
      )}

      {status === "loading" && (
        <main className="mainStylesDefault gap-5 flex flex-col p-4">
          {/*  */}
        </main>
      )}
    </>
  );
};

export default forgotpassword;
