import React from 'react';
import { Loader } from '../Loader';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { closeModal } from '../../features/todosSlice';
import { RootState } from '../../app/store';

interface TodoModalProps {
  todoId: number;
}

export const TodoModal: React.FC<TodoModalProps> = ({ todoId }) => {
  const isLoading = useAppSelector((state: RootState) => state.todos.isLoading);
  const todo = useAppSelector((state: RootState) =>
    state.todos.todos.find(item => item.id === todoId),
  );
  const user = useAppSelector((state: RootState) =>
    state.users.users.find(u => u.id === todo?.userId),
  );

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  if (!todo || !user) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleCloseModal} />

      {isLoading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleCloseModal}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todo.title}
          </p>

          <p className="block" data-cy="modal-user">
            <strong
              className={
                todo.completed ? 'has-text-success' : 'has-text-danger'
              }
            >
              {todo.completed ? 'Done' : 'Planned'}
            </strong>{' '}
            by{' '}
            <a href={`mailto:${user.email}`} data-cy="modal-user-email">
              {user.name}
            </a>
            <br />
            <span>{user.phone}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
