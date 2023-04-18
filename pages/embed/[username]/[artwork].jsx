import Layout from '../../../components/layout'
import fsPromises from 'fs/promises';
import path from 'path'
// const Filehound = require('filehound');

export default function HomePage( {artworkCode}) {
    return (
        <Layout pageTitle={artworkCode}>
          <div dangerouslySetInnerHTML={{ __html: artworkCode }} />
        </Layout>
    );
}

// export async function getStaticPaths() {

//   const subdirectories = Filehound.create()
//     .path("art")
//     .directory()
//     .findSync();
//   console.log(subdirectories);
//   const paths = [];
//   subdirectories.forEach(function (file) {
//       paths.push("/user/" + file.split("/")[1]);
//   });
//   console.log(paths)
//   return {
//     paths,
//     fallback: false,
//   };
// }
  
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
        artworkCode
      },
    };
  }
  