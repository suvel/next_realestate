import getFetchLoanURL from "./getFetchLoanURL";

const getLoans = (pageNo) => {
  console.log("fetching loan...");
  const apiURL = getFetchLoanURL(pageNo);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(apiURL, {
        method: "GET",
        headers: {
          "x-api-key": "MaDX2Oo31g3FLAHesYHtGa3rHe40uqkJ8TmbPJn9"
        }
      });
      const data = await response.json();
      console.log("successfully fetched loan");
      resolve(data);
    } catch (exe) {
      console.log(exe);
      reject("Error while fetching Loan data.");
    }
  });
};

export default getLoans;
