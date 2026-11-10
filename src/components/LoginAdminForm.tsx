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
import { Lock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

type LoginFormData = z.infer<typeof loginFormSchema>;

// Shared classes so every field in the form looks the same
const labelClassName =
  "font-mono text-slate-300 text-[11px] sm:text-[12px] uppercase tracking-[0.18em] leading-relaxed";
const errorClassName =
  "font-funnel-sans text-red-400 text-[12px] sm:text-[14px] leading-relaxed";

const LoginAdminForm = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Runs once on mount. The form reveals a single time when it scrolls into
  // view (no scrub), so every `.form-input` always ends up visible.
  useGSAP(
    () => {
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

      const allTextElements = [...titleSplit.words, ...subtitleSplit.words];
      const allLabels = [
        ...usernameLabelSplit.words,
        ...passwordLabelSplit.words,
      ];
      const allInputs = [usernameRef.current, passwordRef.current];

      gsap.set([...allTextElements, ...allLabels], {
        opacity: 0,
        yPercent: 100,
      });

      gsap.set([...allInputs, submitButtonRef.current], {
        opacity: 0,
        y: 16,
      });

      // one timeline, played once when the login panel enters the viewport
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.5 },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          once: true,
        },
      });

      tl.to(allTextElements, {
        opacity: 1,
        yPercent: 0,
        stagger: 0.02,
      })
        .to(
          allLabels,
          {
            opacity: 1,
            yPercent: 0,
            stagger: 0.02,
          },
          "-=0.3"
        )
        .to(
          allInputs,
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            clearProps: "transform",
          },
          "<"
        )
        .to(
          submitButtonRef.current,
          {
            opacity: 1,
            y: 0,
            clearProps: "transform", // let the CSS hover lift work again
          },
          "-=0.3"
        );

      return () => {
        titleSplit.revert();
        subtitleSplit.revert();
        usernameLabelSplit.revert();
        passwordLabelSplit.revert();
      };
    },
    { scope: containerRef }
  );

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
    <div
      ref={containerRef}
      className="panel flex flex-col gap-6 md:gap-8 p-5 md:p-8 w-full max-w-[480px] mx-auto"
    >
      <div className="flex flex-col w-full gap-3">
        <p className="eyebrow flex items-center gap-2">
          <Lock className="w-3.5 h-3.5" aria-hidden />
          <span>Restricted area</span>
        </p>
        <h2
          ref={titleRef}
          className="font-funnel-sans text-white text-[26px] sm:text-[30px] font-bold leading-tight tracking-tight"
        >
          Sign in
        </h2>

        <p
          ref={subtitleRef}
          className="font-funnel-sans text-slate-300 text-[15px] md:text-[16px] leading-relaxed"
        >
          Sign in to your administrator account to access the dashboard.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Form action={formAction} className="flex flex-col gap-8">
          <div className="flex flex-col gap-5 md:gap-6">
            <div className="grid grid-cols-1 gap-5 md:gap-6">
              <div className="flex flex-col gap-2 min-w-0">
                <label
                  htmlFor="username"
                  ref={usernameLabelRef}
                  className={labelClassName}
                >
                  Username <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  autoComplete="username"
                  ref={usernameRef}
                  className="form-input"
                  value={storeFormData.username}
                  onChange={(e) => handleFormChange("username", e.target.value)}
                />
                {errors.username && (
                  <p className={errorClassName}>{errors.username}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 min-w-0">
                <label
                  htmlFor="password"
                  ref={passwordLabelRef}
                  className={labelClassName}
                >
                  Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  ref={passwordRef}
                  className="form-input"
                  value={storeFormData.password}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                />
                {errors.password && (
                  <p className={errorClassName}>{errors.password}</p>
                )}
              </div>
            </div>
            <div className="flex w-full pt-2">
              <button
                type="submit"
                ref={submitButtonRef}
                className="animated-gradient-button w-full px-8 py-3 rounded-full cursor-pointer font-funnel-sans text-[14px] md:text-[15px] opacity-0"
                disabled={isPending}
              >
                {isPending ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </div>
        </Form>
        {statusMessage && (
          <div className="flex w-full" role="status" aria-live="polite">
            <p
              className={`font-funnel-sans text-[13px] sm:text-[14px] leading-relaxed px-4 py-3 rounded-xl border w-full ${
                state.status === "ERROR"
                  ? "border-red-400/40 bg-red-400/10 text-red-300"
                  : "border-primary-500/40 bg-primary-500/10 text-primary-100"
              }`}
            >
              {statusMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginAdminForm;
