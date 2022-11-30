import { notion, getId } from ".";

const updatePage = async (link: string) => {
  const blockId = await getId();
  const response = await notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        object: "block",
        paragraph: {
          rich_text: [
            {
              text: {
                // I think this can later change to ```document.title``` of the current page
                // But for now, it is the link entered into the form
                content: link,
                link: {
                  url: link,
                },
              },
            },
          ],
          color: "blue",
        },
      },
    ],
  });
  return response;
};
export default updatePage;
