import style  from "./CreatedSet.module.css"
import {Link, useNavigate} from "react-router-dom"
import MathFlashcards from "./MathFlashcards"
import ReadingFlashcards from "./ReadingFlashcards" 
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useChart } from "../../../../../pages/Dashboard"

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

function CreatedSet() {
    const { setChartImage } = useChart();
  // Generate an array of indices // [0, 1, 2, 3....] //length of array, index of each item in array
  // const indices = Array.from({ length: dbArray.length }, (_, index) => index);
  // const indices = Array.from({ length: 13 }, (_, index) => index);
  
  // Shuffle the indices
  // const shuffledIndices = shuffleArray(indices);

  return (
    <div className={style.componentContainer}>
      <Link onClick={() => setChartImage(null)}className={style.mathFlashcardsButton} to='math-flashcards'>Math Flashcards</Link>
      <Link className={style.readingFlashcardsButton} to='reading-flashcards'>Reading Flashcards</Link>
    <Outlet/>
    </div>
  )
} 

export default CreatedSet 
