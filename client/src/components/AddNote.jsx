import React, { useState } from "react";

function AddNote({ jwt, setJwt, setNotes }) {
  const api =
    process.env.REACT_APP_BACKEND_PRODUCTION_API ||
    process.env.REACT_APP_BACKEND_DEV_API;
  const [addNoteForm, setAddNoteForm] = useState({ title: "", note: "" });
  const { title, note } = addNoteForm;
  const onChange = (e) => {
    setAddNoteForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    async function addNote(url, data) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
      });
      return response;
    }
    addNote(`${api}/note/`, addNoteForm).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNotes((prevState) => [...prevState, data.newNote]);
        setAddNoteForm({ title: "", note: "" });
      } else {
        console.log(await response.json(), response.ok);
        localStorage.setItem("jwt", "undefined");
        setJwt(localStorage.getItem("jwt"));
        //JWT refresh token, re-login logic
      }
    });
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
            required
          />
        </label>
        <button type="submit">Add Note</button>
      </form>
    </>
  );
}

export default AddNote;
