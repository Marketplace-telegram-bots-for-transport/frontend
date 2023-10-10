import { useState } from 'react';

const CategoriesComponent = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    // Decrease the currentIndex by 1, but make sure it doesn't go below 0
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    // Increase the currentIndex by 1, but make sure it doesn't exceed the number of children - 3
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, children.length - 3)
    );
  };

  return (
    <div className='carousel'>
      <button onClick={handlePrevClick} disabled={currentIndex === 0}>
        Previous
      </button>
      <div className='carousel-container'>
        <div
          className='carousel-content'
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {children}
        </div>
      </div>
      <button
        onClick={handleNextClick}
        disabled={currentIndex === children.length - 3}
      >
        Next
      </button>
    </div>
  );
};

export default CategoriesComponent;
