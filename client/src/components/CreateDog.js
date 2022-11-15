import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import dogRoutes from '../../server/routes/dogs.routes'

const CreateDog = () => {
    const [ caption, setCaption] = useState('')
    const [picture, setPicture] = useState('')
    const[errors, setErrors] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        
        axios.get('https://api.thedogapi.com/v1/images/search', { params: { limit:1, size:"full" } } )
        .then(res=>{
            setPicture(res.data[0].url)
            console.log(res.data)
        })
        .catch(err=>console.log(err))
    },[0])
    

    const getDog = (e)=>{
        e.preventDefault();
        axios.get('https://api.thedogapi.com/v1/images/search', { params: { limit:1, size:"full" } } )
        .then(res=>{
            setPicture(res.data[0].url)
            console.log(res.data)
            console.log(res.data[0].url)
        })
        .catch(err=>console.log(err))
    }

    const onSubmitHandler = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/posts',{
            postImage:picture,
            species : 'dog', 
            content : caption
        })
        .then(res =>{
            console.log(res)
            navigate('/')
        })
        .catch(err=>{
            console.log(err)
            const errorResponse = err.response.data.errors;
            const errorArr=[];
            for(const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr)
        })
     }
    return(
        <div className='App'>
            <div className='Card'>
                <img className='animaPicture' src ={picture} alt= 'A cute and snuggly pet!'/>
            </div>
            <button onClick={getDog}>Get A Dog!</button>
            <div className='getForm'>
                <form onSubmit={onSubmitHandler} >
                    <label><h4>Add a caption</h4></label>
                    {errors.map((err,index)=><p key={index}>{err}</p>)}
                    <input type = 'hidden' value ={picture}/>
                    <input type = 'text' onChange={(e)=>setCaption(e.target.value)}/>
                    <div>
                        *8 characters required
                    </div>
                    <div>
                        <button type ='submit'>Save This Puppers!</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default CreateDog 