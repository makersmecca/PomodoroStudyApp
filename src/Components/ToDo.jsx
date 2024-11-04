import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../auth/firebaseAuth";
import { useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebaseAuth";
import NavLinks from "./NavLinks";

const ToDo = () => {
  getAuth();
  const [userId, setUserId] = useState("");
  const [userStatus, setUserStatus] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [idLoading, setIsLoading] = useState(true);
  // Add new states for editing
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserStatus(true);
        console.log("User is signed in:", user.email);
        setUserId(user.email);
        fetchData();
      } else {
        console.log("User is signed out");
        setUserStatus(false);
        setUserId("");
      }
    });
  }, [userStatus]);

  const fetchData = async () => {
    if (userId.length === 0) return;

    setIsLoading(true);
    try {
      const docRef = doc(db, "todos", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const todoArray = Object.entries(data).map(([task, completed]) => ({
          task,
          completed,
        }));
        setTodos(todoArray);
        console.log("data from db", todoArray);
      } else {
        console.log("nopes");
      }
    } catch (err) {
      console.log("Error fetching todos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const updateFirestore = async (updatedTodos, userId) => {
    try {
      const firestoreData = updatedTodos.reduce((acc, todo) => {
        acc[todo.task] = todo.completed;
        return acc;
      }, {});

      await setDoc(doc(db, "todos", userId), firestoreData);
    } catch (err) {
      console.log("Error updating Firestore:", err);
      throw err;
    }
  };

  const handleAddTask = async () => {
    if (inputValue.trim() !== "") {
      try {
        const updatedTodos = [...todos, { task: inputValue, completed: false }];
        setTodos(updatedTodos);
        await updateFirestore(updatedTodos, userId);
        setInputValue("");
      } catch (err) {
        console.log("Error adding task:", err);
      }
    }
  };

  const handleDeleteTask = async (index) => {
    try {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
      await updateFirestore(updatedTodos, userId);
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  const handleToggleComplete = async (index) => {
    try {
      const updatedTodos = todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      await updateFirestore(updatedTodos, userId);
    } catch (err) {
      console.log("Error toggling task:", err);
    }
  };

  // Add new functions for editing
  const handleEditStart = (index) => {
    setEditingIndex(index);
    setEditValue(todos[index].task);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = async (index) => {
    if (editValue.trim() !== "") {
      try {
        const updatedTodos = todos.map((todo, i) =>
          i === index ? { ...todo, task: editValue } : todo
        );
        setTodos(updatedTodos);
        await updateFirestore(updatedTodos, userId);
        setEditingIndex(null);
        setEditValue("");
      } catch (err) {
        console.log("Error updating task:", err);
      }
    }
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 mx-auto h-screen">
      <div className="flex justify-between w-full items-center">
        <NavLinks></NavLinks>
      </div>

      {!userStatus ? (
        <Link to="/LogIn">Log in to continue</Link>
      ) : (
        <>
          <div className="flex flex-row justify-center items-center">
            <input
              type="text"
              placeholder="Add New Task"
              onChange={handleInput}
              value={inputValue}
              className="border rounded-lg px-2 py-2 mr-2"
            />
            <button
              onClick={handleAddTask}
              className="bg-buttonColor text-white px-3 py-1 font-semibold text-xl rounded-xl hover:bg-pastelOrange"
            >
              +
            </button>
          </div>
          <div>
            {idLoading ? (
              "Loading Tasks..."
            ) : todos.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {todos.map((todo, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-2 mb-2 p-2 bg-white rounded-lg shadow-md"
                  >
                    <div className="flex items-center gap-2 flex-grow">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(index)}
                        className="h-4 w-4"
                      />
                      {editingIndex === index ? (
                        // Edit mode
                        <div className="flex items-center gap-2 flex-grow">
                          <input
                            type="text"
                            value={editValue}
                            onChange={handleEditChange}
                            className="border rounded px-2 py-1 flex-grow"
                            autoFocus
                          />
                        </div>
                      ) : (
                        // View mode
                        <span
                          className={`${
                            todo.completed ? "line-through text-gray-500" : ""
                          } flex-grow`}
                        >
                          {todo.task}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      {editingIndex === index ? (
                        <>
                          <button
                            onClick={() => handleEditSave(index)}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
                          >
                            {/* Save Edit */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-floppy"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 2H9v3h2z" />
                              <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                            </svg>
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-sm"
                          >
                            {/* Cancel Edit */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-x-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditStart(index)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
                          >
                            {/* Edit Task */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fillRule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteTask(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                          >
                            {/* Delete Task */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              "No Tasks!"
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ToDo;
