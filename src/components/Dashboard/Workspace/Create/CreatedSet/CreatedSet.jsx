import style  from "./CreatedSet.module.css"

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function CreatedSet() {
    // Generate an array of indices // [0, 1, 2, 3....] //length of array, index of each item in array
  const indices = Array.from({ length: array.length }, (_, index) => index);

  // Shuffle the indices
  const shuffledIndices = shuffleArray(indices);
  return (
    <div>
      
    </div>
  )
}

export default CreatedSet
