import { SPFI } from "@pnp/sp";
import { Web } from "@pnp/sp/webs";

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

  const web = Web([
    sp.web,
    "https://postnord.sharepoint.com/sites/pn-broadcast",
  ]);

  const items: FAQListItem[] = await web.lists
    .getByTitle("NSDTasks")
    .items.select(
      "ID",
      "Title",
      "Category",
      "Author/Title",
      "Author/ID",
      "Author/EMail",
      "Description"
    )
    .expand("Author")();

  return items;

  //console.log("FAQ items", items);
};
