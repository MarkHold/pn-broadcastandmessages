import * as React from "react";
import type { IBroadcastandMessagesProps } from "./IBroadcastandMessagesProps";
import { SPFI } from "@pnp/sp";
import { useEffect } from "react";
import { getSP } from "../../../pnpjsConfig";

export default class BroadcastandMessages extends React.Component<
  IBroadcastandMessagesProps,
  {}
> {
  public render(): React.ReactElement<IBroadcastandMessagesProps> {
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName,
    // } = this.props;

    return <h1>hello</h1>;
  }
}

const Faq = (props: IBroadcastandMessagesProps) => {
  //const LOG_SOURCE = "FAQ Webpart";
  const LIST_NAME = "FAQ";
  let _sp: SPFI = getSP(props.context);

  // const [faqItems, setFaqItems] = React.useState<IFAQ[]>([]);

  const getFAQItems = async () => {
    console.log("context", _sp);

    const items = _sp.web.lists.getByTitle(LIST_NAME).items();

    console.log("FAQ items", items);
  };

  useEffect(() => {
    getFAQItems();
  }, []);

  return <h1>hello s</h1>;
};

export default Faq;
