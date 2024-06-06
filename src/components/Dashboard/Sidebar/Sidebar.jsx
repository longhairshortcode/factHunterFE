import {NavLink} from "react-router-dom"
import style from "./Sidebar.module.css"

function Sidebar() {
  return (
    <div className={style.componentContainer}>
      <div className={style.userProfileContainer}>

      </div>
      <div className={style.linksContainer}>
        <NavLink to={"practice"}>Practice</NavLink>
        <NavLink to={"create"}>Create</NavLink>
        <NavLink to={"quiz"}>Quiz</NavLink>
        
      </div>
    </div>
  )
}

export default Sidebar
