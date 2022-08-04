import styles from './GoToSite.module.css'
const GoToSite = ({ siteLink }) => {
  return <a target={'_blank'} className={styles.GoToSite} href={siteLink}>🌐 Visit Site</a>;
};

export default GoToSite;
