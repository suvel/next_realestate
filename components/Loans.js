import LoanMiniCard from "./LoanMiniCard";
import styles from "./Loans.module.css";

const Loans = ({ loanList }) => {
  return (
    <div className={styles.Loans}>
      {loanList?.map((loanDetail) => {
        return <LoanMiniCard key={loanDetail?.uuid} loanDetail={loanDetail} />;
      })}
    </div>
  );
};

export default Loans;
