import { allTodosMapper, resetCurrentClicked } from '..//services/utils'
import { useEffect } from 'react'

const Nav = ( {allTodos , setCurrentClicked, currentClicked} ) => {


  const completedTodos = allTodos.filter(todo => todo.completed)
  const allTodosLength = allTodos.length 
  const completedTodosLength = completedTodos.length;



  useEffect(() => {
    let name = currentClicked[1]
    resetCurrentClicked(name, allTodos, setCurrentClicked, currentClicked)
  }, [allTodos])


  const Clickable = (e) => {
    const clicked = e.target.closest('[data-title]')
    if (clicked && clicked.hasAttribute('data-title') && clicked.dataset) {

      const dates = clicked.dataset.title
      const completedBool = e.target.closest('section').id
      
      resetCurrentClicked(dates, allTodos, setCurrentClicked, completedBool, currentClicked)
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
                <dl data-title={todo} key={todo} data-total="" id="">
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




  function isNull(dataset: any) {
    throw new Error("Function not implemented.");
  }
  /*
Have an onClick on the outer dl- 
  data title is date 

so we can take all the todos ... 
  get all completed todos 




For each todo 

      <dl data-title="{{@key}}" data-total="{{this.length}}">
        <dt><time>{{@key}}</time></dt>
        <dd>{{this.length}}</dd>
      </dl>

For each Completed Todo

     <dl data-title="{{@key}}" data-total="{{this.length}}" id="{{@key}}">
        <dt><time>{{@key}}</time></dt>
        <dd>{{this.length}}</dd>
      </dl>

  */