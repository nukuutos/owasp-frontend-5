import axios from './axios';

const asyncCall = async (config, setAlerts) => {
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

      setAlerts((alerts) => [...alerts, { message: data.message, status }]);
    }

    return null;
  }
};

export default asyncCall;
