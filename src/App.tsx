import { FC } from 'react';

import Header from './components/Header';
import Accordions from './components/Accordions';
import './App.css';

const accordionData = [
  {
    question: 'Lorem ipsum dolor sit amet 1 ?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, vero quos doloremque eum quam dolorem.'
  },
  {
    question: 'Lorem ipsum dolor sit amet 2 ?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, vero quos doloremque eum quam dolorem inventore minus ad. Molestias, minima! Doloribus, vero quos doloremque.'
  },
  {
    question: 'Lorem ipsum dolor sit amet 3 ?',
    answer:
      'Doloribus, vero quos doloremque eum quam dolorem inventore minus ad. Molestias, minima!'
  },
  {
    question: 'Lorem ipsum dolor sit amet 4 ?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, vero quos doloremque eum quam dolorem inventore minus ad. Molestias, minima!'
  }
];

const App: FC = () => {
  return (
    <>
      <Header title="React JS accordions" />
      <div className="container">
        <Accordions
          closeOthers
          data={accordionData}
          duration={400}
          opened={0}
        />
      </div>
    </>
  );
};

export default App;
