"use client";
import React from "react";
import { useRef, useState, useActionState } from "react";
import { parseServerActionResponse } from "@/lib/utils";
import { ActionState } from "@/types/GlobalTypes";
import { toast } from "sonner";
import Form from "next/form";
import { formDataToObject } from "@/lib/utils";
import { z } from "zod";
import { createAdminUser } from "@/lib/actions";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Zod schema for admin creation
const adminFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["ADMIN", "VIEWER"]),
});

type AdminFormData = z.infer<typeof adminFormSchema>;

// Shared classes so every field in the form looks the same
const labelClassName =
  "font-mono text-slate-300 text-[11px] sm:text-[12px] uppercase tracking-[0.18em] leading-relaxed";
const errorClassName =
  "font-funnel-sans text-red-400 text-[12px] sm:text-[14px] leading-relaxed";

const CreateAdminForm = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const usernameLabelRef = useRef<HTMLLabelElement>(null);
  const passwordLabelRef = useRef<HTMLLabelElement>(null);
  const roleLabelRef = useRef<HTMLLabelElement>(null);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);

  const [storeFormData, setStoreFormData] = useState<AdminFormData>({
    username: "",
    password: "",
    role: "ADMIN",
  });

  const [statusMessage, setStatusMessage] = useState<string>("");

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    role?: string;
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
      const roleLabelSplit = new SplitText(roleLabelRef.current, {
        type: "words",
      });

      const allTextElements = [...titleSplit.words, ...subtitleSplit.words];
      const allLabels = [
        ...usernameLabelSplit.words,
        ...passwordLabelSplit.words,
        ...roleLabelSplit.words,
      ];
      const allInputs = [
        usernameRef.current,
        passwordRef.current,
        roleRef.current,
      ];

      gsap.set([...allTextElements, ...allLabels], {
        opacity: 0,
        yPercent: 100,
      });

      gsap.set([...allInputs, submitButtonRef.current], {
        opacity: 0,
        y: 16,
      });

      // one timeline, played once when the panel enters the viewport
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
        roleLabelSplit.revert();
      };
    },
    { scope: containerRef }
  );

  const resetForm = () => {
    setStoreFormData({
      username: "",
      password: "",
      role: "ADMIN",
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

      await adminFormSchema.parseAsync(formObject);

      const result = await createAdminUser(formData);

      if (result.status === "ERROR") {
        setStatusMessage("Something went wrong. Please try again.");
        toast.error("ERROR", {
          description: result.error,
        });
        return parseServerActionResponse({
          status: "ERROR",
          error: result.error,
          data: null,
        });
      }

      resetForm();
      setStatusMessage("Admin user created successfully!");
      toast.success("SUCCESS", {
        description: "Admin user created successfully",
      });

      return parseServerActionResponse({
        status: "SUCCESS",
        error: "",
        data: result.data,
      });
    } catch (error) {
      console.error(error);
      setStatusMessage(
        "An error occurred while creating the admin user. Please try again."
      );
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
        description:
          "An error occurred while creating the admin user. Please try again.",
      });

      return parseServerActionResponse({
        status: "ERROR",
        error: "An error occurred while creating the admin user",
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
      className="panel flex flex-col gap-6 md:gap-8 p-5 md:p-8 w-full max-w-[720px] mx-auto"
    >
      <div className="flex flex-col w-full gap-3">
        <p className="eyebrow">Admin / Users</p>
        <h2
          ref={titleRef}
          className="font-funnel-sans text-white text-[26px] sm:text-[30px] font-bold leading-tight tracking-tight"
        >
          Create Admin User
        </h2>

        <p
          ref={subtitleRef}
          className="font-funnel-sans text-slate-300 text-[15px] md:text-[16px] leading-relaxed max-w-2xl"
        >
          Create a new administrator account with appropriate permissions and
          role assignment.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Form action={formAction} className="flex flex-col gap-8">
          <div className="flex flex-col gap-5 md:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
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
                  autoComplete="off"
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
                  autoComplete="new-password"
                  ref={passwordRef}
                  className="form-input"
                  value={storeFormData.password}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                />
                {errors.password && (
                  <p className={errorClassName}>{errors.password}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 min-w-0">
                <label
                  htmlFor="role"
                  ref={roleLabelRef}
                  className={labelClassName}
                >
                  Role <span className="text-red-400">*</span>
                </label>
                <select
                  name="role"
                  id="role"
                  ref={roleRef}
                  className="form-input"
                  value={storeFormData.role}
                  onChange={(e) => handleFormChange("role", e.target.value)}
                >
                  <option value="ADMIN">Admin</option>
                  <option value="VIEWER">Viewer</option>
                </select>
                {errors.role && <p className={errorClassName}>{errors.role}</p>}
              </div>
            </div>
            <div className="flex w-full pt-2">
              <button
                type="submit"
                ref={submitButtonRef}
                className="animated-gradient-button w-full sm:w-auto px-8 py-3 rounded-full cursor-pointer font-funnel-sans text-[14px] md:text-[15px] opacity-0"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Admin"}
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

export default CreateAdminForm;
