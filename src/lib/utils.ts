import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { SplitTextType } from "@/types/GlobalTypes";

gsap.registerPlugin(ScrollTrigger, SplitText);


export const createSplitTextAnimation = ({
  textSelectors,
  type,
  scrollTrigger,
  settings,
}: SplitTextType) => {
  console.log("textSelectors", textSelectors);
  const { trigger, start, end, scrub, markers } = scrollTrigger || {};
  const { duration } = settings || { duration: 0.5 };

  const textSplits: Element[] = [];
  
  if (textSelectors) {
    textSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const text = new SplitText(element as HTMLElement, { type }).chars;
        textSplits.push(...text);
      });
    });
  }

  console.log("scrollTrigger", scrollTrigger);
  if (scrollTrigger) {
    console.log("scrollTrigger", scrollTrigger);
    return gsap.to(textSplits, {
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        markers,
      },
      opacity: 1,
      stagger: 0.025,
      ease: "power2.inOut",
    });
  } else {
    console.log("anmaitng the text without scrollTrigger", textSplits);
    return gsap.fromTo(
      textSplits,
      {
        opacity: 0,
        yPercent: -100,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration,
        stagger: 0.025,
        ease: "power2.inOut",
      }
    );
  }
};

export const parseServerActionResponse = <T>(response: T): T => {
  return JSON.parse(JSON.stringify(response)) as T;
};

 // Phone number formatting
 export const updatePhoneNumber = (value: string, phoneNumber: string, setPhoneNumber: (value: string) => void) => {
  // If the user is backspacing and hit a dash, remove the digit before the dash
  const prevLength = phoneNumber.length;
  const newLength = value.length;

  // Check if user is backspacing on a dash
  if (newLength < prevLength) {
    const deletedChar = phoneNumber[newLength];
    if (deletedChar === "-") {
      // Remove the digit before the dash as well
      const withoutDash = phoneNumber.slice(0, newLength);
      const withoutLastDigit = withoutDash.slice(0, -1);
      setPhoneNumber(withoutLastDigit);
      return;
    }
  }

  // Normal processing
  const cleanedValue = value.replace(/[^0-9]/g, "");

  if (cleanedValue.length > 10) {
    return;
  }

  // Format the number
  let formattedValue = cleanedValue;
  if (cleanedValue.length >= 6) {
    formattedValue = `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(
      3,
      6
    )}-${cleanedValue.slice(6, 10)}`;
  } else if (cleanedValue.length >= 3) {
    formattedValue = `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(3)}`;
  }

  setPhoneNumber(formattedValue);
};

export const formDataToObject = (formData: FormData) => {
  const obj: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    obj[key] = value.toString();
  }
  return obj;
};