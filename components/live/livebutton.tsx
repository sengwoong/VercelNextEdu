import React from 'react'
interface Props {
  isLive: boolean;
  handleClick: () => void;
}
function LiveButton({isLive,handleClick}:Props) {
  return (
    <div>
       <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={isLive}
              onChange={handleClick}
            />
            <div className={`w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer ${isLive ? 'dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-blue-600' : ''}`}></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {isLive ? 'ON' : 'OFF'}
            </span>
          </label>

    </div>
  )
}

export default LiveButton