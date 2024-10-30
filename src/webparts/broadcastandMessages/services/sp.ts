import { SPFI } from "@pnp/sp";
import { Web } from "@pnp/sp/webs";

export interface FAQListItem {
  ID: string;
  Title: string;
  Category: string;
  // change to Additional_x0020_Contact_x0028_s when publishing
  Additional_x0020_Contact: {
    Title: string;
    ID: string;
    EMail: string;
  };
  Listplace: string;
  ITSM_x0020_number: string;
  To_x0020_Date: string;
  From_x0020_Date: string;
  Description: string;
  Targetgroup: string[] | undefined;
}

const SiteURL = "https://postnord.sharepoint.com/sites/pn-broadcast";
const ListName = "NSDTasksTest";

export const getFAQItems = async (sp: SPFI) => {
  //console.log("context", sp);

  const web = Web([sp.web, SiteURL]);

  const now = new Date().toISOString();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1); // Add leading zero if needed
    const day = (date.getDate() < 10 ? "0" : "") + date.getDate(); // Add leading zero if needed
    const hours = (date.getHours() < 10 ? "0" : "") + date.getHours(); // Add leading zero if needed
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(); // Add leading zero if needed

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  //Hello
  const items: FAQListItem[] = await web.lists
    .getByTitle(ListName)
    .items.filter(`To_x0020_Date ge datetime'${now}' and Listplace eq 'Open'`)
    .select(
      "ID",
      "Title",
      "Category",
      "Description",
      "Targetgroup",
      //change here to _Contact_x0028_s
      "Additional_x0020_Contact",
      //change here to _Contact_x0028_s/EMail
      "Additional_x0020_Contact/EMail",
      "ITSM_x0020_number",
      "To_x0020_Date",
      "From_x0020_Date",
      "Listplace"
    )
    //change here to _Contact_x0028_s
    .expand("Additional_x0020_Contact")();

  console.log(items);

  return items.map((item) => {
    return {
      ...item,
      From_x0020_Date: formatDate(item.From_x0020_Date),
      To_x0020_Date: formatDate(item.To_x0020_Date),
      Targetgroup: item.Targetgroup?.map((groupname) => {
        return groupname.toLocaleLowerCase();
      }),
    };
  });

  //console.log("FAQ items", items);
};
