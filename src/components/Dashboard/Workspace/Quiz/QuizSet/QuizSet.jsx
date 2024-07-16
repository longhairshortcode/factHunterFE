import style from "./QuizSet.module.css"
import { mathQuizzes } from "./data"
import { useState } from "react"

function QuizSet({targetQuiz}) {

const {numberFact, operation} = targetQuiz

const twelveIndices = Array(12).fill(null)
const randomQuestion = Math.floor(Math.random() * (twelveIndices.length))

const [currentQuestionIndex, setCurrentQuestionIndex] = useState(randomQuestion)
const [answerData, setAnswerData] = useState({
  answer: ""
})


// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

function nextQuestion() {
  if (answerData.answer === ""){
    return;
  }
  setCurrentQuestionIndex(randomQuestion)
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
              {mathQuizzes[operation] &&
            mathQuizzes[operation][numberFact] &&
            mathQuizzes[operation][numberFact][currentQuestionIndex]?.question}
              
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
