import { useState } from "react";
import Loans from "../components/Loans";

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
  const loans = await getLoans(1);
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

  const loadMore = async () => {
    const { page: currentPage, pageCount: currentPageCount } = pagination;
    if (currentPage < currentPageCount) {
      const newPageNo = currentPage + 1;
      const loansObj = await getLoans(newPageNo);
      const { page, pageCount } = loansObj.meta;
      setPagination({ page, pageCount });
      setLoans([...loans, ...loansObj.hits]);
    }
  };

  return (
    <>
      <div>{<Loans loanList={loans} />}</div>
      <div>{pagination?.page}</div>
      <div>
        <button onClick={loadMore}>Load more</button>
      </div>
    </>
  );
};

export default App;
