import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./CreatedSet.module.css";
import { AuthContext } from "../../../../../App";

function CreatedSet({topicAndSubtopic}) {
  const { topic, subtopic } = topicAndSubtopic;
  const { user } = useContext(AuthContext);
  const [flashcards, setFlashcards] = useState([]);
  

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const res = await axios.get(`http://localhost:4000/flashcard/displayCreatedFlashcards/${user.id}`, {
          params: { topic, subtopic }
        });
        setFlashcards(res.data.createdFlashcardsResult || []);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
      }
    }

    if (user.id && topic && subtopic) {
      fetchFlashcards();
    }
  }, [user.id, topic && subtopic]);

  // Reset flashcards when selectedCategory changes
  // useEffect(() => {
  //   setFlashcards([]);
  // }, [selectedCategory]);
  
  return (
  <>
    {/* <div className={style.flashcardSetContainer}>
      {flashcards.map((flashcard, index) => (
        <div key={index} className={style.flashcard}>
          <p>Question: {flashcard.question}</p>
          <p>Answer: {flashcard.answer}</p>
        </div>
      ))}
    </div> */}

    <div className={style.componentContainer}>
        <div className={style.setsContainer}>
          {flashcards.map((flashcard, index) => (
            <div className={style.singleCard} key={index}>
              <div className={style.flipCard}>
                <div className={style.flipCardInner}>
                  <div className={style.flipCardFront}>
                    <div className={style.question}>
                      {flashcard.question}
                    </div>
                  </div>
                  <div className={style.flipCardBack}>
                    <div className={style.answer}>
                      {flashcard.answer}
                    </div>  
                  </div>
                </div>
              </div>             
            </div>
          ))}
        </div>
      </div>
  </>
  );
}
  

export default CreatedSet;
