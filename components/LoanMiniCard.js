import ProsList from "./ProsList";
import GoToSite from "./GoToSite";
import styles from "./LoanMiniCard.module.css";
import LoanStats from "./LoanStats";

const LoanMiniCard = ({ loanDetail }) => {
  return (
    <div className={styles.LoanMiniCard}>
      <div className={styles.LoanMiniCard_header}>
        <div className={styles.brand_logo}>
          <img src={loanDetail?.companyLogo} />
        </div>
        <div className={styles.band_title}>
          <h3>{loanDetail?.name}</h3>
        </div>
      </div>
      <div className={styles.LoanMiniCard_body}>
        <div className={styles.loan_detail}>
          <ProsList pros={loanDetail?.pros} pCount={4} />
          <LoanStats
            advertiseRate={loanDetail?.advertisedRate}
            comparisonRate={loanDetail?.comparisonRate}
          />
        </div>
        <div className={styles.action_container}>
          <GoToSite siteLink={loanDetail?.gotoSiteUrl} />
        </div>
      </div>
    </div>
  );
};

export default LoanMiniCard;
