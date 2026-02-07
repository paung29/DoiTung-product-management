import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  const backFunction = () => {
    router.back();
  };
  return (
    <button
      type="button"
      onClick={backFunction}
      className="rounded-lg bg-primary-button px-4 py-2 text-sm text-white hover:border-amber-100 hover:border-2"
    >
      Back
    </button>
  );
}

export default BackButton;
