import classes from '../styles/Queue.module.css'
import {MdKeyboardArrowDown} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { setSongAndTrack } from '../slices/song';
import { getItemFromLocalStorage, TokenKey } from '../utils';
import {login} from '../slices/user';
import toast from 'react-hot-toast'
function Queue(props) {
    const {title,arr} = props;
    const song = useSelector(state=>state.song.value);
    const user = useSelector(state=>state.user.value);
    let dispatch = useDispatch();
    
    function playSong(arr,item){
        console.log('playSong',item.imageURL)
        dispatch(setSongAndTrack({song:item,track:arr}))
    }

    async function selectFavourite(song,toDo){
  
        console.log(song,'jatta........\n\n')
        if(toDo=='favourite'){
            console.log(toDo,'\n\n');
            try{
                let reply = await fetch('https://fastapi-jas-312f1a986e24.herokuapp.com/favourite',{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                    'Authorization':`Bearer ${getItemFromLocalStorage(TokenKey)}`
                },
                body:JSON.stringify(song)
                })
                let response = await reply.json();
                if(response.success){
                    dispatch(login(response.token))
                }
                else{
                    toast.error('Already favourited')
                }
            }catch(err){
                return toast.error('Error in favouriting song')
            }
            

        }
        else if(toDo=='unfavourite'){
            console.log(toDo,'\n\n');
            try{
                let reply = await fetch('https://fastapi-jas-312f1a986e24.herokuapp.com/unfavourite',{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                    'Authorization':`Bearer ${getItemFromLocalStorage(TokenKey)}`
                },
                body:JSON.stringify(song)
                })
                let response = await reply.json();
                dispatch(login(response.token))

            }catch(err){
                return toast.error('Error in unfavouriting song')
            }
            
        }
        

    }
    //function to scrolldown on click of keyboard down in case favs exceeds 8
    function scrollDown(){
        var slider = document.getElementById('slider')
        slider.scrollBy(0,200)
    }
    
return (
    <>
    <div className='w-100 row'>
        <div className='col-12'>
        <h2 style={style.align} className="mb-4">{title}</h2>
        </div>
    </div>
    
    <div id='slider' className={` ${classes.list_container} w-100 d-flex row justify-content-center align-items-start`}>
        {arr.map((item,index)=>
            <div onClick={()=>playSong.bind(null,arr,item)()} className='col-10 rounded my-3' style={{cursor:'pointer'}} key={item._id}>
                <div className='row h-100 w-100' >
                    <div style={style.align} className='h-100 col-1 d-flex justify-content-center align-items-center'>
                        {++index+'.'}
                    </div>
                    <div  className='h-100 col-2 p-0 d-flex justify-content-center align-items-center'>
                        <img src={item.imageURL} className={`rounded ${classes.img_fit}`}>
                            
                        </img>
                    </div>
                    <div className='h-100 col-7 d-flex justify-content-start align-items-center'>
                        <div style={style.color}>{item.name}<br></br>{item.duration}</div>
                    </div>

                    <div className='h-100 col-1 d-flex justify-content-start align-items-center'>
                    {user.favourites&&user.favourites.some(elem=>elem.id===item.id)?<i onClick={(e)=>{e.stopPropagation();selectFavourite(item,'unfavourite')}} style={style.iconF} className="fa-solid fa-heart"></i>:<i onClick={(e)=>{e.stopPropagation();selectFavourite(item,'favourite')}} style={style.icon} className="fa-solid fa-heart"></i>}
                    </div>
                </div>
            </div>
        )}
        
    </div>
    
    <MdKeyboardArrowDown onClick={scrollDown} size={40} className={` ${classes.icon}`}/>
    
    
    </>
)

}

const style={
    align:{
        color:'white',
        textAlign:'center',
        fontWeight:'bolder'
    },
    color:{
        color:'white',
        fontWeight:'bolder'
    },
    icon:{
        color:'white',
        fontWeight:'bolder',
        flexShrink:'1'
    },
    iconF:{
        color:'red',
        fontWeight:'bolder',
        flexShrink:'1'
        
    }
    
}
export default Queue;