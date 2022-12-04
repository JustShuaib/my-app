const fetcher = (url: string) => fetch(url).then((res) => res.json());

const poster = (body: string) =>
  fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ link: body }),
  }).then((res) => res.json());

const isOffline = (data: any) =>
  typeof data === "object" &&
  data.error === "FetchError" &&
  Array.isArray(data) === false;

const isValidLink = (link: string) => {
  const regex = new RegExp(
    /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i
  );
  return regex.test(link);
};
export { fetcher, poster, isOffline, isValidLink };
