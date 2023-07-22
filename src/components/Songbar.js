import { useEffect, useState, useRef } from 'react';
import classes from '../styles/Songbar.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setSongAndTrack,songBack,songNext} from '../slices/song';
import toast from 'react-hot-toast'
import {getItemFromLocalStorage,TokenKey} from '../utils';
function Songbar(){
    let user = useSelector(state=>state.user.value)
    let record = useSelector(state=>state.song.value)
    var myRef = useRef();
    var audioRef = useRef();
    var progressRef = useRef();
    var [name,setName] = useState(record.song?record.song.name:'Song Name')
    var [artist,setArtist] = useState(record.song?record.song.artist_id:'Artist')
    let dispatch = useDispatch()
    
    useEffect(()=>{
        console.log(record.song,'hh......\n\n')
        if(record.song.songURL){
            (
                async function(){
                    try{
                        let reply = await fetch(`https://fastapi-jas-312f1a986e24.herokuapp.com/artist/name/${record.song.artist_id}`,{
                        method:'GET',
                        headers:{
                            'Content-type':'application/json',
                            'Authorization':`Bearer ${getItemFromLocalStorage(TokenKey)}`
                        }
                    })
                        let response = await reply.json();
                        console.log('artist mila....\n\n',response)
                        setArtist(response)
                    }catch(err){

                    }
                    
                    
                }
            )();
            setName(record.song.name);
            console.log('artist ki id_____',record.song.artist_id)
            audioRef.current.setAttribute('src',record.song.songURL)
            audioRef.current.load()
            audioRef.current.play()
            initialiseVolume();
            audioRef.current.onended= function(){
                myRef.current.innerHTML= '<i class="fa-solid fa-play"></i>'
            }
            audioRef.current.ontimeupdate= function(){
                updateProgress();
            };
            myRef.current.innerHTML = '<i class="fa-solid fa-pause"></i>'
        }
        
    },[record.song.songURL])

    useEffect(()=>{
        if(!user){
            return ()=>{
                setName('Song Name')
                setArtist('Artist')
                dispatch(setSongAndTrack({song:{},track:[]}))
            }
        }
            
    },[user])

    // To play and pause Song
    function altSong(){
        //The .paused is an inherent property with every audio element
        if(!audioRef.current.paused){
            audioRef.current.pause();
            myRef.current.innerHTML = '<i class="fa-solid fa-play"></i>'
        }
        else{
            audioRef.current.play();
            myRef.current.innerHTML = '<i class="fa-solid fa-pause"></i>'
        }
    }

    // To go to prev song in collection
    function prevSong(){
        if(record.track.length==0||!record.song.songURL){
            return toast.error('First play a song in a collection')
        }
        dispatch(songBack())
    }

    // To go to next song in collection
    function nextSong(){
        if(record.track.length==0||!record.song.songURL){
            return alert('First play a song in a collection')
        }

        dispatch(songNext())
    }

    // To keep updating the progress bar
    function updateProgress(){
        let width = (audioRef.current.currentTime/audioRef.current.duration)*100;
        progressRef.current.style.width=`${width}%`

    }
    //To skip to a time if user clicks on progress bar
    function setSongTime(e){
        let node = document.getElementById('progress')
        if(!record.song.songURL){
            return toast.error('First play a song to skip to this part')
        }
        console.log('%%',node.clientWidth,e)
        audioRef.current.currentTime = (audioRef.current.duration/parseFloat(node.clientWidth))*(e.nativeEvent.offsetX)
        updateProgress();
    }
    //function to initialize volume level
    function initialiseVolume(){
        document.getElementById('v-bar').style.width = `${audioRef.current.volume*100}%`
    }

    function changeVolume(e){
        if(!record.song.songURL){
            return toast.error('First please play some song to set its volume')
        }
        audioRef.current.volume = (e.nativeEvent.offsetX/document.getElementById('v-container').clientWidth)
        initialiseVolume();
    }

    if(!user){
        return <></>
    }
    
    return(
        <div className={`${classes.bar} container-fluid`}>
            {console.log(name,artist,'come in .....\n\n')}
            <div className={`row w-100 h-100`}>
                <div className='col-lg-3 d-flex align-items-center justify-content-center p-1 h-100'>
                    
                    {record.song.songURL?<div style={{backgroundImage:`url(${record.song.imageURL})`}} className={`mx-4 ${classes.songpic_}`}></div>:<div className={`mx-4 ${classes.songpic}`}></div>}
                    
                    <div className={`h-100 d-flex flex-column justify-content-between`} style={style.white}>
                        <div>{name?name:'Song Name'}</div>
                        <div>{artist?artist.name:'Artist'}</div>
                    </div>
                    <audio ref={audioRef} ></audio>
                </div>
                <div className='col-12 col-lg-6 p-1 h-100 d-flex flex-column align-items-center'>
                    <div className='d-flex justify-content-center mt-2'>
                        <div onClick={prevSong} className='mx-4' style={style.white}><i className="fa-solid fa-backward-step"></i></div>
                        <div onClick={altSong} className='mx-4' style={style.white} ref={myRef}><i className="fa-solid fa-play"></i></div>
                        <div onClick={nextSong} className='mx-4' style={style.white}><i className="fa-solid fa-forward-step"></i></div>
                    </div>
                    <div className='d-flex w-100 h-40 justify-content-center mt-2'>
                        <div id="progress" onClick={setSongTime} className={`${classes.progressBar} rounded`}>
                            <div ref={progressRef} className={`rounded ${classes.coloredpart}`}></div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-3 p-1 h-100 d-flex justify-content-cente align-items-center'>
                    <div style={style.wh_80} className='d-flex justify-content-cente align-items-center'>
                        <div className='mx-5' style={style.volume}><i className="fa-solid fa-volume-high"></i></div>
                        <div onClick={changeVolume} id='v-container' className={` ml-3 rounded ${classes.volumeBar}`}>
                            <div id='v-bar' className={`${classes.vprogress} rounded`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

const style={
    volume:{
        color:'white',
        fontWeight:'bolder',
    },
    white:{
        color:'white',
        fontWeight:'bolder',
        cursor:'pointer'
    },
    bottom:{
        verticalAlign:'baseline',
        margin:'0 !important'
    },
    wh_80:{
        width:'80%',
    }
}
export default Songbar