import axios from 'axios'

import { TodoWithoutId, TodoWithId } from '../types/types'


const URLBase = 'http://localhost:3000/api'

const getAllTodos = async () => {
    try {
      const response = await axios.get(`${URLBase}/todos`, {headers: {'Content-Type': 'application/json' }})
      return response.data
    } catch(error) {
      throw new Error(`There was an error fetching todos ${error}`)
    }
    
}

const addTodo = async (todo: TodoWithoutId): Promise<TodoWithId> => {
    try {
      const response = await axios.post(`${URLBase}/todos`, todo, {headers: {'Content-Type': 'application/json'}})
      return response.data
    } catch(error) {
        throw new Error(`There was an error adding a todo: ${error}`)
    }
}

const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${URLBase}/todos/${id}`)
    } catch(error) {
        throw new Error(`HIIIII ${error}`)
    }
}

const editTodo = async (id: number, updatedTodo: TodoWithoutId): Promise<TodoWithId> => {
  try {
    const response = await axios.put(`${URLBase}/todos/${id}`, updatedTodo, {headers: {'Content-Type': 'application/json'}})
    return response.data
  } catch(error) {
    throw new Error(`There was an error updating a single todo ${error}`)
  }
}




export { getAllTodos, addTodo, deleteTodo, editTodo }