import style from "./MathFlashcards.module.css"
import {Link, Outlet, useParams} from "react-router-dom"

function MathFlashcards() {
  const {singleMathFlashcardId} = useParams();
  return (
    <div  className={style.conponentContainer}>
        <div className={style.allButtonsContainer}>
          <div className={style.additionContainer}>
            <p className={style.additionTitle}>Addition</p>
  {/* <Link className={style.numberButton} key={index + 1} to={`${index + 1}`}>{index + 1} Facts </Link> */}
            <Link className={style.numberButton}  to='1'>Number Button From Form</Link>
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
      <Outlet/>  
    </div>
  )
}

export default MathFlashcards
