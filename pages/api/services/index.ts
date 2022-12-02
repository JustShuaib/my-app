import { Client } from "@notionhq/client";
const apiKey = process.env.NEXT_PUBLIC_NOTION_KEY as string;
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID as string;
export const notion = new Client({ auth: apiKey });

export { default as createPage } from "./createPage";
export { default as updatePage } from "./updatePage";
export { default as getId } from "./getId";
export { default as formatResponse } from "./formatResponse";
export { default as getLinks } from "./get-links";
