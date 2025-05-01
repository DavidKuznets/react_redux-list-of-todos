import { AppDispatch } from '../app/store';
import { getTodos, getUsers } from '../api';
import { setTodos, setIsLoading } from './todosSlice';
import { setUsers } from './usersSlice';

export const loadTodosAndUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const [todos, users] = await Promise.all([getTodos(), getUsers()]);

    dispatch(setTodos(todos));
    dispatch(setUsers(users));
  } finally {
    dispatch(setIsLoading(false));
  }
};
