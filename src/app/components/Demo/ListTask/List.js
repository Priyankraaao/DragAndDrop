import   CardList from './CardList'
import React, { useState } from "react";

const List = ({ list, deleteList, addCard, deleteCard }) => {
    const [newCardTitle, setNewCardTitle] = useState("");
  
    const handleAddCard = () => {
      if (!newCardTitle) {
        alert("Please enter a title for the card.");
        return;
      }
  
      const newCard = {
        id: `card-${Date.now()}`,
        title: newCardTitle,
      };
      addCard(list.id, newCard);
      setNewCardTitle("");
    };
  
    return (
      <div style={{ margin: "0 20px", minWidth: "260px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" , paddingBottom:20}}>
          <h3 style={{  color:"#f3f3f3"}}>{list.title}</h3>
          <button style={{  padding:"4px 8px"}} onClick={() => deleteList(list.id)}>
            Delete List
          </button>
        </div>
        <CardList
          cards={list.cards}
          listId={list.id}
          deleteCard={deleteCard}
          setNewCardTitle={setNewCardTitle}
          newCardTitle={newCardTitle}
          handleAddCard={handleAddCard}
        />
      </div>
    );
  };
  export default List;