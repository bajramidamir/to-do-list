import React, { useState, useEffect, useRef } from 'react';

const Task = ({ task, removeTask, toggleTaskCompletion, toggleTaskPriority }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  // Popups disappear when you click outside of them
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  return (
    <div key={task.id} className="relative my-4 min-w-72 max-w-72 whitespace-normal lg:min-w-96 lg:max-w-96">
      <div
        className={`p-3 rounded-lg bg-transparent border border-white lg:text-xl text-slate-100 placeholder-gray-300 focus:outline-none relative ${
          task.completed ? 'line-through' : 'no-underline'
        }`}
      >
        <p className="text-slate-100 text-sm md:text-xl font-semibold whitespace-break-spaces">{task.title}</p>
        
        <button
          onClick={togglePopup}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-100 hover:text-gray-400 focus:outline-none"
        >
          <img src="images/dots.svg" alt="three dots" className='w-6 md:w-8 invert' />
        </button>
        
        {showPopup && (
          <div ref={popupRef} className="absolute right-4 top-full mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-2 z-10">
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className="block text-green-500 hover:text-green-700 focus:outline-none mb-2"
            >
              Complete
            </button>
            <button
              onClick={() => toggleTaskPriority(task.id)}
              className="block text-yellow-500 hover:text-yellow-700 focus:outline-none mb-2"
            >
              Priority
            </button>
            <button
              onClick={() => removeTask(task.id)}
              className="block text-red-500 hover:text-red-700 focus:outline-none"
            >
              
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
