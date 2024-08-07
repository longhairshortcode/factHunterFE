import style from "./Styles/Home.module.css"
import Header from "../components/Home/Header/Header"
import Hero from "../components/Home/Hero/Hero"
import Footer from "../layout/Footer.jsx"

function Home() {
  return (
    <div className={style.back}>
      <Header/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default Home
