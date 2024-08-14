import style from "../Quiz/BQuiz.module.css"
import { useState, useEffect } from "react"
import { mathQuizzes } from "./QuizSet/data.js"


function BQuiz() {
const [mathQuizzesClicked, setMathQuizzesClicked] = useState(false)
const [questionsDisplayed, setQuestionsDisplayed] = useState([])
const [currentItem, setCurrentItem] = useState(null)
const operations = ["Addition", "Subtraction", "Multiplication", "Division"]
const buttonNumbersInWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const [wholeFact, setWholeFact] = useState({
    operationName: null,
    factNumber: null,
    factName: null
})
useEffect(() => {
    // Function to shuffle the array using Fisher-Yates algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Shuffling the array
    if (questionsDisplayed.length > 0){
        const shuffledArray = shuffleArray(questionsDisplayed);
        let index = 0;
        console.log("This is shuffleArray: ", shuffledArray)
        // Setting an interval to update the state every 3 seconds
        const intervalId = setInterval(() => {
            if (index < shuffledArray.length) {
                setCurrentItem(shuffledArray[index]);
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, 3000);
    
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }


}, [currentItem]); // Dependency array to watch for changes in `items`

useEffect(()=>{
    const displayQuestions = (wholeFact, mathQuizzes)=> {
        const operation = mathQuizzes.filter((item) => item.name === wholeFact.operationName)
        //questions = [{...}]
        let result = []
        const operationQuestions = operation[0] 
        for (let key in operationQuestions){
            if (key === wholeFact.factName){
                 result = operationQuestions[key]
            }
        }
        
        return result 
        }

        if (wholeFact.operationName !== null){
        const questions = displayQuestions(wholeFact, mathQuizzes)   
    

        setQuestionsDisplayed(questions)
        console.log(questionsDisplayed)
        } 

}, [wholeFact])



function getWholeFact(operation, factName, factNumber) {
    console.log(factNumber)
    setWholeFact(prevWholeFact => ({
        ...prevWholeFact, 
        operationName: operation, 
        factNumber: factNumber,    
        factName:factName
    }));
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
                                {buttonNumbersInWords.map((item, itemIndex) => (
                                <button className={style.factButton} key={itemIndex} onClick={()=>getWholeFact(operation, item, itemIndex)}>
                                    {itemIndex + 1}
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
                                    {buttonNumbersInWords.map((item, itemIndex) => (
                                    <button className={style.changeColorFactButton} key={itemIndex}>
                                        {itemIndex + 1}
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
            {wholeFact.factNumber &&
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
