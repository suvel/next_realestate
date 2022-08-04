import styles from "./Pagination.module.css";
const Pagination = ({ curPage, totalPages, handelOnClick }) => {
  console.log({ curPage });
  const pagesButton = Array.from(Array(totalPages)).map((page, index) => {
    return index + 1;
  });
  return (
    <div className={styles.pagination}>
      {pagesButton.map((pageNumber, index) => {
        const isSelected = pageNumber === curPage ? styles.selectedPage : "";
        return (
          <div
            key={index}
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

export default Pagination;
