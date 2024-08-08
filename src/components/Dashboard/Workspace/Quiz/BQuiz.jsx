import style from "../Quiz/BQuiz.module.css"
import { useState } from "react"

function BQuiz() {
const [mathQuizzesClicked, setMathQuizzesClicked] = useState(false)
const operations = ["Addition", "Subtraction", "Multiplication", "Division"]
const buttonNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const [fact, setFact] = useState({
    operationName: null,
    factNumber: null
})

function getQuestions(operation, factNumber) {
    console.log(operation, factNumber)
    factNumber++
    setFact(prevFact => ({
        ...prevFact, // Spread the previous state
        operationName: operation, // Update operationName
        factNumber: factNumber    // Update factNumber
    }));
    console.log('Here is the fact:', fact)
}
return (
    <div className={style.container}>
    <div className={style.topDiv}>
        <h1 className={style.title}>Quiz</h1>
        <div className={style.buttonsContainer}>
            <button className={style.button} onClick={()=>setMathQuizzesClicked(true)}>
                Math Quizzes
            </button>
        </div>
        { mathQuizzesClicked && 
        <div className={style.tables}>
            <div className={style.theTable}>
                <h2>ALL QUIZZES</h2>
                <div className={style.operationsAndButtonsContainer}>
                      {operations.map((operation, index) => (
                    <div className={style.singleOperationAndButtons} key={index}>
                        <div className={style.operation}>
                            {operation}
                        </div>
                        <div className={style.buttonsDiv}>
                            {buttonNumbers.map((item, itemIndex) => (
                              <button className={style.button} key={itemIndex} onClick={()=>getQuestions(index, itemIndex)}>
                                {item}
                              </button>  
                            ))}
                        </div>
                    </div>     
                      ))

                      }
                </div>
            </div>
            <div className={style.theTable}>
            
            </div>
        </div>
        }
    </div>
    <div className={style.bottomDiv}>
        {fact.factNumber &&
             <div className={style.quizCard}>
        
             </div>
        }
       
    </div>
    </div>
  )
}

export default BQuiz
