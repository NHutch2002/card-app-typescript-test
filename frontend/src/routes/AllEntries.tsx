import {useContext, useEffect, useState} from 'react'
import { EntryContext } from '../utilities/globalContext'
import { EntryContextType, Entry } from '../@types/context'
import { useNavigate, Link } from "react-router-dom";

export default function AllEntries(){
    const {entries, deleteEntry} = useContext(EntryContext) as EntryContextType
    let navigate = useNavigate();

    // Triggers a refresh of the component when the entries change to prevent cached entries from being displayed
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        setRefresh(!refresh)
    }, [entries])


    if(entries.length == 0){
        return(
            <section>
                <h1 className="text-center font-semibold text-2xl m-5 dark:text-white">You don't have any cards yet!</h1>
                <p className="text-center font-medium text-md dark:text-white">Lets <Link className="text-blue-400 dark:text-orange-500 underline underline-offset-1" to="/create">Create One</Link></p>
            </section>
        )
    }
    return(
        <section className="grid grid-cols-2 md:grid-cols-4">
            {entries.map((entry: Entry, index: number) => {
                return(
                    <div id={entry.id} key={index}className="relative bg-gray-300 dark:bg-zinc-800 dark:border dark:border-orange-500 dark:text-zinc-300 dark shadow-md dark:shadow-orange-500 shadow-gray-500 m-3 px-4 py-2 rounded flex flex-col justify-between">
                        <div className='flex justify-between'>
                            <h1 className="font-bold text-sm md:text-lg">{entry.title}</h1>
                            <time className='text-sm md:text-lg font-bold'>{new Date(entry.scheduled.toString()).toLocaleDateString()}</time>
                        </div>
                        <p className="text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3">{entry.description}</p>
                        <section className="flex items-center justify-between flex-col md:flex-row pt-2 md:pt-0">
                            <div className="flex justify-left w-1/2">
                                <button onClick={()=> {deleteEntry(entry.id as string)}} className="m-1 md:m-2 p-1 font-semibold rounded-md bg-red-500 hover:bg-red-700">✖</button>
                                <button onClick={()=> {navigate(`/edit/${entry.id}`, { replace: true });}} className="m-1 md:m-2 p-1 font-semibold rounded-md bg-blue-500 hover:bg-blue-700">🖊</button>
                            </div>
                        </section>
                        <time className="absolute bottom-1 right-2 text-sm font-light md:text-base text-center text-zinc-500">{new Date(entry.created_at.toString()).toLocaleDateString()}</time>
                    </div>
                )
            })}
        </section>
    )
}