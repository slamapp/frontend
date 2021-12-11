const initialError = {
  code: null,
  message: null,
};

export const onFulfilled = (res: any) => ({
  ...res,
  error: {
    ...initialError,
  },
});

export const onRejected = (res: any) => {
  console.warn(res);
  return {
    ...res,
    error: {
      ...initialError,
      // weather와, snsApi의 response 형태가 다를 경우가 있기 때문에 아래와 같이 작업 함.
      code: res?.response?.status || 500,
      message:
        res?.response?.data?.message ||
        res?.response?.data ||
        "알 수 없는 에러입니다.",
    },
  };
};
