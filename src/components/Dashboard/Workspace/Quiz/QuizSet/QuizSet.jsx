sssssssssssimport style from "./QuizSet.module.css"
import { mathQuizzes } from "./data"
import { useState } from "react"

function QuizSet() {

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
                {mathQuizzes.addition.one[currentQuestionIndex].question}
              </div>
              <div className={style.answerFillInContainer}>
                <input 
                  type="text"
                  name="answer"
                  value={answerData.answer}
                  className={style.answerFillIn}
                  onChange={handleChange}
                  placeholder="?"/>
                <button 
                  className={style.next}
                  onClick={nextQuestion}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
  )
}

export default QuizSet
