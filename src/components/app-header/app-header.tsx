import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { getUser, setUser } from '../../services/user/slice';
import { useDispatch, useSelector } from 'react-redux';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);

  console.log('userAppHeader', user);
  console.log('username', user?.name);

  return <AppHeaderUI userName={user?.name} />;
};
