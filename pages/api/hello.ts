// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  age: number;
  id: string;
  secret: string;
};

const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID as string;
const secret = process.env.NEXT_PUBLIC_NOTION_KEY as string;
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe", age: 23, id: databaseId, secret });
}
