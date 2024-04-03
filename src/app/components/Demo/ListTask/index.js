"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";

function ListTaskContainer() {
  const [lists, setLists] = useState([
    { id: 1, title: "By Default List", cards: [] },
  ]);
  const [listTitle, setListTitle] = useState("");

  const addListSection = (listTitle) => {
    const newList = {
      id: `list-${lists.length + 1}`,
      title: listTitle,
      cards: [],
    };
    setLists([...lists, newList]);
  };

  const addCard = (listId, newCard) => {
    setLists(
      lists.map((list) => {
        return list.id === listId
          ? { ...list, cards: [...list.cards, newCard] }
          : list;
      })
    );
  };

  const deleteList = (listId) => {
    setLists(
      lists.filter((list) => {
        return list.id !== listId;
      })
    );
  };

  const deleteCard = (cardId) => {
    setLists(
      lists.map((list) => ({
        ...list,
        cards: list.cards.filter((card) => {
          return card.id !== cardId;
        }),
      }))
    );
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const list = lists.find((list) => list.id === source.droppableId);
      const newCards = [...list.cards];

      const [removed] = newCards.splice(source.index, 1);

      console.log("removed",removed);

      newCards.splice(destination.index, 0, removed);
      setLists(
        lists.map((list) =>
          list.id === source.droppableId ? { ...list, cards: newCards } : list
        )
      );
    } else {
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destinationList = lists.find((list) => list.id === destination.droppableId);

      const destCards = [...destinationList.cards];
      
      const removed = sourceList.cards.find((card, index) => index === source.index);
      
      const sourceCards = sourceList.cards.filter((card, index) => index !== source.index);
      
      destCards.splice(destination.index, 0, removed);

      setLists(
        lists.map((list) => {
          if (list.id === source.droppableId) {
            return { ...list, cards: sourceCards };
          } else if (list.id === destination.droppableId) {
            return { ...list, cards: destCards };
          }
          return list;
        })
      );
    }
  };

  return (
    <div style={{ background: "#579DFF", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          paddingTop: 20,
        }}
      >
        <input
          type="text"
          placeholder="Enter Section title"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          style={{
            borderRadius:12,
            background:"#fff",
            color:"#000"
          }}
        />
        <button
          onClick={() => addListSection(listTitle)}
          style={{ padding: "16px", borderRadius: 12 }}
        >
          Add Section
        </button>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {lists.map((list) => (
              <div
                key={list.id}
                style={{
                  background: "#1D2125",
                  padding: "16px 4px 16px 4px",
                  borderRadius: 16,
                }}
              >
                <List
                  list={list}
                  deleteList={deleteList}
                  addCard={addCard}
                  deleteCard={deleteCard}
                />
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default ListTaskContainer;
