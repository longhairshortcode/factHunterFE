import { Outlet, Link} from "react-router-dom"
import style from "./Practice.module.css"

function Practice() {
  return (
    <div>
      <p>This is practice!</p>
      <div className={style.links}>
        {Array(12).fill(null).map((_, index)=>(
          <Link key={index + 1} to={`${index + 1}`}>{index + 1}</Link>
        ))}
        

        
      </div>
      <Outlet/>
    </div>
  )
}

export default Practice
