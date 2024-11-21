import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../auth/firebaseAuth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import NavLinks from "../NavLinks";
import { UserContext } from "../UserContext";

const ToDo = () => {
  document.body.style.backgroundColor = "#fff4ea";
  getAuth();
  const [userId, setUserId] = useState("");
  // const [userStatus, setUserStatus] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  //editing existing task
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      // console.log("User is signed in:", currentUser.email);
      fetchData(currentUser.email);
    } else {
      // console.log("User is signed out");
      setTodos([]);
    }
  }, [currentUser]);

  const fetchData = async (email) => {
    if (!email) return;

    setIsLoading(true);
    try {
      const docRef = doc(db, "todos", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const todoArray = Object.entries(data).map(([task, completed]) => ({
          task,
          completed,
        }));
        setTodos(todoArray);
        // console.log("data from db", todoArray);
      } else {
        // console.log("No todos found");
      }
    } catch (err) {
      // console.log("Error fetching todos:", err);
      alert("Hmm.. Couldn't fetch your tasks. Check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const updateFirestore = async (updatedTodos) => {
    if (!currentUser) return;

    try {
      const firestoreData = updatedTodos.reduce((acc, todo) => {
        acc[todo.task] = todo.completed;
        return acc;
      }, {});

      await setDoc(doc(db, "todos", currentUser.email), firestoreData);
    } catch (err) {
      // console.log("Error updating Firestore:", err);
      alert(
        "Hmm.. Couldn't complete your request. Check your internet connection."
      );
      throw err;
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      try {
        const updatedTodos = [...todos, { task: inputValue, completed: false }];
        setTodos(updatedTodos);
        await updateFirestore(updatedTodos, userId);
        setInputValue("");
      } catch (err) {
        // console.log("Error adding task:", err);
        alert(
          "Hmm.. Couldn't complete your request. Check your internet connection."
        );
      }
    }
  };

  const handleDeleteTask = async (index) => {
    try {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
      await updateFirestore(updatedTodos, userId);
    } catch (err) {
      // console.log("Error deleting task:", err);
      alert(
        "Hmm.. Couldn't complete your request. Check your internet connection."
      );
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
      alert(
        "Hmm.. Couldn't complete your request. Check your internet connection."
      );
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
        alert(
          "Hmm.. Couldn't complete your request. Check your internet connection."
        );
      }
    }
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between w-full items-center p-4">
        <NavLinks />
      </div>

      {!currentUser ? (
        <div className="flex-grow flex flex-col items-center justify-center top-1/2">
          <span className="text-xl font-semibold">
            Uh Oh! No Tasks to show!
          </span>
          <Link to="/LogIn" className="text-xl font-semibold">
            <span className="underline">Log in</span> to continue.
          </Link>
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center">
          {" "}
          {/*pt-20 for 80px top padding */}
          <form className="w-full max-w-md flex flex-row justify-center items-center p-4 fixed top-28 md:top-40">
            {" "}
            {/* Fixed position */}
            <input
              type="text"
              placeholder="Add New Task"
              onChange={handleInput}
              value={inputValue}
              className="border rounded-lg px-2 py-2 mr-2 flex-grow"
            />
            <button
              onClick={handleAddTask}
              className="bg-buttonColor text-white rounded-lg p-2"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </button>
          </form>
          <div className="w-80 sm:w-10/12 max-w-md mt-52 rounded-lg shadow-md overflow-hidden">
            {" "}
            {/* Added mt-24 to account for fixed input */}
            <div className="text-xl md:text-2xl flex justify-between items-center p-4 bg-buttonColor text-white">
              <div>
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="bi bi-arrow-left-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                  </svg>
                </Link>
              </div>
              <div className="flex-1 text-center">Your Tasks</div>
              <div className="invisible">{"<-"}</div>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center p-4">
                <svg
                  className="animate-spin me-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Loading Tasks</span>
              </div>
            ) : todos.length > 0 ? (
              <div className="max-h-[calc(100vh-16rem)] overflow-y-auto p-4">
                {" "}
                {/* Adjust max height as needed */}
                <ul className="space-y-2">
                  {todos.map((todo, index) => (
                    <li key={index} className="flex gap-2 mb-2 w-full">
                      <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg shadow-sm w-[calc(100%-80px)]">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleToggleComplete(index)}
                          className="h-4 w-4 flex-shrink-0"
                          id={index}
                        />
                        {editingIndex === index ? (
                          // Edit mode
                          <div className="min-w-0 flex-1">
                            <input
                              type="text"
                              value={editValue}
                              onChange={handleEditChange}
                              className="border rounded w-full truncate"
                              autoFocus
                            />
                          </div>
                        ) : (
                          // View mode
                          <span
                            className={`${
                              todo.completed ? "line-through text-gray-500" : ""
                            } break-words whitespace-normal inline-block w-[calc(100%-50px)]`}
                          >
                            {todo.task}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {editingIndex === index ? (
                          <>
                            <button
                              onClick={() => handleEditSave(index)}
                              className="bg-buttonColor px-1.5 py-0.5 text-white rounded hover:bg-pastelPink"
                            >
                              {/* Save Edit */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bi bi-check-lg"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                              </svg>
                            </button>
                            <button
                              onClick={handleEditCancel}
                              className="bg-realRed text-white px-2 py-1 rounded hover:bg-gray-600 text-sm"
                            >
                              {/* Cancel Edit */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-x-lg"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditStart(index)}
                              className="bg-buttonColor text-white px-2 py-1 rounded hover:bg-opacity-90 text-sm"
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
                              className="bg-realRed text-white px-2 py-1 rounded hover:bg-opacity-80 text-sm"
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
              </div>
            ) : (
              <div className="flex items-center justify-center p-4">
                <p className="text-center">
                  No tasks yet. Add one to get started!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ToDo;
