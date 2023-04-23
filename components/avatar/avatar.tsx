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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className={`${size === "large" ? "w-10 h-10" : size === "small" ? "w-8 h-8" : "w-9 h-9"} ${border && "border-2 border-Emerald-400"} flex items-center justify-center bi bi-person-circle bg-black-100 bg-opacity-20 rounded-full`}
            viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
          </svg>
      }
    </>
  );
}

export default Avatar;
