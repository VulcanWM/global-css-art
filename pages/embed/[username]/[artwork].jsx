import Layout from '../../../components/layout'
import fsPromises from 'fs/promises';
import path from 'path'

export default function HomePage( {artworkCode, artwork}) {
    return (
        <Layout pageTitle={artwork}>
          <div dangerouslySetInnerHTML={{ __html: artworkCode }} />
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
        artworkCode,
        artwork
      },
    };
  }