import { dateFormat, sortingAllTodos, handleComplete } from "../services/utils";
import { deleteTodo, editTodo } from "../services/requests";

import { TodoWithId, ContentProps } from "../types/types";

const Content = ({
  allTodos,
  setModalStatus,
  setSelectedTodo,
  setAllTodos,
  currentClicked,
}: ContentProps) => {
  
  const addClickFunction = (): void => {
    setSelectedTodo(null);
    setModalStatus(true);
  };

  const clickDeleteFunction = async (
    e: React.SyntheticEvent<HTMLElement>,
    id: number
  ) => {
    e.stopPropagation();
    try {
      await deleteTodo(Number(id));
      const todosWithoutDeletedTodo = allTodos.filter(
        (todo) => todo.id !== Number(id)
      );
      setAllTodos(todosWithoutDeletedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompletedToggle = async (
    e: React.SyntheticEvent<HTMLElement>,
    id: number,
  ) => {
    e.stopPropagation();
    handleComplete(id, false, allTodos, setAllTodos, setModalStatus, editTodo);
  };

  const handleEditTodo = async (
    e: React.SyntheticEvent<HTMLElement>,
    id: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const selected = allTodos.find((todo) => todo.id === Number(id)) || null;
    setSelectedTodo(selected);
    setModalStatus(true);
  };

  return (
    <>
      <div id="items">
        <header>
          <dl>
            <dt>{currentClicked[1]}</dt>
            <dd>{currentClicked[0] && currentClicked[0].length}</dd>
          </dl>
        </header>
        <main>
          <label htmlFor="new_item" onClick={() => addClickFunction()}>
            <img src="../../public/images/plus.png" alt="Add Todo Item" />
            <h2>Add new to do</h2>
          </label>
          <table>
            {
              <tbody>
                {currentClicked[0] && sortingAllTodos(currentClicked[0]).map((todo: TodoWithId) => (
                  <tr
                    onClick={(e) => handleCompletedToggle(e, todo.id)}
                    key={todo.id}
                    data-id={todo.id}
                  >
                    <td className="list_item">
                      <input
                        type="checkbox"
                        name={`item_${todo.id}`}
                        id={`item_${todo.id}`}
                        checked={todo.completed}
                        onChange={() => "just to silence error"}
                      />
                      <span className="check"></span>
                      <label
                        onClick={(e) => handleEditTodo(e, todo.id)}
                        htmlFor={`item_${todo.id}`}
                      >
                        {todo.title} -{" "}
                        {dateFormat(todo.month, todo.year.slice(-2))}
                      </label>
                    </td>
                    <td
                      className="delete"
                      onClick={(e) => clickDeleteFunction(e, todo.id)}
                    >
                      <img src="images/trash.png" alt="Delete" />
                    </td>
                  </tr>
                ))}
              </tbody>
            }
          </table>
        </main>
      </div>
    </>
  );
};

export { Content };
