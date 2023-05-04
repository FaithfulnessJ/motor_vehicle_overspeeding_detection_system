import { useState } from "react";

export const useScreenListener = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const curSreenSize = () => setScreenSize(window.innerWidth);
  window.addEventListener("resize", curSreenSize);

  return screenSize;
};
