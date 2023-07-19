import { useState, ReactNode, useRef } from "react";
import useOnClickOutside from "./hooks/useClickOutside";

type PopoverProps = {
  content: ReactNode;
  children?: ReactNode;
};

function Popover({ content, children }: PopoverProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="inline-block cursor-pointer text-azure-950 dark:text-azure-50"
        onClick={togglePopover}
      >
        {children}
      </div>

      {isOpen && (
        <div
          ref={ref}
          className="absolute right-0 z-10 mt-1 text-center rounded-md shadow-lg w-36 dark:bg-azure-50 bg-azure-950 dark:text-azure-800 text-azure-50 top-full"
        >
          <div className="py-1" aria-orientation="vertical">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}

export default Popover;
