import { SPFI } from "@pnp/sp";

interface FAQListItem {
  Title: string;
  Letter: string;
  Author: {};
}

export const getFAQItems = async (sp: SPFI) => {
  console.log("context", sp);
  const items = await sp.web.lists
    .getByTitle("FAQ")
    .items.select(
      "ID",
      "Title",
      "Letter",
      "Author/Title",
      "Author/ID",
      "Author/EMail",
      "Body"
    )
    .expand("Author")();

  console.log("FAQ items", items);
};
