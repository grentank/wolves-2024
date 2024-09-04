import React, { useState } from "react";

export default function AddNoteForm({ addNoteHandler }) {
  //   const [title, setTitle] = useState("");
  //   const [content, setContent] = useState("");
  const [formData, setFormData] = useState({ title: "", content: "" });
  const changeHandler = (event) =>
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  console.log(formData);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (formData.title.length < 5)
          return alert("Слишком короткое название");
        // addNoteHandler(title, content);
        // setTitle("");
        // setContent("");
        addNoteHandler(formData.title, formData.content);
        setFormData({ title: "", content: "" });
      }}
    >
      <div className="mb-3">
        <label htmlFor="note-name" className="form-label">
          Название заметки
        </label>
        <input
          type="text"
          value={formData.title}
          //   onChange={(event) => setTitle(event.target.value)}
          onChange={changeHandler}
          name="title"
          className={
            formData.title.length < 5
              ? "form-control is-invalid"
              : "form-control"
          }
          id="note-name"
          placeholder="название заметки"
        />
        <div id="validationServerUsernameFeedback" className="invalid-feedback">
          Название должно быть длиннее 5 символов
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="note-content" className="form-label">
          Текст заметки
        </label>
        <textarea
          value={formData.content}
          //   onChange={(event) => setContent(event.target.value)}
          onChange={changeHandler}
          name="content"
          className="form-control"
          id="note-content"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-3">
        <button className="btn btn-primary" type="submit">
          Добавить заметку
        </button>
      </div>
    </form>
  );
}
