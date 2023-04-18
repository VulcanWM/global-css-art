import Layout from '../../components/layout'
import Link from 'next/link'
import fsPromises from 'fs/promises';
import path from 'path'
const Filehound = require('filehound');

export default function HomePage( {username, objectData}) {
    var name;
    if (Object.keys(objectData).includes("Name")){
        name = objectData['Name']
    } else {
        name = username
    }
    return (
        <Layout pageTitle={username}>
          <h2>{name}'s CSS Art</h2>
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
        </Layout>
    );
}

export async function getStaticPaths() {

  const subdirectories = Filehound.create()
    .path("art")
    .directory()
    .findSync();
  console.log(subdirectories);
  const paths = [];
  subdirectories.forEach(function (file) {
      paths.push("/user/" + file.split("/")[1]);
  });
  console.log(paths)
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
    return {
      props: {
        username,
        objectData
      },
    };
  }
  