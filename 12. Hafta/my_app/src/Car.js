import styles from './my-style.module.css';
import './benim.scss' 

const Car = () => {
  return (
    <>
    <h1 className="paragraf">Arkaplan rengi sass ile geliyor</h1>
    <h1 className={styles.bigblue}>Hello Car!</h1>
    </>
);
}

export default Car;