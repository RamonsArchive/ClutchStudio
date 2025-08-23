"use client";
import React from "react";
import { useRef, useState, useActionState } from "react";
import { parseServerActionResponse } from "@/lib/utils";
import { ActionState } from "@/types/GlobalTypes";
import { toast } from "sonner";
import Form from "next/form";
import { formDataToObject } from "@/lib/utils";
import { z } from "zod";
import { authenticateAdmin } from "@/lib/actions";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { loginFormSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, SplitText);

type LoginFormData = z.infer<typeof loginFormSchema>;

const LoginAdminForm = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const usernameLabelRef = useRef<HTMLLabelElement>(null);
  const passwordLabelRef = useRef<HTMLLabelElement>(null);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [storeFormData, setStoreFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const [statusMessage, setStatusMessage] = useState<string>("");

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  useGSAP(() => {
    // get the split text elements
    const titleSplit = new SplitText(titleRef.current, {
      type: "words",
    });
    const subtitleSplit = new SplitText(subtitleRef.current, {
      type: "words",
    });

    // label splits
    const usernameLabelSplit = new SplitText(usernameLabelRef.current, {
      type: "words",
    });
    const passwordLabelSplit = new SplitText(passwordLabelRef.current, {
      type: "words",
    });

    // create scroll trigger and animation for title
    gsap.fromTo(
      titleSplit.words,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 1,
        },
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }
    );

    gsap.fromTo(
      subtitleSplit.words,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 1,
        },
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }
    );

    // create scroll trigger and animation for labels
    gsap.fromTo(
      usernameLabelSplit.words,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        scrollTrigger: {
          trigger: usernameLabelRef.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 1,
        },
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }
    );

    gsap.fromTo(
      passwordLabelSplit.words,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        scrollTrigger: {
          trigger: passwordLabelRef.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 1,
        },
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }
    );

    // create scroll trigger and animation for inputs
    gsap.fromTo(
      usernameRef.current,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        scrollTrigger: {
          trigger: usernameRef.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 1,
        },
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }
    );

    gsap.fromTo(
      passwordRef.current,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        scrollTrigger: {
          trigger: passwordRef.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 1,
        },
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }
    );

    // create scroll trigger and animation for submit button
    gsap.fromTo(
      submitButtonRef.current,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        scrollTrigger: {
          trigger: submitButtonRef.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 1,
        },
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }
    );

    return () => {
      titleSplit.revert();
      subtitleSplit.revert();
      usernameLabelSplit.revert();
      passwordLabelSplit.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  });

  const resetForm = () => {
    setStoreFormData({
      username: "",
      password: "",
    });
    setErrors({});
  };

  const submitForm = async (
    state: ActionState,
    formData: FormData
  ): Promise<ActionState> => {
    try {
      setErrors({});
      const formObject = formDataToObject(formData);

      await loginFormSchema.parseAsync(formObject);
      console.log(formObject);

      const result = await authenticateAdmin(formData);

      if (result.status === "ERROR") {
        setStatusMessage("Login failed. Please check your credentials.");
        toast.error("ERROR", {
          description: String(result.error),
        });
        return parseServerActionResponse({
          status: "ERROR",
          error: String(result.error),
          data: null,
        });
      }

      resetForm();
      setStatusMessage("Login successful! Redirecting...");
      toast.success("SUCCESS", {
        description: "Login successful",
      });

      router.push("/admin/dashboard");
      return parseServerActionResponse({
        status: "SUCCESS",
        error: "",
        data: result.data,
      });
    } catch (error) {
      console.error(error);
      setStatusMessage("An error occurred during login. Please try again.");
      if (error instanceof z.ZodError) {
        const fieldErrors = z.flattenError(error).fieldErrors as Record<
          string,
          string[]
        >;
        console.log(fieldErrors);
        const formattedErrors: Record<string, string> = {};
        Object.keys(fieldErrors).forEach((key) => {
          formattedErrors[key] = fieldErrors[key]?.[0] || "";
        });
        setErrors(formattedErrors);
        toast.error("ERROR", {
          description: Object.values(formattedErrors).join(", "),
        });
        return parseServerActionResponse({
          status: "ERROR",
          error: Object.values(formattedErrors).join(", "),
          data: null,
        });
      }
      toast.error("ERROR", {
        description: "An error occurred during login. Please try again.",
      });

      return parseServerActionResponse({
        status: "ERROR",
        error: "An error occurred during login",
        data: null,
      });
    }
  };

  const [state, formAction, isPending] = useActionState(submitForm, {
    status: "INITIAL",
    error: "",
    data: null,
  });

  const handleFormChange = (key: string, value: string) => {
    setStoreFormData({ ...storeFormData, [key]: value });
  };

  return (
    <div className="flex flex-col gap-5 md:gap-10 p-5 md:p-10 w-full bg-gradient-to-b from-primary-900 via-black to-accent-950 max-w-[1200px] mx-auto rounded-xl shadow-lg">
      <div className="flex flex-col w-full gap-5">
        <h1
          ref={titleRef}
          className="font-funnel-sans text-white text-[28px] sm:text-[32px] font-bold leading-tight"
        >
          Admin Login
        </h1>

        <p
          ref={subtitleRef}
          className="font-funnel-sans text-white/90 text-[15px] sm:text-[16px] font-light leading-relaxed max-w-2xl"
        >
          Sign in to your administrator account to access the dashboard.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Form action={formAction} className="flex flex-col gap-10 md:gap-20">
          <div className="flex flex-col gap-5 md:gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="username"
                  ref={usernameLabelRef}
                  className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  ref={usernameRef}
                  className="form-input"
                  value={storeFormData.username}
                  onChange={(e) => handleFormChange("username", e.target.value)}
                />
                {errors.username && (
                  <p className="text-red-500 text-[12px] sm:text-[14px] font-light leading-relaxed">
                    {errors.username}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  ref={passwordLabelRef}
                  className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  ref={passwordRef}
                  className="form-input"
                  value={storeFormData.password}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-[12px] sm:text-[14px] font-light leading-relaxed">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full justify-center">
              <button
                type="submit"
                ref={submitButtonRef}
                className="animated-gradient-button w-full max-w-sm px-3 py-2 rounded-xl cursor-pointer opacity-0"
                disabled={isPending}
              >
                {isPending ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </div>
        </Form>
        {statusMessage && (
          <div className="flex-center w-full mt-5">
            <p className="text-white text-[12px] sm:text-[14px] font-light leading-relaxed text-center px-3 py-2 rounded-xl bg-accent-900">
              {statusMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginAdminForm;
