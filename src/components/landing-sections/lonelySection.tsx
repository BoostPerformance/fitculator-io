import Section from './section';

export default function LonelySection() {
  return (
    <section className=" flex flex-col items-center w-full py-[11rem] h-auto bg-gray-2 sm:py-[6em] leading-tight">
      <Section
        title={
          <>
            외로운 운동은 그만. <br /> 즐거운 운동은 같이.
          </>
        }
        imageSrc="/svg/example.svg"
        imageSrcSm="/images/example-mobile.png"
        reverseY
        textCenter
        className="w-[60rem]"
        title2_5700
        isResponsive={true}
        titleClassName="sm:text-1.25-900"
      />
    </section>
  );
}
