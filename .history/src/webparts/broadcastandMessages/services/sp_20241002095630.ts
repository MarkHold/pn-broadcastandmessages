import { SPFI } from "@pnp/sp";

export interface FAQListItem {
  Title: string;
  Category: string;
  Author: {
    Title: string;
    ID: string;
    EMail: string;
  };
  Description: string;
}

export const getFAQItems = async (sp: SPFI) => {
  //console.log("context", sp);
  const items: FAQListItem[] = await sp.web.lists
    .getByTitle("NSDTasks")
    .items.select(
      "ID",
      "Title",
      "Category",
      "Author/Title",
      "Author/ID",
      "Author/EMail",
      "Desription"
    )
    .expand("Author")();

  return items;

  //console.log("FAQ items", items);
};
