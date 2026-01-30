import Image from "next/image";

export function LoginPhoto() {
  return (
    <>
      <Image
        src="/images/VanillaLogin.png"
        alt="VanillaPhoto"
        height={"872"}
        width={"722"}
        className="rounded-lg object-cover min-h-[872px] max-w-[722px] "
      />
    </>
  );
}
