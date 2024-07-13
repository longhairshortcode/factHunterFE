
import { useState } from "react";
import style from "./Quiz.module.css"


function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const numberFacts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const vowels = ["short a", "short e", "short i", "short o", "short u", "short y", "long a", "long e", "long i", "long o", "long u", "long y"]
  const consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"]

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
         <div className={style.categoriesAndPassedContainer}>   
          <div className={style.categoriesContainer}>
            {selectedCategory === "math" && (
              <div>
                <p className={style.allTitle}>ALL QUIZZES</p>
                <div className={style.singleCategoryContainer}>
                  <p className={style.singleCategory}>Addition
                  {numberFacts.map((numberFact, index) => (
                    <button key={index + 1}>{numberFact}</button>
                  ))}
                  </p>
                  <p className={style.singleCategory}>Subtraction
                  {numberFacts.map((numberFact, index) => (
                    <button key={index + 1}>{numberFact}</button>
                  ))}
                  </p>
                  <p className={style.singleCategory}>Multiplication
                  {numberFacts.map((numberFact, index) => (
                    <button key={index + 1}>{numberFact}</button>
                  ))}
                  </p>
                  <p className={style.singleCategory}>Division
                  {numberFacts.map((numberFact, index) => (
                    <button key={index + 1}>{numberFact}</button>
                  ))}
                  </p>
                </div>
              </div>
            )}
            {selectedCategory === "reading" && (
              <div>
                <p>Vowels</p>
                {vowels.map((vowel, index) => (
                    <span key={index + 1}>{vowel}</span>
                  ))}
                <p>Consonants</p>
                {consonants.map((consonant, index) => (
                    <span key={index + 1}>{consonant}</span>
                  ))}
              </div>
            )}
          </div>
          <div className={style.passedContainer}>
            {selectedCategory === "math" && (
              <div>
                <p className={style.passedTitle}>PASSED QUIZZES</p>
                <div className={style.singleCategoryContainer}>
                  <p className={style.singleCategory}>Addition</p>
                  {numberFacts.map((numberFact, index) => (
                    <button key={index + 1}>{numberFact}</button>
                  ))}
                  <p className={style.singleCategory}>Subtraction</p>
                  {numberFacts.map((numberFact, index) => (
                    <button key={index + 1}>{numberFact}</button>
                  ))}
                  <p className={style.singleCategory}>Multiplication</p>
                  {numberFacts.map((numberFact, index) => (
                    <button key={index + 1}>{numberFact}</button>
                  ))}
                  <p className={style.singleCategory}>Division</p>
                  {numberFacts.map((numberFact, index) => (
                    <button key={index + 1}>{numberFact}</button>
                  ))}
                </div>
              </div>
            )}
            {selectedCategory === "reading" && (
              <div>
                <p>Vowels</p>
                {vowels.map((vowel, index) => (
                    <span key={index + 1}>{vowel}</span>
                  ))}
                <p>Consonants</p>
                {consonants.map((consonant, index) => (
                    <span key={index + 1}>{consonant}</span>
                  ))}
              </div>
            )}
          </div>
          </div>
         </div>
      </div>
  );
}

export default Quiz;
