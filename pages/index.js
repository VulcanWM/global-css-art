import Layout from '../components/layout'
import Link from 'next/link'
import { global_art } from '../global_art';

export default function HomePage( {random_art}) {
    return (
        <Layout pageTitle="Home">
          <h1>Global CSS Art</h1>
          {random_art.map((artid) => (
            <>
             <Link href={'/art/' + artid}>{artid.split("/")[1]}</Link> by <Link href={"/user/" + artid.split("/")[0]}>{artid.split("/")[0]}</Link><br/>
             <iframe width="400" height="300" scrolling="no" style={{border: "none"}} src={"/embed/" + artid} title={artid}></iframe><br/>
            </>
          ))}
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