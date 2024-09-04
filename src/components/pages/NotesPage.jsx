import React, { useState } from "react";
import NoteCard from "../ui/NoteCard";
import AddNoteForm from "../ui/AddNoteForm";

const initialNotes = [
  {
    id: 1,
    title: "Мой сон",
    content: "Сегодня мне снилось про цру в моём мозгу",
  },
  {
    id: 2,
    title: "Вкусный обед",
    content: "Приготовлю на обед вкусную пасту с песто",
  },
  {
    id: 3,
    title: "Спорт",
    content: "Сегодня я присел с 90кг на 8 повторений",
  },
  {
    id: 4,
    title: "Котики",
    content:
      "Скучаю по своим двум бывшим кошкам (Бенгалка и Курильский Бобтейл)",
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState(initialNotes);
  const addNoteHandler = (title, content) => {
    const newNote = { id: notes.length + 1, title, content };
    setNotes([...notes, newNote]);
  };
  const deleteNoteHandler = (noteId) => {
    const newNotes = notes.filter((note) => note.id !== noteId);
    setNotes(newNotes);
  };
  return (
    <>
      <div className="row">
        <div className="col-12">
          <AddNoteForm addNoteHandler={addNoteHandler} />
        </div>
      </div>
      <div className="row">
        {notes.map((note) => (
          <div key={note.id} className="col-12 mb-3">
            <NoteCard note={note} deleteNoteHandler={deleteNoteHandler} />
          </div>
        ))}
      </div>
    </>
  );
}
