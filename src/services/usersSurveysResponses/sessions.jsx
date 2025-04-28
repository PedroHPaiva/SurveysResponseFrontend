import { USER_SURVEYS_URL } from '../index';

import { getApiToken } from '../../helpers/tokens';

export const createSession = async (email, password) => {
  const token = await getApiToken();

  const url = `/sessions`;

  const response = await USER_SURVEYS_URL.post(
    url,
    { email, password },
    {
      headers: { authorization: token },
    }
  );

  return response.data;
};
