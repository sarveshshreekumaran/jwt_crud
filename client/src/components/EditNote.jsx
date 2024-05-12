import React, { useState } from "react";

function EditNote({ jwt, setJwt, editNote, setNotes, setEdit, setForm }) {
  const api =
    process.env.REACT_APP_BACKEND_PRODUCTION_API ||
    process.env.REACT_APP_BACKEND_DEV_API;
  const [editNoteForm, setEditNoteForm] = useState({
    title: editNote.title,
    note: editNote.note,
  });
  const { title, note } = editNoteForm;
  const onChange = (e) => {
    setEditNoteForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    async function updateNote(url, data) {
      const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
      });
      return response;
    }
    updateNote(`${api}/note/${editNote._id}`, editNoteForm).then(
      async (response) => {
        if (response.ok) {
          const data = await response.json();
          setNotes((prevState) => {
            const updatedNote = data.updatedNote;
            const index = prevState.findIndex(
              (note) => note._id === updatedNote._id
            );
            const updatedNotes = [...prevState];
            console.log(updatedNotes[index]);
            updatedNotes[index] = updatedNote;
            console.log(updatedNotes);
            return updatedNotes;
          });

          setEditNoteForm({ title: "", note: "" });
          setEdit(null);
        } else {
          //When token expired
          console.log(await response.json(), response.ok);
          localStorage.setItem("jwt", "undefined");
          setJwt(localStorage.getItem("jwt"));
          setForm(false);
        }
      }
    );
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "flex-end",
        }}
      >
        <label htmlFor="note">
          Title:
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Enter Title"
            onChange={onChange}
            required
          />
        </label>
        <label htmlFor="note">
          Note:
          <input
            type="text"
            id="note"
            name="note"
            value={note}
            placeholder="Enter note"
            onChange={onChange}
          />
        </label>
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <button onClick={() => setEdit(null)} type="reset">
            Cancel Update
          </button>
          <button type="submit">Update Note</button>
        </div>
      </form>
    </>
  );
}

export default EditNote;
