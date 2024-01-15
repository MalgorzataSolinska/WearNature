import axios from 'axios';
import {
  setLoading,
  setError,
  userLogin,
  userLogout,
  updateUserProfile,
  resetUpdate,
  setUserOrders,
  setServerResponseMsg,
  setServerResponseStatus,
  verificationEmail,
  stateReset
} from '../slices/user';
export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/users/login', { email, password }, config);
    dispatch(userLogin(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
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

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(userLogout());
};

export const register = (firstName, lastName, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/users/register', { firstName, lastName, email, password }, config);
    dispatch(userLogin(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
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

export const updateProfile =
  (id, firstName, lastName, email, currentPassword) => async (dispatch, getState) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.put(
        `/api/users/profile/${id}`,
        { _id: id, firstName, lastName, email, currentPassword },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(updateUserProfile(data));
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

export const resetUpdateSuccess = () => async (dispatch) => {
  dispatch(resetUpdate());
};

export const getUserOrders = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`/api/users/${userInfo._id}`, config);
    dispatch(setUserOrders(data));
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
export const verifyEmail = (token) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    };
    await axios.get(`/api/users/verify-email`, config);

    dispatch(verificationEmail());
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    userInfo.active = true;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
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

export const sendResetEmail = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`/api/users/password-reset-request`, { email }, config);
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

export const resetPassword = (password, token) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } };
    const { data, status } = await axios.post(`/api/users/password-reset`, { password }, config);

    dispatch(setServerResponseMsg(data, status));
    dispatch(setServerResponseStatus(status));
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

export const resetState = () => async (dispatch) => {
  dispatch(stateReset());
};

