import { notion } from ".";
const getId = async () => {
  const { results } = await notion.search({
    query: "____links____",
    sort: {
      direction: "ascending",
      timestamp: "last_edited_time",
    },
  });
  return results.length !== 0 ? results[0].id : "";
};
export default getId;
