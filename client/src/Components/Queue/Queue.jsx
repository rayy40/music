import React, { useContext } from "react";
import { SongContext } from "../SongContext/SongContext";
import QueueList from "./QueueList";

const Queue = () => {
  const { isQueueVisible, setQueue } = useContext(SongContext);

  return (
    <div
      className={`queue-container ${
        isQueueVisible && "queue-container--active"
      }`}
    >
      <div className="queue-container__inner">
        <div className="queue-container__header">
          <h3>Up Next</h3>
          <span onClick={() => setQueue([])}>Clear all</span>
        </div>
        <div className="queue-container__body">
          <QueueList />
        </div>
      </div>
    </div>
  );
};

export default Queue;
