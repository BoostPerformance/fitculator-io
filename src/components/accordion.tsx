'use client';
import { useState } from 'react';
import { ReactNode } from 'react';

type AccordionItemProps = {
  title?: string;
  content?: ReactNode;
  path?: boolean;
};

function AccordionItem({ title, content, path }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-1 border-gray-2">
      <button
        className="flex justify-between w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="py-2 text-1.25-700 w-auto sm:text-1-500 sm:py-0">
          {title}
        </span>
        <svg
          className={`w-[1.5rem] h-[1.5rem] transform transition-transform duration-200 text-blue-1 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="text-gray-1 text-1-500 pb-[2.75rem] flex flex-col gap-[1.69rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="2"
            viewBox="0 0 920 2"
            fill="none"
          >
            {path && <path d="M0 1H920" stroke="#F5F5F5" stroke-width="2" />}
          </svg>
          {content}
        </div>
      )}
    </div>
  );
}

type AccordionProps = {
  items: {
    id: number;
    title?: string;
    content: ReactNode;
  }[];
};

function Accordion({ items }: AccordionProps) {
  return (
    <div className="w-full max-w-[55rem] mx-auto px-[1.37rem]">
      {items.map((item) => (
        <AccordionItem
          path={true}
          key={item.id}
          title={item.title}
          content={item.content}
        />
      ))}
    </div>
  );
}

export { Accordion, AccordionItem };
