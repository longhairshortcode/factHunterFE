import style from "./QuizSet.module.css"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../../../../../App"


function QuizSet({targetQuiz, setTargetQuiz, shuffledCardsArr, setShuffledCardsArr, numberFactsAsWords, setSavedAnswers, savedAnswers}) {
 
const {numberFact, operation} = targetQuiz
const {user} = useContext(AuthContext)


const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
const [userAnswers, setUserAnswers] = useState([])
const [answer, setAnswer] = useState("")
const [userAnswersResultsState, setUserAnswersResultsState] = useState([])
const [numOfCorrectAnswersState, setNumOfCorrectAnswersState] = useState(0)
const [showResultsCard, setShowResultsCard] = useState(false)


const operationsAsWords = ["addition", "subtraction", "multiplication", "division"]


function nextQuestion() {
  setUserAnswers((prev) => {
    return [...prev, answer]
  })
  setCurrentQuestionIndex(currentQuestionIndex + 1)
  setAnswer("")
  
}

// useEffect(()=>{
//  const timer = setInterval(() => {nextQuestion()}, 4500)
//   return ()=>{
//     clearInterval(timer)
//   }
// }, [userAnswers])
let timer;
// TIMER/INTERVAL USEEFFECT
useEffect(() => {
  // console.log(currentQuestionIndex)
 if (currentQuestionIndex === 12) {
    // setCurrentQuestionIndex(null)
    // setShuffledCardsArr([])
    return;
  }
  if (shuffledCardsArr.length < 1){
    return;
  }
  timer = setInterval(nextQuestion, 5500);
  return () => clearInterval(timer);
}, [userAnswers, shuffledCardsArr]);

useEffect(()=>{
  if (currentQuestionIndex >= 12){
    clearInterval(timer);
  }
}, [currentQuestionIndex])



//if grabbing more than 1, [] destructure, if 1, {} destructure
function handleChange(e){
  setAnswer(e.target.value);
}

// function handleChange(e){
//   const quizAnswer = e.target.value 
//   setAnswerData((prev) => ({
//     ...prev,
//     answer : quizAnswer
//   }))
// }


//OG before the chat version below
// async function saveResults(){

//   setCurrentQuestionIndex(0)
//   setShuffledCardsArr([])
//   const [fact, operation] = userAnswersResultsState[0].split(" ")
//   // console.log(fact, operation)
//   const numberFactWord = numberFactsAsWords[Number(fact) - 1]
  // console.log(numberFactsAsWords)
  // console.log(numberFactWord)
  // const operationWord = operation === "+" ? operationsAsWords[0] 
  //   : operation === "-" ? operationsAsWords[1] 
  //   : operation === "x" ? operationsAsWords[2] 
  //   : operation === "/" ? operationsAsWords[3] 
  //   : "";
  // await setSavedAnswers((prev) => ({
  //   ...prev,
  //   [operationWord] : {
  //     [numberFactWord] : 
  //       userAnswersResultsState
  //   } 
  // }))
  // setShowResultsCard(false)
  
  // async function saveToDB(){
  //   try{
  //     const results = await axios.post("http://localhost:4000/answers-results/saveAnswersResults", savedAnswers)
  //     console.log('Saved answers:', results)
  //   }catch(err){
  //   console.log(err)
  //   }
  // }
  // saveToDB()

// setNumOfCorrectAnswersState(0)

// }


const [loading, setLoading] = useState(true);

useEffect(() => {
  // Check if user is defined. If not, do nothing.
  if (!user) return;

  // console.log("useEffect ran and fetch Should run", user);
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
        // console.log("Results found: ", results);
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
    } finally {
      // Set loading to false once data fetching is done
      setLoading(false);
    }
  }

  // Call the fetchResults function
  fetchResults();
}, [user]);



//MINE that wasn't waiting for user state to be defined and was running fetch first prematurely , but trying CHAT ABOVE: 
// useEffect(() => {
//   console.log("useEffect ran", user)
//   async function fetchResults() {
//     console.log("fetchResults ran")
//     const userID = user.id
//     console.log("USER ID: ", userID)
//     try {
//       const results = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}}/answers-results/displayAnswersResults/${userID}`)
//       console.log("Results from server: ", results);
//       if (results.data.displayedAnswersResults) {
//         setSavedAnswers(results.data.displayedAnswersResults)
//         const resultsID = results.data.displayedAnswersResults._id
//         window.localStorage.setItem("resultsID", resultsID )
//         // console.log("This is results: ", results)
//         console.log("Results found: ", results)
//       } else {
//         console.log("Results not found")
//         setSavedAnswers({});
//       }
//     } catch (err) {
//       if (err.response && err.response.status === 404) {
//         // setError('No results found.');
//         console.log("No results found.");
//         setSavedAnswers({});
//     } else {
//       console.error("An error occurred while fetching results: ", err);
//         setSavedAnswers({});
//         // setError('An error occurred while fetching results.');
//     }
//   }
//   fetchResults()
//  }
// }, [user])


// useEffect(()=>{
// console.log("This is saved answers: ", savedAnswers)
// }, [savedAnswers])

async function saveToDB() {
     
  const userID = user.id;
  try {
      // console.log("Here is the NEW savedAnswers data: ", {savedAnswers, userID})
      const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/answers-results/saveAnswersResults`, { savedAnswers, userID });
   
      if (response.data && response.data.data) {
        const resultsID = response.data.data._id;
        window.localStorage.setItem("resultsID", resultsID);
        console.log("Document updated: ", response.data.data);
      }   
    //   console.log("this is comming from here ")
    //   if (response.data && response.data.data) {
    //     const resultsID = response.data.data._id;
    //     window.localStorage.setItem("resultsID", resultsID);
    //     console.log("Document created: ", response.data.data);
    // }
  } catch (err) {
    console.log(err);
    console.log("here ", err.message)
  }
}
//CHATGPT
async function saveResults(){
  setCurrentQuestionIndex(0)
  setShuffledCardsArr([])
  const [fact, operation] = userAnswersResultsState[0].split(" ")
  const numberFactWord = numberFactsAsWords[Number(fact) - 1]
  const operationWord = operation === "+" ? operationsAsWords[0] 
    : operation === "-" ? operationsAsWords[1] 
    : operation === "x" ? operationsAsWords[2] 
    : operation === "/" ? operationsAsWords[3] 
    : "";
  setSavedAnswers((prev) => ({
    ...prev,
    [operationWord]: {
      [numberFactWord]: userAnswersResultsState
    } 
  }))
  setShowResultsCard(false);
}
useEffect(() => {
  if (Object.keys(savedAnswers).length > 0) {
    saveToDB();
  }
}, [savedAnswers]);  

function handleSubmit(e){
  e.preventDefault(); 
  let userAnswersResults = []
  let numOfCorrectAnswers = 0
  for (let i = 0; i < shuffledCardsArr.length; i++)
    if ( shuffledCardsArr[i].answer === userAnswers[i] ){
    userAnswersResults.push(
      `${shuffledCardsArr[i].question} = ${shuffledCardsArr[i].answer} correct`)
    numOfCorrectAnswers += 1
    // console.log(userAnswersResults)
    }
  else{
  //  userAnswersResults.push(`${shuffledCardsArr[i].question} = ${userAnswers[i]} incorrect`)
   userAnswersResults.push(`${shuffledCardsArr[i].question} = ${userAnswers[i]}, incorrect -------- ANSWER: ${shuffledCardsArr[i].answer}`)
  //  console.log(userAnswersResults)
  }
 setUserAnswersResultsState(userAnswersResults)
 setNumOfCorrectAnswersState(numOfCorrectAnswers)
 setShowResultsCard(true)
 setUserAnswers([])

 saveResults();
}


  return (
          <div className={style.componentContainer}>
            {showResultsCard &&
            <div className={style.resultCard}>
              <p className={style.correct}>{numOfCorrectAnswersState} out of 13 correct</p>
              <div className={style.resultsContainer}>
              {userAnswersResultsState.map((result, index) => (
               
                <p className={style.resultCardItem} key={index + 1}>{userAnswersResultsState[index]}</p>
              ))

              }
              </div>
              <button className={style.saveButton} onClick={saveResults}>Save Results</button>
            </div>
            }
            {!showResultsCard &&
            <div className={style.singleCard}>
               { shuffledCardsArr.length > 0 &&
                <p className={style.left}>{shuffledCardsArr.length - currentQuestionIndex} left</p>
              }
              <div className={style.question}>
              {shuffledCardsArr &&
            shuffledCardsArr[currentQuestionIndex]?.question} 
              </div>
              {/* { shuffledCardsArr.length > 0 &&
                <p className={style.left}>{shuffledCardsArr.length - currentQuestionIndex} left</p>
              } */}
              
              <div className={style.answerFillInContainer}>
                <input 
                  type="text"
                  name="answer"
                  value={answer}
                  className={style.answerFillIn}
                  onChange={handleChange}
                  placeholder="?"
                  />
                {shuffledCardsArr &&
                 shuffledCardsArr.length - currentQuestionIndex !== 0 ?
                  <button 
                  className={style.next}
                  onClick={nextQuestion}
                >
                  Next
                </button> : currentQuestionIndex > 11 ?
                <button
                className={style.submit}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                
                : <></>
                }
              </div>
            </div>
            }
          </div>
  )
}

export default QuizSet
