"use client";
import React from "react";
import { useRef, useState, useMemo, useActionState } from "react";
import { parseServerActionResponse } from "@/lib/utils";
import { ActionState, ServiceType } from "@/types/GlobalTypes";
import { toast } from "sonner";
import Form from "next/form";

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

  const [storeFormData, setStoreFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    service: ServiceType.WEB_DEVELOPMENT,
    organization: "",
    message: "",
  });

  const submitForm = async (
    state: ActionState,
    formData: FormData
  ): Promise<ActionState> => {
    try {
      const result = {
        status: "SUCCESS",
        error: "",
        data: {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        },
      };

      if (result.status === "ERROR") {
        toast.error("ERROR", {
          description: result.error,
        });
        return parseServerActionResponse({
          status: "ERROR",
          error: result.error,
          data: null,
        });
      }

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

  return (
    <div className="flex flex-col gap-5 md:gap-10 p-5 md:p-10 w-full bg-gradient-to-b from-primary-900 via-black to-accent-900 max-w-[1200px] mx-auto rounded-xl shadow-lg">
      <div className="flex flex-col w-full gap-5">
        <h1 className="font-funnel-sans text-white text-[28px] sm:text-[32px] font-bold leading-tight">
          {subtitle}
        </h1>

        <p className="font-funnel-sans text-white/90 text-[15px] sm:text-[16px] font-light leading-relaxed max-w-2xl">
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
        <Form action={formAction}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="First Name"
                className="form-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lastName"
                className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="form-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-input"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phoneNumber"
                className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                className="form-input"
                placeholder="Phone Number"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="service"
                className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
              >
                Service <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                id="service"
                className="form-input"
                defaultValue={ServiceType.WEB_DEVELOPMENT}
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-funnel-sans text-white text-[12px] sm:text-[14px] font-light leading-relaxed"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="form-input min-h-[100px]"
                placeholder="Message"
              />
            </div>
            <div className="submit-button-container flex w-full flex-center px-5">
              <button
                type="submit"
                className="submit-button"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
