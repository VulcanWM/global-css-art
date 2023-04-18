import Layout from '../components/layout'
import Link from 'next/link'
import { global_art } from '../global_art';

export default function HomePage() {
    const random_art = global_art.sort((a, b) => 0.5 - Math.random());
    return (
        <Layout pageTitle="Home">
          <h1>Global CSS Art</h1>
          {random_art.map((artid, index) => (
            <>
             <Link href={'/art/' + artid}>{artid.split("/")[1]} by {artid.split("/")[0]}</Link><br/>
             <iframe width="400" height="300" scrolling="no" style={{border: "none"}} src={"/embed/" + artid} title={artid}></iframe><br/>
            </>
          ))}
        </Layout>
    );
}