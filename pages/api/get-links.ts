import { notion, getId, formatResponse } from "./services";
import type { NextApiRequest, NextApiResponse } from "next";
const getLinks = async (req: NextApiRequest, res: NextApiResponse) => {
  const links = await fetchLinks();
  res.status(200).json(links);
};
export default getLinks;
const fetchLinks = async () => {
  try {
    const pageId = await getId();
    const { results } = await notion.blocks.children.list({
      block_id: pageId,
    });
    // @ts-ignore
    return results.length === 0 ? [] : formatResponse({ results });
  } catch (err) {
    console.error(err);
    return [];
  }
};
