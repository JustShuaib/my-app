import style from "../styles/Links.module.css";
import { Link } from ".";

const Links = ({ data }: { data: Array<{ url: string }> }) => {
  return (
    <ol className={style.links}>
      {data?.map(({ url }, index: number) => (
        <Link key={index} url={url} />
      ))}
    </ol>
  );
};

export default Links;
