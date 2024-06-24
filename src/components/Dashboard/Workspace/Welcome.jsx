import style from "./Welcome.module.css"
// import detectives from "../../../assets/detectives.png"
import mag from "../../../assets/mag.webp"
// import numbers from "./numbers.jpg"
import { PiDetectiveBold } from "react-icons/pi";

function Welcome() {
  return (
    <div className={style.componentContainer}>
            <div className={style.topContainer}>
                <div className={style.greetingAndDirectionsContainer}>
                  <div className={style.greeting}>
                    <p className={style.welcome}>Welcome to <PiDetectiveBold className={style.icon} />FactHunter!</p>
                  </div>
                  {/* <div className={style.directions}>
                    <p className={style.directionsOne}>1. Click on Practice Facts to start learning your multiplication facts.</p>
                    <p className={style.directionsTwo}>2. Go to Create Deck to make flashcards of the facts you need more practice on.</p>
                    <p className={style.directionsThree}>1. When you feel ready to test your knowledge of your facts, click on Quiz Myself.</p>  
                  </div>   */}
                </div>
                
                {/* <div className={style.imageContainer}>
                  <img className={style.detectivesImage} src={detectives} alt="kid detectives with magnifying glasses"/>
                </div> */}
            </div>
            
            <div className={style.numImageContainer}>
              {/* <img className={style.numbersImage} src={numbers} alt="colorful scattered numbers"/> */}
              {/* <h2  className={style.h2}> Start Your Learning Path:</h2> */}
              <div className={style.directionsBottom}>
                  <div className={style.leftDirectionsBottom}> 
                    <div className={style.directionsOneContainer}>
                      <img src={mag} className={style.mag}/>
                      <p className={style.directionsOneParagraph}>1. Click on the Practice Facts button on the left sidebar to start learning your math or reading facts.</p>
                    </div>
                    <div className={style.directionsTwoContainer}>
                      <img src={mag} className={style.mag}/>
                      <p className={style.directionsTwoParagraph}>2. Click on the Create Deck button to make flashcards of the facts you need more practice on.</p>
                    </div>
                    <div className={style.directionsThreeContainer}>
                      <img src={mag} className={style.mag}/>
                      <p className={style.directionsThreeParagraph}>3. When you feel ready to test your knowledge of your facts, click on Quiz Myself. If you pass your quiz, you will see your pass status on the right.</p>  
                    </div>
                  </div>
                  <div className={style.rightDirectionsBottom}>
                    <div className={style.rightDirectionsBottomTop}>
                      <p className={style.factsStatus}>Facts Status</p>
                    </div>
                    <div className={style.rightDirectionsBottomBottom}>
                    <p className={style.somethingElse}>Something Else</p>
                      </div>
                    
                  </div>
                  </div>   
            </div>
    </div>
  )
}

export default Welcome
