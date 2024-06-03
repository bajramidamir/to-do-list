import React from 'react';

import { Task, TaskWrapper, SectionTitle, SectionDivider } from "./index";

const TaskList = ({ tasks, removeTask, toggleTaskCompletion, toggleTaskPriority, updateTaskTitle }) => {  

  const priorityTasks = tasks.filter(task => task.priority && !task.completed);
  const nonPriorityTasks = tasks.filter(task => !task.priority && !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <TaskWrapper>
      {/* Priority tasks */}
      {priorityTasks.length > 0 && (
        <>
          <SectionTitle title="Priority" className="text-amber-300" />
          <SectionDivider className="border-amber-300" />
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
          <SectionTitle title="Other Tasks" className="text-slate-100" />
          <SectionDivider className="border-slate-100" />
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

      {/* Completed tasks */}
      {completedTasks.length > 0 && (
        <>
          <SectionTitle title="Completed Tasks" className="text-lime-300" />
          <SectionDivider className="border-lime-300" />
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
    </TaskWrapper>
  );
};

export default TaskList;