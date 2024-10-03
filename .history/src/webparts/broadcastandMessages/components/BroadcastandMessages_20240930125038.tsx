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

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  //makes sure to start this when shit renders
  useEffect(() => {
    getFAQItems(_sp).then((value) => {
      setFaqItems(value);
    });
  }, []);

  return (
    <div className={styles["accordion-container"]}>
      {faqItems.map((faqItem) => {
        return (
          <div className={styles["accordion-tab"]}>
            <div className={styles["accordion-header"]}>
              <span>{faqItem.Title}</span>
              <span
                onClick={() => setIsOpen(!isOpen)}
                className={styles["accordion-icon"]}
              >
                {`Timo`}▼
              </span>
            </div>
            <div className={styles["accordion-content"]}>{faqItem.Body}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
