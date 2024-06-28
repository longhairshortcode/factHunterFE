import style from "./Styles/Dashboard.module.css"
import Sidebar from "../components/Dashboard/Sidebar/Sidebar.jsx"
import { Outlet } from "react-router-dom"
import { createContext, useState, useContext } from "react"

// const ChartContext = createContext();

// export const useChart = () => useContext(ChartContext);

function Dashboard() {  
  // const [chartImage, setChartImage] = useState(null) 
  
  return (
    // <ChartContext.Provider value={{ chartImage, setChartImage }}>  
      <div className={style.componentContainer}>
        <Sidebar/>
        <div className={style.outletContainer}>
          <Outlet/>
        </div>
        
      </div>
    // </ChartContext.Provider>  
  )
}

export default Dashboard
