
asssssssimport { useState } from "react";
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
      <div className={style.titleAndQuizzesCategoryContainer}>
        <p className={style.titleQuiz}>Quiz</p>
        <div className={style.mathAndReadingQuizButtonContainer}>
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

         <div className={style.allAndPassedContainer}>   
            {selectedCategory === "math" && (
              <div className={style.allContainer}>
                <p className={style.allTitle}>ALL QUIZZES</p>
                <div className={style.allSingleCategoryContainer}>
                  <div className={style.singleCategoryAndButtons}>
                    <p className={style.categoryTitle}>Addition</p>
                    <div>
                    {numberFacts.map((numberFact, index) => (
                      <button className={style.categoryButton} key={index + 1}>{numberFact}</button>
                    ))}
                    </div>
                  </div>
                  <div className={style.singleCategoryAndButtons}>  
                    <p className={style.categoryTitle}>Subtraction</p>
                    <div>
                    {numberFacts.map((numberFact, index) => (
                      <button className={style.categoryButton} key={index + 1}>{numberFact}</button>
                  ))}
                    </div>
                  </div>
                  <div className={style.singleCategoryAndButtons}>
                  <p className={style.categoryTitle}>Multiplication</p>
                  <div>
                  {numberFacts.map((numberFact, index) => (
                    <button className={style.categoryButton} key={index + 1}>{numberFact}</button>
                  ))}
                  </div>
                  </div>
                  <div className={style.singleCategoryAndButtons}>
                  <p className={style.categoryTitle}>Division</p>
                  <div>
                  {numberFacts.map((numberFact, index) => (
                    <button className={style.categoryButton} key={index + 1}>{numberFact}</button>
                  ))}
                  </div>
                  </div>
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

          
          {selectedCategory === "math" && (
           <div className={style.passedContainer}> 
              <p className={style.passedTitle}>PASSED QUIZZES</p>
                <div className={style.allSingleCategoryContainer}>
                  <div className={style.singleCategoryAndButtons}>
                    <p className={style.categoryTitle}>Addition</p>
                    <div>
                    {numberFacts.map((numberFact, index) => (
                      <button className={style.categoryButton}key={index + 1}>{numberFact}</button>
                    ))}
                    </div>
                  </div>
                  <div className={style.singleCategoryAndButtons}>  
                    <p className={style.categoryTitle}>Subtraction</p>
                    <div>
                    {numberFacts.map((numberFact, index) => (
                      <button className={style.categoryButton} key={index + 1}>{numberFact}</button>
                  ))}
                    </div>
                  </div>
                  <div className={style.singleCategoryAndButtons}>
                  <p className={style.categoryTitle}>Multiplication</p>
                  <div>
                  {numberFacts.map((numberFact, index) => (
                    <button className={style.categoryButton} key={index + 1}>{numberFact}</button>
                  ))}
                  </div>
                  </div>
                  <div className={style.singleCategoryAndButtons}>
                  <p className={style.categoryTitle}>Division</p>
                  <div>
                  {numberFacts.map((numberFact, index) => (
                    <button className={style.categoryButton}key={index + 1}>{numberFact}</button>
                  ))}
                  </div>
                  </div>
                </div>
              </div>
            )}  
          </div>
          </div>
       </div>
  );
}

export default Quiz;
