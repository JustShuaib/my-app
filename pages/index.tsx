import { FormEvent, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const makeRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim().length === 0) return;
    console.log("Input: ", input);
    setInput("");
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: input }),
    });
    const data = await response.json();
    console.log(data);
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
            <label htmlFor="input">Link</label>
            <input
              id="input"
              value={input}
              onChange={({ target }) => setInput(target.value)}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </main>
    </>
  );
};

export default Home;
