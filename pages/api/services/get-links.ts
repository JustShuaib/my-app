import { notion, getId, formatResponse } from ".";

const getLinks = async () => {
  const pageId = await getId();
  const { results } = await notion.blocks.children.list({
    block_id: pageId,
  });
  // @ts-ignore
  const links = results.length === 0 ? [] : formatResponse({ results });
  return links;
};
export default getLinks;
