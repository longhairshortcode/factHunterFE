import style from "./Set.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaDivide } from "react-icons/fa6";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Set() {
  //QQQQQQQwhere below come from and what is it
  const { practiceFactId } = useParams();
  const numberPracticeFactId = Number(practiceFactId)
  const [operation, setOperation] = useState("")

  function chooseOperation(opp){
    setOperation(opp)
  }

  // Generate an array of indices // [0, 1, 2, 3....] //length of array, index of each item in array
  const indices = Array.from({ length: 13 }, (_, index) => index);

  // Shuffle the indices
  const shuffledIndices = shuffleArray(indices);

  return (
  <>
    <div className={style.buttonsContainer}>
      <button className={style.buttonAdd}onClick={()=>{chooseOperation("+")}}>Addition</button>
      <button className={style.buttonSub}onClick={()=>{chooseOperation("-")}}>Subtraction</button>
      <button className={style.buttonMulti} onClick={()=>{chooseOperation("*")}}>Multiplication</button>
      <button className={style.buttonDiv} onClick={()=>{chooseOperation("/")}}>Division</button>
    </div>
      <div className={style.componentContainer}>
        <div className={style.setsContainer}>
          {shuffledIndices.map((index) => (
            <div className={style.singleCard} key={index}>
              <div className={style.flipCard}>
                <div className={style.flipCardInner}>
                  <div className={style.flipCardFront}>
                    <div className={style.question}>
                    {operation === "/" ?
                        index * numberPracticeFactId
                        : operation === "-" ?
                          numberPracticeFactId + index
                          : index
                      } 
                      { operation === "/" ? <FaDivide /> : operation ? operation :  "+"} 
                      {numberPracticeFactId}
                    </div>
                  </div>
                  <div className={style.flipCardBack}>
                    <div className={style.answer}> {operation === "/" ?
                        index
                        : operation === "-" ?
                          index
                          : operation === "*" ?
                            index * numberPracticeFactId
                            : operation === "+" ?
                              index + numberPracticeFactId
                              : index + numberPracticeFactId
                      }</div>  
                  </div>
                </div>
              </div>             
            </div>
          ))}
        </div>
      </div>
</>  );
}

export default Set; a
