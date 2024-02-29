"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

const schema = z
  .object({
    username: z.string({ required_error: "Username is required" }).min(3),
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

const page = () => {
  const [OtpToCheck, setOtpToCheck] = useState<string | null>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [canSendMail, setCanSendMail] = useState(true);
  const { status } = useSession();

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
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
      const result = await axios.post("/api/user", {
        username: data.username,
        email: data.email,
        password: data.password,
        key: "H@O230Cbh@50",
        isValidated,
      });

      if (result.status === 201) {
        toggleShowSuccess("Account Created Successfully!");
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/",
        });
      }
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
        <main className="w-screen h-screen relative flex md:flex-row justify-center  items-center flex-col mb-20">
          <div className="w-[90%] flex relative bg-gray-900 justify-center items-center rounded-3xl overflow-hidden lg:items-stretch lg:flex-row flex-col">
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
            <div className="lg:w-3/6 text-white flex items-center justify-center">
              {/* <Lottie animationData={signinAnimation} /> */}
              <img
                src="/slider2.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <form
              onSubmit={handleSubmit(async (data) => handleFormSubmit(data))}
              className="lg:w-3/6 lg:h-[50rem] w-full overflow-y-scroll customScroll p-5 text-white bg-gray-950 pb-10 flex flex-col  items-center mt-8 lg:mt-0"
            >
              <h1 className="text-white mt-4 text-4xl font-heading  text-center">
                Sign up
              </h1>
              <div className="flex md:flex-row flex-col w-full justify-center items-center"></div>
              <div className="w-full mt-10">
                <label
                  htmlFor="username"
                  className="text-white font-bold text-xs mb-2 block"
                >
                  Username<span className="text-red-600">*</span>
                </label>
                <input
                  {...register("username")}
                  type="text"
                  className={
                    "bg-gray-800 w-full p-3 pl-4 text-sm outline-2 text-slate-300 outline-none rounded-xl" +
                    (errors.username ? "  outline-red-800 " : " ")
                  }
                  id="username"
                />
                {errors.username && (
                  <p className="">{errors.username.message}</p>
                )}{" "}
              </div>

              <div className="w-full mt-10">
                <label
                  htmlFor="email"
                  className="text-white font-bold text-xs mb-2 block"
                >
                  Email<span className="text-red-600">*</span>
                </label>
                <input
                  {...register("email")}
                  onChange={(e) => {
                    setIsValidated(false);
                    register("email").onChange(e);
                  }}
                  id="email"
                  disabled={isValidated}
                  type="email"
                  className={
                    "disabled:bg-slate-500 bg-gray-800 w-full outline-2 p-3 pl-4 text-sm text-slate-300 outline-none rounded-xl" +
                    (errors.email ? "  outline-red-800 " : " ")
                  }
                />
                {errors.email && <p className="">{errors.email.message}</p>}
                {!isValidated && (
                  <button
                    type="button"
                    className={
                      "text-white bg-blue-600 transition-all duration-300 p-2 text-xs uppercase mt-4 block hover:bg-blue-700 font-bold rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed "
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
                            setCanSendMail(false);
                            setTimeout(() => setCanSendMail(true), 60 * 1000);
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
                    disabled={!canSendMail}
                  >
                    Send otp
                  </button>
                )}
                <label
                  htmlFor="otp"
                  className="text-white mt-4  font-bold text-xs mb-2 block"
                >
                  Otp<span className="text-red-600">*</span>
                </label>
                <input
                  disabled={canSendMail || OtpToCheck === null || isValidated}
                  onChange={(e) => {
                    const otpCode = e.target.value;
                    if (otpCode.length === 6) {
                      if (OtpToCheck === otpCode) {
                        setIsValidated(true);
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
                  className="text-white font-bold text-xs mb-2 block"
                >
                  Password<span className="text-red-600">*</span>
                </label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  className={
                    "bg-gray-800 w-full outline-2 p-3 pl-4 text-sm text-slate-300 outline-none rounded-xl " +
                    (errors.password ? "  outline-red-800 " : " ")
                  }
                />
                {errors.password && (
                  <p className="">{errors.password.message}</p>
                )}
              </div>

              <div className="w-full mt-10">
                <label
                  htmlFor="confirmPassword"
                  className={"text-white font-bold text-xs mb-2 block "}
                >
                  Confirm Password<span className="text-red-600">*</span>
                </label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  id="confirmPassword"
                  className={
                    "bg-gray-800 w-full outline-2 p-3 pl-4 text-sm text-slate-300 outline-none rounded-xl" +
                    (errors.confirmPassword ? "  outline-red-800 " : " ")
                  }
                />
                {errors.confirmPassword && (
                  <p className="">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-center bg-blue-600 p-4 mt-10 text-xs rounded-xl hover:bg-blue-800 hover:text-slate-200 transition-all duration-300"
              >
                Sign up
              </button>
              <div className=" flex gap-4">
                <button
                  type="button"
                  onClick={() => signIn()}
                  className="text-blue-700 hover:text-slate-300 transition-color duration-200  mt-2 text-sm"
                >
                  Already have an account?
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {status == "authenticated" && (
        <main className="mainStylesDefault">
          <p className="text-2xl font-heading">
            Invalid Access of page. you are already logged in.
          </p>
        </main>
      )}

      {status === "loading" && (
        <main className="mainStylesDefault gap-5 flex flex-col p-4">
          {/* <GameShowCaseSkeleton /> */}
        </main>
      )}
    </>
  );
};

export default page;
