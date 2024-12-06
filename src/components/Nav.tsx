import { allTodosMapper, resetCurrentClicked, highlightClicked } from '..//services/utils'
import { useEffect } from 'react'

const Nav = ( {allTodos , setCurrentClicked, currentClicked} ) => {


  const completedTodos = allTodos.filter(todo => todo.completed)
  const allTodosLength = allTodos.length 
  const completedTodosLength = completedTodos.length;



  useEffect(() => {
    if (currentClicked.length > 0) {
      resetCurrentClicked(currentClicked[1], allTodos, setCurrentClicked, currentClicked[3])
    }
  }, [allTodos])


  const Clickable = (e) => {
    const clicked = e.target.closest('[data-title]')
    if (clicked && clicked.hasAttribute('data-title') && clicked.dataset) {
      document.querySelectorAll('.active').forEach(node => node.classList.remove('active'))
      highlightClicked(e)
      const dates = clicked.dataset.title
      const completedBool = e.target.closest('section').id.includes('complete')   
      resetCurrentClicked(dates, allTodos, setCurrentClicked, completedBool)
    }
  }
  

    return (
      <>
       <div id="sidebar" onClick={Clickable}>


         <section id="all">
           <div id="all_todos">
             <header data-title="All Todos" data-total={allTodos.length} id="all_header">
               <dl>
                 <dt>All Todos</dt><dd>{allTodosLength}</dd> 
               </dl>
             </header>
           </div>
         <article id="all_lists">
           
          {allTodosMapper(allTodos).map(todo => {
            return (
              <dl data-title={todo} key={todo} data-total="">
               <dt><time>{todo[0]}</time></dt>
               <dd>{todo[1]}</dd>
              </dl>
            )
          })}

         </article>
        </section>


        <section className="completed" id="completed_items">
          <div id="completed_todos">
            <header data-title="Completed" data-total="{{done.length}}" id="all_done_header">
              <dl>
                <dt>Completed</dt><dd>{completedTodosLength}</dd> 
              </dl>
            </header>
          </div>
          <article id="completed_lists">

             {allTodosMapper(completedTodos).map(todo => {
              return (
                <dl data-title={todo} key={todo}>
                  <dt><time>{todo[0]}</time></dt>
                  <dd>{todo[1]}</dd>
              </dl>
              )
             })}
       
          </article>
        </section>



      </div>
    </>
  );
};
  
  export { Nav };

