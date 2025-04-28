import { USER_SURVEYS_URL } from '../index';

import { getApiToken } from '../../helpers/tokens';

export const getSurveysResponses = async (
  startDate,
  endDate,
  groupBy = 'hour'
) => {
  const token = await getApiToken();

  const url = `/surveys?startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`;

  const response = await USER_SURVEYS_URL.get(url, {
    headers: { authorization: token },
  });

  return response.data;
};
