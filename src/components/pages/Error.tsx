import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../atoms/Loading';
import SimpleDialog from '../molecules/Dialog/SimpleDialog';

const Error = () => {
  const navigate = useNavigate();
  //   const location = useLocation();

  return (
    <>
      <Loading />
      <SimpleDialog
        open={true}
        onClose={undefined}
        title={'หืมมมมมมม~'}
        body={
          'ดูเหมือนจะมีทริปที่เปิดไว้อยู่แล้วนะ\nตอนนี้พี่หาญสามารถดูแลให้ได้ครั้งละหนึ่งทริปเท่านั้น จะเปิดทริปใหม่ก็ต้องจบทริปเก่าก่อนนะคับบ'
        }
        onAgreed={() => {
          navigate('/', { replace: true });
        }}
        agreeText={'ไปดูทริปที่เปิดไว้'}
      />
    </>
  );
};

export default Error;
