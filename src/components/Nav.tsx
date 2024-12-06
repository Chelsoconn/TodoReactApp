import {
  allTodosMapper,
  resetCurrentClicked,
  highlightClicked,
} from "..//services/utils";
import { NavProps } from "../types/types";
import { useEffect } from "react";

const Nav = ({ allTodos, setCurrentClicked, currentClicked }: NavProps) => {
  const completedTodos = allTodos.filter((todo) => todo.completed);
  const allTodosLength = allTodos.length;
  const completedTodosLength = completedTodos.length;

  useEffect(() => {
    if (currentClicked && currentClicked.length > 0 && currentClicked[1]) {
      resetCurrentClicked(
        currentClicked[1],
        allTodos,
        setCurrentClicked,
        currentClicked[3]
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTodos]);

  const Clickable = (e: React.SyntheticEvent<HTMLElement>) => {
    const clicked = (e.target as HTMLElement).closest("[data-title]");
    if (
      clicked &&
      clicked.hasAttribute("data-title") &&
      (clicked as HTMLElement).dataset
    ) {
      document
        .querySelectorAll(".active")
        .forEach((node) => node.classList.remove("active"));
      highlightClicked(e);
      const dates = (clicked as HTMLElement).dataset.title;
      if (e.target) {
        const closestSection = (e.target as HTMLElement).closest("section");
        if (closestSection && dates) {
          const completedBool = closestSection.id.includes("complete");
          resetCurrentClicked(
            dates,
            allTodos,
            setCurrentClicked,
            completedBool
          );
        }
      }
    }
  };

  return (
    <>
      <div id="sidebar" onClick={Clickable}>
        <section id="all">
          <div id="all_todos">
            <header
              className="active"
              data-title="All Todos"
              data-total={allTodos.length}
              id="all_header"
            >
              <dl>
                <dt>All Todos</dt>
                <dd>{allTodosLength}</dd>
              </dl>
            </header>
          </div>
          <article id="all_lists">
            {allTodosMapper(allTodos).map((todo) => {
              return (
                <dl data-title={todo} key={todo[0]} data-total="">
                  <dt>
                    <time>{todo[0]}</time>
                  </dt>
                  <dd>{todo[1]}</dd>
                </dl>
              );
            })}
          </article>
        </section>

        <section className="completed" id="completed_items">
          <div id="completed_todos">
            <header
              data-title="Completed"
              data-total="{{done.length}}"
              id="all_done_header"
            >
              <dl>
                <dt>Completed</dt>
                <dd>{completedTodosLength}</dd>
              </dl>
            </header>
          </div>
          <article id="completed_lists">
            {allTodosMapper(completedTodos).map((todo) => {
              return (
                <dl data-title={todo} key={todo[0]}>
                  <dt>
                    <time>{todo[0]}</time>
                  </dt>
                  <dd>{todo[1]}</dd>
                </dl>
              );
            })}
          </article>
        </section>
      </div>
    </>
  );
};

export { Nav };
