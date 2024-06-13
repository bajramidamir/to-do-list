import React, { useState, useEffect, useRef } from "react";

const Task = ({
  task,
  removeTask,
  toggleTaskCompletion,
  toggleTaskPriority,
  updateTaskTitle,
  toggleTaskRecurring,
  markTaskDoneForToday,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const handleEdit = () => {
    setIsEditing(true);
    setShowPopup(false);
  };

  const handleSave = () => {
    updateTaskTitle(task.id, editedTitle);
    setIsEditing(false);
  };

  const handleMarkDoneForToday = () => {
    markTaskDoneForToday(task.id);
    setShowPopup(false);
  };

  const formattedDate = new Date(task.updatedAt).toLocaleString();

  return (
    <div key={task.id} className="my-4 w-full max-w-lg mx-auto">
      <div
        className={`p-3 rounded-lg bg-transparent border border-white text-slate-100 placeholder-gray-300 focus:outline-none flex justify-between items-center ${
          task.completed ? "line-through" : "no-underline"
        }`}
      >
        {isEditing ? (
          <div className="flex items-center w-full">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-grow bg-transparent border-none text-slate-100 focus:outline-none"
            />
            <button
              onClick={handleSave}
              className="ml-2 px-2 py-1 bg-blue-400 text-slate-100 rounded hover:bg-blue-500 transition ease-in-out duration-300"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex-grow text-sm md:text-xl font-semibold whitespace-break-spaces">
            {task.title}
          </div>
        )}

        <div className="relative flex items-center">
          <button
            onClick={togglePopup}
            className="ml-2 text-slate-100 hover:text-gray-400 focus:outline-none transition ease-in-out duration-300"
          >
            <img
              src="images/dots.svg"
              alt="three dots"
              className="w-6 md:w-8 invert"
            />
          </button>
          {showPopup && (
            <div
              ref={popupRef}
              className={`absolute top-full right-0 w-auto mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-2 z-10 transition-opacity duration-300 transform ${
                showPopup ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionProperty: "opacity, transform" }}
            >
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={`block p-2 text-lime-300 hover:text-lime-500 focus:outline-none mb-2 transition ease-in-out duration-300 ${
                  task.recurring ? "hidden" : ""
                }`}
              >
                {task.completed ? "Reopen" : "Complete"}
              </button>

              <button
                onClick={handleMarkDoneForToday}
                className={`block p-2 text-lime-300 hover:text-lime-500 focus:outline-none mb-2 transition ease-in-out duration-300 ${
                  task.recurring && !task.completed ? "" : "hidden"
                }`}
              >
                Mark Done for Today
              </button>

              <button
                onClick={() => toggleTaskPriority(task.id)}
                className="block p-2 text-amber-300 hover:text-amber-500 focus:outline-none mb-2 transition ease-in-out duration-300"
              >
                {task.priority ? "Set as Non-priority" : "Set as Priority"}
              </button>

              <button
                onClick={() => toggleTaskRecurring(task.id)}
                className="block p-2 text-sky-300 hover:text-sky-500 focus:outline-none mb-2 transition ease-in-out duration-300"
              >
                {task.recurring ? "Set as Non-recurring" : "Set as Recurring"}
              </button>

              <button
                onClick={handleEdit}
                className="block p-2 text-sky-300 hover:text-sky-500 focus:outline-none mb-2 transition ease-in-out duration-300"
              >
                Edit
              </button>

              <button
                onClick={() => removeTask(task.id)}
                className="block p-2 text-red-300 hover:text-red-500 focus:outline-none transition ease-in-out duration-300"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-300 mt-1">
        {`Last updated at: ${formattedDate}`}
      </div>
    </div>
  );
};

export default Task;
