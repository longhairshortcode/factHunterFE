import {NavLink} from "react-router-dom"
import style from "./Sidebar.module.css"
import { FiSmile } from "react-icons/fi";
import { TfiPencilAlt } from "react-icons/tfi";
import { TbBrandSpeedtest } from "react-icons/tb";
import { PiDetectiveBold } from "react-icons/pi";

function Sidebar() {
  return (
    <div className={style.componentContainer}>
      <div className={style.logoContainer}>
      <p className={style.logo}><PiDetectiveBold />FactHunter</p>
      </div>
      <div className={style.profileContainer}>
        <p>Profile pic or info can go here?</p>
      </div>
      <div className={style.pracCreateQuizContainer}>
        <div className={style.practiceContainer}>
          <NavLink className={style.practice} to={"practice"}><FiSmile />Practice Facts</NavLink>
        </div>
        <div className={style.createContainer}>
          <NavLink className={style.create} to={"create"}><TfiPencilAlt />Create Deck</NavLink>    
        </div>
        <div className={style.quizContainer}>
          <NavLink className={style.quiz} to={"quiz"}><TbBrandSpeedtest />Quiz Myself</NavLink>
        </div>        
      </div>
    </div>
  )
}

export default Sidebar
