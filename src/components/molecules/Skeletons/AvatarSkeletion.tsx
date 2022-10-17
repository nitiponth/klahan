import { Skeleton, SkeletonProps } from '@mui/material';
import React from 'react';

const AvatarSkeletion = (props: SkeletonProps) => {
  return <Skeleton variant="circular" width={50} height={50} {...props} />;
};

export default AvatarSkeletion;
