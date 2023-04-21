import Layout from '../../components/layout'
import Link from 'next/link'
import fsPromises from 'fs/promises';
import path from 'path'
import styles from '../../styles/user.module.css'
const Filehound = require('filehound');

export default function HomePage( {username, objectData, allArt}) {
    var name;
    if (Object.keys(objectData).includes("Name")){
        name = objectData['Name']
    } else {
        name = username;
    }
    return (
        <Layout pageTitle={username}>
          <center>
            <img src={objectData['Image']} style={{borderRadius: "50%", width: "75px", height: "75px"}}></img><br/>
            <span>{name}</span><br/>
            {Object.keys(objectData).includes("Website") ?
              <><a href={objectData['Website']}>Website</a><br/></>
            : 
            <span></span>}
            {Object.keys(objectData).includes("GitHub") ?
              <><a href={objectData['GitHub']}>GitHub</a><br/></>
            : 
            <span></span>}
            {Object.keys(objectData).includes("Twitter") ?
              <><a href={objectData['Twitter']}>Twitter</a><br/></>
            : 
            <span></span>}
            <h2>{name}'s CSS Art</h2>
            <div className={styles.artworks}>
              {allArt.map((artid) => (
                <div className={styles.artwork}>
                <Link href={'/art/' + username + "/" + artid}>{artid}</Link><br/>
                <iframe width="350" height="300" scrolling="no" style={{border: "none"}} src={"/embed/" + username + "/" + artid} title={artid}></iframe><br/>
                </div>
              ))}
            </div>
          </center>
        </Layout>
    );
}

export async function getStaticPaths() {
  const subdirectories = Filehound.create()
    .path("art")
    .directory()
    .findSync();
  const paths = [];
  subdirectories.forEach(function (file) {
      paths.push("/user/" + file.split("/")[1]);
  });
  return {
    paths,
    fallback: false,
  };
}
  
  export async function getStaticProps({ params }) {
    const username = params.username;
    const filePath = path.join(process.cwd(), `art/${username}/userinfo.json`);
    var objectData;
    try{
      const jsonData = await fsPromises.readFile(filePath);
      objectData = JSON.parse(jsonData);
    } catch {
      objectData = {}
    }
    const files = Filehound.create()
      .paths('art/' + username)
      .ext('html')
      .findSync();
    const allArt = []
    files.forEach(function (file) {
        allArt.push(file.split("/")[2].replace(".html", ""));
    });
    return {
      props: {
        username,
        objectData,
        allArt
      },
    };
  }
  