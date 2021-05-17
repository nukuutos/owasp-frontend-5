import axios from './axios';

const asyncCall = async (config, setAlerts, setToken = null) => {
  const { accessToken, addingHeaders, ...confingProps } = config;

  try {
    const { data } = await axios({
      ...confingProps,
      headers: {
        ...addingHeaders,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    if (error.response) {
      const {
        response: { data, status },
      } = error;

      if (status === 404) document.cookie = 'accessToken=';
      if (status === 404 && setToken) setToken(null);

      setAlerts((alerts) => [...alerts, { message: data.message, status }]);
    }

    return null;
  }
};

export default asyncCall;
