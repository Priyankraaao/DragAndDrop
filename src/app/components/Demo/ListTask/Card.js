import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const Card = ({ card, deleteCard }) => {
    return (
      <div
        style={{
          userSelect: "none",
          padding: 16,
          margin: "0 0 8px 0",
          minHeight: "50px",
          backgroundColor: "white",
          borderRadius: "5px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          minWidth: 250,
          color: "grey",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {card.title}
  
        <button onClick={deleteCard} style={{ marginLeft: "10px" }}>
          Delete Card
        </button>
      </div>
    );
  };

  export default Card;
  