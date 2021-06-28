import { FC, useRef, RefObject } from 'react';

import Accordion, { AccordionRef } from './Accordion';

interface AccordionData {
  question: string;
  answer: string;
}

interface AccordionsProps {
  duration?: number;
  data: AccordionData[];
  closeOthers?: boolean;
  opened?: number;
}

const Accordions: FC<AccordionsProps> = ({
  duration = 300,
  data,
  closeOthers,
  opened
}) => {
  const accordionElement = useRef<AccordionRef>([]);

  const clickHandler = (
    index: number,
    ref: RefObject<AccordionRef>,
    close: (element: HTMLDivElement | null) => void
  ) => {
    if (closeOthers) {
      if (ref.current) {
        ref.current.forEach((element, elementIndex) => {
          if (index !== elementIndex) close(element);
        });
      }
    }
  };

  return (
    <>
      {data.map((accordion, index) => (
        <Accordion
          key={Math.random()}
          ref={accordionElement}
          question={accordion.question}
          answer={accordion.answer}
          isOpened={opened === index}
          index={index}
          duration={duration}
          onClick={clickHandler}
        />
      ))}
    </>
  );
};

export default Accordions;
