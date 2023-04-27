import Layout from '../components/layout'
import Link from 'next/link'
const { Octokit } = require("@octokit/core");

export default function ContributorsPage( {req} ) {
    return (
        <Layout pageTitle="Contributors">
            <h1>Global CSS Art Contributors</h1>
            <h3>Contributors:</h3>
            <ul>
                {req.data.map((user, index) => (
                    <div key={index}>
                        <li><a target="_blank" href={"https://github.com/" + user.login}>{user.login}</a></li>
                    </div>
                ))}
            </ul>
        </Layout>
    );
}

export async function getStaticProps({ params }) {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
      })
      
      const req = await octokit.request('GET /repos/vulcanwm/global-css-art/contributors?per_page=100', {
        owner: 'vulcanwm',
        repo: 'global-css-art',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
  return {
    props: {
      req
    },
  };
}