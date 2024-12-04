import { exitModalFunction, handleDayChange, handleMonthChange, handleYearChange, fillValues, setStatesToNull, handleComplete } from '../services/utils'
import { useState, useEffect } from "react";
import {addTodo, editTodo} from "../services/requests";

import { ModalProps } from '../types/types'

const Modal = ( {modalStatus, setModalStatus, selectedTodo, setSelectedTodo, setAllTodos, allTodos }: ModalProps ) => {
  
  //set state of modal
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [completed, setCompleted] = useState(false);
  const [description, setDescription] = useState("");
  //

 
  //set values for modal every time there is a change of state for selectedTodo
  useEffect(() => {
    if (selectedTodo) {
      const forms = document.querySelector('form')
      fillValues( selectedTodo, (forms as unknown as HTMLFormElement).elements, setTitle, setDay, setMonth, setYear, setDescription);
    }
  }, [selectedTodo]); 
  //
  

  //handle event handling functions
  const handleSubmit = async(e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    if (title.length < 3) {
      alert("Title needs to be at least 3 characters");
      return;
    }
    if (selectedTodo) {
      try {
        const editedTodo = await editTodo(selectedTodo.id, {title, day, month, year, completed, description});
        const allTodosEdited = allTodos.map(todo => todo.id === selectedTodo.id ? editedTodo : todo)
        setAllTodos(allTodosEdited) 
        setModalStatus(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const addedTodo = await addTodo({title, day, month, year, completed, description});
        setAllTodos([...allTodos, addedTodo]);
        setModalStatus(false);
      } catch (error) {
        console.log(error);
      }
    }
    setStatesToNull({ setTitle, setDay, setMonth, setYear, setDescription, setCompleted } )
  };

  const handleMarkComplete = async(e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedTodo) {
      handleComplete( selectedTodo.id, true, allTodos, setAllTodos, setModalStatus, editTodo )
      setSelectedTodo(null)
      setStatesToNull({ setTitle, setDay, setMonth, setYear, setDescription, setCompleted } )
    } else {
      alert("You must save todo before marking complete");
    }
  };
  //

  return (
    modalStatus && <>
      <div onClick={() => exitModalFunction( { setModalStatus, setSelectedTodo} )} className="modal" id="modal_layer"></div>
      <div className="modal" id="form_modal">
        <form onSubmit={handleSubmit} action="" method="post">
          <fieldset>
            <ul>
              <li>
                <label htmlFor="title">Title</label>
                <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" placeholder="Item 1" />
              </li>
              <li>
                <label htmlFor="due">Due Date</label>
                <div className="date">
                  <select onChange={(e) => handleDayChange(setDay, e.target.value)} id="due_day" name="due_day">
                    <option value='  '>Day</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                  /
                  <select onChange={(e) => handleMonthChange(setMonth, e.target.value)} id="due_month" name="due_month">
                    <option value='  '>Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  /
                  <select onChange={(e) => handleYearChange(setYear, e.target.value)} id="due_year" name="due_year">
                    <option value='    '>Year</option>
                    <option>2014</option>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                  </select>
                </div>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea onChange={(e) => setDescription(e.target.value)} cols={50} name="description" rows={7} placeholder="Description"></textarea>
              </li>
              <li>
                <input type="submit" value="Save" />
                <button onClick={(e) => handleMarkComplete(e)} name="complete">Mark As Complete</button> 
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export { Modal }