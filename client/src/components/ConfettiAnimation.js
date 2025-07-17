import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const ConfettiAnimation = () => {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} numberOfPieces={400} recycle={false} />;
};

export default ConfettiAnimation;