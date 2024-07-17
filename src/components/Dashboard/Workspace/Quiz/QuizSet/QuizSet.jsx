import style from "./QuizSet.module.css"
import { mathQuizzes } from "./data"
import { useState } from "react"

function QuizSet({targetQuiz, shuffledCardsArr}) {

const {numberFact, operation} = targetQuiz


const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
const [answerData, setAnswerData] = useState({
  answer: ""
})



function nextQuestion() {
  if (answerData.answer === ""){
    return;
  }
  setCurrentQuestionIndex(currentQuestionIndex + 1)
  setAnswerData((prev) => ({
    ...prev,
    answer : ""
  }))
}

//if grabbing more than 1, [] destructure, if 1, {} destructure
function handleChange(e){
  const {value} = e.target
  setAnswerData((prev) => ({
    ...prev,
    answer : value 
  }))
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
                  value={answerData.answer}
                  className={style.answerFillIn}
                  onChange={handleChange}
                  placeholder="?"
                  />
                  {/* { currentQuestionIndex
                  <button>
                    Next  
                  </button>
                  }
                  <button>
                    Submit
                  </button> */}
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
