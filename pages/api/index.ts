import type { NextApiRequest, NextApiResponse } from "next";
import { createPage } from "./services";

export default async function handleRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await createPage();
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(200).json(JSON.stringify({ error: "Failed to create page" }));
  }
}
