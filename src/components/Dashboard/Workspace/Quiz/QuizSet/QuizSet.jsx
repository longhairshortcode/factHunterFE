import style from "./QuizSet.module.css"
// import { mathQuizzes } from "./data"
import { useState, useEffect } from "react"
import axios from "axios"

function QuizSet({targetQuiz, setTargetQuiz, shuffledCardsArr, setShuffledCardsArr, numberFactsAsWords, setSavedAnswers}) {
 
const {numberFact, operation} = targetQuiz


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
  setAnswer([""])
  
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
  const {value} = e.target
  setAnswer(value)
}

// function handleChange(e){
//   const quizAnswer = e.target.value 
//   setAnswerData((prev) => ({
//     ...prev,
//     answer : quizAnswer
//   }))
// }

function saveResults(){

  setCurrentQuestionIndex(0)
  setShuffledCardsArr([])
  const [fact, operation] = userAnswersResultsState[0].split(" ")
  // console.log(fact, operation)
  const numberFactWord = numberFactsAsWords[Number(fact) - 1]
  // console.log(numberFactsAsWords)
  // console.log(numberFactWord)
  const operationWord = operation === "+" ? operationsAsWords[0] 
    : operation === "-" ? operationsAsWords[1] 
    : operation === "x" ? operationsAsWords[2] 
    : operation === "/" ? operationsAsWords[3] 
    : "";
  setSavedAnswers((prev) => ({
    ...prev,
    [operationWord] : {
      [numberFactWord] : 
        userAnswersResultsState
    } 
})
)
setShowResultsCard(false)
async function saveToDB(){
try{
  const results = await axios.put("http://localhost:5000/", )
}catch(err){
  console.log(err)
}
}

// setNumOfCorrectAnswersState(0)

}

function handleSubmit(e){

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
}

useEffect(()=>{
  console.log("This is userAnswers that should be clear: ", userAnswers)
}, [userAnswers])

useEffect(()=>{
console.log("This is the userAnswersResultState: ", userAnswersResultsState)
},[userAnswersResultsState])


  return (
          <div className={style.componentContainer}>
            {showResultsCard &&
            <div className={style.resultCard}>
              <p>{numOfCorrectAnswersState} out of 13 correct</p>
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
              <div className={style.question}>
              {shuffledCardsArr &&
            shuffledCardsArr[currentQuestionIndex]?.question} 
              </div>
              { shuffledCardsArr.length > 0 &&
                <p>{shuffledCardsArr.length - currentQuestionIndex} left</p>
              }
              
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
