import style from "./Practice.module.css";
import { useState } from "react";
import Set from "./Set/Set.jsx";
import { soundsAndNames } from "./mathAndReadingData.jsx";
import { useEffect } from "react";

function Practice() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [practiceFactId, setPracticeFactId] = useState("1");
  // const [readingSubcategory, setReadingSubcategory] = useState(null);
  const [activeReadingButton, setActiveReadingButton] = useState("");
  const [activeMathTopicButton, setActiveMathTopicButton] = useState(null);
  const [activeReadingTopicButton, setActiveReadingTopicButton] = useState(null);
  

  useEffect(() => {
  handleMathTopicClick(0)
  }, [])

  function handleMathTopicClick(index){
    setActiveMathTopicButton(index)
  }

  useEffect(() => {
    handleReadingTopicClick(0)
    }, [])
  
    function handleReadingTopicClick(index){
      setActiveReadingTopicButton(index)
    }

    useEffect(() => {
      setActiveReadingTopicButton(0);
    }, [activeReadingButton]);
    
    

  return (
    <div className={style.componentContainer}>
      <div className={style.titleAndLinks}>
        <p className={style.practice}>Practice</p>
        <div className={style.mathAndReadingButtonContainer}>
          <button
            className={style.mathFlashcardsButton}
            onClick={() => {
              setSelectedCategory("math");
            }}
          >
            Math Flashcards
          </button>
          <button
            className={style.readingFlashcardsButton}
            onClick={() => {
              setSelectedCategory("reading");
            }}
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
                          handleMathTopicClick(index)
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
                            key={index + 1}
                            onClick={() => {
                              // setPracticeFactId(`${index + 1}`);
                              handleReadingTopicClick(index)
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
                            key={index + 1}
                            onClick={() => {
                              // setPracticeFactId(`${index + 1}`);
                              handleReadingTopicClick(index)
                            }}
                          >
                            {soundAndName.name} sound
                          </button>
                        ))
                    : soundsAndNames
                        .filter((soundAndName) => soundAndName.soundType === "vowel")
                        .map((soundAndName, index) => (
                          <button
                            className={style.soundButton}
                            key={index + 1}
                          >
                            {soundAndName.emphasis + " " + soundAndName.name}
                          </button>
                        ))}
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
      />
    </div>
  );
}

export default Practice; sddd