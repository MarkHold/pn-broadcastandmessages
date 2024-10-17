import { SPFI } from "@pnp/sp";
import { Web } from "@pnp/sp/webs";

export interface FAQListItem {
  Title: string;
  Category: string;
  Additional_x0020_Contact_x0028_s: {
    Title: string;
    ID: string;
    EMail: string;
  };
  To_x0020_Date: string;
  Description: string;
  Targetgroup: string[] | undefined;
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
      "Description",
      "Targetgroup",
      "Additional_x0020_Contact_x0028_s",
      "Additional_x0020_Contact_x0028_s/EMail",
      "To_x0020_Date"
    )
    .expand("Additional_x0020_Contact_x0028_s")();

  console.log(items);

  return items.map((item) => {
    return {
      ...item,
      Targetgroup: item.Targetgroup?.map((groupname) => {
        return groupname.toLocaleLowerCase();
      }),
    };
  });

  //console.log("FAQ items", items);
};
