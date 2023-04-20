import Layout from '../../../components/layout'
import fsPromises from 'fs/promises';
import path from 'path'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
hljs.registerLanguage('xml', xml)

export default function HomePage( {username, artworkCode, artwork}) {
    const highlightedCode = hljs.highlight(artworkCode, { language: 'xml' }).value
    console.log(highlightedCode)
    return (
        <Layout pageTitle={artwork}>
          <h2>{artwork}</h2>
          <strong>By {username}</strong><br/>
          <iframe width="350" height="300" scrolling="no" srcDoc={artworkCode} style={{border: "none"}} title={artwork}></iframe>
          <pre>
            <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
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
        username,
        artworkCode,
        artwork,
      },
    };
  }
  