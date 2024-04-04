import React from 'react';

type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: 1,
      title: 'Learn React',
      isCompleted: true,
      priority: 'p1',
    },
  ]);

  const [taskName, setTaskName] = React.useState('');
  const [isEdit, setEdit] = React.useState(false);
  const [editedTaskId, setEditedTaskId] = React.useState<number | null>(null);

  const onAddTask = () => {
    if (taskName) {
      setTasks([
        ...tasks,
        {
          id: new Date().getTime(), // Not a great way to generate IDs
          title: taskName,
          isCompleted: false,
        },
      ]);

      setTaskName('');
    }
  };

  const editTask = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editedTaskId ? { ...task, title: taskName } : task,
      ),
    );
    setTaskName('');
    setEdit(false);

    setEditedTaskId(null);
  };

  const handleEdit = (id: number, task: string) => {
    setEdit(true);
    setTaskName(task);
    setEditedTaskId(id);
    //
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id || id == editedTaskId),
    );
  };

  return (
    <div>
      <h1>Tasks</h1>
      <label htmlFor="task-input">Add Task: </label>
      <input
        id="task-input"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      {isEdit ? (
        <button onClick={editTask}>Edit</button>
      ) : (
        <button onClick={onAddTask}>Add</button>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button
              onClick={() => {
                handleEdit(task?.id, task?.title);
              }}
            >
              edit
            </button>
            <button
              onClick={() => {
                deleteTask(task?.id);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
