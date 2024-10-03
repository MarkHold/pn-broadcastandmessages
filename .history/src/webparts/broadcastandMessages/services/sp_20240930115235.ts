import { SPFI } from "@pnp/sp";

export const getFAQItems = async (sp: SPFI) => {
  console.log("context", sp);
  const items = await sp.web.lists
    .getByTitle("FAQ")
    .items.select("Title", "Letter", "Author/Title", "Body")
    .expand("Author")();

  console.log("FAQ items", items);
};
