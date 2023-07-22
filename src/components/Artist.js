import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Queue from "./Queue";
import classes from '../styles/Artist.module.css'
import { deleteItemFromLocalStorage, getItemFromLocalStorage, setItemInLocalStorage, TokenKey } from "../utils";
import toast from 'react-hot-toast'
function Artist(){

    let {id} = useParams();
    let [loading,setLoading] = useState(true)
    let [artist,setStateArtist] = useState({})
    let navigate = useNavigate();

    useEffect(()=>{
        async function setArtist(){
            try{
                let url = `https://fastapi-jas-312f1a986e24.herokuapp.com/artist/${id}`
                let res = await fetch(url,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${getItemFromLocalStorage(TokenKey)}`
                    }
                })
                let myArtist = await res.json();
                console.log('**Artist is today',myArtist)
                setStateArtist(myArtist)
                setLoading(false)
            }catch(err){
                console.log('!!Error artist milne main',err)
                return toast.error('Error in fetching artist info')
                
                
            }
        }
       
        setArtist()
    },[])
    if(loading){
        return (
            <h1 className="mt-5" style={style.loading}>Loading...</h1>
        )
    }
    else{
        return(
            <>
            <div className={`container-fluid ${classes.body}`}>
                <div className='row mt-3'>
                    <div className='rounded col-12 col-lg-8 py-2 px-4' style={{wordSpacing:'0.2rem'}}>
                        
                            <div className={`${classes.artist_pic} m-auto`} style={{backgroundImage:`url(${artist.imageURL})`}}></div>
                            <div className={`mt-4 m-auto`} style={style.title}>{artist.name}</div>
                            <p className='my-5 px-5' style={style.content}>{artist.content}</p>
                    
                        
                    </div>
                    <div className="col-12 col-lg-4 pt-5 d-flex flex-column align-items-center">
                        <Queue title={'Playlist'}
                        arr={artist.songs}
                        />
                    </div>
                </div>
                
            </div>
            
        </>
        )
    }
}
const style={
    loading:{
        textAlign:'center',
        fontWeight:'bolder'
    },
    title:{
        textAlign:'center',
        fontWeight:'bolder',
        textTransform:'uppercase',
        color:'white',
        fontSize:'1.9rem',
        fontFamily: "'Inner Vintage', sans-serif",
    },
    content:{
        textAlign:'center',
        fontWeight:'bold',
        color:'white',
        fontFamily: "'Inner Vintage', sans-serif",
        fontSize:'1.2rem'
    },
    
}
export default Artist;