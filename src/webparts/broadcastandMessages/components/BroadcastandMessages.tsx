import * as React from "react";
import type { IBroadcastandMessagesProps } from "./IBroadcastandMessagesProps";
import { SPFI } from "@pnp/sp";
import { useEffect } from "react";
import { getSP } from "../../../pnpjsConfig";
import { FAQListItem, getFAQItems } from "../services/sp";
import styles from "./BroadcastandMessages.module.scss";
import { getCurrentUserGroups } from "../services/graph";

const Faq = (props: IBroadcastandMessagesProps) => {
  let _sp: SPFI = getSP(props.context);

  const [faqItems, setFaqItems] = React.useState<FAQListItem[]>([]);
  // const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  useEffect(() => {
    props.context.msGraphClientFactory.getClient("3").then(async (client) => {
      const groups = await getCurrentUserGroups(client);
      const faqItems = await getFAQItems(_sp);

      //also map pn-sweden to pn-se group names, for all the groups
      //filter out FAQItems that you shouldnt be able to see, based on graph thing

      setFaqItems(faqItems);
      console.log(groups);
    });
  }, []);

  // const toggleItem = (index: number) => {
  // setOpenIndex(openIndex === index ? null : index);
  // };

  return (
    <div className={styles["accordion-container"]}>
      {faqItems.map((faqItem, index) => (
        <FaqItem faqItem={faqItem} key={index} />
        // <div
        //   key={index}
        //   className={`${styles["accordion-tab"]} ${
        //     openIndex === index ? styles.active : ""
        //   }`}
        // >
        //   <div
        //     className={styles["accordion-header"]}
        //     onClick={() => toggleItem(index)}
        //   >
        //     <span>{faqItem.Title}</span>
        //     <span className={styles["accordion-icon"]}>
        //       {openIndex === index ? "▲" : "▼"}
        //     </span>
        //   </div>
        //   <div className={styles["accordion-content"]}>
        //     <p>{faqItem.Body}</p>
        //   </div>
        // </div>
      ))}
    </div>
  );
};

const FaqItem = (props: { faqItem: FAQListItem }) => {
  const { faqItem } = props;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div
      className={`${styles["accordion-tab"]} ${isOpen ? styles.active : ""}`}
    >
      <div
        className={styles["accordion-header"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles["accordion-title"]}>{faqItem.Title}</span>
        <span className={styles["accordion-icon"]}>{isOpen ? "▲" : "▼"}</span>
      </div>
      <div className={styles["accordion-content"]}>
        <p>{faqItem.Description}</p>
        <p>{faqItem.Author.EMail}</p>
      </div>
    </div>
  );
};

export default Faq;
