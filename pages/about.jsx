import Layout from '../components/layout'
import Link from 'next/link'

export default function AboutPage( ) {
    return (
        <Layout pageTitle="About Us">
            <h1>Global CSS Art</h1>
            <h2>What is CSS Art?</h2>
            <p>CSS Art is a form of digital art that uses Cascading Style Sheets (CSS) to create beautiful and creative designs on the web. CSS Art can range from simple designs to complex and intricate illustrations, all created using only HTML and CSS.</p>
            <h2>About Global CSS Art</h2>
            <p>Global CSS Art is a community dedicated to bringing together CSS artists from all over the world to share their work, exchange ideas, and collaborate on new projects. Our community is open to all skill levels, from beginners to experts, and we welcome artists from all backgrounds and cultures.</p>
            <h2>How to Get Involved</h2>
            <p>Check out <a href="https://github.com/VulcanWM/global-css-art/blob/main/CONTRIBUTING.md">CONTRIBUTING.md on the GitHub Repo</a> to contribute!</p>
            <h2>What you get out of contributing</h2>
            <ul>
                <li>Your art gets featured on this website</li>
                <li>You get mentioned on the <Link href="/contributors">contributors page</Link></li>
                <li>You become part of an awesome open-source community</li>
            </ul>
            <p>We're excited to have you join our community of CSS artists and look forward to seeing your work!</p>
        </Layout>
    );
}