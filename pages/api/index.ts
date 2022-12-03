import type { NextApiRequest, NextApiResponse } from "next";
import { createPage, updatePage, getId, getLinks } from "./services";

export default async function handleRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { link } = req.body;
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
    } catch (error) {
      try {
        const previousLink = await getLinks();
        res.status(200).json(previousLink);
      } catch (error) {
        res.status(200).json([]);
      }
    }
  } else if (req.method === "GET") {
    const links = await getLinks();
    if (links) {
      res.status(200).json(links);
    } else {
      res.status(400).json({ error: "No links saved yet" });
    }
  } else {
    res.status(404).json({ message: "Not Found" });
  }
}
