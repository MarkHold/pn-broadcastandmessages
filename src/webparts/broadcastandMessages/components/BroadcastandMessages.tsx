import * as React from "react";
import type { IBroadcastandMessagesProps } from "./IBroadcastandMessagesProps";
import { SPFI } from "@pnp/sp";
import { useEffect, useRef } from "react";
import { getSP } from "../../../pnpjsConfig";
import { FAQListItem, getFAQItems } from "../services/sp";
import styles from "./BroadcastandMessages.module.scss";
import { getCurrentUserGroups } from "../services/graph";

const Faq = (props: IBroadcastandMessagesProps) => {
  let _sp: SPFI = getSP(props.context);

  const [faqItems, setFaqItems] = React.useState<FAQListItem[]>([]);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null); // Track the open accordion index

  useEffect(() => {
    props.context.msGraphClientFactory.getClient("3").then(async (client) => {
      const groups = await getCurrentUserGroups(client);
      const faqItems = await getFAQItems(_sp);

      setFaqItems(faqItems);
      console.log(groups);

      /*
        ok so for groups, I will start with the AD group then whats gonna be in SharePoint:

        PN-SE-SharePoint      :       Postnord Sweden

        PN-NO-SharePoint              Postnord Norway

        PN-DK-SharePoint              Postnord Denmark

        PN-FI-SharePoint              Postnord Finland

        PN-SF-SharePoint              Postnord Stral Fors

        PN-GR-SharePoint              Postnord Group Function

        PN-GLOBAL-SharePoint          All Employees at Postnord

      */
    });
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle between opening and closing
  };

  return (
    <div className={styles["accordion-container"]}>
      {/* Render the expanded accordion at the top if there is one */}
      {openIndex !== null && (
        <FaqItem
          faqItem={faqItems[openIndex]}
          key={openIndex}
          isOpen={true}
          onClick={() => toggleAccordion(openIndex)}
          isFullWidth={true}
        />
      )}

      {/* Render the rest of the accordions, except the expanded one */}
      {faqItems.map((faqItem, index) => {
        if (index === openIndex) return null; // Skip the expanded item here
        return (
          <FaqItem
            faqItem={faqItem}
            key={index}
            isOpen={false}
            onClick={() => toggleAccordion(index)}
            isFullWidth={false}
          />
        );
      })}
    </div>
  );
};

const FaqItem = (props: {
  faqItem: FAQListItem;
  isOpen: boolean;
  onClick: () => void;
  isFullWidth: boolean;
}) => {
  const { faqItem, isOpen, onClick, isFullWidth } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Expand the content
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      } else {
        // Collapse the content
        contentRef.current.style.height = "0px";
      }
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles["accordion-tab"]} ${
        isFullWidth ? styles.fullWidth : ""
      } ${isOpen ? styles.active : ""}`}
    >
      <div className={styles["accordion-header"]} onClick={onClick}>
        <span className={styles["accordion-title"]}>{faqItem.Title}</span>
        <span className={styles["accordion-icon"]}>{isOpen ? "▲" : "▼"}</span>
      </div>
      <div
        ref={contentRef}
        className={styles["accordion-content"]}
        style={{
          height: "0px",
          overflow: "hidden",
          transition: "height 0.5s ease-in-out",
        }}
      >
        <p>{faqItem.Description}</p>
        <p>
          <strong style={{ fontSize: "1.1em" }}>{"Contact Person: "}</strong>
          {faqItem.Author.EMail}
        </p>
      </div>
    </div>
  );
};

export default Faq;
