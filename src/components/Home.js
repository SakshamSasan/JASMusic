import classes from '../styles/Home.module.css'
import Queue from './Queue'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteItemFromLocalStorage, getItemFromLocalStorage, setItemInLocalStorage, TokenKey } from "../utils";
import { useDispatch } from 'react-redux';
import {setSongAndTrack} from '../slices/song'

function Home(){
    
    var [homeData,setHomeData] = useState({});
    var navigate = useNavigate();
    var [loading,setLoading] = useState(true);
    let dispatch = useDispatch();

    function playSong(arr,item){
        dispatch(setSongAndTrack({song:item,track:arr}))
    }

    useEffect(()=>{
        async function fetchSongs() {
            try{
                let url = "https://fastapi-jas-312f1a986e24.herokuapp.com/home"
                let songs = await fetch(url,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${getItemFromLocalStorage(TokenKey)}`
                    }
                });
                let data = await songs.json()
                setHomeData(data)
                setLoading(false)
                
            }catch(err){
                console.log('!!Error in fetching Home Page Data',err)
                alert('There has been an error in loading home page: ',err)
            }
            
        }

        fetchSongs();
    },[])

    function redirect(e) {
    
        navigate(`/jasmusic/artist/${e}`)
    }

    

    return(
        <div>
            {loading? <h1 className='mt-5' style={style.loading}>Loading....</h1>:
            <>
            <div className={`container-fluid ${classes.body} `}>
            <div className='row'>
                <div className='col-12 col-lg-8 px-2 pt-5'>
                    <h2 className='m-auto' style={style.align}>Top Artists</h2>
                    <div className="w-100 my-5 d-flex justify-content-center flex-nowrap">
                        <div className={classes.top_artists_wrapper}>
                            <div onClick={redirect.bind(null,14)} className={`${classes.top_artists} ${classes.center_image} ${classes.honey} rounded`}></div>
                        </div>
                        <div className={classes.top_artists_wrapper}>
                            <div onClick={redirect.bind(null,4)} className={`${classes.top_artists} ${classes.center_image} ${classes.drake} rounded`}></div>
                        </div>
                        <div className={classes.top_artists_wrapper}>
                            <div onClick={redirect.bind(null,64)} className={`${classes.top_artists} ${classes.center_image} ${classes.ap} rounded`}></div>
                        </div>
                        
                        
                    </div>
                    <h2 className='m-auto my-5' style={style.align}>Other Popular Artists</h2>
                    <div className={`${classes.opa} w-100 my-4 d-flex justify-content-center flex-nowrap`}>
                        <div onClick={redirect.bind(null,24)}>
                            <div className={classes.center_image}><div className={`${classes.center_image} ${classes.weeknd}`}></div></div>
                        </div>
                        <div onClick={redirect.bind(null,84)}>
                            <div className={classes.center_image}><div className={`${classes.center_image} ${classes.diljit}`}></div></div>
                        </div>
                        <div onClick={redirect.bind(null,74)}>
                            <div className={classes.center_image}><div className={`${classes.center_image} ${classes.shinny}`}></div></div>
                        </div>
                        <div onClick={redirect.bind(null,34)}>
                            <div className={classes.center_image}><div className={`${classes.center_image} ${classes.byoung}`}></div></div>
                        </div>
                        <div onClick={redirect.bind(null,54)}>
                            <div className={classes.center_image}><div className={`${classes.center_image} ${classes.imran}`}></div></div>
                        </div>
                        <div onClick={redirect.bind(null,44)}>
                            <div className={classes.center_image}><div className={`${classes.center_image} ${classes.prophec}`}></div></div>
                        </div>
                        
                    </div>
                </div>
                <div className="col-12 col-lg-4 pt-5 d-flex flex-column align-items-center">
                    <Queue title={'Queue'}
                    arr = {homeData.queue}
                    />
                </div>
            </div>
        </div>
        
        <div className={`${classes.body2} container-fluid`}>
            <h1 style={style.align}>Latest English</h1>
            <div className="row my-5 d-flex justify-content-center align-items-center">
                {homeData.latestEnglish.map(item=>
                    <div onClick={playSong.bind(null,homeData.latestEnglish,item)} className='col-4 my-3 rounded col-lg mx-2' style={style.card} key={item._id}>
                    <div style={{backgroundImage:`url(${item.imageURL})`}} className={`rounded my-3 ${classes.img_fit}`}>
                        
                    </div>
                    <div className='' style={style.align}>
                        <p>{item.name}<br></br>{item.duration}</p>
                    </div>
                </div>)}  
            </div>
            <h1 style={style.align}>Latest Punjabi</h1>
            <div className="row my-5 d-flex justify-content-center align-items-center">
                {homeData.latestPunjabi.map(item=>
                    <div onClick={playSong.bind(null,homeData.latestPunjabi,item)} className='col-4 my-3 rounded col-lg mx-2' style={style.card} key={item._id}>
                    <div style={{backgroundImage:`url(${item.imageURL})`}} className={`rounded my-3 ${classes.img_fit}`}>

                    </div>
                    <div className='' style={style.align}>
                        <p>{item.name}<br></br>{item.duration}</p>
                    </div>
                </div>)}  
            </div>
        </div>
        
        
        </>    
}
        </div>
    )
}

const style={
    loading:{
        textAlign:'center',
        fontWeight:'bold'
    },
    align:{
        color:'white',
        textAlign:'center',
        fontWeight:'bolder'
    },
    blue:{
        backgroundColor:'blue'
    },
    card:{
        backgroundColor:'rgba(0,0,0,0.6)',
        cursor:'pointer'
    }
}
export default Home;