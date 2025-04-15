import React, { useState } from "react";
import QuizRulesModal from "./QuizRulesModal";
import { quiz } from "../data/quiz";
import Navbar from "./Navbar";

interface IWelcomePage {
  onStart: (d: { categoryId: string; name: string }) => void;
}

const WelcomePage: React.FC<IWelcomePage> = ({ onStart }) => {
  const [fullName, setFullName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [showRules, setShowRules] = useState(false);

  const handleStartQuiz = () => {
    if (!fullName || !categoryId) {
      alert("Please enter your name and select a topic");
      return;
    }

    setShowRules(true);
    onStart({ categoryId, name: fullName });
  };

  return (
    <div className="min-h-screen bg-[#fdfcf5] flex flex-col items-center">
      <Navbar />

      <h2 className="text-6xl text-center mb-4 px-4 sm:px-0">
        <span className="font-bold">Welcome to </span>
        <span className="text-[#d22b6b]">
          <span>QUIZ</span>
          <span className="font-extrabold">Mania</span>
        </span>
      </h2>
      <main className="w-full max-w-xl px-4 sm:px-0">
        <div className="bg-gray-100 p-4 rounded-md text-center text-gray-700 mb-6">
          Please read all the rules about this quiz before you start.
          <br />
          <button
            type="button"
            className="text-[#d22b6b] underline font-medium cursor-pointer"
            onClick={() => setShowRules(true)}
          >
            Quiz rules
          </button>
        </div>

        <label className="block mb-2 font-medium text-gray-700">
          Full name
        </label>
        <input
          type="text"
          placeholder="Full name"
          className="w-full border border-gray-300 px-4 py-2 rounded-md mb-6"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label className="block mb-2 font-medium text-gray-700">
          Please select topic to continue
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {quiz.map((q) => (
            <label key={q.id} className="block">
              <div
                className={`relative flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all
              ${categoryId === q.id ? "border-[#B92B5D]" : "border-gray-200"}`}
                onChange={() => setCategoryId(q.id)}
              >
                <div className="flex-shrink-0 mr-4">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center
                ${
                  categoryId === q.id
                    ? "bg-[#B92B5D]"
                    : "border-2 border-gray-300"
                }`}
                  >
                    {categoryId === q.id && (
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
                      categoryId === q.id ? "font-bold" : "font-medium"
                    }`}
                  >
                    {q.name}
                  </p>
                </div>

                <input
                  type="radio"
                  name="category"
                  value={q.id}
                  className="sr-only"
                  checked={categoryId === q.id}
                  onChange={() => setCategoryId(q.id)}
                  aria-hidden="true"
                />
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={handleStartQuiz}
          className="cursor-pointer w-full sm:w-auto px-6 py-2 bg-[#d22b6b] text-white rounded-md font-semibold hover:bg-[#B92B5D] transition"
        >
          Start Quiz
        </button>

        {showRules && <QuizRulesModal onClose={() => setShowRules(false)} />}
      </main>
    </div>
  );
};

export default WelcomePage;
