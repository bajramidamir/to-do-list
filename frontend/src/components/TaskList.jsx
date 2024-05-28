import React, { useState, useEffect } from 'react';

const TaskList = ({ tasks, removeTask }) => {
  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem('completedTasks')) || {}
  );

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const toggleTaskCompletion = (taskId) => {
    const updatedCompletedTasks = { ...completedTasks };
    updatedCompletedTasks[taskId] = !updatedCompletedTasks[taskId];
    setCompletedTasks(updatedCompletedTasks);
  };

  const isTaskCompleted = (taskId) => {
    return completedTasks[taskId] || false;
  };

  const handleTaskClick = (taskId) => {
    toggleTaskCompletion(taskId);
  };

  return (
    <div className="mt-4">
      {tasks.map(task => (
        <div key={task.id} className="relative my-4 min-w-72 max-w-72 whitespace-normal lg:min-w-96 lg:max-w-96" >
          <div
            className={`p-3 rounded-lg bg-transparent border border-white lg:text-xl text-slate-100 placeholder-gray-300 focus:outline-none relative ${
              isTaskCompleted(task.id) ? 'line-through' : 'no-underline'
            }`}
            onClick={() => handleTaskClick(task.id)}
          >
            <p className="text-slate-100 text-sm md:text-xl font-semibold whitespace-break-spaces">{task.title}</p>
            <button
              onClick={() => removeTask(task.id)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 focus:outline-none"
            >
              <img src="images/bin.svg" alt="trash bin" className='w-6 md:w-8 invert' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
