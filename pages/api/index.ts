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
    try {
      const links = await getLinks();
      res.status(200).json(links);
    } catch (error: any) {
      let message = "Something went wrong";
      if (error?.message === "Invalid request URL.") {
        message = "No links saved yet.";
        res.status(500).json({ message });
      } else {
        message = "Looks like you are offline.";
        res.status(404).json({ message });
      }
    }
  } else {
    res.status(404).json({ message: "Not Found" });
  }
}
