import style from "./SingleMathFlashcards.module.css"
import {useParams} from "react-router-dom"

function SingleMathFlashcards() {
  const {singleMathFlashcardId} = useParams();
  return (
    <div className={style.componentContainer}>
       <p>This is where the created flashcards will show for their respective number</p>
    </div>
  )
}

export default SingleMathFlashcards
