import { Link } from "react-router-dom";
const Todo = () => {
  return (
    <>
      <h3>Your To-Dos</h3>
      <button>
        <Link to="/">Home</Link>
      </button>
    </>
  );
};

export default Todo;
