import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../auth/firebaseAuth";
import { useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebaseAuth";

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
    <>
      <h3>Your Tasks</h3>
      {!userStatus ? (
        <Link to="/LogIn">Log in to continue</Link>
      ) : (
        <>
          <p>{userId}</p>

          <input
            type="text"
            placeholder="Enter task"
            onChange={handleInput}
            value={inputValue}
            className="border rounded px-2 py-1 mr-2"
          />
          <button
            onClick={handleAddTask}
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
          >
            Add task
          </button>

          <div>
            {idLoading ? (
              "Loading Tasks..."
            ) : todos.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {todos.map((todo, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(index)}
                      className="h-4 w-4"
                    />

                    {editingIndex === index ? (
                      // Edit mode
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={handleEditChange}
                          className="border rounded px-2 py-1"
                          autoFocus
                        />
                        <button
                          onClick={() => handleEditSave(index)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      // View mode
                      <div className="flex items-center gap-2">
                        <span
                          className={`${
                            todo.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {todo.task}

                          <button
                            onClick={() => handleEditStart(index)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTask(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              "No Tasks!"
            )}
          </div>
        </>
      )}
      <button className="mt-4">
        <Link to="/">Home</Link>
      </button>
    </>
  );
};

export default ToDo;
