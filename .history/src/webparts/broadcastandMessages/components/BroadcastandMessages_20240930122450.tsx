import * as React from "react";
import type { IBroadcastandMessagesProps } from "./IBroadcastandMessagesProps";
import { SPFI } from "@pnp/sp";
import { useEffect } from "react";
import { getSP } from "../../../pnpjsConfig";
import { FAQListItem, getFAQItems } from "../services/sp";

//interface IFAQ {
//Title: string;
//Answer: string;
//}

const Faq = (props: IBroadcastandMessagesProps) => {
  // const LOG_SOURCE = "FAQ Webpart";
  // const LIST_NAME = "FAQ";
  let _sp: SPFI = getSP(props.context);

  const [faqItems, setFaqItems] = React.useState<FAQListItem[]>([]);
  console.log(faqItems);
  //makes sure to start this when shit renders
  useEffect(() => {
    getFAQItems(_sp).then((value) => {
      setFaqItems(value);
    });
  }, []);

  return (
    <div className="accordion-container">
      <div className="accordion-tab">
        <div className="accordion-header">
          <span className="accordion-title">Markus loves pizza</span>
          <span className="accordion-icon">▼</span>
        </div>
        <div className="accordion-content">
          Markus loves eating pizza all the time because it's nice
        </div>
      </div>
      <div className="accordion-tab">
        <div className="accordion-header">
          <span className="accordion-title">Rasmus loves burgers</span>
          <span className="accordion-icon">▼</span>
        </div>
        <div className="accordion-content">
          Rasmus makes burgers all the time
        </div>
      </div>
    </div>
  );
};

export default Faq;
