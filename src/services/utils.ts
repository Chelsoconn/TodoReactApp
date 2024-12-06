
import { exitModalFunctionProps, TodoWithId, TodoWithoutId, SetModalType, AllToDosWithId } from '../types/types'


//type predicates 
const isString = (arg: unknown): arg is string => {
  return typeof(arg) === 'string'
}

const isTodoWithoutId = (arg: unknown): arg is TodoWithoutId => {
    return (typeof arg === 'object' && arg !== null &&'title' in arg && 'day' in arg && 'month' in arg && 'year' in arg && 'description' in arg)
}

const isInputElement = (arg: Element): arg is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement => {
    return 'value' in arg;  
  }
//

const exitModalFunction = ({setModalStatus, setSelectedTodo} : exitModalFunctionProps) => {
  setModalStatus(false)
  setSelectedTodo(null)
}

const handleDayChange = (setDay: React.Dispatch<React.SetStateAction<string>>, value: string | typeof NaN) => {
    value = Number(value) ? value : '  '
    if (isString(value)) setDay(value)
}

const handleMonthChange = (setMonth: React.Dispatch<React.SetStateAction<string>>, value: string | typeof NaN) => {
    value = Number(value) ? value : '  '
    if (isString(value)) setMonth(value)
}

const handleYearChange = (setYear: React.Dispatch<React.SetStateAction<string>>, value: string | typeof NaN) => {
    value = Number(value) ? value : '    '
    if (isString(value)) setYear(value)
}

const fillValues = ( 
    selectedTodo: TodoWithId | null, 
    formElements:  HTMLFormControlsCollection, 
    setTitle: React.Dispatch<React.SetStateAction<string>>, 
    setDay: React.Dispatch<React.SetStateAction<string>>, 
    setMonth: React.Dispatch<React.SetStateAction<string>>, 
    setYear: React.Dispatch<React.SetStateAction<string>>, 
    setDescription: React.Dispatch<React.SetStateAction<string>> 
) => {
  Array.from(formElements).forEach((todo: Element) => {
      if ('name' in todo && todo.name) {
        if (isTodoWithoutId(selectedTodo)) {
          if (isInputElement(todo)) {
             switch (todo.name) {
              case 'title':
                  setTitle(selectedTodo.title)
                  todo.value = selectedTodo.title
                  return 
              case 'due_day':
                  setDay(selectedTodo.day)
                  todo.value = selectedTodo.day || '  '
                  return 
              case 'due_month':
                  setMonth(selectedTodo.month)
                  todo.value = selectedTodo.month || '  '
                  return
              case 'due_year':
                  setYear(selectedTodo.year)
                  todo.value = selectedTodo.year || '    '
                  return
              case 'description':
                  setDescription(selectedTodo.description)
                  todo.value = selectedTodo.description
                  return
             }
            }
         }
      }
  })
}

const dateFormat = (month: string, year: string) => {
  return (month.trim() && year.trim()) ? `${month}/${year}` : 'No Due Date'
}

const setStatesToNull = ({ setTitle, setDay, setMonth, setYear, setDescription, setCompleted }: SetModalType) => {
    setTitle('')
    setDay('')
    setMonth('')
    setYear('')
    setDescription('')
    setCompleted(false)
}

const sortingAllTodos = (todos: AllToDosWithId) => {
  return todos.sort((b, a) => Number(b.completed) - Number(a.completed))
}

const handleComplete = async( currentId: number, bool: boolean, 
    allTodos: AllToDosWithId, setAllTodos: React.Dispatch<React.SetStateAction<AllToDosWithId>> , 
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>, 
    editTodo: (id: number, updatedTodo: TodoWithId) => Promise<TodoWithId>,
   
   ) => { 
    let updatedTodo;
    const newTodoList = allTodos.map((todo) => {
        if (todo.id === currentId) {
          updatedTodo = { ...todo, completed: bool || !todo.completed };
          return updatedTodo;
        } else {
          return todo;
        }
      });
      setAllTodos(newTodoList);
      setModalStatus(false)
  
      try {
        if (updatedTodo) await editTodo(currentId, updatedTodo);
      } catch(error) {
        console.log(`There was an error toggling ${error}`)
      }
} 

const allTodosMapper = (arrayList) => {
  const todosNav = arrayList.map(todo => {
    return (todo.month.trim() && todo.year.trim()) ? (`${todo.year},${todo.month},${todo.day}`) : ('0')
  })  
  const allSortedDates = todosNav.sort((a,b) => new Date(a) - new Date(b))
  const counts = {}

  allSortedDates.forEach(date => {
   if (date === '0') {
     counts['No Due Date'] = counts['No Due Date'] ?  counts['No Due Date'] + 1 : 1 
   } else {
     const sliced = date.slice(0,7).split(',').reverse().join('/')
     const fin = sliced.slice(0,3) + sliced.slice(5)
     counts[fin] = counts[fin] ? counts[fin] + 1 : 1
   }
  })

  const finalCompleted = Object.entries(counts)      
  return finalCompleted
}

const matchingTodos = (listArr, dates) => {
  return listArr.filter(todo => {
    if ((!todo.month.trim() || !todo.year.trim()) && dates.includes('No Due Date')) return true
    return (todo.month === dates.slice(0, 2) && todo.year.includes(dates.slice(3,5)))
  })
}

const resetCurrentClicked = (dates, allTodos, setCurrentClicked, completedBool) => {
  const completedTodos = allTodos.filter(todo => todo.completed)
  if (dates === 'All Todos') {
    setCurrentClicked([allTodos, 'All Todos', allTodos.length, false]);
  } else if (dates === 'Completed') {
    setCurrentClicked([completedTodos, 'Completed', completedTodos.length, true]);
  } else {
    const currentTodosToShow = (completedBool) ? matchingTodos(completedTodos, dates) : matchingTodos(allTodos, dates)
    setCurrentClicked([currentTodosToShow, dates.split(',')[0], currentTodosToShow.length, completedBool ])
  }
}

const highlightClicked = (e) => {
  if (e.target.textContent === 'All Todos' || e.target.textContent === 'Completed') {
    e.target.closest('header').classList.add('active')
  } else {
    e.target.closest('dl').classList.add('active')
  }
} 

export { 
    exitModalFunction, 
    handleDayChange, 
    handleMonthChange, 
    handleYearChange, 
    fillValues,
    setStatesToNull,
    dateFormat,
    sortingAllTodos,
    handleComplete,
    allTodosMapper, 
    resetCurrentClicked,
    highlightClicked
 }