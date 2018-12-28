/* eslint-disable import/prefer-default-export */
export const formatValidationErrors = (err) => {
  const errData = [];
  if (err.status === 422) {
    err.data.forEach((item) => {
      errData[item.field] = item.message;
    });
  }

  return errData;
};
