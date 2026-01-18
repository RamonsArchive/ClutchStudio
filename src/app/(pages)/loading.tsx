import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-primary-background-950 px-6 py-12 text-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-3 rounded-full bg-primary-background-900 px-4 py-3">
          <Loader2 className="h-5 w-5 animate-spin text-primary-200" />
          <span className="text-sm font-medium text-primary-100">
            Clutch Studio
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="font-funnel-sans text-xl font-semibold text-white sm:text-2xl">
            Loading your experience
          </p>
          <p className="max-w-xl text-base text-primary-100/80 sm:text-lg">
            We are preparing the page. This only takes a moment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
