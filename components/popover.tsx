import { useState, ReactNode, useRef } from 'react'
import useOnClickOutside from './hooks/useClickOutside';

type PopoverProps = {
    content: ReactNode;
    children?: ReactNode;
};

function Popover({ content, children }: PopoverProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef(null)

    useOnClickOutside(ref, () => setIsOpen(false))

    const togglePopover = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <div
                className="inline-block cursor-pointer"
                onClick={togglePopover}
            >
                {children}
            </div>

            {isOpen && (
                <div ref={ref} className="absolute right-0 z-10 w-48 mt-1 bg-white rounded-md shadow-lg top-full ring-1 ring-black ring-opacity-5">
                    <div className="py-1" aria-orientation="vertical">
                        {content}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Popover