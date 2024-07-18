import style from "./QuizSet.module.css"
import { mathQuizzes } from "./data"
import { useState } from "react"

function QuizSet({targetQuiz, shuffledCardsArr}) {

const {numberFact, operation} = targetQuiz


const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
const [userAnswers, setUserAnswers] = useState([])
const [answer, setAnswer] = useState("")
s


function nextQuestion() {
  setUserAnswers(answer)
  if (answer === ""){
    return;
  }
  setCurrentQuestionIndex(currentQuestionIndex + 1)
  setAnswer("")
  
}

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



  return (
          <div className={style.componentContainer}>
            <div className={style.singleCard}>
              <div className={style.question}>
              {shuffledCardsArr &&
            shuffledCardsArr[currentQuestionIndex]?.question} 
              </div>
              {/* <p>{currentQuestionIndex}/{shuffledCardsArr.length}</p> */}
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
                </button> : currentQuestionIndex === 12 ?
                <button
                className={style.submit}
                  // onClick={handleSubmit}
                >
                  Submit
                </button>
                : <></>
                }
              </div>
            </div>
          </div>
  )
}

export default QuizSet
