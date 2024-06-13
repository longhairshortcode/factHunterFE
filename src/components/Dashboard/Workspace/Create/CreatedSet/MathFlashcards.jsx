import style from "./MathFlashcards.module.css"

function MathFlashcards() {
  return (
    <div  className={style.conponentContainer}>
      <div className={style.additionContainer}>
        <p className={style.additionTitle}>Addition</p>
      </div>
      <div className={style.additionContainer}>
        <p className={style.additionTitle}>Addition</p>
      </div>
      <div className={style.additionContainer}>
        <p className={style.additionTitle}>Addition</p>
      </div>
      <div className={style.additionContainer}>
        <p className={style.additionTitle}>Addition</p>
      </div>
    </div>
  )
}

export default MathFlashcards
