import { useState, useEffect } from "react";
import style from "./Quiz.module.css"
import QuizSet from "./QuizSet/QuizSet";
import { mathQuizzes } from "./QuizSet/data.js";


function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shuffledCardsArr, setShuffledCardsArr] = useState([]);
  const [targetQuiz, setTargetQuiz] = useState({
    numberFact: "",
    operation: ""
  })
  const [savedAnswers, setSavedAnswers] = useState({
    addition: {
      one: [],
      two: [],
      three: [],
      four: [],
      five: [],
      six: [],
      seven: [],
      eight: [],
      nine: [],
      ten: [],
      eleven: [],
      twelve: []
    },
    subtraction: {
      one: [],
      two: [],
      three: [],
      four: [],
      five: [],
      six: [],
      seven: [],
      eight: [],
      nine: [],
      ten: [],
      eleven: [],
      twelve: []
    },
    multiplication: {
      one: [],
      two: [],
      three: [],
      four: [],
      five: [],
      six: [],
      seven: [],
      eight: [],
      nine: [],
      ten: [],
      eleven: [],
      twelve: []
    },
    division: {
      one: [],
      two: [],
      three: [],
      four: [],
      five: [],
      six: [],
      seven: [],
      eight: [],
      nine: [],
      ten: [],
      eleven: [],
      twelve: []
    }
  })

  const numberFacts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const vowels = ["short a", "short e", "short i", "short o", "short u", "short y", "long a", "long e", "long i", "long o", "long u", "long y"]
  const consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"]
  const numberFactsAsWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"]
  
  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  function showTargetQuiz(factButton, operation){
    const numberFactWord = numberFactsAsWords[factButton - 1]
    const operationFactsArr = mathQuizzes[operation][numberFactWord] 
    const shuffledCards = shuffleArray(operationFactsArr)
    setShuffledCardsArr(shuffledCards)
    setTargetQuiz((prev) => ({
      ...prev,
      numberFact : numberFactWord,
      operation : operation 
    }))
    console.log(numberFactWord, operation)  
  }

 
  
     async function fetchResults() {
      // console.log("fetchResults ran");
      const userID = user.id;
      // console.log("USER ID: ", userID);
      try {
        // Make a GET request to fetch results for the user
        const results = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/answers-results/displayAnswersResults/${userID}`);
        // console.log("Results from server: ", results);
        if (results.data.displayedAnswersResults) {
          // If results are found, update the savedAnswers state and store results ID in localStorage
          setSavedAnswers(results.data.displayedAnswersResults);
          const resultsID = results.data.displayedAnswersResults._id;
          window.localStorage.setItem("resultsID", resultsID);
          console.log("Results found: ", results);
        } else {
          // If no results are found, set savedAnswers to an empty object
          console.log("User hasn't passed or failed any quizzes yet, so Results not found");
          setSavedAnswers({});
        }
      } catch (err) {
        // Handle errors appropriately
        if (err.response && err.response.status === 404) {
          console.log("No results found.");
          setSavedAnswers({});
        } else {
          console.error("An error occurred while fetching results: ", err);
          setSavedAnswers({});
        } 
      }
    }
  
    async function saveToDB() {
     
      const userID = user.id;
      try {
          console.log("Here is the NEW savedAnswers data: ", {savedAnswers, userID})
          const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/answers-results/saveAnswersResults`, { savedAnswers, userID });
       
          if (response.data && response.data.data) {
            const resultsID = response.data.data._id;
            window.localStorage.setItem("resultsID", resultsID);
            console.log("Document updated: ", response.data.data);
          }   
          console.log("this is comming from here ")
          if (response.data && response.data.data) {
            const resultsID = response.data.data._id;
            window.localStorage.setItem("resultsID", resultsID);
            console.log("Document created: ", response.data.data);
        }
      } catch (err) {
        console.log(err);
        console.log("here ", err.message)
      }
    }
  


  return (
    <div className={style.componentContainer}>
      <div className={style.titleAndQuizzesCategoryContainer}>
        <p className={style.titleQuiz}>Quiz</p>
        <div className={style.mathAndReadingQuizButtonContainer}>
          <button
            className={style.mathQuizButton}
            onClick={() => {
              handleCategoryClick("math");
            fetchResults();
          }}>
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
                      <button onClick={() => showTargetQuiz(numberFact, "addition")} className={style.categoryButton} key={index + 1}>{numberFact}</button>
                    ))}
                    </div>
                  </div>
                  <div className={style.singleCategoryAndButtons}>  
                    <p className={style.categoryTitle}>Subtraction</p>
                    <div>
                    {numberFacts.map((numberFact, index) => (
                      <button onClick={() => showTargetQuiz(numberFact, "subtraction")} className={style.categoryButton} key={index + 1}>{numberFact}</button>
                  ))}
                    </div>
                  </div>
                  <div className={style.singleCategoryAndButtons}>
                  <p className={style.categoryTitle}>Multiplication</p>
                  <div>
                  {numberFacts.map((numberFact, index) => (
                    <button onClick={() => showTargetQuiz(numberFact, "multiplication")} className={style.categoryButton} key={index + 1}>{numberFact}</button>
                  ))}
                  </div>
                  </div>
                  <div className={style.singleCategoryAndButtons}>
                  <p className={style.categoryTitle}>Division</p>
                  <div>
                  {numberFacts.map((numberFact, index) => (
                    <button onClick={() => showTargetQuiz(numberFact, "division")} className={style.categoryButton} key={index + 1}>{numberFact}</button>
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
                {numberFacts.map((numberFact, index) => {
                  const fact = numberFactsAsWords[numberFact - 1];
                  const additionValue = savedAnswers.addition?.[fact];

                  // Debugging console logs for Addition category
                  // console.log('numberFact:', numberFact);
                  // console.log('fact:', fact);
                  // console.log('additionValue:', additionValue);

                  const backgroundColor = additionValue
                    ? additionValue.join(" ").split(" ").includes("incorrect") ? "red"
                    : additionValue.join(" ").split(" ").includes("correct") ? "green"
                    : "grey"
                    : "grey";

                  return (
                    <button
                      style={{ backgroundColor }}
                      className={style.categoryButton}
                      key={index + 1}
                    >
                      {numberFact}
                    </button>
                  );
                })}
              </div>
              </div>
              {/* Subtraction category with background color calculation */}
              <div className={style.singleCategoryAndButtons}>  
              <p className={style.categoryTitle}>Subtraction</p>
              <div>
                {numberFacts.map((numberFact, index) => {
                  const fact = numberFactsAsWords[numberFact - 1];
                  const subtractionValue = savedAnswers.subtraction?.[fact];

                  // Debugging console logs for Subtraction category
                  // console.log('numberFact:', numberFact);
                  // console.log('fact:', fact);
                  // console.log('subtractionValue:', subtractionValue);

                  

                  const backgroundColor = subtractionValue
                    ? subtractionValue.join(" ").split(" ").includes("incorrect") ? "red"
                    : subtractionValue.join(" ").split(" ").includes("correct") ? "green"
                    : "grey"
                    : "grey";

                  return (
                    <button
                      style={{ backgroundColor }}
                      className={style.categoryButton}
                      key={index + 1}
                    >
                      {numberFact}
                    </button>
                  );
                })}
              </div>
              </div>
              {/* Multiplication category with background color calculation */}
              <div className={style.singleCategoryAndButtons}>
              <p className={style.categoryTitle}>Multiplication</p>
              <div>
                {numberFacts.map((numberFact, index) => {
                  const fact = numberFactsAsWords[numberFact - 1];
                  const multiplicationValue = savedAnswers.multiplication?.[fact];

                  // Debugging console logs for Multiplication category
                  // console.log('numberFact:', numberFact);
                  // console.log('fact:', fact);
                  // console.log('multiplicationValue:', multiplicationValue);

                  const backgroundColor = multiplicationValue
                    ? multiplicationValue.join(" ").split(" ").includes("incorrect") ? "red"
                    : multiplicationValue.join(" ").split(" ").includes("correct") ? "green"
                    : "grey"
                    : "grey";

                  return (
                    <button
                      style={{ backgroundColor }}
                      className={style.categoryButton}
                      key={index + 1}
                    >
                      {numberFact}
                    </button>
                  );
                })}
              </div>
              </div>
              {/* Division category with background color calculation */}
              <div className={style.singleCategoryAndButtons}>
              <p className={style.categoryTitle}>Division</p>
              <div>
                {numberFacts.map((numberFact, index) => {
                  const fact = numberFactsAsWords[numberFact - 1];
                  const divisionValue = savedAnswers.division?.[fact];

                  // Debugging console logs for Division category
                  // console.log('numberFact:', numberFact);
                  // console.log('fact:', fact);
                  // console.log('divisionValue:', divisionValue);

                  const backgroundColor = divisionValue
                    ? divisionValue.join(" ").split(" ").includes("incorrect") ? "red"
                    : divisionValue.join(" ").split(" ").includes("correct") ? "green"
                    : "grey"
                    : "grey";

                  return (
                    <button
                      style={{ backgroundColor }}
                      className={style.categoryButton}
                      key={index + 1}
                    >
                      {numberFact}
                    </button>
                  );
                })}
              </div>
              </div>
              </div>
              </div>
              )}  
              </div>
              </div>
              <QuizSet 
              targetQuiz={targetQuiz} 
              setTargetQuiz={setTargetQuiz} 
              shuffledCardsArr={shuffledCardsArr} 
              setShuffledCardsArr={setShuffledCardsArr} 
              numberFactsAsWords={numberFactsAsWords} 
              setSavedAnswers={setSavedAnswers} 
              savedAnswers={savedAnswers}
              fetchResults={fetchResults} 
              saveToDB={saveToDB}
              />
              </div>
              );
              }

export default Quiz; 