import Layout from '../../../components/layout'
import fsPromises from 'fs/promises';
import path from 'path'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import styles from '../../../styles/artwork.module.css'
import React, { useState } from 'react';
import Link from 'next/link'
hljs.registerLanguage('xml', xml)

export default function HomePage( {username, artworkCode, artwork, url}) {
    const highlightedCode = hljs.highlight(artworkCode, { language: 'xml' }).value
    const [alertshow, setalertshow] = useState(false);
    function copyText(){
      navigator.clipboard.writeText(url)
      setalertshow(true)
    }
    const [codeShow, setCodeShow] = useState(false);
    function codeShowFunc(){
      if (codeShow){
        document.getElementById("showcodebtn").innerText = "Show source code"
        setCodeShow(false)
      } else {
        document.getElementById("showcodebtn").innerText = "Hide source code"
        setCodeShow(true)
      }
    }
    return (
        <Layout pageTitle={artwork}>
          <div class="homelink"><Link href="/">Home</Link></div>
          {alertshow ?
              <>
              <button className={styles.smallbutton} onClick={() => setalertshow(false)}>x</button>
              <strong className={styles.alert}>Artwork URL copied</strong>
              </>
            : 
          <></>}
          <div className={styles.header}>
            <h2 className={styles.title}>{artwork}</h2>
            <button className={styles.smallbutton} onClick={copyText}
>Copy artwork link</button>
          </div>
          <strong>By <Link href={"/user/" + username}>{username}</Link></strong><br/>
          <iframe width="350" height="300" scrolling="no" srcDoc={artworkCode} style={{border: "none"}} title={artwork}></iframe>
          <br/><button className={styles.smallbutton} onClick={codeShowFunc} id="showcodebtn">Show source code</button>
          {codeShow ?
              <pre>
                <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
              </pre>
            : 
          <></>}
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
  