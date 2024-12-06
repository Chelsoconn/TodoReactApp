export interface TodoWithId {
  id: number;
  title: string;
  day: string;
  month: string;
  year: string; 
  completed: boolean;
  description: string;
}

export type TodoWithoutId = Omit<TodoWithId, 'id'>

export type AllToDosWithId = Array<TodoWithId>

export interface ContentProps {
    allTodos: AllToDosWithId;
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setAllTodos: React.Dispatch<React.SetStateAction<AllToDosWithId>>;
    setSelectedTodo: React.Dispatch<React.SetStateAction<TodoWithId | null>>;
    currentClicked: [AllToDosWithId, string, number | string, boolean] | [];
}

export interface ModalProps {
    modalStatus: boolean;
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTodo: TodoWithId | null;
    setSelectedTodo: React.Dispatch<React.SetStateAction<TodoWithId | null>>
    setAllTodos: React.Dispatch<React.SetStateAction<AllToDosWithId>>;
    allTodos: AllToDosWithId;
    setCurrentClicked: React.Dispatch<React.SetStateAction<[AllToDosWithId, string, number | string, boolean] | []>>
}

export type exitModalFunctionProps = Pick<ContentProps, 'setModalStatus'| 'setSelectedTodo'>

export interface SetModalType {
    setTitle: React.Dispatch<React.SetStateAction<string>>, 
    setDay: React.Dispatch<React.SetStateAction<string>>, 
    setMonth: React.Dispatch<React.SetStateAction<string>>, 
    setYear: React.Dispatch<React.SetStateAction<string>>, 
    setDescription: React.Dispatch<React.SetStateAction<string>>, 
    setCompleted: React.Dispatch<React.SetStateAction<boolean>>, 
   
}

export interface NavProps {
    allTodos: AllToDosWithId;
    setCurrentClicked: React.Dispatch<React.SetStateAction<[AllToDosWithId, string, number | string, boolean] | []>>;
    currentClicked: [AllToDosWithId, string, number | string, boolean] | [];
}

