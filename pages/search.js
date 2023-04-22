import Layout from '../components/layout'
import Link from 'next/link'
import { global_art } from '../global_art';
import styles from '../styles/search.module.css'

export default function SearchPage( { search, search_result }) {
    return (
        <Layout pageTitle="Search">
          <center>
            <div class="homelink"><Link href="/">Home</Link></div>
            <h1>Search results for {search}</h1>
            {search_result.length == 0 ?
              <strong>No results found!</strong>
            : 
            <></>}
            <div className={styles.artworks}>
              {search_result.map((artid) => (
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

export async function getServerSideProps({ query }) {
    var { search } = query;
    search = search.toLowerCase();
    if (search == undefined){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    var search_result;
    if (search.split(" ").length == 1){
        search_result = global_art.filter(element => element.toLowerCase().includes(search));
    } else {
        const word_1 = search.split(" ")[0]
        const word_2 = search.split(" ")[1]
        const result_1 = global_art.filter(element => element.toLowerCase().includes(word_1));
        const result_2 = global_art.filter(element => element.toLowerCase().includes(word_2));
        search_result = result_1.filter(value => result_2.includes(value));
    }
    return {
        props: {
            search,
            search_result,
        },
    };
}