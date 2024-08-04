'use client';
import { useState } from 'react';

type AccordionItemProps = {
  title: string;
  content: string;
};

function AccordionItem({ title, content }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-1 border-gray-2">
      <button
        className="flex justify-between w-full py-4 text-left text-1.5-500 text-gray-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${
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
        <div className="py-2 text-gray-600 dark:text-gray-400">{content}</div>
      )}
    </div>
  );
}

type AccordionProps = {
  items: AccordionItemProps[];
};

export default function Accordion({ items }: AccordionProps) {
  return (
    <div className="w-full max-w-[35rem] mx-auto">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
}
