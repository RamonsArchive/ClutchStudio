export type SplitTextType = {
    textSelectors: string[];
    type: "char" | "word" | "line";
    scrollTrigger?: {
      trigger: string;
      start: string;
      end: string;
      scrub: boolean;
      markers: boolean;
    };
    settings?: {
      duration: number;
    };
}