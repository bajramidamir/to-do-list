import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, removeTask, toggleTaskCompletion, toggleTaskPriority }) => {  

  // Filter priority tasks
  const priorityTasks = tasks.filter(task => task.priority && !task.completed);

  // Filter non-priority tasks
  const nonPriorityTasks = tasks.filter(task => !task.priority && !task.completed);

  // Filter completed tasks
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="mt-4">
      {/* Priority tasks */}
      {priorityTasks.length > 0 && (
        <>
          <div className="text-lg font-semibold text-yellow-500 mb-2">Priority</div>
          <div className="border-b border-yellow-500 mb-4"></div>
          {priorityTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleTaskPriority={toggleTaskPriority}
            />
          ))}
        </>
      )}

      {/* Non-priority tasks */}
      {nonPriorityTasks.length > 0 && (
        <>
          <div className="text-lg font-semibold text-slate-900 mb-2">Other Tasks</div>
          <div className="border-b border-slate-900 mb-4"></div>
          {nonPriorityTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleTaskPriority={toggleTaskPriority}
            />
          ))}
        </>
      )}

      {/* Completed tasks! */}
      {completedTasks.length > 0 && (
        <>
          <div className='text-lg font-semibold text-green-600 mb-2'>Completed tasks</div>
          <div className="border-b border-green-600 mb-4"></div>
          {completedTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleTaskPriority={toggleTaskPriority}
            />
          ))}
        </>
      )} 
    </div>
  );
};

export default TaskList;
