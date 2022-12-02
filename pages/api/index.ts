import type { NextApiRequest, NextApiResponse } from "next";
import { createPage, updatePage, getId, getLinks } from "./services";
export default async function handleRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { link } = req.body;
    console.log("Server link: ", link);
    const id = await getId();
    if (id) {
      await updatePage(link);
      const links = await getLinks();
      res.status(201).json(links);
    } else {
      await createPage(link);
      const links = await getLinks();
      res.status(201).json(links);
    }
  } else if (req.method === "GET") {
    try {
      const links = await getLinks();
      res.status(200).json(links);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(404).json({ message: "Not Found" });
  }
}
