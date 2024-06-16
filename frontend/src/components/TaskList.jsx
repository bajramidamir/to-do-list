/* eslint-disable react/prop-types */

import { Task, TaskWrapper, SectionTitle, SectionDivider } from "./index";

const TaskList = ({
  tasks,
  removeTask,
  toggleTaskCompletion,
  toggleTaskPriority,
  updateTaskTitle,
  toggleTaskRecurring,
  markTaskDoneForToday
}) => {
  const priorityTasks = tasks.filter(
    (task) => task.priority && !task.completed && !task.recurring
  );
  const nonPriorityTasks = tasks.filter(
    (task) => !task.priority && !task.completed && !task.recurring
  );
  const completedTasks = tasks.filter(
    (task) => task.completed && !task.recurring
  );
  const recurringTasks = tasks.filter(
    (task) => task.recurring
  );

  return (
    <TaskWrapper>
      {/* Priority tasks */}
      {priorityTasks.length > 0 && (
        <>
          <SectionTitle title="Priority" className="text-amber-300" />
          <SectionDivider className="border-amber-300" />
          {priorityTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleTaskPriority={toggleTaskPriority}
              updateTaskTitle={updateTaskTitle}
              toggleTaskRecurring={toggleTaskRecurring}
              markTaskDoneForToday={markTaskDoneForToday}
            />
          ))}
        </>
      )}

      {/* Recurring tasks */}
      {recurringTasks.length > 0 && (
        <>
          <SectionTitle title="Recurring" className="text-sky-300" />
          <SectionDivider className="border-sky-300" />
          {recurringTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleTaskPriority={toggleTaskPriority}
              updateTaskTitle={updateTaskTitle}
              toggleTaskRecurring={toggleTaskRecurring}
              markTaskDoneForToday={markTaskDoneForToday}
            />
          ))}
        </>
      )}

      {/* Non-priority tasks */}
      {nonPriorityTasks.length > 0 && (
        <>
          <SectionTitle title="Other Tasks" className="text-slate-100" />
          <SectionDivider className="border-slate-100" />
          {nonPriorityTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleTaskPriority={toggleTaskPriority}
              updateTaskTitle={updateTaskTitle}
              toggleTaskRecurring={toggleTaskRecurring}
              markTaskDoneForToday={markTaskDoneForToday}
            />
          ))}
        </>
      )}

      {/* Completed tasks */}
      {completedTasks.length > 0 && (
        <>
          <SectionTitle title="Completed Tasks" className="text-lime-300" />
          <SectionDivider className="border-lime-300" />
          {completedTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              removeTask={removeTask}
              toggleTaskCompletion={toggleTaskCompletion}
              toggleTaskPriority={toggleTaskPriority}
              updateTaskTitle={updateTaskTitle}
              toggleTaskRecurring={toggleTaskRecurring}
              markTaskDoneForToday={markTaskDoneForToday}
            />
          ))}
        </>
      )}
    </TaskWrapper>
  );
};

export default TaskList;
