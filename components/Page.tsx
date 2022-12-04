import { FormEvent, useState } from "react";
import useSwr from "swr";
import { Empty, Links, Offline } from ".";
import homeStyles from "../styles/Home.module.css";
import { fetcher, poster, isValidLink, isOffline } from "../utils";

const Page = () => {
  const { data, error, mutate } = useSwr("/api", fetcher);
  const [link, setLink] = useState("");
  const [errorText, setErrorText] = useState("");

  const makeRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidLink(link)) {
      setErrorText("Please enter a valid link");
      return;
    }

    setLink("");
    setErrorText("");
    try {
      const oldData = Array.isArray(data) ? data : [];
      mutate(async () => poster(link), {
        optimisticData: [...oldData, { url: link }],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  if (isOffline(data)) return <Offline />;

  return (
    <main className={homeStyles.main}>
      <form className={homeStyles.form} onSubmit={makeRequest}>
        <div className={homeStyles.inputContainer}>
          <label className={homeStyles.label} htmlFor="link">
            Link
          </label>
          <div className={homeStyles.textContainer}>
            <input
              aria-invalid={Boolean(errorText.length > 0)}
              id="link"
              className={homeStyles.input}
              placeholder="https://example.com"
              value={link}
              onChange={({ target }) => setLink(target.value)}
            />
            {errorText && <p className={homeStyles.error}>{errorText}</p>}
          </div>
        </div>
        <button className={homeStyles.btn} type="submit">
          Add to Notion
        </button>
      </form>
      {!data && !error && <p className={homeStyles.loading}>Loading... ⌛</p>}
      <section className={homeStyles.linksContainer}>
        {error && (
          <div className={homeStyles.emptyLink}>Something went wrong 🚩</div>
        )}

        {data ? (
          Array.isArray(data) ? (
            <>
              <h1 className={homeStyles.title}>
                Here are the links saved for you
              </h1>
              <Links data={data} />
            </>
          ) : (
            <Empty />
          )
        ) : (
          ""
        )}
      </section>
    </main>
  );
};

export default Page;
