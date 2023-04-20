import Layout from '../components/layout'
import Link from 'next/link'
import { global_art } from '../global_art';
import styles from '../styles/home.module.css'

export default function HomePage( {random_art}) {
    return (
        <Layout pageTitle="Home">
          <center>
            <h1>Global CSS Art</h1>
            <div className={styles.artworks}>
              {random_art.map((artid) => (
                <div className={styles.artwork}>
                <Link href={'/art/' + artid}>{artid.split("/")[1]}</Link> by <Link href={"/user/" + artid.split("/")[0]}>{artid.split("/")[0]}</Link><br/>
                <iframe width="350" height="300" scrolling="no" style={{border: "none"}} src={"/embed/" + artid} title={artid}></iframe><br/>
                </div>
              ))}
            </div>
          </center>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
  const random_art = global_art.sort((a, b) => 0.5 - Math.random());
  return {
    props: {
      random_art
    },
  };
}