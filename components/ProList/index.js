import styles from "./ProList.module.css";

const ProsList = ({ pros, pCount }) => {
  let toBeRenderedPros = pros;
  if (pCount) {
    toBeRenderedPros = pros?.slice(0, pCount);
  }
  return (
    <div className={styles.ProsList}>
      {toBeRenderedPros?.map((pros, index) => {
        return (
          <div className={styles.Pro} key={index}>
            {pros}
          </div>
        );
      })}
    </div>
  );
};

export default ProsList;
