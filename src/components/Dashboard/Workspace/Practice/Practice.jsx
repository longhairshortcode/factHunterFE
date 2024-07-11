import style from "./Practice.module.css";
import { useState } from "react";
import Set from "./Set/Set";
import { soundsAndNames } from "./mathAndReadingData";

function Practice() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [practiceFactId, setPracticeFactId] = useState("1");
  const [activeReadingButton, setActiveReadingButton] = useState("Vowels"); // Initialize with "Vowels"
  const [activeMathTopicButton, setActiveMathTopicButton] = useState(null);
  const [activeReadingTopicButton, setActiveReadingTopicButton] = useState(0); // Initialize with index 0
  const [selectedSound, setSelectedSound] = useState("short a"); // Initialize with "short a"
  const [selectedEmphasis, setSelectedEmphasis] = useState("short"); // Initialize with "short"

  function handleMathTopicClick(index) {
    setActiveMathTopicButton(index);
  }

  function handleReadingTopicClick(index) {
    setActiveReadingTopicButton(index);
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    if (category === "reading") {
      setActiveReadingButton("Vowels");
      setActiveReadingTopicButton(0);
      setSelectedSound("a");
      setSelectedEmphasis("short");
    }
  }

  return (
    <div className={style.componentContainer}>
      <div className={style.titleAndLinks}>
        <p className={style.practice}>Practice</p>
        <div className={style.mathAndReadingButtonContainer}>
          <button
            className={style.mathFlashcardsButton}
            onClick={() => handleCategoryClick("math")}
          >
            Math Flashcards
          </button>
          <button
            className={style.readingFlashcardsButton}
            onClick={() => handleCategoryClick("reading")}
          >
            Reading Flashcards
          </button>
        </div>

        {selectedCategory && (
          <div className={style.categoriesContainer}>
            {selectedCategory === "math" ? (
              <div className={style.linksContainer}>
                <div className={style.links}>
                  {Array(12)
                    .fill(null)
                    .map((_, index) => (
                      <button
                        className={style.numberButton}
                        style={{
                          backgroundColor:
                            activeMathTopicButton === index ? "yellow" : "lightgrey",
                        }}
                        key={index + 1}
                        onClick={() => {
                          setPracticeFactId(`${index + 1}`);
                          handleMathTopicClick(index);
                        }}
                      >
                        {index + 1} Facts
                      </button>
                    ))}
                </div>
              </div>
            ) : (
              <div className={style.linksContainer}>
                <div className={style.links}>
                  {activeReadingButton === "Vowels"
                    ? soundsAndNames
                        .filter((soundAndName) => soundAndName.soundType === "vowel")
                        .map((soundAndName, index) => (
                          <button
                            className={style.soundButton}
                            style={{
                              backgroundColor:
                                activeReadingTopicButton === index ? "yellow" : "lightgrey",
                            }}
                            key={index}
                            onClick={() => {
                              setSelectedSound(soundAndName.name);
                              setSelectedEmphasis(soundAndName.emphasis);
                              handleReadingTopicClick(index);
                            }}
                          >
                            {soundAndName.emphasis + " " + soundAndName.name}
                          </button>
                        ))
                    : activeReadingButton === "Consonants"
                    ? soundsAndNames
                        .filter((soundAndName) => soundAndName.soundType === "consonant")
                        .map((soundAndName, index) => (
                          <button
                            className={style.soundButton}
                            style={{
                              backgroundColor:
                                activeReadingTopicButton === index ? "yellow" : "lightgrey",
                            }}
                            key={index}
                            onClick={() => {
                              setSelectedSound(soundAndName.name);
                              setSelectedEmphasis(soundAndName.emphasis);
                              handleReadingTopicClick(index);
                            }}
                          >
                            {soundAndName.name} sound
                          </button>
                        ))
                    : null}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Set
        selectedCategory={selectedCategory}
        practiceFactId={practiceFactId}
        activeReadingButton={activeReadingButton}
        setActiveReadingButton={setActiveReadingButton}
        selectedSound={selectedSound}
        selectedEmphasis={selectedEmphasis}
      />
    </div>
  );
}

export default Practice;