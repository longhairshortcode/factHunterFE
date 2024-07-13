
import { useState } from "react";
import style from "./Quiz.module.css"


function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const numberFacts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  } 


  return (
    <div className={style.componentContainer}>
      <div className={style.titleAndButtonsContainer}>
        <p className={style.title}>Quiz</p>
        <div className={style.mathAndReadingButtonContainer}>
          <button
            className={style.mathQuizButton}
            onClick={() => handleCategoryClick("math")}
          >
            Math Quizzes
          </button>
          <button
            className={style.readingQuizButton}
            onClick={() => handleCategoryClick("reading")}
          >
            Reading Quizzes
          </button>
        </div>

        <div className={style.categoriesContainer}>
          {selectedCategory === "math" && (
            <div>
              <div className={style.singleCategoryContainer}>
                <p>Addition</p>
                {numberFacts.map((numberFact, index) => (
                  <span key={index + 1}>{numberFact}</span>
                ))}
                <p>Subtraction</p>
                {numberFacts.map((numberFact, index) => (
                  <span key={index + 1}>{numberFact}</span>
                ))}
                <p>Multiplication</p>
                {numberFacts.map((numberFact, index) => (
                  <span key={index + 1}>{numberFact}</span>
                ))}
                <p>Division</p>
                {numberFacts.map((numberFact, index) => (
                  <span key={index + 1}>{numberFact}</span>
                ))}
              </div>
            </div>
          )}
          {selectedCategory === "reading" && (
            <div>
              <p>Vowels</p>
              <p>Consonants</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
