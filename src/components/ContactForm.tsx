"use client";
import React from "react";
import { useRef, useState, useActionState } from "react";
import { parseServerActionResponse } from "@/lib/utils";
import { ActionState, FromDataType, ServiceType } from "@/types/GlobalTypes";
import { toast } from "sonner";
import Form from "next/form";
import { formDataToObject, updatePhoneNumber } from "@/lib/utils";
import { contactFormSchema } from "@/lib/validation";
import { z } from "zod";
import { writeProjectTickt } from "@/lib/actions";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Shared classes so every field in the form looks the same
const labelClassName =
  "font-mono text-slate-300 text-[11px] sm:text-[12px] uppercase tracking-[0.18em] leading-relaxed";
const optionalClassName = "text-slate-400 normal-case tracking-normal";
const errorClassName =
  "font-funnel-sans text-red-400 text-[12px] sm:text-[14px] leading-relaxed";

const MESSAGE_MAX_LENGTH = 500; // matches contactFormSchema

const ContactForm = ({
  subtitle,
  subsubtitle,
  services,
}: {
  subtitle: string;
  subsubtitle: string;
  services: string[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const accentDividerRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const subsubtitleRef = useRef<HTMLParagraphElement>(null);

  const firstNameLabelRef = useRef<HTMLLabelElement>(null);
  const lastNameLabelRef = useRef<HTMLLabelElement>(null);
  const emailLabelRef = useRef<HTMLLabelElement>(null);
  const phoneNumberLabelRef = useRef<HTMLLabelElement>(null);
  const serviceLabelRef = useRef<HTMLLabelElement>(null);
  const organizationLabelRef = useRef<HTMLLabelElement>(null);
  const messageLabelRef = useRef<HTMLLabelElement>(null);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const organizationRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [storeFormData, setStoreFormData] = useState<FromDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    service: ServiceType.WEB_DEVELOPMENT,
    organization: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState<string>("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    service?: string;
    organization?: string;
    message?: string;
  }>({});

  // Runs once on mount. The whole form reveals a single time when it scrolls
  // into view (no scrub), so every `.form-input` always ends up visible.
  useGSAP(
    () => {
      // Check if all refs are available before proceeding
      if (
        !containerRef.current ||
        !subtitleRef.current ||
        !subsubtitleRef.current ||
        !firstNameLabelRef.current ||
        !lastNameLabelRef.current ||
        !emailLabelRef.current ||
        !phoneNumberLabelRef.current ||
        !serviceLabelRef.current ||
        !organizationLabelRef.current ||
        !messageLabelRef.current ||
        !accentDividerRef.current ||
        !submitButtonRef.current
      ) {
        return;
      }

      // get the split text elements

      // title splits
      const subtitleSplit = new SplitText(subtitleRef.current, {
        type: "words",
      });
      const subsubtitleSplit = new SplitText(subsubtitleRef.current, {
        type: "words",
      });

      // label splits
      const firstNameLabelSplit = new SplitText(firstNameLabelRef.current, {
        type: "words",
      });
      const lastNameLabelSplit = new SplitText(lastNameLabelRef.current, {
        type: "words",
      });
      const emailLabelSplit = new SplitText(emailLabelRef.current, {
        type: "words",
      });
      const phoneNumberLabelSplit = new SplitText(phoneNumberLabelRef.current, {
        type: "words",
      });
      const serviceLabelSplit = new SplitText(serviceLabelRef.current, {
        type: "words",
      });
      const organizationLabelSplit = new SplitText(
        organizationLabelRef.current,
        {
          type: "words",
        }
      );
      const messageLabelSplit = new SplitText(messageLabelRef.current, {
        type: "words",
      });

      const allTextElements = [
        ...subtitleSplit.words,
        ...subsubtitleSplit.words,
      ];

      const allLabels = [
        ...firstNameLabelSplit.words,
        ...lastNameLabelSplit.words,
        ...emailLabelSplit.words,
        ...phoneNumberLabelSplit.words,
        ...serviceLabelSplit.words,
        ...organizationLabelSplit.words,
        ...messageLabelSplit.words,
      ];

      const allInputs = [
        firstNameRef.current,
        lastNameRef.current,
        emailRef.current,
        phoneNumberRef.current,
        serviceRef.current,
        organizationRef.current,
        messageRef.current,
      ];

      const remainingElements = [
        accentDividerRef.current,
        submitButtonRef.current,
      ];

      gsap.set([...allTextElements, ...allLabels], {
        opacity: 0,
        yPercent: 100,
      });

      gsap.set([...allInputs, ...remainingElements], {
        opacity: 0,
        y: 16,
      });

      // one timeline, played once when the form panel enters the viewport
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.5 },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
          once: true,
        },
      });

      tl.to(allTextElements, {
        opacity: 1,
        yPercent: 0,
        stagger: 0.02,
      })
        .to(
          accentDividerRef.current,
          {
            opacity: 1,
            y: 0,
          },
          "-=0.3"
        )
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
        subtitleSplit.revert();
        subsubtitleSplit.revert();
        firstNameLabelSplit.revert();
        lastNameLabelSplit.revert();
        emailLabelSplit.revert();
        phoneNumberLabelSplit.revert();
        serviceLabelSplit.revert();
        organizationLabelSplit.revert();
        messageLabelSplit.revert();
      };
    },
    { scope: containerRef }
  );

  const resetForm = () => {
    setStoreFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      service: ServiceType.WEB_DEVELOPMENT,
      organization: "",
      message: "",
    });
    setPhoneNumber("");
    setErrors({});
  };

  const submitForm = async (
    state: ActionState,
    formData: FormData
  ): Promise<ActionState> => {
    try {
      setErrors({});
      const formObject = formDataToObject(formData);
      const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
      formObject.phoneNumber = cleanNumber;

      await contactFormSchema.parseAsync(formObject);

      const result = await writeProjectTickt(formObject as FromDataType);

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
      setStatusMessage("Message sent. I'll get back to you by email soon!");
      toast.success("SUCCESS", {
        description: "Form submitted successfully",
      });

      return parseServerActionResponse({
        status: "SUCCESS",
        error: "",
        data: result.data,
      });
    } catch (error) {
      console.error(error);
      setStatusMessage(
        "An error occurred while submitting the form. Please try again."
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
          "An error occurred while submitting the form. Please try again.",
      });

      return parseServerActionResponse({
        status: "ERROR",
        error: "An error occurred while submitting the form",
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
    if (key === "phoneNumber") {
      updatePhoneNumber(value, phoneNumber, setPhoneNumber);
      const cleanPhone = value.replace(/[^0-9]/g, "");
      setStoreFormData({ ...storeFormData, phoneNumber: cleanPhone });
      return;
    }

    setStoreFormData({ ...storeFormData, [key]: value });
  };

  const messageLength = storeFormData.message.length;

  return (
    <div
      ref={containerRef}
      className="panel flex flex-col gap-6 md:gap-8 p-5 md:p-8 w-full"
    >
      <div className="flex flex-col w-full gap-3">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-secondary-400">02</span>
          <span className="h-px w-8 bg-white/20" />
          <span>Send a message</span>
        </p>
        <h2
          ref={subtitleRef}
          className="font-funnel-sans text-white text-[26px] sm:text-[30px] md:text-[34px] font-bold leading-tight tracking-tight"
        >
          {subtitle}
        </h2>

        <p
          ref={subsubtitleRef}
          className="font-funnel-sans text-slate-300 text-[15px] md:text-[16px] leading-relaxed max-w-2xl"
        >
          {subsubtitle}
        </p>
      </div>
      {/* Brand accent divider (cyan to orange) */}
      <div
        ref={accentDividerRef}
        className="w-16 h-[3px] bg-linear-to-r from-primary-500 to-secondary-500 rounded-full opacity-0"
      />
      <div className="flex flex-col gap-5">
        <Form
          action={formAction}
          className="flex flex-col gap-8"
          id="contact-form"
        >
          <div className="flex flex-col gap-5 md:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              <div className="flex flex-col gap-2 min-w-0">
                <label
                  htmlFor="firstName"
                  ref={firstNameLabelRef}
                  className={labelClassName}
                >
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First name"
                  autoComplete="given-name"
                  ref={firstNameRef}
                  className="form-input"
                  value={storeFormData.firstName}
                  onChange={(e) =>
                    handleFormChange("firstName", e.target.value)
                  }
                />
                {errors.firstName && (
                  <p className={errorClassName}>{errors.firstName}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 min-w-0">
                <label
                  htmlFor="lastName"
                  ref={lastNameLabelRef}
                  className={labelClassName}
                >
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last name"
                  autoComplete="family-name"
                  ref={lastNameRef}
                  className="form-input"
                  value={storeFormData.lastName}
                  onChange={(e) => handleFormChange("lastName", e.target.value)}
                />
                {errors.lastName && (
                  <p className={errorClassName}>{errors.lastName}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 min-w-0">
                <label
                  htmlFor="email"
                  ref={emailLabelRef}
                  className={labelClassName}
                >
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                  className="form-input"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={storeFormData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                />
                {errors.email && (
                  <p className={errorClassName}>{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 min-w-0">
                <label
                  htmlFor="phoneNumber"
                  ref={phoneNumberLabelRef}
                  className={labelClassName}
                >
                  Phone Number{" "}
                  <span className={optionalClassName}>(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  ref={phoneNumberRef}
                  className="form-input"
                  placeholder="Phone number"
                  autoComplete="tel"
                  value={phoneNumber}
                  onChange={(e) =>
                    handleFormChange("phoneNumber", e.target.value)
                  }
                />
                {errors.phoneNumber && (
                  <p className={errorClassName}>{errors.phoneNumber}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 min-w-0">
                <label
                  htmlFor="service"
                  ref={serviceLabelRef}
                  className={labelClassName}
                >
                  Service <span className="text-red-400">*</span>
                </label>
                <select
                  name="service"
                  id="service"
                  ref={serviceRef}
                  className="form-input"
                  value={storeFormData.service}
                  onChange={(e) => handleFormChange("service", e.target.value)}
                >
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className={errorClassName}>{errors.service}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 min-w-0">
                <label
                  htmlFor="organization"
                  ref={organizationLabelRef}
                  className={labelClassName}
                >
                  Organization{" "}
                  <span className={optionalClassName}>(optional)</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  id="organization"
                  ref={organizationRef}
                  className="form-input"
                  placeholder="Company or team"
                  autoComplete="organization"
                  value={storeFormData.organization}
                  onChange={(e) =>
                    handleFormChange("organization", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-0">
              <label
                htmlFor="message"
                ref={messageLabelRef}
                className={labelClassName}
              >
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                id="message"
                ref={messageRef}
                className="form-input min-h-[140px] resize-y"
                placeholder="What are you building, hiring for, or looking to host?"
                value={storeFormData.message}
                onChange={(e) => handleFormChange("message", e.target.value)}
              />
              <div className="flex flex-row items-start justify-between gap-3">
                {errors.message ? (
                  <p className={errorClassName}>{errors.message}</p>
                ) : (
                  <span />
                )}
                <p
                  className={`font-mono text-[11px] sm:text-[12px] shrink-0 ${
                    messageLength > MESSAGE_MAX_LENGTH
                      ? "text-red-400"
                      : "text-slate-400"
                  }`}
                >
                  {messageLength}/{MESSAGE_MAX_LENGTH}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <button
                type="submit"
                ref={submitButtonRef}
                className="animated-gradient-button group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-full cursor-pointer font-funnel-sans text-[14px] md:text-[15px] opacity-0"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send message"}
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </button>
              <p className="font-funnel-sans text-slate-400 text-[12px] sm:text-[13px] leading-relaxed">
                Fields marked <span className="text-red-400">*</span> are
                required.
              </p>
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

export default ContactForm;
