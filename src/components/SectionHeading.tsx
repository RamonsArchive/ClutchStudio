import React from "react";

/**
 * Numbered section heading used across pages:
 *   01 / ABOUT
 *   Big title
 *   optional description
 */
const SectionHeading = ({
  index,
  label,
  title,
  description,
  className = "",
}: {
  index?: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <p className="eyebrow flex items-center gap-3">
        {index && <span className="text-secondary-400">{index}</span>}
        {index && <span className="h-px w-8 bg-white/20" />}
        <span>{label}</span>
      </p>
      <h2 className="heading-display max-w-3xl">{title}</h2>
      {description && <p className="body-copy max-w-2xl">{description}</p>}
    </div>
  );
};

export default SectionHeading;
