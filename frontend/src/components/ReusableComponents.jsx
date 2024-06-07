import React from "react";

export const SectionTitle = ({ title, className }) => (
  <div className={`text-3xl font-semibold mb-2 ${className}`}>{title}</div>
);

export const SectionDivider = ({ className }) => (
  <div className={`border-b mb-4 ${className}`}></div>
);
