import React from 'react';
import style from "./Set.module.css";
import { useParams } from "react-router-dom";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Set() {
  const { practiceId } = useParams();

  // Generate an array of indices // [0, 1, 2, 3....] //length of array, index of each item in array
  const indices = Array.from({ length: 13 }, (_, index) => index);

  // Shuffle the indices
  const shuffledIndices = shuffleArray(indices);

  return (
    <div className={style.componentContainer}>
      <div className={style.set}>
        This is set {practiceId}
        {shuffledIndices.map((index) => (
          <div className={style.singleCard} key={index}>

<div class={style.flipCard}>
  <div class={style.flipCardInner}>
    <div class="flip-card-front">
        <div className={style.question}>{practiceId} x {index}</div>
    </div>
    <div class="flip-card-back">
        <div className={style.answer}>{practiceId * index}</div>  
    </div>
  </div>
</div>

             
          </div>
        ))}
      </div>
    </div>
  );
}

export default Set;



// import style from "./Set.module.css"
// import { useParams } from "react-router-dom"

// function Set() {
//     const {practiceId} = useParams()

//   return (
//     <div className={style.componentContainer}>
//         <div className={style.set}>
//         This is set {practiceId}
//         {Array(13).fill(null).map((_, index)=>(
//             <div className={style.singleCard}>
//                 <div className={style.front}>{practiceId} x {index}</div>                
//                 <div className={style.back}>{practiceId * index }</div>                
//             </div>
//         ))

//         }
//         </div>
//     </div>
//   )
// }

// export default Set
