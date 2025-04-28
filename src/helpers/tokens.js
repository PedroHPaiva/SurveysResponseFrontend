export const getApiToken = () => {
  const userItem = localStorage.getItem('@SurveysData:user');

  const user = JSON.parse(userItem);

  return user ? user.token : null;
};
