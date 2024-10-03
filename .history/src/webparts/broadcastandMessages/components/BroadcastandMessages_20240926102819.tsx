import * as React from "react";
import type { IBroadcastandMessagesProps } from "./IBroadcastandMessagesProps";
import { SPFI } from "@pnp/sp";
import { useEffect } from "react";
import { getSP } from "../../../pnpjsConfig";

interface IFAQ {
  Title: string;
  Answer: string;
}

const Faq = (props: IBroadcastandMessagesProps) => {
  // const LOG_SOURCE = "FAQ Webpart";
  // const LIST_NAME = "FAQ";
  let _sp: SPFI = getSP(props.context);

  /// const [faqItems, setFaqItems] = React.useState<IFAQ[]>([]);

  const getFAQItems = async () => {
    console.log("context", _sp);
    const items = await _sp.web.lists
      .getByTitle("FAQ")
      .items.select("Title", "Letter", "Author/Title", "Body")
      .expand("Author")();

    console.log("FAQ items", items);
  };

  useEffect(() => {
    getFAQItems();
  }, []);

  return <h1>hello s</h1>;
};

export default Faq;
