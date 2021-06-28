import { useRef, forwardRef, useEffect, RefObject } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

interface AccordionProps {
  question: string;
  answer: string;
  index: number;
  isOpened?: boolean;
  duration: number;
  onClick: (
    index: number,
    ref: RefObject<HTMLDivElement[]>,
    close: (element: HTMLDivElement | null) => void
  ) => void;
}

export type AccordionRef = HTMLDivElement[];
const Accordion = (
  {
    question,
    answer,
    index,
    isOpened,
    duration = 300,
    onClick
  }: AccordionProps,
  ref: any
) => {
  const accordionBody = useRef<HTMLDivElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpened) {
      if (ref.current) {
        ref.current[index].classList.add('opened');
      }

      if (accordionBody.current) {
        accordionBody.current.style.transitionDuration = `${duration}ms`;
        accordionBody.current.style.display = 'block';
      }

      if (arrow.current) {
        arrow.current.style.transitionDuration = `${duration}ms`;
        arrow.current.style.transform = 'rotate(90deg)';
      }
    }
  }, [isOpened, index, ref, duration]);

  const openAccordionHandler = () => {
    const accordionElement = ref.current[index] as HTMLDivElement;
    const accordionBodyElement = accordionBody.current;
    const arrowElement = arrow.current;
    let height: number;

    accordionElement.classList.add('opened');
    onClick(index, ref, closeAccordionHandler);

    if (accordionBodyElement) {
      accordionBodyElement.style.transitionDuration = `${duration}ms`;
      accordionBodyElement.style.display = 'block';
      height = accordionBodyElement.offsetHeight;
      accordionBodyElement.style.height = '0px';
    }

    if (arrowElement) {
      arrowElement.style.transitionDuration = `${duration}ms`;
    }

    setTimeout(() => {
      if (accordionBodyElement) {
        accordionBodyElement.style.height = `${height}px`;
      }

      if (arrowElement) {
        arrowElement.style.transform = 'rotate(90deg)';
      }
    }, 20);

    setTimeout(() => {
      if (accordionBodyElement) {
        accordionBodyElement.style.height = 'auto';
      }

      accordionElement.classList.remove('disable-click');
    }, duration + 20);
  };

  const closeAccordionHandler = (element: HTMLDivElement | null = null) => {
    let accordionElement = ref.current[index] as HTMLDivElement;
    let accordionBodyElement = accordionBody.current;
    let arrowElement = arrow.current;

    if (element) {
      accordionElement = element;
      accordionBodyElement = accordionElement.querySelector('.accordion__body');
      arrowElement = accordionElement.querySelector('.accordion__head span');
    }

    if (accordionBodyElement) {
      accordionBodyElement.style.height = `${accordionBodyElement.offsetHeight}px`;
    }

    if (arrowElement) {
      arrowElement.style.transform = 'rotate(0)';
    }

    accordionElement.classList.remove('opened');
    accordionElement.classList.add('disable-click');

    setTimeout(() => {
      if (accordionBodyElement) {
        accordionBodyElement.style.height = '0px';
      }
    }, 20);

    setTimeout(() => {
      if (accordionBodyElement) {
        accordionBodyElement.style.display = 'none';
        accordionBodyElement.style.height = 'auto';
      }

      accordionElement.classList.remove('disable-click');
    }, duration + 20);
  };

  const accordionClickHandler = () => {
    const accordionElement = ref.current[index] as HTMLDivElement;

    if (accordionElement.classList.contains('opened')) {
      closeAccordionHandler();
    } else {
      openAccordionHandler();
    }
  };

  return (
    <div
      ref={element => {
        ref.current[index] = element;
      }}
      className="accordion"
    >
      <div className="accordion__head">
        <p onClick={accordionClickHandler}>{question}</p>
        <span ref={arrow}>
          <IoIosArrowForward />
        </span>
      </div>
      <div ref={accordionBody} className="accordion__body">
        <div className="accordion__body_inner">{answer}</div>
      </div>
    </div>
  );
};

export default forwardRef<AccordionRef, AccordionProps>(Accordion);
