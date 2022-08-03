import debugLog from "../helper/debugLog";

const getLoans = (pageNo = 1) => {
  debugLog("running getLoans");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/api/loans/${pageNo}`);
      const { data } = await response.json();
      debugLog("successfully fetched loan");
      resolve(data);
    } catch (exe) {
      debugLog("Error while fetching loans");
      reject("Error while fetching loans");
    }
  });
};

const App = () => {
  const fetchLoan = async () => {
    const loans = await getLoans();
    console.log({ loans });
    console.log({ meta: loans.meta });
  };

  return (
    <div>
      hello
      <button onClick={fetchLoan}>fetch</button>
    </div>
  );
};

export default App;
