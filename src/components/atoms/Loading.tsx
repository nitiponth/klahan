import { Stack } from '@mui/material';
import React from 'react';
import Lottie from 'react-lottie';
import { COLOR } from '../../utils/themes/colors';
import LoadingCat from '../../assets/lotties/cat-play-yarn.json';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingCat,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Stack
      bgcolor={COLOR.WHITE_COLOR}
      justifyContent="center"
      alignItems="center"
      minHeight={'100vh'}
    >
      <Lottie options={defaultOptions} />
    </Stack>
  );
};

export default Loading;
