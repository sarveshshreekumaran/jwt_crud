import React, { useEffect, useState } from "react";
import AddNote from "./AddNote";
import EditNote from "./EditNote";

function Notes({ jwt, setJwt, setForm }) {
  const api =
    process.env.REACT_APP_BACKEND_PRODUCTION_API ||
    process.env.REACT_APP_BACKEND_DEV_API;
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [edit, setEdit] = useState(null);
  useEffect(() => {
    async function getNotes() {
      const response = await fetch(`${api}/note`, {
        method: "get",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response;
    }
    getNotes().then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNotes(data);
        setNotesLoading(false);
      } else {
        //When token expired
        console.log(await response.json(), response.ok);
        localStorage.setItem("jwt", "undefined");
        setJwt(localStorage.getItem("jwt"));
        setForm(false);
      }
    });
  }, [jwt, setJwt, setForm, api]);

  const deleteNote = (id) => {
    async function deleteNote(id) {
      const response = await fetch(`${api}/note/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response;
    }
    deleteNote(id).then(async (response) => {
      if (response.ok) {
        const filteredNotes = notes.filter((note) => note._id !== id);
        setNotes([...filteredNotes]);
      } else {
        //When token expired
        console.log(await response.json(), response.ok);
        localStorage.setItem("jwt", "undefined");
        setJwt(localStorage.getItem("jwt"));
        setForm(false);
      }
    });
  };
  return (
    <>
      <main
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <section className="add_note">
          <AddNote jwt={jwt} setJwt={setJwt} setNotes={setNotes} />
        </section>
        <section style={{ overflow: "auto" }}>
          {notesLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="all_notes">
              {notes.length &&
                notes.map((note, index) => {
                  return (
                    <li key={note._id}>
                      {edit !== note._id ? (
                        <>
                          <div>
                            <h3>{note.title}</h3>
                            <p> {note.note}</p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                            }}
                          >
                            <button onClick={() => setEdit(note._id)}>
                              Edit Note
                            </button>
                            <button onClick={() => deleteNote(note._id)}>
                              Delete Note
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <EditNote
                            jwt={jwt}
                            setJwt={setJwt}
                            editNote={note}
                            notes={notes}
                            setNotes={setNotes}
                            setEdit={setEdit}
                            setForm={setForm}
                          />
                        </>
                      )}
                    </li>
                  );
                })}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

export default Notes;
