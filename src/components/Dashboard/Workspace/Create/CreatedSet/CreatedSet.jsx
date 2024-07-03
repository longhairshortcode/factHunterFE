import { useEffect, useState, useContext } from "react";
import axios from "axios";
import style from "./CreatedSet.module.css";
import { AuthContext } from "../../../../../App";



function CreatedSet({topicAndSubtopic, fetchTrigger, flashcardsTopicSubtopic, setFlashcardsTopicSubtopic}) {
  const { topic, subtopic } = topicAndSubtopic;
  const { user } = useContext(AuthContext);
  
  

  useEffect(() => {
    async function fetchFlashcardsTopicSubtopic() {
      try {
        const res = await axios.get(`http://localhost:4000/flashcard/displayCreatedFlashcards/${user.id}`, {
          params: { topic, subtopic }
        });
        setFlashcardsTopicSubtopic(res.data.createdFlashcardsResult || []);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
      }
    }

    if (user.id && topic && subtopic) {
      fetchFlashcardsTopicSubtopic();
    }
  }, [user.id, topic && subtopic, fetchTrigger]);

  // Reset flashcards when selectedCategory changes
  // useEffect(() => {
  //   setFlashcards([]);
  // }, [selectedCategory]);
  
  return (
  <>
    <div className={style.componentContainer}>
        <div className={style.setsContainer}>
          {flashcardsTopicSubtopic.map((flashcardTopicSubtopic, index) => (
            <div className={style.singleCard} key={index}>
              <div className={style.flipCard}>
                <div className={style.flipCardInner}>
                  <div className={style.flipCardFront}>
                    <div className={style.question}>
                      {flashcardTopicSubtopic.question}
                    </div>
                  </div>
                  <div className={style.flipCardBack}>
                    <div className={style.answer}>
                      {flashcardTopicSubtopic.answer}
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
