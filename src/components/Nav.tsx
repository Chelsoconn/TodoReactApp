const Nav = () => {
    return (
      
      <nav id="sidebar">
        <header data-title="All Todos" data-total="{{todos.length}}" id="all_header">
          <dl>
            <dt>All Todos</dt>

          </dl>
        </header>
        <header data-title="Completed" data-total="{{done.length}}" id="all_done_header">
           <dl>
            <dt>Completed</dt>
         
          </dl>
         </header>
      </nav>
  );
};
  
  export { Nav };