type Props = {
  name: string;
};

const UserProfile = ({ name }: Props) => {
  const getInitial = (fullName: string) => {
    return fullName.trim().charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center gap-2 bg-[#FDFCF6]">
      <div className="w-8 h-8 rounded-full bg-[#2C234D] flex items-center justify-center text-white font-bold text-lg">
        {getInitial(name)}
      </div>
      <span className="text-[#2C234D] font-medium text-base">{name}</span>
    </div>
  );
};

export default UserProfile;
