import style  from "./CreatedSet.module.css"

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

function CreatedSet() {
    // Generate an array of indices // [0, 1, 2, 3....] //length of array, index of each item in array
  // const indices = Array.from({ length: dbArray.length }, (_, index) => index);
  // const indices = Array.from({ length: 13 }, (_, index) => index);
  
  // Shuffle the indices
  // const shuffledIndices = shuffleArray(indices);
  return (
    <div className={style.componentContainer}>
      <p>Hi</p>
    </div>
  )
}

export default CreatedSet
