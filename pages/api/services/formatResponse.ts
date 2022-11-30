interface ResponseShape {
  results: {
    paragraph: {
      rich_text: {
        plain_text: string;
      }[];
    };
  }[];
}
const formatResponse = (response: ResponseShape) => {
  const links = response.results.slice(1).map((result) => {
    const { paragraph } = result;
    const url = paragraph.rich_text[0].plain_text;
    return { url };
  });
  return links;
};
export default formatResponse;
