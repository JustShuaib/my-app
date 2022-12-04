import Head from "next/head";
import { Page } from "../components";

const Home = () => {
  return (
    <>
      <Head>
        <title>Save to Notion</title>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Save links from directly to your notion"
        />
      </Head>
      <Page />
    </>
  );
};

export default Home;
