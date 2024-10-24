"use client";

import React, { useState, useEffect, useRef } from "react";
import "./globals.css";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import ProductHomePage from "./components/productHomePage";
import VimInterface from "./components/vimInterface";
import SlackMessages from "./components/slackMessages";

const App: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showSlackPopup, setShowSlackPopup] = useState(false);
  const slackMessages = useQuery(api.slackMessages.get);

  const handlePageClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (
      slackMessages &&
      slackMessages.length > 0 &&
      clickCount >= 1 &&
      clickCount < 4
    ) {
      setShowSlackPopup(true);
      setTimeout(() => setShowSlackPopup(false), 3000);
    } else if (clickCount > 4) {
      document.body.classList.add("vim-theme");
      setShowSlackPopup(false);
    }
  }, [clickCount, slackMessages]);

  return (
    <div
      onClick={handlePageClick}
      className={clickCount >= 5 ? "vim-container" : "halloween-container"}
    >
      {/* Halloween Store View */}
      {clickCount < 5 && <ProductHomePage />}

      {showSlackPopup && slackMessages && (
        <SlackMessages
          clickCount={clickCount}
          slackMessages={slackMessages}
          setShowSlackPopup={setShowSlackPopup}
        />
      )}

      {clickCount >= 5 && <VimInterface clickCount={clickCount} />}
    </div>
  );
};
export default App;
