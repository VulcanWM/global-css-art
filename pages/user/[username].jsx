import Layout from '../../components/layout'
import Link from 'next/link'
import { readdir } from 'fs/promises';
import fsPromises from 'fs/promises';
import path from 'path'

export default function HomePage( {username, objectData}) {
    console.log(objectData)
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
        </Layout>
    );
}

export async function getStaticPaths() {
    const directoryPath = path.join(process.cwd(), 'users/');
    const paths = [];
    const files = await readdir(directoryPath);
    files.forEach(function (file) {
        paths.push("/user/" + file.substring(0, file.indexOf(".")));
    });
    return {
      paths,
      fallback: false,
    };
  }
  
  export async function getStaticProps({ params }) {
    const username = params.username;
    const filePath = path.join(process.cwd(), `users/${username}.json`);
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    return {
      props: {
        username,
        objectData
      },
    };
  }
  