import style from "./Hero.module.css"
import students from "../../../assets/students.jpg"

function Hero() {
  return (
    <div className={style.heroContainer}> 
      <div className={style.leftContainer}>
        <div className={style.h1Container}>
            <h1 className={style.h1}> Make A Deck. Practice. <span className={style.bigger}>Succeed.</span></h1>
        </div>
        <div className={style.subheaderContainer}>
            <p className={style.subheader}>Make review easy and accessible with flashcards that students can use on their own and on the go!</p>
        </div>
        <div className={style.getStartedButtonContainer}>
            <p className={style.getStartedButton}>Get Started</p>
        </div>
      </div>
      <div className={style.rightContainer}>
        <img className={style.students} src={students} alt="images of children"/>
      </div>
    </div>
  )
}

export default Hero
