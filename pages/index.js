import { useState } from "react";
import Loans from "../components/Loans";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { default as fetchInitialLoans } from "../helper/getLoans";

const getLoans = (pageNo = 1) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:3000/api/loans/${pageNo}`);
      const { data } = await response.json();
      resolve(data);
    } catch (exe) {
      console.log(exe);
      reject("Error while fetching loans");
    }
  });
};

export async function getStaticProps(context) {
  const loans = await fetchInitialLoans();
  const { page, pageCount } = loans.meta;
  return {
    props: {
      paginationDetail: {
        page,
        pageCount
      },
      loanList: loans?.hits
    } // will be passed to the page component as props
  };
}

const App = ({ paginationDetail, loanList }) => {
  const [pagination, setPagination] = useState(paginationDetail);
  const [loans, setLoans] = useState(loanList);
  const [showSpinner, setShowSpinner] = useState(false);

  const onPaginationChange = async (newPageNumber) => {
    setShowSpinner(true);
    const loansObj = await getLoans(newPageNumber);
    const { page, pageCount } = loansObj.meta;
    setPagination({ page, pageCount });
    setLoans(loansObj.hits);
    setShowSpinner(false);
  };

  return (
    <>
      {showSpinner ? (
        <Spinner />
      ) : (
        <>
          <Loans loanList={loans} />
          <Pagination
            curPage={pagination.page}
            totalPages={pagination.pageCount}
            handelOnClick={onPaginationChange}
          />
        </>
      )}
    </>
  );
};

export default App;
