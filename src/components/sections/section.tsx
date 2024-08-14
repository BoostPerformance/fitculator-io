import Image from 'next/image';
import { ReactNode } from 'react';

interface SectionProps {
  title: ReactNode;
  description?: ReactNode;
  description1_75500?: boolean;
  description1_75700?: boolean;
  imageSrc?: string;
  reverseX?: boolean;
  reverseY?: boolean;
  textCenter?: boolean;
  imgeSize?: number;
  textAlign?: boolean;
  pro?: ReactNode;
  title3700?: boolean;
  title2_5700?: boolean;
  title2_5900?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  title3700 = false,
  title2_5700 = false,
  title2_5900 = false,
  reverseX = false,
  reverseY = false,
  textCenter = false,
  imageSrc,
  imgeSize,
  description,
  description1_75500 = false,
  description1_75700 = false,
  textAlign = false,
  pro,
}) => {
  return (
    <div
      className={`flex flex-row w-[56rem] sm:w-[27rem] sm:flex-col ${
        reverseX ? 'flex-row-reverse' : ''
      } h-auto ${
        reverseY ? 'flex-col' : ''
      } gap-[5rem] sm:flex-col-reverse sm:items-center sm:w-full`}
    >
      <div
        className={`${textAlign ? 'text-right' : 'text-left'} ${
          textCenter ? 'text-center' : ''
        } sm:text-center`}
      >
        {pro && (
          <h1 className="inline-block border-2 px-2 py-1 rounded-lg w-auto  border-gray-1 sm:px-1 sm:py-[0.1rem] text-gray-1">
            PRO
          </h1>
        )}

        <h2
          className={`${title3700 && 'text-3-700'} ${
            title2_5700 && 'text-2.5-700'
          } ${
            title2_5900 && 'text-2.5-900'
          } mb-2 md:text-2-900 sm:text-1.75-900 sm:text-center`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`${description1_75500 && 'text-1.5-500'} ${
              description1_75700 && 'text-1.5-700'
            } text-gray-5 md:text-1.5-700 sm:text-1.125-700 `}
          >
            {description}
          </p>
        )}
      </div>
      {imageSrc && (
        <Image
          src={`/images/${imageSrc}.svg`}
          alt={imageSrc}
          width={imgeSize}
          height={100}
        />
      )}
    </div>
  );
};
export default Section;
