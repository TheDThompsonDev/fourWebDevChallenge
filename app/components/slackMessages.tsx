"use client";
import React, { useEffect } from "react";

type props = {
  clickCount: number;
  slackMessages: any[];
  setShowSlackPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const SlackMessages: React.FC<props> = ({
  clickCount,
  slackMessages,
  setShowSlackPopup,
}) => {
  useEffect(() => {
    if (slackMessages && slackMessages.length > 0 && clickCount >= 1) {
      setShowSlackPopup(true);
      setTimeout(() => setShowSlackPopup(false), 3000);
    }
  }, [clickCount, slackMessages]);

  return (
    <div className="slack-notification">
      <div className="slack-icon">
        <img
          src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
          alt="Slack Icon"
        />
      </div>
      <div className="slack-content">
        <p className="slack-title">
          New message from{" "}
          <strong>{slackMessages[clickCount - 1]?.slackMessageUserName}</strong>
        </p>
        <div className="slack-message">
          <p>
            <strong>Replies:</strong>{" "}
            {slackMessages[clickCount - 1]?.slackUserMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
export default SlackMessages;
