import { SPFI } from "@pnp/sp";

export interface FAQListItem {
  Title: string;
  Letter: string;
  Author: {
    Title: string;
    ID: string;
    EMail: string;
  };
  Body: string;
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