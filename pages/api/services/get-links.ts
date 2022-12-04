import type { APIResponseError } from "@notionhq/client/build/src/errors";
import type { FetchError } from "node-fetch";
import { notion, getId, formatResponse } from ".";

const getLinks = async () => {
  try {
    const pageId = await getId();
    const { results } = await notion.blocks.children.list({
      block_id: pageId,
    });
    // @ts-ignore
    const links = results.length === 0 ? [] : formatResponse({ results });
    return links;
  } catch (error) {
    const err = error as APIResponseError | FetchError;
    return { error: err.name };
  }
};
export default getLinks;
