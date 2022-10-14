import React from 'react';
import Lottie from 'react-lottie';
import LoadingBar from '../../../assets/lotties/loading-bar.json';

const SmallLoading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingBar,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie width={30} height={20} options={defaultOptions} />;
};

export default SmallLoading;
