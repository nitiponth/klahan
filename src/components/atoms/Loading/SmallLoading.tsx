import React from 'react';
import Lottie, { LottieProps } from 'react-lottie';
import LoadingBar from '../../../assets/lotties/loading-bar.json';

type Props = Omit<LottieProps, 'options'>;

const SmallLoading = (props: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingBar,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie width={30} height={20} options={defaultOptions} {...props} />;
};

export default SmallLoading;
