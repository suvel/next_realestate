import styles from "./LoanStats.module.css";
const LoanStats = ({ advertiseRate, comparisonRate }) => {
  return (
    <div className={styles.LoanStats}>
      <div className={styles.advertiseRate_container}>
        <div className={styles.label}>Advertise Rate</div>
        <div className={styles.number}>{advertiseRate}</div>
      </div>
      <div className={styles.comparisonRate_container}>
        <div className={styles.label}>Comparison Rate</div>
        <div className={styles.number}>{comparisonRate}</div>
      </div>
    </div>
  );
};

export default LoanStats;
