import Image from "next/image";

export function LoginPhoto() {
  return (
    <>
      <Image
        src="/images/VanillaLogin.png"
        alt="VanillaPhoto"
        width={700}
        height={800}
        // className="hidden md:block md:w-[380px] md:h-[600px] lg:w-[600px] lg:h-[870px] rounded-lg object-cover"
        className="hidden md:block md:w-95 md:h-150 lg:w-150 lg:h-217.5 rounded-lg object-cover"
      />
    </>
  );
}
