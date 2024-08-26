import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearListIngredients,
  getConstructorItems,
  getIngredientList,
  setListIngredients
} from '../../services/burgerConstructor/burger';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

import { getUser } from '../../services/user/slice';
import { postOrderBurger } from '../../services/orderUser/actions';
import {
  getUserOrder,
  getStatusOrder,
  updateStateOrder
} from '../../services/orderUser/orderUser';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const constructorItems = useSelector(getConstructorItems);
  const orderModalData = useSelector(getUserOrder);
  const orderRequest = useSelector(getStatusOrder);
  const orderList = useSelector(getIngredientList);

  useEffect(() => {
    dispatch(setListIngredients());
  }, [dispatch, constructorItems]);

  const onOrderClick = () => {
    if (!constructorItems.bun || !user || orderRequest) {
      navigate('/login');
    } else {
      dispatch(postOrderBurger(orderList));
    }
  };

  const closeOrderModal = () => {
    dispatch(updateStateOrder());
    dispatch(clearListIngredients());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
