import axios from 'axios';
import { setError, shippingAddressAdd, clearOrder, setServerResponseMsg } from '../slices/order';

export const setShippingAddress = (data) => (dispatch) => {
  dispatch(shippingAddressAdd(data));
};
export const setShippingAddressError = (value) => (dispatch) => {
  dispatch(setError(value));
};
export const createOrder = (order) => async (dispatch, getState) => {
  const {
    order: { shippingAddress },
    user: { userInfo },
  } = getState();

  const preparedOrder = { ...order, shippingAddress };

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.post('api/orders', preparedOrder, config);
    dispatch(setServerResponseMsg(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
  }
};

export const resetOrder = () => async (dispatch) => {
  dispatch(clearOrder());
};
