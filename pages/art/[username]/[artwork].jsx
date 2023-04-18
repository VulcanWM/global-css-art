import Layout from '../../../components/layout'
import fsPromises from 'fs/promises';
import path from 'path'

export default function HomePage( {username, artworkCode, artwork}) {
    return (
        <Layout pageTitle={artworkCode}>
          <iframe scrolling="no" srcdoc={artworkCode} title="W3Schools Free Online Web Tutorials"></iframe>
        </Layout>
    );
}
  
  export async function getServerSideProps({ params }) {
    const username = params.username;
    const artwork = params.artwork
    const filePath = path.join(process.cwd(), `art/${username}/${artwork}.html`);
    var artworkCode;
    try{
       artworkCode = await (await fsPromises.readFile(filePath)).toString()
       console.log(artworkCode)
    } catch {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
      props: {
        username,
        artworkCode,
        artwork,
      },
    };
  }
  