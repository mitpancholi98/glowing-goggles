import { useState } from "react";
import WelcomePage from "./components/CategorySelection";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

type QuizData = {
  categoryId: string;
  name: string;
};

function App() {
  const [quizData, setQuizData] = useState({
    categoryId: "",
    name: "",
  });
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStart = (d: QuizData) => {
    setIsStarted(true);
    setQuizData(d);
  };

  const handleComplete = (answers: (number | null)[]) => {
    setIsCompleted(true);
    setAnswers(answers);
  };

  const handleReset = () => {
    setQuizData({ categoryId: "", name: "" });
    setIsCompleted(false);
    setIsStarted(false);
    setAnswers([]);
  };

  if (answers.length > 0 && isCompleted) {
    return <Result answers={answers} data={quizData} onRetake={handleReset} />;
  }

  if (isStarted) {
    return (
      <Quiz
        data={quizData}
        handleComplete={handleComplete}
        handleReset={handleReset}
      />
    );
  }

  return <WelcomePage onStart={handleStart} />;
}

export default App;
