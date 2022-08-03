import debugLog from "../helper/debugLog";

const getLoans = () => {
  debugLog("running getLoans");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/loans");
      debugLog("successfully fetched loan");
      resolve(response);
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
  };

  return (
    <div>
      hello
      <button onClick={fetchLoan}>fetch</button>
    </div>
  );
};

export default App;
