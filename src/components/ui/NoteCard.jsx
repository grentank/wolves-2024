import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NoteCard({ note, deleteNoteHandler }) {
  const [show, setShow] = useState(false);
  return (
    <div className="card">
      <div className="card-header">Заметка {note.id}</div>
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <button
          onClick={() => setShow((prev) => !prev)}
          className="btn btn-secondary"
        >
          {show ? "Скрыть" : "Показать"} текст
        </button>
        {show && <p className="card-text">{note.content}</p>}
        <Link to={`/notes/${note.id}`} className="btn btn-secondary">
          Подробнее
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => deleteNoteHandler(note.id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
