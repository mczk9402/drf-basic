import React, { FC } from "react";

type Props = {
  handleClick: () => void;
  children: string;
};

const CountClick: FC<Props> = ({ handleClick, children }) => {
  console.log(children);

  return (
    <div>
      <button onClick={handleClick}>{children}</button>
    </div>
  );
};

export default React.memo(CountClick);

//　メモはpropsに反応する
