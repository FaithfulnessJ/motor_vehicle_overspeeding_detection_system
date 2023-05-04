import React from "react";

type AvatarProps = {
  text?: string;
};

const Avatar = ({ text }: AvatarProps): JSX.Element => {
  return (
    <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-primary_color rounded-full ">
      <span className="font-semibold text-xl text-white">{text}</span>
    </div>
  );
};

export default Avatar;
