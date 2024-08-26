import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { getUser, setUser } from '../../services/user/slice';
import { useDispatch, useSelector } from 'react-redux';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);
  return <AppHeaderUI userName={user?.name} />;
};
