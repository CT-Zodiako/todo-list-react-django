import {useEffect} from 'react'
import {set, useForm} from 'react-hook-form'
import {createTask, DeleteTask, UpdateTask, getTaskById} from '../api/tasks.api'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'

export function TaskFormPage() {


    const {register,handleSubmit, formState:{errors}, setValue} = useForm();
    const navigate = useNavigate()
    const params = useParams()


    const onSubmit = handleSubmit(async data => {
        if(params.id){
            await UpdateTask(params.id,data)
            toast.success('Task updated successfully')
        }else{
            await createTask(data)
            toast.success('Task created successfully')
        }
        navigate('/tasks')
    })

    useEffect(()=>{
    async function loadTask(){
        if(params.id){
            const {data} = await getTaskById(params.id)
            setValue('title',data.title)
            setValue('description',data.description)
        }
       }
         loadTask()
    })

    return (
      <div className='max-w-xl mx-auto'>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Title" {...register('title', {required: true})} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'/>
            {errors.title && <span>This field is required</span>}
            
            <textarea rows="3" placeholder="Description" {...register('description', {required: true})} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></textarea>
            {errors.description && <span>This field is required</span>}
            <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
        </form>
        {
            params.id && 
            <div className='flex justify-end'>

<button className='bg-red-500 p-3 rounded-lg w-48 mt-3' onClick={ async() =>{
                const accepted = window.confirm('Are you sure you want to delete it?')
                if(accepted){
                    await DeleteTask(params.id)
                    toast.error('Task deleted successfully')
                    navigate('/tasks')
                }
            }}>Delete</button>
            </div>
        }
      </div>
    )
  }
  
  