import React, { FC } from "react";

type Props = {
  name: string;
  count: number;
};

const CountDisplay: FC<Props> = ({ name, count }) => {
  console.log("display", name);

  return <div>{count}</div>;
};

export default React.memo(CountDisplay);
