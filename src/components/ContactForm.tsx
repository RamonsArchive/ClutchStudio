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

gsap.registerPlugin(ScrollTrigger, SplitText);

const ContactForm = ({
  subtitle,
  subsubtitle,
  services,
}: {
  subtitle: string;
  subsubtitle: string;
  services: string[];
}) => {
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

  useGSAP(() => {
    // Add a small delay for Vercel deployment stability
    const initAnimations = () => {
      // Check if all refs are available before proceeding
      if (
        !subtitleRef.current ||
        !subsubtitleRef.current ||
        !firstNameLabelRef.current ||
        !lastNameLabelRef.current ||
        !firstNameRef.current ||
        !lastNameRef.current ||
        !emailRef.current ||
        !phoneNumberLabelRef.current ||
        !serviceLabelRef.current ||
        !organizationLabelRef.current ||
        !messageLabelRef.current ||
        !accentDividerRef.current ||
        !submitButtonRef.current
      ) {
        setTimeout(initAnimations, 100);
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

      gsap.set(
        [
          ...subtitleSplit.words,
          ...subsubtitleSplit.words,
          ...firstNameLabelSplit.words,
          ...lastNameLabelSplit.words,
          ...emailLabelSplit.words,
          ...phoneNumberLabelSplit.words,
          ...serviceLabelSplit.words,
          ...organizationLabelSplit.words,
          ...messageLabelSplit.words,
        ],
        {
          opacity: 0,
          yPercent: 100,
        }
      );

      gsap.set(
        [
          firstNameRef.current,
          lastNameRef.current,
          emailRef.current,
          phoneNumberRef.current,
          serviceRef.current,
          organizationRef.current,
          messageRef.current,
          accentDividerRef.current,
          submitButtonRef.current,
        ],
        {
          opacity: 0,
          yPercent: 100,
        }
      );

      // create scroll trigger and animation for subtitles
      // Use single container trigger for all text elements
      const allTextElements = [
        ...subtitleSplit.words,
        ...subsubtitleSplit.words,
      ];

      gsap.to(allTextElements, {
        scrollTrigger: {
          trigger: "#contact-form",
          start: "top 90%",
          end: "top 30%",
          scrub: 1,
        },
        opacity: 1,
        yPercent: 0,
        stagger: 0.03, // Small stagger for smooth sequence
      });

      // create scroll trigger and animation for labels
      // Use single container trigger for all labels to avoid conflicts
      const allLabels = [
        ...firstNameLabelSplit.words,
        ...lastNameLabelSplit.words,
        ...emailLabelSplit.words,
        ...phoneNumberLabelSplit.words,
        ...serviceLabelSplit.words,
        ...organizationLabelSplit.words,
        ...messageLabelSplit.words,
      ];

      gsap.to(allLabels, {
        scrollTrigger: {
          trigger: "#contact-form",
          start: "top 85%",
          end: "top 25%",
          scrub: 1,
        },
        opacity: 1,
        yPercent: 0,
        stagger: 0.02, // Small stagger for smooth sequence
      });

      // create scroll trigger and animation for inputs
      // Use single container trigger for all inputs to avoid conflicts
      const allInputs = [
        firstNameRef.current,
        lastNameRef.current,
        emailRef.current,
        phoneNumberRef.current,
        serviceRef.current,
        organizationRef.current,
        messageRef.current,
      ];

      gsap.to(allInputs, {
        scrollTrigger: {
          trigger: "#contact-form",
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        opacity: 1,
        yPercent: 0,
        stagger: 0.05, // Small stagger for smooth sequence
      });

      // create scroll trigger and animation for accent divider and submit button
      const remainingElements = [
        accentDividerRef.current,
        submitButtonRef.current,
      ];

      gsap.to(remainingElements, {
        scrollTrigger: {
          trigger: "#contact-form",
          start: "top 75%",
          end: "top 15%",
          scrub: 1,
        },
        opacity: 1,
        yPercent: 0,
        stagger: 0.1, // Slightly more stagger for visual separation
      });

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
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };
    initAnimations();
  }, [
    firstNameLabelRef.current,
    lastNameLabelRef.current,
    emailLabelRef.current,
    phoneNumberLabelRef.current,
    serviceLabelRef.current,
    organizationLabelRef.current,
    messageLabelRef.current,
  ]);

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
      setStatusMessage(
        "Form submitted successfully. We will get back to you soon!"
      );
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

  const [, formAction, isPending] = useActionState(submitForm, {
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

  return (
    <div className="flex flex-col gap-5 md:gap-10 p-5 md:p-10 w-full bg-gradient-to-b from-primary-900 via-black to-accent-950 max-w-[1200px] mx-auto rounded-xl shadow-lg">
      <div className="flex flex-col w-full gap-5">
        <h1
          ref={subtitleRef}
          className="font-funnel-sans text-white text-[28px] sm:text-[32px] font-bold leading-tight"
        >
          {subtitle}
        </h1>

        <p
          ref={subsubtitleRef}
          className="font-funnel-sans text-white/90 text-[15px] sm:text-[16px] font-light leading-relaxed max-w-2xl"
        >
          {subsubtitle}
        </p>
      </div>
      {/* Purple accent divider */}
      <div
        ref={accentDividerRef}
        className="w-18 h-3 bg-gradient-to-r from-purple-400 to-purple-600
          rounded-full shadow-sm"
      />
      <div className="flex flex-col gap-5">
        <Form
          action={formAction}
          className="flex flex-col gap-10 md:gap-20"
          id="contact-form"
        >
          <div className="flex flex-col gap-5 md:gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="firstName"
                  ref={firstNameLabelRef}
                  className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  ref={firstNameRef}
                  className="form-input"
                  value={storeFormData.firstName}
                  onChange={(e) =>
                    handleFormChange("firstName", e.target.value)
                  }
                />
                {errors.firstName && (
                  <p className="text-red-500 text-[12px] sm:text-[14px] font-light leading-relaxed">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="lastName"
                  ref={lastNameLabelRef}
                  className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  ref={lastNameRef}
                  className="form-input"
                  value={storeFormData.lastName}
                  onChange={(e) => handleFormChange("lastName", e.target.value)}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-[12px] sm:text-[14px] font-light leading-relaxed">
                    {errors.lastName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  ref={emailLabelRef}
                  className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                  className="form-input"
                  placeholder="Email"
                  value={storeFormData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-[12px] sm:text-[14px] font-light leading-relaxed">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phoneNumber"
                  ref={phoneNumberLabelRef}
                  className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  ref={phoneNumberRef}
                  className="form-input"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) =>
                    handleFormChange("phoneNumber", e.target.value)
                  }
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-[12px] sm:text-[14px] font-light leading-relaxed">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="service"
                  ref={serviceLabelRef}
                  className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
                >
                  Service <span className="text-red-500">*</span>
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
                  <p className="text-red-500 text-[12px] sm:text-[14px] font-light leading-relaxed">
                    {errors.service}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="organization"
                  ref={organizationLabelRef}
                  className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
                >
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  id="organization"
                  ref={organizationRef}
                  className="form-input"
                  placeholder="Organization"
                  value={storeFormData.organization}
                  onChange={(e) =>
                    handleFormChange("organization", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                ref={messageLabelRef}
                className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                id="message"
                ref={messageRef}
                className="form-input min-h-[100px]"
                placeholder="Message"
                value={storeFormData.message}
                onChange={(e) => handleFormChange("message", e.target.value)}
              />
              {errors.message && (
                <p className="text-red-500 text-[12px] sm:text-[14px] font-light leading-relaxed">
                  {errors.message}
                </p>
              )}
            </div>
            <div className="flex w-full justify-center">
              <button
                type="submit"
                ref={submitButtonRef}
                className="animated-gradient-button w-full max-w-sm px-3 py-2 rounded-xl cursor-pointer"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
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

export default ContactForm;
