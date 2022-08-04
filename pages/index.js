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
  // console.log({ loans });
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
      {/* <div className={styles.card}>
        <div className={styles.class_header}>
          <div className={styles.loan_logo}>
            <img />
          </div>
          <div className={styles.loan_title}>
            <h3>
              With supporting text below as a natural lead-in to additional
              content.
            </h3>
          </div>
        </div>
        <div className={styles.card_body}>
          <div className={styles.loan_detail}>
            <div className={styles.pros}>
              <div className={styles.pro}>pro 1</div>
              <div className={styles.pro}>pro 1</div>
              <div className={styles.pro}>pro 1</div>
              <div className={styles.pro}>pro 1</div>
            </div>
            <div className={styles.stats}>
              <div className={styles.advertiseRate_container}>
                <div className={styles.label}>Advertise Rate</div>
                <div className={styles.number}>300</div>
              </div>
              <div className={styles.comparisonRate_container}>
                <div className={styles.label}>Comparison Rate</div>
                <div className={styles.number}>200</div>
              </div>
            </div>
          </div>
          <div className={styles.action_container}>
            <button className={styles.goToSite}>Go to Site</button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default App;
