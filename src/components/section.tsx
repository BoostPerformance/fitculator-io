import Image from 'next/image';
import { ReactNode } from 'react';

interface SectionProps {
  title: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  reverseX?: boolean;
  reverseY?: boolean;
  textCenter?: boolean;
  imgeSize?: number;
}

const Section: React.FC<SectionProps> = ({
  title,
  reverseX = false,
  reverseY = false,
  textCenter = false,
  imageSrc,
  imgeSize,
  description,
}) => {
  return (
    <div>
      <div
        className={`flex flex-row w-[56rem] ${
          reverseX ? 'flex-row-reverse' : ''
        } h-auto ${reverseY ? 'flex-col' : ''} `}
      >
        <div className={` ${textCenter ? 'text-center' : ''}`}>
          <h2 className="text-2.5-700 md:text-1.5-700 sm:text-1.6-700 mb-2">
            {title}
          </h2>
          {description && (
            <p className="text-1.75-500 text-gray-700 ">{description}</p>
          )}
        </div>
        {imageSrc && (
          <div className="w-full md:w-1/2 p-4">
            <Image
              src={`/images/${imageSrc}.png`}
              alt={imageSrc}
              width={imgeSize}
              height={100}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Section;
