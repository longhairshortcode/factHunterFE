import style from "./Set.module.css";
import { useState } from "react";
import { FaDivide } from "react-icons/fa6";
import { useEffect } from "react";
import { operationsAndNames, soundsAndNames } from "../mathAndReadingData";


function Set({practiceFactId, selectedCategory, activeReadingButton, setActiveReadingButton}) {

  //INITIALIZE
  
//STATES
const [operation, setOperation] = useState("")
//changed intial state to "" 
const [activeMathButton, setActiveMathButton] = useState("")

//VARIABLES
//QQQQQQQwhere below come from and what is it
const numberPracticeFactId = Number(practiceFactId)
    //VARIABLE of ARRAY OF OBJECTS

    const readingTopicButtons = ["Vowels", "Consonants"];


  //HANDLER
  function handleClick(operationAndName) {
    setActiveMathButton(operationAndName.name); // Fixed: Set the active button name
    setOperation(operationAndName.operation); // Fixed: Set the operation
  }

  function handleReadingClick(topic) {
    setActiveReadingButton(topic); // Set the active button name
  }

    //USEEFFECT
    
    useEffect(() => {
      handleClick(operationsAndNames[0])
    }, [])

    useEffect(() => {
      handleReadingClick(readingTopicButtons[0])
    }, [])

  //QQQQOTHER FUNCTIONS & 2 MORE VARIABLES???
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //is this in new code??? or deleted???
  // function chooseOperation(opp){
  //   setOperation(opp)
  // }

  // Generate an array of indices // [0, 1, 2, 3....] //length of array, index of each item in array
  const indices = Array.from({ length: 13 }, (_, index) => index);

  // Shuffle the indices
  const shuffledIndices = shuffleArray(indices);

  return (
    <>
      {selectedCategory === "math" ? (
        <>
          <div className={style.buttonsContainer}>
            {operationsAndNames.map((operationAndName, index) => (
              <button
                key={index}
                className={style.button}
                style={{
                  backgroundColor:
                    activeMathButton === operationAndName.name ? "yellow" : "red",
                }}
                onClick={() => handleClick(operationAndName)}
              >
                {operationAndName.name}
              </button>
            ))}
          </div>
          <div className={style.componentContainer}>
            <div className={style.setsContainer}>
              {shuffledIndices.map((index) => (
                <div className={style.singleCard} key={index}>
                  <div className={style.flipCard}>
                    <div className={style.flipCardInner}>
                      <div className={style.flipCardFront}>
                        <div className={style.question}>
                          {operation === "/"
                            ? index * numberPracticeFactId
                            : operation === "-"
                            ? numberPracticeFactId + index
                            : index}
                          {operation === "/" ? (
                            <FaDivide />
                          ) : (
                            operation || "+"
                          )}
                          {numberPracticeFactId}
                        </div>
                      </div>
                      <div className={style.flipCardBack}>
                        <div className={style.answer}>
                          {operation === "/"
                            ? index
                            : operation === "-"
                            ? index
                            : operation === "*"
                            ? index * numberPracticeFactId
                            : operation === "+"
                            ? index + numberPracticeFactId
                            : index + numberPracticeFactId}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : selectedCategory === "reading" ? (
        <>
          <div className={style.buttonsContainer}>
            {readingTopicButtons.map((topic, index) => (
              <button
                key={index}
                className={style.button}
                style={{
                  backgroundColor: activeReadingButton === readingTopicButtons[index] ? "yellow" : "red",
                }}
                onClick={() => handleReadingClick(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
          <div className={style.componentContainer}>
            {/* Add your reading-related content here */}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Set; 


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import style from './CreatedSet.module.css';

// function CreatedSet() {
//   const { topic, subtopic } = useParams();
//   const [flashcards, setFlashcards] = useState([]);

//   useEffect(() => {
//     async function fetchFlashcards() {
//       try {
//         const response = await axios.get(`http://localhost:4000/flashcard/${topic}/${subtopic}`);
//         setFlashcards(response.data.flashcards); // Adjust based on your backend response structure
//       } catch (error) {
//         console.error("Error fetching flashcards:", error);
//       }
//     }

//     fetchFlashcards();
//   }, [topic, subtopic]);

//   return (
//     <div className={style.setsContainer}>
//       {flashcards.map((flashcard, index) => (
//         <div className={style.singleCard} key={index}>
//           {/* Your flip card structure here */}
//           <div className={style.flipCard}>
//             <div className={style.flipCardInner}>
//               <div className={style.flipCardFront}>
//                 <div className={style.question}>{flashcard.question}</div>
//               </div>
//               <div className={style.flipCardBack}>
//                 <div className={style.answer}>{flashcard.answer}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default CreatedSet;













// import style from "./Set.module.css";
// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { FaDivide } from "react-icons/fa6";

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// function Set() {
//   //QQQQQQQwhere below come from and what is it
//   const { practiceFactId } = useParams();
//   const numberPracticeFactId = Number(practiceFactId)
//   const [operation, setOperation] = useState("")

//   function chooseOperation(opp){
//     setOperation(opp)
//   }

//   // Generate an array of indices // [0, 1, 2, 3....] //length of array, index of each item in array
//   const indices = Array.from({ length: 13 }, (_, index) => index);

//   // Shuffle the indices
//   const shuffledIndices = shuffleArray(indices);

//   return (
//   <>
//     <div className={style.buttonsContainer}>
//       <button className={style.buttonAdd}onClick={()=>{chooseOperation("+")}}>Addition</button>
//       <button className={style.buttonSub}onClick={()=>{chooseOperation("-")}}>Subtraction</button>
//       <button className={style.buttonMulti} onClick={()=>{chooseOperation("*")}}>Multiplication</button>
//       <button className={style.buttonDiv} onClick={()=>{chooseOperation("/")}}>Division</button>
//     </div>
//       <div className={style.componentContainer}>
//         <div className={style.setsContainer}>
//           {shuffledIndices.map((index) => (
//             <div className={style.singleCard} key={index}>
//               <div className={style.flipCard}>
//                 <div className={style.flipCardInner}>
//                   <div className={style.flipCardFront}>
//                     <div className={style.question}>
//                     {operation === "/" ?
//                         index * numberPracticeFactId
//                         : operation === "-" ?
//                           numberPracticeFactId + index
//                           : index
//                       } 
//                       { operation === "/" ? <FaDivide /> : operation ? operation :  "+"} 
//                       {numberPracticeFactId}
//                     </div>
//                   </div>
//                   <div className={style.flipCardBack}>
//                     <div className={style.answer}> {operation === "/" ?
//                         index
//                         : operation === "-" ?
//                           index
//                           : operation === "*" ?
//                             index * numberPracticeFactId
//                             : operation === "+" ?
//                               index + numberPracticeFactId
//                               : index + numberPracticeFactId
//                       }</div>  
//                   </div>
//                 </div>
//               </div>             
//             </div>
//           ))}
//         </div>
//       </div>
// </>  );
// }

// export default Set; 
