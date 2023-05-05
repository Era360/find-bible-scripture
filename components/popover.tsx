import React, { useState, ReactNode } from 'react'

type PopoverProps = {
    content: ReactNode;
    children?: ReactNode;
};

function Popover({ content, children }: PopoverProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                <div className="absolute right-0 z-10 w-48 mt-1 bg-white rounded-md shadow-lg top-full ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {content}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Popover