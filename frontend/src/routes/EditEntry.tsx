import {useState, useContext, ChangeEvent, MouseEvent, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {EntryContext} from '../utilities/globalContext'
import {Entry, EntryContextType} from '../@types/context'

export default function EditEntry(){
    const {id} = useParams()
    const emptyEntry: Entry = {title: "", description: "",created_at: new Date(),scheduled: new Date()}
    const navigate = useNavigate()


    const { updateEntry, entries } = useContext(EntryContext) as EntryContextType
    const [newEntry,setNewEntry] = useState<Entry>(emptyEntry)

    useEffect(() =>{
        const entry = entries.filter(entry=> entry.id == id)[0]
        setNewEntry(entry)
        console.log(entry)
    },[])
    const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name] : event.target.value
        })
    }
    const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
        console.log(newEntry)
        updateEntry(id as string,newEntry)

        // Alert and navigation to the home page
        alert('Entry Updated!\nNote: This alert returns regardless of the success of the update, in real world could take into account the response by adjusting the return value of from within the EntryContext to alert the user of the success')
        navigate('/')
    }
    return(
        <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 dark:bg-zinc-800 dark:border dark:border-orange-500 shadow-md shadow-gray-500 dark:shadow-orange-500 p-8 rounded-md min-w-[400px]">
            <div className='flex flex-col space-y-1'>
                <label className='text-black dark:text-white font-semibold'>Title</label>
                <input className="p-3 rounded-md" type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange}/>
            </div>
            <div className='flex flex-col space-y-1'>
                <label className='text-black dark:text-white font-semibold'>Description</label>
                <textarea className="p-3 rounded-md" placeholder="Description" name="description" value={newEntry.description} onChange={handleInputChange}/>
            </div>
            <div className='flex flex-col space-y-1'>
                <label className='text-black dark:text-white font-semibold'>Created At</label>
                <input className="p-3 rounded-md" type="date" name="created_at" value={(new Date(newEntry.created_at)).toISOString().split('T')[0]} onChange={handleInputChange}/>
            </div>
            <div className='flex flex-col space-y-1'>
                <label className='text-black dark:text-white font-semibold'>Scheduled For</label>
                <input className="p-3 rounded-md" type="date" name="scheduled" value={(new Date(newEntry.scheduled)).toISOString().split('T')[0]} onChange={handleInputChange}/>
            </div>
            <div className='flex justify-center'>
                <button onClick={(e) => {handleSend(e)}} className="bg-blue-400 hover:bg-blue-500 dark:bg-orange-500 dark:hover:bg-orange-600 font-semibold text-white p-3 rounded-md w-1/2">Update</button>
            </div>
        </section>
    
    )
}