import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./CreatedSet.module.css";
import { AuthContext } from "../../../../../App";

function CreatedSet() {
  const { topic, subtopic } = useParams();
  const { user } = useContext(AuthContext);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const res = await axios.get(`http://localhost:4000/flashcard/displayCreatedFlashcards/${user.id}`, {
          params: { topic, subtopic }
        });
        setFlashcards(res.data.createdFlashcards);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
      }
    }

    if (user.id && topic && subtopic) {
      fetchFlashcards();
    }
  }, [user.id, topic, subtopic]);

  
  return (
    <div className={style.flashcardSetContainer}>
      {flashcards.map((flashcard, index) => (
        <div key={index} className={style.flashcard}>
          <p>Question: {flashcard.question}</p>
          <p>Answer: {flashcard.answer}</p>
        </div>
      ))}
    </div>
  );
}
  

export default CreatedSet;
