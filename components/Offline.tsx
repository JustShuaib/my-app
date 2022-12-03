import styles from "../styles/Home.module.css";

const Offline = () => {
  return (
    <div className={styles.offline}>
      Looks like you are offline 😞
      <button
        type="button"
        className={styles.retryBtn}
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );
};

export default Offline;
