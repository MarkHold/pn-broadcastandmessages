import * as React from "react";
import type { IBroadcastandMessagesProps } from "./IBroadcastandMessagesProps";
import { SPFI } from "@pnp/sp";
import { useEffect } from "react";
import { getSP } from "../../../pnpjsConfig";
import { FAQListItem, getFAQItems } from "../services/sp";
import styles from "./BroadcastandMessages.module.scss";
const Faq = (props: IBroadcastandMessagesProps) => {
  let _sp: SPFI = getSP(props.context);

  const [faqItems, setFaqItems] = React.useState<FAQListItem[]>([]);

  // State to track which item is open
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  // Makes sure to start this when the component renders
  useEffect(() => {
    getFAQItems(_sp).then((value) => {
      setFaqItems(value);
    });
  }, []);

  // Function to toggle open/close state of an item
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles["accordion-container"]}>
      {faqItems.map((faqItem, index) => (
        <div key={index} className={styles["accordion-tab"]}>
          <div className={styles["accordion-header"]}>
            <span>{faqItem.Title}</span>
            <span
              onClick={() => toggleItem(index)}
              className={styles["accordion-icon"]}
            >
              {`${openIndex === index ? "▲" : "▼"}`}
            </span>
          </div>
          <div
            className={`${styles["accordion-content"]} ${
              openIndex === index ? styles.active : ""
            }`}
          >
            {openIndex === index && <p>{faqItem.Body}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
