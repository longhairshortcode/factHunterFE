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
                <button className={style.mathButton} onClick={()=>setMathQuizzesClicked(true)}>
                    Math Quizzes
                </button>
            </div>
            { mathQuizzesClicked && 
            <div className={style.tables}>
                <div className={style.theTable}>
                    <h2 className={style.allQuizzesButton}>ALL QUIZZES</h2>
                    <div className={style.operationsAndButtonsContainer}>
                        {operations.map((operation, index) => (
                        <div className={style.singleOperationAndButtons} key={index}>
                            <div className={style.operationContainer}>
                                {operation}
                            </div>
                            <div className={style.buttonsDiv}>
                                {buttonNumbers.map((item, itemIndex) => (
                                <button className={style.factButton} key={itemIndex} onClick={()=>getQuestions(index, itemIndex)}>
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
                    <h2 className={style.allQuizzesButton}>RESULTS OF QUIZZES</h2>
                        <div className={style.operationsAndButtonsContainer}>
                            {operations.map((operation, index) => (
                            <div className={style.singleOperationAndButtons} key={index}>
                                <div className={style.operationContainer}>
                                    {operation}
                                </div>
                                <div className={style.buttonsDiv}>
                                    {buttonNumbers.map((item, itemIndex) => (
                                    <button className={style.changeColorFactButton} key={itemIndex}>
                                        {item}
                                    </button>  
                                    ))}
                                </div>
                            </div>     
                            ))
                            }
                        </div>    
                </div>
            </div>
            }
        </div>
        <div className={style.bottomDiv}>
            {fact.factNumber &&
                <div className={style.quizCard}>
                    <div className={style.top}>
                        <p className={style.left}>12 left</p>
                        <p className={style.question}>Question</p>
                    </div>
                    <div className={style.bottomAnswerAndButtonContainer}>
                        <div className={style.answerContainer}v>
                            <p className={style.answer}>Answer</p>
                        </div>
                        <div className={style.nextAndSubmitContainer}>
                            <button className={style.next}>Next</button>
                            <button className={style.submit}>Submit</button>
                        </div>
                    </div>

                </div>
            }   
        </div>
    </div>
  )
}

export default BQuiz
