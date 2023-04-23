import Image from "next/image";

type AvatarData = {
  user_image?: string | null;
  size?: "small" | "medium" | "large";
  border?: Boolean;
};

function Avatar({ user_image, size = "large", border = false }: AvatarData) {
  return (
    <>
      {
        user_image ?
          <Image
            className={`${size === "large" ? "w-8 h-8 sm:w-10 sm:h-10" : size === "small" ? "w-6 h-6 sm:w-8 sm:h-8" : "w-7 h-7 sm:w-9 sm:h-9"} ${border && "border-2 border-Emerald-400"} rounded-full `}
            src={user_image}
            width={0}
            height={0}
            sizes="100vw"
            referrerPolicy="no-referrer"
            alt="Profile pic"
          />
          :
          <i
            className={`${size === "large" ? "w-10 h-10" : size === "small" ? "w-8 h-8" : "w-9 h-9"} ${border && "border-2 border-Emerald-400"} flex items-center justify-center fa-duotone fa-user bg-black-100 bg-opacity-20 rounded-full`}
          ></i>
      }
    </>
  );
}

export default Avatar;
