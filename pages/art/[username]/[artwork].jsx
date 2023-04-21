import Layout from '../../../components/layout'
import fsPromises from 'fs/promises';
import path from 'path'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import styles from '../../../styles/artwork.module.css'
import React, { useState } from 'react';
hljs.registerLanguage('xml', xml)

export default function HomePage( {username, artworkCode, artwork, url}) {
    const highlightedCode = hljs.highlight(artworkCode, { language: 'xml' }).value
    const [show, setShow] = useState(false);
    function copyText(){
      navigator.clipboard.writeText(url)
      setShow(true)
    }
    return (
        <Layout pageTitle={artwork}>
          {show ?
              <div className={styles.alert}>
              <button className={styles.closealert} onClick={() => setShow(false)}>x</button>
              <span>Artwork URL copied</span>
              </div>
            : 
          <span></span>}
          <div className={styles.header}>
            <h2 className={styles.title}>{artwork}</h2>
            <button onClick={copyText}
>Copy artwork link</button>
          </div>
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
    const url = `https://global-css-art.vercel.app/art/${username}/${artwork}`
    return {
      props: {
        username,
        artworkCode,
        artwork,
        url,
      },
    };
  }
  