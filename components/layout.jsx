import Head from 'next/head';
import Link from "next/link";
import styles from "./layout.module.css";

export const siteTitle = "Global CSS Art";

export default function Layout({ pageTitle, navbar, children }) {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Global CSS Art"
        />
        <meta
          property="og:image"
          content="/logo.png"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content={siteTitle} />
        <meta name="robots" content="index, follow"/>
        <meta property="og:type" content="Website" />
        <meta name="google-site-verification" content="d3cd3FIDhsMDI3e_zwDnkg4GLGdu-cJu23VVpa-eC6o" />
        <title>{siteTitle} - {pageTitle}</title>
      </Head>
      {navbar != "none" ?
        <nav className={styles.mobilenav} id="navbar">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <a target="_blank" href="https://github.com/VulcanWM/global-css-art">GitHub Repo</a>
          <Link href="/contributors">Contributors</Link>
        </nav>
          : 
        <></>}
      <div className={styles.content}>
        <main>{children}</main>
      </div>
    </div>
  );
}
