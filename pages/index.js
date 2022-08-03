import debugLog from "../helper/debugLog";
import { useState } from "react";

const getLoans = (pageNo = 1) => {
  debugger;
  debugLog("running getLoans");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:3000/api/loans/${pageNo}`);
      const { data } = await response.json();
      debugger;
      debugLog("successfully fetched loan");
      resolve(data);
    } catch (exe) {
      console.log(exe);
      debugLog("Error while fetching loans");
      reject("Error while fetching loans");
    }
  });
};

export async function getStaticProps(context) {
  const loans = await getLoans(1);
  // console.log({ loans });
  const { page, pageCount } = loans.meta;
  debugger;
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

const Loans = ({ data }) => {
  return data?.map((itm) => {
    const first4Pros = itm?.pros?.slice(0, 4).map((pros) => {
      return <div>{`✅ ${pros}`}</div>;
    });
    return (
      <>
        <div>name:{itm?.name}</div>
        <div>comparisonRate:{itm?.comparisonRate}</div>
        <div>advertisedRate:{itm?.advertisedRate}</div>
        <div>{first4Pros}</div>
        <div>
          <img
            style={{ width: "100px", height: "100px" }}
            src={itm?.companyLogo}
          />
        </div>
        <div>
          <a target={"_blank"} href={itm?.gotoSiteUrl}>
            Go to Link
          </a>
        </div>
      </>
    );
  });
};
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
      <div>{<Loans data={loans} />}</div>
      <div>{pagination?.page}</div>
      <div>
        <button onClick={loadMore}>Load more</button>
      </div>
    </>
  );
};

export default App;
