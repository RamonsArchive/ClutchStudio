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