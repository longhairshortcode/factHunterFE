import React, { createContext, useState } from "react";

export const FlashcardDataContext = createContext();

export const FlashcardDataProvider = ({ children }) => {
  const [flashcardData, setFlashcardData] = useState({
    question: "",
    answer: "",
    subject: "",
    topic: "",
    subtopic: "",
  });

  return (
    <FlashcardDataContext.Provider value={{ flashcardData, setFlashcardData }}>
      {children}
    </FlashcardDataContext.Provider>
  );
};
