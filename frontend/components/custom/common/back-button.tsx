"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  /** Where to go when there is no browser history to go back to. */
  fallbackHref?: string;
  /** Optional style override; defaults to the primary button style. */
  className?: string;
  /** Button label. */
  label?: string;
}

function BackButton({
  fallbackHref = "/staff",
  className,
  label = "Back",
}: BackButtonProps) {
  const router = useRouter();

  const backFunction = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={backFunction}
      className={
        className ??
        "rounded-lg bg-primary-button px-4 py-2 text-sm text-white hover:border-amber-100 hover:border-2"
      }
    >
      {label}
    </button>
  );
}

export default BackButton;
