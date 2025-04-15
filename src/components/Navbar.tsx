import UserProfile from "./UserProfile";

type Props = {
  onExit?: VoidFunction;
  user?: string;
};

const Navbar = ({ onExit, user }: Props) => {
  return (
    <header className="w-full flex justify-between items-center mb-10 border-[#E1E1E1] border-b p-6">
      <h1 className="text-2xl font-semibold text-[#d22b6b] tracking-tight">
        <span className="font-light">QUIZ</span><span className="font-black">Mania</span>
      </h1>
      {typeof onExit == "function" && (
        <button
          onClick={onExit}
          className="cursor-pointer border border-[#d22b6b] text-[#d22b6b] font-medium px-4 py-1 rounded-md hover:bg-[#d22b6b] hover:text-white transition"
        >
          Exit Quiz
        </button>
      )}
      {user && user != "" && <UserProfile name={user} />}
    </header>
  );
};

export default Navbar;
