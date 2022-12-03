import Head from "next/head";
import { FormEvent, useState, useEffect } from "react";
import useSwr from "swr";
import Offline from "../components/Offline";
import homeStyles from "../styles/Home.module.css";

const Home = () => {
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    setIsOnline(navigator.onLine);
  }, []);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const poster = () =>
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link }),
    }).then((res) => res.json());
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
  if (!isOnline) return <Offline />;

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
      <main className={homeStyles.main}>
        <form className={homeStyles.form} onSubmit={makeRequest}>
          <div className={homeStyles.inputContainer}>
            <label className={homeStyles.label} htmlFor="link">
              Link
            </label>
            <input
              id="link"
              className={homeStyles.input}
              placeholder="https://example.com"
              value={link}
              onChange={({ target }) => setLink(target.value)}
            />
          </div>
          <button className={homeStyles.btn} type="submit">
            Add to Notion
          </button>
        </form>
        {!data && !error && <p className={homeStyles.loading}>Loading... ⌛</p>}
        <section className={homeStyles.linksContainer}>
          {error && (
            <div className={homeStyles.emptyLink}>No links saved yet... 🛒</div>
          )}
          {data && (
            <h1 className={homeStyles.title}>
              Here are the links saved for you
            </h1>
          )}
          <ol className={homeStyles.links}>
            {data?.map(({ url }, index: number) => (
              <li key={index}>
                <a
                  className={homeStyles.link}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {url}
                </a>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
};

export default Home;
