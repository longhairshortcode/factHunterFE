import style from "./Set.module.css";
import { useState, useEffect } from "react";
import { FaDivide } from "react-icons/fa6";
import { operationsAndNames, soundsAndNames } from "../mathAndReadingData";


function Set({practiceFactId, selectedCategory, activeReadingButton, setActiveReadingButton, selectedSound, selectedEmphasis, setSelectedSound, setSelectedEmphasis }) {

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


  //HANDLERS
  function handleClick(operationAndName) {
    setActiveMathButton(operationAndName.name); // Fixed: Set the active button name
    setOperation(operationAndName.operation); // Fixed: Set the operation
  }
//MY ORIGINAL BELOW AND BELOW IT IS CHAT 
  // function handleReadingClick(topic) {
  //   setActiveReadingButton(topic); // Set the active button name
  // }

  function handleReadingClick(topic) {
    setActiveReadingButton(topic); // Set the active button name
    if (topic === "Vowels") {
      setSelectedSound("short a");
      setSelectedEmphasis("short");
    } else if (topic === "Consonants") {
      setSelectedSound("b");
      setSelectedEmphasis("");
    }
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

  const filteredFlashcards = soundsAndNames
    .filter((soundAndName) => soundAndName.name === selectedSound && soundAndName.emphasis === selectedEmphasis)
    .map((soundAndName) => soundAndName.flashcards)
    .flat();

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
          <div className={style.setsContainer}>
            {filteredFlashcards.map((flashcard, index) => (
                <div className={style.singleCard} key={index}>
                  <div className={style.flipCard}>
                    <div className={style.flipCardInner}>
                      <div className={style.flipCardFront}>
                        <div className={style.question}>{flashcard.front}</div>
                      </div>
                      <div className={style.flipCardBack}>
                        <div className={style.answer}>{flashcard.back}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Set; 

