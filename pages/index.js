import { useState } from "react";
import Loans from "../components/Loans";
import styles from "./index.module.css";

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

const Pagination = ({ curPage, totalPages, handelOnClick }) => {
  console.log({ curPage });
  const pagesButton = Array.from(Array(totalPages)).map((page, index) => {
    return index + 1;
  });
  return (
    <div className={styles.pagination}>
      {pagesButton.map((pageNumber) => {
        const isSelected = pageNumber === curPage ? styles.selectedPage : "";
        return (
          <div
            onClick={() => handelOnClick(pageNumber)}
            className={`${styles.pageNumber} ${isSelected}`}
          >
            {pageNumber}
          </div>
        );
      })}
    </div>
  );
};

const Spinner = () => {
  return (
    <div className={styles.Spinner}>⌚.... Please wait we are processing</div>
  );
};

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
          <div>{<Loans loanList={loans} />}</div>
          <div>
            <Pagination
              curPage={pagination.page}
              totalPages={pagination.pageCount}
              handelOnClick={onPaginationChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default App;
