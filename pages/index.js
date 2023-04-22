import Layout from '../components/layout'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import { global_art } from '../global_art';
import { useRouter } from 'next/router'

export default function HomePage( {random_art}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const router = useRouter()
  const onSubmit = (data) => {
    const search = data.search
    router.push("/search?search=" + search)
  };
    return (
        <Layout pageTitle="Home">
          <center>
            <h1>Global CSS Art</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("search", { required: true })} placeholder="search" type="text"/>
              <input type="submit" value="search"/>
            </form>
            <div className="artworks">
              {random_art.map((artid) => (
                <div className="artwork">
                <Link href={'/art/' + artid}>{artid.split("/")[1]}</Link> by <Link href={"/user/" + artid.split("/")[0]}>{artid.split("/")[0]}</Link><br/>
                <iframe width="350" height="300" scrolling="no" style={{border: "none"}} src={"/embed/" + artid} title={artid}></iframe><br/>
                </div>
              ))}
            </div>
            <strong>Artwork has finished! <a target="_blank" href="https://github.com/VulcanWM/global-css-art">Contribute</a> to add more!</strong>
          </center>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
  const random_art = global_art.sort((a, b) => 0.5 - Math.random());
  return {
    props: {
      random_art
    },
  };
}