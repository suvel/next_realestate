const getFetchLoanURL = (pageNo = 1) => {
  const baseUrl = `https://api.ratecity.com.au/v2/home-loans?page=${pageNo}`;
  return baseUrl;
};

export default getFetchLoanURL;
