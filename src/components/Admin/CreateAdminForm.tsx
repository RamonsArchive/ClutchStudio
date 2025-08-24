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

const CreateAdminForm = () => {
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
    const roleLabelSplit = new SplitText(roleLabelRef.current, {
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

    gsap.fromTo(
      roleLabelSplit.words,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        scrollTrigger: {
          trigger: roleLabelRef.current,
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

    gsap.fromTo(
      roleRef.current,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        scrollTrigger: {
          trigger: roleRef.current,
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
      roleLabelSplit.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  });

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
    <div className="flex flex-col gap-5 md:gap-10 p-5 md:p-10 w-full bg-gradient-to-b from-primary-900 via-black to-accent-950 max-w-[1200px] mx-auto rounded-xl shadow-lg">
      <div className="flex flex-col w-full gap-5">
        <h1
          ref={titleRef}
          className="font-funnel-sans text-white text-[28px] sm:text-[32px] font-bold leading-tight"
        >
          Create Admin User
        </h1>

        <p
          ref={subtitleRef}
          className="font-funnel-sans text-white/90 text-[15px] sm:text-[16px] font-light leading-relaxed max-w-2xl"
        >
          Create a new administrator account with appropriate permissions and
          role assignment.
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
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="role"
                  ref={roleLabelRef}
                  className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
                >
                  Role <span className="text-red-500">*</span>
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
                {errors.role && (
                  <p className="text-red-500 text-[12px] sm:text-[14px] font-light leading-relaxed">
                    {errors.role}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full justify-center">
              <button
                type="submit"
                ref={submitButtonRef}
                className="animated-gradient-button w-full max-w-sm px-3 py-2 rounded-xl cursor-pointer"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Admin"}
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

export default CreateAdminForm;
