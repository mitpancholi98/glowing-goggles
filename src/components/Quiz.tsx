import { useEffect, useState } from "react";
import { quiz } from "../data/quiz";
import Navbar from "./Navbar";

type Props = {
  handleComplete: (answers: (number | null)[]) => void;
  handleReset: VoidFunction;
  data: {
    categoryId: string;
    name: string;
  };
};

const Quiz = ({ data, handleComplete, handleReset }: Props) => {
  const category = quiz.find((c) => c.id === data.categoryId)!;
  const [current, setCurrent] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timer, setTimer] = useState(category.questions[0].timeLimit);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(category.questions.length).fill(null)
  );

  const currentQuestion = category.questions[current];
  const currentAnswer = answers[current];

  useEffect(() => {
    if (timer === 0) {
      handleNext();
      return;
    }

    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setAnswers((prev) => {
      const updated = [...prev];
      updated[current] = index;
      return updated;
    });
  };

  const handleNext = () => {
    if (current + 1 === category.questions.length) {
      console.log("Quiz complete. Answers:", answers);
      handleComplete(answers);
    } else {
      setCurrent((c) => c + 1);
      setSelectedOption(null);
      setTimer(category.questions[current + 1].timeLimit);
    }
  };

  const progress = ((current + 1) / category.questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#FDFCF6] flex flex-col items-center">
      <Navbar user="" onExit={handleReset} />

      <div className="w-full max-w-4xl px-4 sm:px-0">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-semibold text-[#9F185D]">
            {current + 1}{" "}
            <span className="text-black">/{category.questions.length}</span>
          </div>
          <div className="text-sm font-semibold bg-gray-100 px-3 py-1 rounded text-[#B92B5D]">
            {`0:${timer.toString().padStart(2, "0")}`}
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded mb-6 overflow-hidden">
          <div
            className="h-full bg-[#B92B5D] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <main className="w-full max-w-3xl px-4 sm:px-0">
        <div className="flex gap-4">
          <p className="text-base md:text-lg font-semibold mb-4">
            {current + 1}
          </p>
          <div className="w-full">
            <div className="text-base md:text-lg font-semibold mb-4">
              {currentQuestion.question}
            </div>

            <div className="space-y-4 mb-6">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="block">
                  <div
                    className={`relative flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all
              ${
                selectedOption === index
                  ? "border-[#B92B5D]"
                  : "border-gray-200"
              }`}
                    onClick={() => handleOptionSelect(index)}
                  >
                    <div className="flex-shrink-0 mr-4">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center
                ${
                  selectedOption === index
                    ? "bg-[#B92B5D]"
                    : "border-2 border-gray-300"
                }`}
                      >
                        {selectedOption === index && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div>
                      <p
                        className={`text-gray-800 ${
                          selectedOption === index ? "font-bold" : "font-medium"
                        }`}
                      >
                        {option}
                      </p>
                    </div>

                    <input
                      type="radio"
                      name={`q-${index}`}
                      value={index}
                      className="sr-only"
                      checked={selectedOption === index}
                      onChange={() => {}}
                      aria-hidden="true"
                    />
                  </div>
                </label>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                className="bg-[#B92B5D] text-white font-medium px-6 py-2 rounded-md disabled:bg-[#E1A9B7] cursor-pointer"
                onClick={handleNext}
                disabled={currentAnswer == null}
              >
                Next
              </button>
              <button
                className="text-[#9F185D] font-medium cursor-pointer"
                onClick={handleNext}
              >
                Skip this question
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
