import Head from "next/head";
import { FormEvent, useState } from "react";
import axios from "axios";
import useSwr from "swr";

const Home = () => {
  const fetcher = (url: string) => axios(url).then((res) => res.data);
  const poster = () => axios.post("/api", { link }).then((res) => res.data);
  const { data, error, mutate } = useSwr<Array<{ url: string }>>(
    "/api",
    fetcher
  );

  const [link, setLink] = useState("");
  const makeRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (link.trim().length === 0) return;
    setLink("");

    try {
      const oldData = data ? data : [];
      mutate(poster, {
        optimisticData: [...oldData, { url: link }],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

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
      <main>
        <form onSubmit={makeRequest}>
          <div>
            <label htmlFor="link">Link</label>
            <input
              id="link"
              value={link}
              onChange={({ target }) => setLink(target.value)}
            />
          </div>
          <button type="submit">Add</button>
        </form>
        <section>
          <h2>Here are the links saved for you</h2>
          {error && <div>Failed to load links</div>}
          <ul>
            {data?.map(({ url }, index: number) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Home;
