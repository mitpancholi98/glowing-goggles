import { quiz } from "../data/quiz";
import Navbar from "./Navbar";

type Props = {
  answers: (number | null)[];
  data: {
    categoryId: string;
    name: string;
  };
  onRetake: () => void;
};

const optionMap: Record<string, number> = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
};

const Result = ({ answers, data, onRetake }: Props) => {
  const category = quiz.find((c) => c.id === data.categoryId);
  if (!category) return <p>Invalid category.</p>;

  const total = category.questions.length;
  let score = 0;
  let unanswered = 0;

  category.questions.forEach((question, index) => {
    const userAnswer = answers[index];
    const correctIndex =
      optionMap[question.correctAnswer as keyof typeof optionMap];

    if (userAnswer === null) {
      unanswered++;
    } else if (userAnswer === correctIndex) {
      score++;
    }
  });

  const incorrect = total - score - unanswered;
  const percentage = Math.round((score / total) * 100);

  let feedback = "📚 Keep practicing!";
  if (percentage >= 80) feedback = "🎉 Great job!";
  else if (percentage >= 50) feedback = "👍 Not bad, keep improving!";

  return (
    <div className="min-h-screen bg-[#FDFCF6] flex flex-col items-center text-center">
      <Navbar user={data.name} />
      <div className="text-5xl text-green-500 mb-4">
        {percentage >= 80 ? "✔️" : "😕"}
      </div>
      {percentage >= 80 && (
        <h1 className="text-2xl md:text-4xl font-semibold tracking-widest mb-2">
          CONGRATULATION
        </h1>
      )}
      <p className="text-gray-700 mb-6 text-sm md:text-base">
        You successfully completed the Quiz and holds
      </p>

      <div className="text-lg md:text-2xl font-medium mb-1">Your Score</div>
      <div className="text-3xl md:text-5xl font-bold text-green-600 mb-2">
        {percentage}%
      </div>
      <div className="text-xl font-semibold mb-6">{feedback}</div>

      <div className="border-[#D9D9D9] border rounded-md px-6 py-4 inline-block mb-6 text-sm md:text-base">
        Out of {total} question
        <div className="mt-2 flex gap-4 justify-center">
          <span className="text-green-600 font-semibold">{score} Correct</span>
          <span className="text-red-500 font-semibold">
            {incorrect} Incorrect
          </span>
          <span className="text-gray-500 font-semibold">
            {unanswered} Not answered
          </span>
        </div>
      </div>

      <button
        onClick={onRetake}
        className="cursor-pointer border border-[#9F185D] text-[#9F185D] font-medium px-6 py-2 rounded-md hover:bg-[#FDF0F4] transition"
      >
        Retake Quiz
      </button>
    </div>
  );
};

export default Result;
