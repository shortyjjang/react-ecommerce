import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeLoginUser } from '../../_actions/user_action';

function Logout(props) {
  const authenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requestLogout = async () => {
    await fetch(`${process.env.REACT_APP_AUTH_API_BASIC_PATH}/logout-proc`, {
      method: 'POST',
      credentials: 'include',
    }).then((response) => {
      navigate('/', { replace: true });
    });
  };

  useEffect(async () => {
    dispatch(removeLoginUser());
    await requestLogout();
  }, [authenticated]);

  return <></>;
}

export default Logout;
