import style from "../styles/Links.module.css";

const Link = ({ url }: { url: string }) => {
  return (
    <li>
      <a className={style.link} href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
    </li>
  );
};

export default Link;
