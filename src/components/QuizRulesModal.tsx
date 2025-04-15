import { FC } from "react";

interface QuizRulesModalProps {
  onClose: () => void;
}

const QuizRulesModal: FC<QuizRulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-6 right-6 text-gray-600 hover:text-black text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-purple-900 mb-6">Quiz rules</h2>

        <div className="space-y-6 text-sm md:text-base text-gray-800">
          <div>
            <div className="bg-[#FAFAF1] px-4 py-2 font-semibold">
              10-Second Timer
            </div>
            <ul className="list-disc pl-6 mt-2">
              <li>Each question comes with a 10-second timer.</li>
              <li>
                If you don’t answer within the time limit, the app will
                automatically move to the next question.
              </li>
            </ul>
          </div>

          <div>
            <div className="bg-[#FAFAF1] px-4 py-2 font-semibold">
              Manual Navigation
            </div>
            <ul className="list-disc pl-6 mt-2">
              <li>
                You can navigate to the next question manually before the timer
                expires.
              </li>
              <li>
                Use the "Next" button to move ahead if you’re ready before the
                timer runs out.
              </li>
            </ul>
          </div>

          <div>
            <div className="bg-[#FAFAF1] px-4 py-2 font-semibold">
              Final Score and Performance Message
            </div>
            <ul className="list-disc pl-6 mt-2">
              <li>
                After all questions are answered, your final score will be
                displayed.
              </li>
              <li>
                Based on your performance, you will receive a personalized
                message:
                <ul className="list-disc pl-6 mt-1">
                  <li>
                    <strong>Great job!</strong>: If you score{" "}
                    <strong>above 80%</strong>.
                  </li>
                  <li>
                    <strong>Well done!</strong>: If you score{" "}
                    <strong>between 60% and 80%</strong>.
                  </li>
                  <li>
                    <strong>Keep practicing!</strong>: If you score{" "}
                    <strong>below 60%</strong>.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizRulesModal;
