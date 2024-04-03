import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";


const CardList = ({
  cards,
  listId,
  deleteCard,
  setNewCardTitle,
  newCardTitle = "",
  handleAddCard,
}) => {

  return (
    <>
      <Droppable droppableId={listId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: "#fefefe",
              padding: 10,
              minHeight: 200,
              borderRadius: "5px",
              border:"1px solid grey",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            {cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card card={card} deleteCard={() => deleteCard(card.id)} />
                  </div>
                )}
              </Draggable>
            ))}
            <div
              style={{
                display: "flex",
                alignItem: "center",
                justifyContent: "space-between",
              }}
            >
              <input
                type="text"
                placeholder="Enter card title"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
              />
              <button
                onClick={handleAddCard}
                style={{ background: "green", padding: "4px 8px" }}
              >
                Add Card
              </button>
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
};

export default CardList;
