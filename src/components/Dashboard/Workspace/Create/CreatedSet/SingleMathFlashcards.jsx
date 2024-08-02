import style from "./SingleMathFlashcards.module.css"
import {useParams} from "react-router-dom"
import {useState, useEffect, useContext} from "react"
import {AuthContext} from "../../../../../App"
import axios from "axios"
import { FlashcardDataContext } from "../../../../../hoc/FlashcardContext"

function SingleMathFlashcards() {
  const {user} = useContext(AuthContext)
  const {flashcardData } = useContext(FlashcardDataContext)
  const {subtopicId} = useParams();
  const [flashcardCategories, setFlashcardCategories] = useState({
    subject: "",
    topic: "",
    subtopic: "",
    userId: user.id
  })

  const [createdFlashcardsData, setCreatedFlashcardsData] = useState([])
  

  useEffect(() => {
    const separate = subtopicId.split("-")
    // console.log("This is seperate: ", seperate)
    setFlashcardCategories((prev)=>({
      ...prev,
      subject : separate[0],
      topic: separate[1],
      subtopic: separate[2], 
    }))
  },[subtopicId])

  useEffect(()=>{
    console.log(flashcardCategories)
  }, [flashcardCategories])

  useEffect(() => {
    async function displayCreatedFlashcards() {
      try {
        console.log("before getting data ", flashcardData)
        const { subject, topic, subtopic, userId } = flashcardCategories;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/flashcard/displayCreatedFlashcards`, {
          params: { subject, topic, subtopic, userId }
        });
        if (response.status === 200) {
          console.log(response.data);
          setCreatedFlashcardsData(response.data.createdFlashcards);
        } else {
          console.log("No flashcards found");
        }
      } catch (err) {
        console.log(err);
      }
    }
  
    displayCreatedFlashcards(); // Move the function call inside useEffect
  
    // Clean up function can be added if needed
  
  }, [flashcardCategories]);

  useEffect(() => {
    console.log(createdFlashcardsData)
  }, [createdFlashcardsData])



  return (
    <div className={style.componentContainer}>
       <p>{subtopicId}</p>
    </div>
  )
}

export default SingleMathFlashcards
