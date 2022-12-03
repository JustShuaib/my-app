import Head from "next/head";
import { FormEvent, useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import useSwr from "swr";
import homeStyles from "../styles/Home.module.css";

const Home = () => {
  const fetcher = (url: string) => axios(url).then((res) => res.data);
  const poster = () => axios.post("/api", { link }).then((res) => res.data);
  const { data, error, mutate } = useSwr<
    Array<{ url: string }>,
    AxiosError<{ message: string }>
  >("/api", fetcher);

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
            Add
          </button>
        </form>
        {!data && !error && <p className={homeStyles.loading}>Loading...</p>}
        <section className={homeStyles.linksContainer}>
          {error && <div> {error.response?.data?.message}</div>}
          {data
            ? data?.length > 0 && (
                <h1 className={homeStyles.title}>
                  Here are the links saved for you
                </h1>
              )
            : ""}
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
