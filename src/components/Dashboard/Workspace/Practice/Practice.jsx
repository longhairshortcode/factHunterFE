import { Outlet, Link} from "react-router-dom"
import style from "./Practice.module.css"

function Practice() {
  return (
    <div className={style.componentContainer}>
      <p className={style.practice}>Practice</p>
      <div className={style.links}>
        {Array(12).fill(null).map((_, index)=>(
          <Link className={style.numberButton} key={index + 1} to={`${index + 1}`}>{index + 1} Facts </Link>
        ))}
        

        
      </div>
      <Outlet/>
    </div>
  )
}

export default Practice
