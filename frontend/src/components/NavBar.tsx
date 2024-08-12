import { useState } from 'react'
import {NavLink} from 'react-router-dom'

export default function NavBar(){

  const [isDark, setIsDark] = useState(false)

  // Function to toggle document between light and dark mode. Adds/removes "dark" class to document to trigger Tailwind updates
  const toggleTheme = () => {
    setIsDark(prevIsDark => {
      const newIsDark = !prevIsDark
      if (newIsDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      return newIsDark
    })
  }

  return(
    <nav className="flex justify-center items-center gap-5 py-10">
      <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 dark:bg-orange-500 dark:hover:bg-orange-600 rounded-md font-medium text-white" to={'/'}>All Entries</NavLink>
      <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 dark:bg-orange-500 dark:hover:bg-orange-600 rounded-md font-medium text-white" to={'/create'}>New Entry</NavLink>
      
      {/* I understand SVGs would be better than PNGs in general, but the SVG versions were paid unfortunately! */}
      <div className='flex items-center justify-center px-4 py-2 bg-zinc-800 font-bold rounded-full cursor-pointer' onClick={toggleTheme}>
        {
          // Conditional rendering of toggle icon opacity based on current theme
          isDark ?
            (
              <div className='flex space-x-5 select-none'>
                <img className="w-8 opacity-20" src='sunny.png' alt='dark mode moon icon' />
                <img className="w-8" src='moon.png' alt='dark mode moon icon' />  
              </div>
            ) : (
              <div className='flex space-x-5 select-none'>
                <img className="w-8" src='sunny.png' alt='dark mode moon icon' />
                <img className="w-8 opacity-20" src='moon.png' alt='dark mode moon icon' />  
              </div>
            )
        }
      </div>
    </nav>
  )
}