import * as React from "react";
import type { IBroadcastandMessagesProps } from "./IBroadcastandMessagesProps";
import { SPFI } from "@pnp/sp";
import { useEffect } from "react";
import { getSP } from "../../../pnpjsConfig";
import { getFAQItems } from "../services/sp";

//interface IFAQ {
//Title: string;
//Answer: string;
//}

const Faq = (props: IBroadcastandMessagesProps) => {
  // const LOG_SOURCE = "FAQ Webpart";
  // const LIST_NAME = "FAQ";
  let _sp: SPFI = getSP(props.context);

  /// const [faqItems, setFaqItems] = React.useState<IFAQ[]>([]);

  //makes sure to start this when shit renders
  useEffect(() => {
    getFAQItems(_sp).then((value) => {
      console.log(value);
    });
  }, []);

  return <h1>hello s</h1>;
};

export default Faq;
