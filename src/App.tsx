import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadTodosAndUsers } from './features/thunks';
import { TodoList, TodoFilter, Loader, TodoModal } from './components';
import { RootState } from './app/store';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector((state: RootState) => state.todos.todos);
  const isLoading = useAppSelector((state: RootState) => state.todos.isLoading);

  const [status, setStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(loadTodosAndUsers());
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setStatus={setStatus}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={todos}
                  searchQuery={searchQuery}
                  status={status}
                  setSelectedTodoId={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== null && <TodoModal todoId={selectedTodoId} />}
    </>
  );
};
