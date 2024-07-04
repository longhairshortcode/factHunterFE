import style from "./Practice.module.css"
import { useState } from "react"
import Set from "./Set/Set.jsx"


function Practice() {

const [selectedCategory, setSelectedCategory] = useState(null)
const [practiceFactId, setPracticeFactId] = useState("1")
const [readingSubcategory, setReadingSubcategory] = useState(null)

const vowelSounds = [
  "short a sound", "long a sound",
  "short e sound", "long e sound",
  "short i sound", "long i sound",
  "short o sound", "long o sound",
  "short u sound", "long u sound",
  "short y sound", "long y sound"
]

const consonantSounds = [
  "b sound", "c sound", "d sound", "f sound", "g sound", "h sound",
  "j sound", "k sound", "l sound", "m sound", "n sound", "p sound",
  "q sound", "r sound", "s sound", "t sound", "v sound", "w sound",
  "x sound", "z sound"
]

  return (
    <div className={style.componentContainer}>
      <div className={style.titleAndLinks}>
        <p className={style.practice}>Practice</p>
        <div className={style.mathAndReadingButtonContainer}>
          <button
            className={style.mathFlashcardsButton}
            onClick={() => {setSelectedCategory("math")}}
          >
          Math Flashcards
          </button>
          <button
            className={style.readingFlashcardsButton}
            onClick={() => {setSelectedCategory("reading")}}
          >
            Reading Flashcards
          </button>
        </div>
{/* // QQQQ IS THIS TOO ADVANCED, DO I NEED SIMPLER CODE? */}
      {selectedCategory && (
        <div className={style.categoriesContainer}>
          {selectedCategory === "math" ? (
              <div className={style.linksContainer}>
                <div className={style.links}>
                  {Array(12).fill(null).map((_, index)=>(
                  <button className={style.numberButton} key={index + 1} onClick={() => setPracticeFactId(`${index + 1}`)}>{index + 1} Facts </button>))}          
                </div>
              </div>
         ) : (
          <div className={style.linksContainer}>
            <div className={style.links}>
              <button className={style.numberButton} onClick={() => setReadingSubcategory("vowels")}>Vowels</button>
              <button className={style.numberButton} onClick={() => setReadingSubcategory("consonants")}>Consonants</button>
            </div>
            {readingSubcategory === "vowels" && (
              <div className={style.links}>
                {vowelSounds.map((sound, index) => (
                  <button className={style.numberButton} key={index + 1} onClick={() => setPracticeFactId(sound)}>{sound}</button>
                ))}
              </div>
            )}
            {readingSubcategory === "consonants" && (
              <div className={style.links}>
                {consonantSounds.map((sound, index) => (
                  <button className={style.numberButton} key={index + 1} onClick={() => setPracticeFactId(sound)}>{sound}</button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )}
  </div>
  <Set selectedCategory={selectedCategory} practiceFactId={practiceFactId} />
</div>
)
}

export default Practice