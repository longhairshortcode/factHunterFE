import {Routes, Route} from "react-router-dom"
import { useState, createContext } from "react"
import Home from "./pages/Home.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Welcome from "./components/Dashboard/Workspace/Welcome.jsx"
import Practice from "./components/Dashboard/Workspace/Practice/Practice.jsx"
import Create from "./components/Dashboard/Workspace/Create/Create.jsx"
import Quiz from "./components/Dashboard/Workspace/Quiz/Quiz.jsx"
import Set from "./components/Dashboard/Workspace/Practice/Set/Set.jsx"
import CreatedSet from "./components/Dashboard/Workspace/Create/CreatedSet/CreatedSet.jsx"
import MathFlashcards from "./components/Dashboard/Workspace/Create/CreatedSet/MathFlashcards.jsx"
import ReadingFlashcards from "./components/Dashboard/Workspace/Create/CreatedSet/ReadingFlashcards.jsx"
import SingleMathFlashcards from "./components/Dashboard/Workspace/Create/CreatedSet/SingleMathFlashcards.jsx"
import SingleReadingFlashcards from "./components/Dashboard/Workspace/Create/CreatedSet/SingleReadingFlashcards.jsx"

export const AuthContext = createContext()

function App() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    id: "",
  
  })
  return (
    <>
      <AuthContext.Provider value={{setUser, user}}>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/sign-up"} element={<Signup/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/dashboard"} element={<Dashboard/>}>
            <Route index element={<Welcome/>}/>
            <Route path={"practice"} element={<Practice/>}>
              <Route path={":practiceFactId"} element={<Set/>}/> 
            </Route>
            <Route path={"create"} element={<Create/>}>
              <Route path={"created-set"} element={<CreatedSet/>}>
                <Route path={"math-flashcards"} element={<MathFlashcards/>}>
                  <Route path={":singleMathFlashcardId"} element={<SingleMathFlashcards/>}/>
                </Route>  
                <Route path={"reading-flashcards"} element={<ReadingFlashcards/>}>
                  <Route path={":singleReadingFlashcardId"} element={<SingleReadingFlashcards/>}/>
                </Route>
              </Route>
            </Route>
            <Route path={"quiz"} element={<Quiz/>}/>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
