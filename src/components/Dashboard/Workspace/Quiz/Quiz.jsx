
import { useState } from "react";
import style from "./Quiz.module.css"


function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
              <p>Addition</p>
              <p>Subtraction</p>
              <p>Multiplication</p>
              <p>Division</p>
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
