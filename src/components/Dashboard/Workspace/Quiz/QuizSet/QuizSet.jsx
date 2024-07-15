import style from "./QuizSet.module.css"

function QuizSet() {
  return (
    <div className={style.componentContainer}>
            <div className={style.setsContainer}>
              {shuffledIndices.map((index) => (
                <div className={style.singleCard} key={index}>
                  <div className={style.flipCard}>
                    <div className={style.flipCardInner}>
                      <div className={style.flipCardFront}>
                        <div className={style.question}>
                          {operation === "/"
                            ? index * numberPracticeFactId
                            : operation === "-"
                            ? numberPracticeFactId + index
                            : index}
                          {operation === "/" ? (
                            <FaDivide />
                          ) : (
                            operation || "+"
                          )}
                          {numberPracticeFactId}
                        </div>
                      </div>
                      <div className={style.flipCardBack}>
                        <div className={style.answer}>
                          {operation === "/"
                            ? index
                            : operation === "-"
                            ? index
                            : operation === "*"
                            ? index * numberPracticeFactId
                            : operation === "+"
                            ? index + numberPracticeFactId
                            : index + numberPracticeFactId}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}

export default QuizSet
