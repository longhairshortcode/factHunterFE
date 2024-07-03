import {NavLink} from "react-router-dom"
import style from "./Sidebar.module.css"
import { FiSmile } from "react-icons/fi";
import { TfiPencilAlt } from "react-icons/tfi";
import { TbBrandSpeedtest } from "react-icons/tb";
import { PiDetectiveBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import detectives from "../../../assets/detectives.png"

function Sidebar() {
  return (
    <div className={style.componentContainer}>
      <div className={style.logoContainer}>
      <Link to={"/dashboard"}className={style.logo}><PiDetectiveBold />FactHunter</Link>
      </div>
      <div className={style.profileContainer}>
        <p>Profile pic or info can go here?</p>
      </div>
      <div className={style.pracCreateQuizContainer}>
        <NavLink to={"practice"} className={style.practiceContainer}>
          <p className={style.practice} to={"practice"}><FiSmile />Practice Facts</p>
        </NavLink>
        <NavLink to={"make"} className={style.createContainer}>
          <p className={style.create} to={"make"}><TfiPencilAlt />Create Deck</p>    
        </NavLink>
        <NavLink to={"quiz"}className={style.quizContainer}>
          <p className={style.quiz} to={"quiz"}><TbBrandSpeedtest />Quiz Myself</p>
        </NavLink>        
      </div>
      <div className={style.detectivesImageContainer}>
        <img className={style.detectives} src={detectives} alt="cartoon kids with magnifying glasses"/>
      </div>
    </div>
  )
}

export default Sidebar
