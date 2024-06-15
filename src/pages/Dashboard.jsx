import style from "./Styles/Dashboard.module.css"
import Sidebar from "../components/Dashboard/Sidebar/Sidebar.jsx"
import { Outlet } from "react-router-dom"

function Dashboard() {
  
  const [chartImage, setChartImage] = useState(null) 
  
  return (
    <div className={style.componentContainer}>
      <Sidebar/>
      <div className={style.outletContainer}>
        <Outlet/>
      </div>
      
    </div>
  )
}

export default Dashboard
