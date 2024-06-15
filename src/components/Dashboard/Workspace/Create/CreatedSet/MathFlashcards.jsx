import style from "./MathFlashcards.module.css"
import {Link} from "react-router-dom"

function MathFlashcards() {
  return (
    <div  className={style.conponentContainer}>
      <div className={style.allButtonsContainer}>
        <div className={style.additionContainer}>
          <p className={style.additionTitle}>Addition</p>
          <Link to=':singleMathFlashcardId'>Number Button From Form</Link>
        </div>
        <div className={style.subtractionContainer}>
          <p className={style.subtractionTitle}>Subtraction</p>
        </div>
        <div className={style.multiplicationContainer}>
          <p className={style.multiplicationTitle}>Multiplication</p>
        </div>
        <div className={style.divisionContainer}>
          <p className={style.divisionTitle}>Division</p>
        </div>
      </div>  
    </div>
  )
}

export default MathFlashcards
