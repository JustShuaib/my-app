import type { NextApiRequest, NextApiResponse } from "next";
import { createPage, updatePage } from "./services";
import { getId } from "./services";

export default async function handleRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { link } = req.body;
    const id = await getId();
    if (id) {
      const response = await updatePage(link);
      res.status(200).json(response);
    } else {
      const response = await createPage(link);
      res.status(200).json(response);
    }
  } else {
    res.status(404).json({ message: "Not Found" });
  }
}
