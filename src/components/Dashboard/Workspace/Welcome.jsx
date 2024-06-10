import style from "./Welcome.module.css"
import detectives from "../../../assets/detectives.png"
import numbers from "./numbers.jpg"

function Welcome() {
  return (
    <div className={style.componentContainer}>
            <div className={style.topContainer}>
                <div className={style.greetingAndDirectionsContainer}>
                  <div className={style.greeting}>
                    <p className={style.welcome}>Welcome to FactHunter!</p>
                  </div>
                  <div className={style.directions}>
                    <p className={style.directions}>1. Click on Practice Facts to start learning your multiplication facts.</p>
                    <p className={style.directions}>2. Go to Create Deck to make flashcards of the facts you need more practice on.</p>
                    <p className={style.directions}>1. When you feel ready to test your knowledge of your facts, click on Quiz Myself.</p>  
                  </div>  
                </div>
                
                <div className={style.imageContainer}>
                  <img className={style.detectivesImage} src={detectives} alt="kid detectives with magnifying glasses"/>
                </div>
            </div>
            
            <div className={style.numImageContainer}>
              <img className={style.numbersImage} src={numbers} alt="colorful scattered numbers"/>
            </div>
    </div>
  )
}

export default Welcome
