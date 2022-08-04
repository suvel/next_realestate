import styles from './GoToSite.module.css'
const GoToSite = ({ siteLink }) => {
  return <a className={styles.GoToSite} href={siteLink}>🌐 Visit Site</a>;
};

export default GoToSite;
