import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, removeTask, toggleTaskCompletion, toggleTaskPriority, updateTaskTitle }) => {  

  // Filter priority tasks
  const priorityTasks = tasks.filter(task => task.priority && !task.completed);

  // Filter non-priority tasks
  const nonPriorityTasks = tasks.filter(task => !task.priority && !task.completed);

  // Filter completed tasks
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="mt-4 max-w-lg w-full">
      {/* Priority tasks */}
      {priorityTasks.length > 0 && (
        <>
          <div className="text-3xl font-semibold text-amber-300 mb-2">Priority</div>
          <div className="border-b border-amber-300 mb-4"></div>
          {priorityTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleTaskPriority={toggleTaskPriority}
              updateTaskTitle={updateTaskTitle}
            />
          ))}
        </>
      )}

      {/* Non-priority tasks */}
      {nonPriorityTasks.length > 0 && (
        <>
          <div className="text-3xl font-semibold text-slate-100 mb-2">Other Tasks</div>
          <div className="border-b border-slate-100 mb-4"></div>
          {nonPriorityTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleTaskPriority={toggleTaskPriority}
              updateTaskTitle={updateTaskTitle}
            />
          ))}
        </>
      )}

      {/* Completed tasks! */}
      {completedTasks.length > 0 && (
        <>
          <div className='text-3xl font-semibold text-lime-300 mb-2'>Completed tasks</div>
          <div className="border-b border-lime-300 mb-4"></div>
          {completedTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleTaskPriority={toggleTaskPriority}
              updateTaskTitle={updateTaskTitle}
            />
          ))}
        </>
      )} 
    </div>
  );
};

export default TaskList;
