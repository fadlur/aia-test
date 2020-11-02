import { useRouter } from 'next/router';
import Head from 'next/head';

const Meta = (props) => {
  const { title, metaDescription, metaImage="/logo.png"} = props;
  const router = useRouter();
  return (
    <Head>
        <meta 
          name="viewport" 
          content="initial-scale=1.0, width=device-width" />
        <meta
          charSet="utf-8" />
        <meta 
          name="description"
          key="description"
          content={metaDescription}
          />
          {/* open graph */}
        <meta
          property="og:title"
          key="og:title"
          content={`${title}`}
          />
        <meta
          property="og:locale"
          key="og:locale"
          content="id_ID"
          />
        <meta
          property="og:url"
          key="og:url"
          content={`${process.env.BASE_URL}${router.asPath}`}
          />
        <meta
          property="og:type"
          key="og:type"
          content="website"
          />
        <meta
          property="og:description"
          key="og:description"
          content={metaDescription}
          />
        <meta
          property="og:image"
          key="og:image"
          content={metaImage}
          />
        <link rel="canonical" href={`${process.env.BASE_URL}${router.asPath}`} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
        {/* <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet" /> */}
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
        <title>{`${title}`}</title>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_UA}`} />        
      </Head>
  )
}

export default Meta;