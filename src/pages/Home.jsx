import style from "./Styles/Home.module.css"
import Header from "../components/Home/Header/Header"
import Hero from "../components/Home/Hero/Hero"

function Home() {
  return (
    <div className={style.back}>
      <Header/>
      <Hero/>
    </div>
  )
}

export default Home
