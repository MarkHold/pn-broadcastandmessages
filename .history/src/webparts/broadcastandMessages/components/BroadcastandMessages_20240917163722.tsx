import * as React from "react";
import styles from "./BroadcastandMessages.module.scss";
import type { IBroadcastandMessagesProps } from "./IBroadcastandMessagesProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default class BroadcastandMessages extends React.Component<
  IBroadcastandMessagesProps,
  {}
> {
  public render(): React.ReactElement<IBroadcastandMessagesProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <h1>hello</h1>;
  }
}
