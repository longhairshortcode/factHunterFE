import style from "./Set.module.css";
import { useState, useEffect } from "react";
import { FaDivide } from "react-icons/fa6";
import { operationsAndNames, soundsAndNames } from "../mathAndReadingData";

function Set({ practiceFactId, selectedCategory, activeReadingButton, setActiveReadingButton, selectedSound, selectedEmphasis }) {

  // STATES
  const [operation, setOperation] = useState("");
  const [activeMathButton, setActiveMathButton] = useState("");

  // HANDLER
  function handleClick(operationAndName) {
    setActiveMathButton(operationAndName.name);
    setOperation(operationAndName.operation);
  }

  function handleReadingClick(topic) {
    setActiveReadingButton(topic);
  }

  // EFFECTS
  useEffect(() => {
    handleClick(operationsAndNames[0]); // Initialize with the first math operation
  }, []);

  useEffect(() => {
    if (selectedCategory === "reading") {
      handleReadingClick("Vowels");
    }
  }, [selectedCategory]);

  // Shuffle array function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Generate an array of indices
  const indices = Array.from({ length: 13 }, (_, index) => index);

  // Shuffle the indices
  const shuffledIndices = shuffleArray(indices);

  // Filtered flashcards based on selected sound and emphasis
  const filteredFlashcards = soundsAndNames
    .filter((soundAndName) => soundAndName.name === selectedSound && soundAndName.emphasis === selectedEmphasis)
    .map((soundAndName) => soundAndName.flashcards)
    .flat();

  // COMPONENT RENDERING
  return (
    <>
      {selectedCategory === "math" ? (
        <div>
          <div className={style.buttonsContainer}>
            {operationsAndNames.map((operationAndName, index) => (
              <button
                key={index}
                className={style.button}
                style={{
                  backgroundColor: activeMathButton === operationAndName.name ? "yellow" : "red",
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
                            ? index * practiceFactId
                            : operation === "-"
                            ? practiceFactId - index
                            : index}
                          {operation === "/" ? (
                            <FaDivide />
                          ) : (
                            operation || "+"
                          )}
                          {practiceFactId}
                        </div>
                      </div>
                      <div className={style.flipCardBack}>
                        <div className={style.answer}>
                          {operation === "/"
                            ? index
                            : operation === "-"
                            ? index
                            : operation === "*"
                            ? index * practiceFactId
                            : operation === "+"
                            ? index + practiceFactId
                            : index + practiceFactId}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : selectedCategory === "reading" ? (
        <div>
          <div className={style.buttonsContainer}>
            {["Vowels", "Consonants"].map((topic, index) => (
              <button
                key={index}
                className={style.button}
                style={{
                  backgroundColor: activeReadingButton === topic ? "yellow" : "red",
                }}
                onClick={() => handleReadingClick(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
          <div className={style.componentContainer}>
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
        </div>
      ) : null}
    </>
  );
}

export default Set;