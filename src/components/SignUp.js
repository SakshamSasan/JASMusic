import { useNavigate,Link } from 'react-router-dom';
import classes from '../styles/Signin.module.css';
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {login} from '../slices/user'
function SignIn() {
    const navigate = useNavigate();
    const user = useSelector(state=>state.user.value);
    var [name,setName]=useState("");
    var [email,setEmail]=useState("");
    var [password,setpwd]=useState("");
    var [loading,setloading] = useState(false);
    let dispatch = useDispatch();

    useEffect(()=>{
        console.log(user,'hghf......\n')
        if(user){
            return navigate('/')
        }
    },[user])

    async function handleSubmit(e){
        e.preventDefault();
        setloading(true)
        if(!email||!name||!password){
            setloading(false)
            return toast.error('Please fill all the details')
        }
        try{
            let res = await fetch('https://fastapi-jas-312f1a986e24.herokuapp.com/signup',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({email,name,password})
            })
            let reply = await res.json();
            setloading(false);
            dispatch(login(reply.token))
        }catch(err){
            setloading(false);
            return toast.error('Please fill all details')
        }
        setloading(false);
    }

   
    return (
        <>
            <div className="container" style={style.m_10}>
            <h3 className={classes.heading}>Sign Up to start the party</h3>
            <div className='row d-flex justify-content-center'>
                <div className='col w-100 '>
                    <form className='w-100 row d-flex flex-column align-items-center' action="" method="POST">
                        <div className="col col-md-7 col-lg-5 my-3 d-flex flex-column align-items-stretch ">

                            <label className='w-100' style={style.label}>Email
                            <input type='email' onChange={(e)=>setEmail(e.target.value)} className='w-100 border py-2 px-2 rounded border-dark w-adjust' id="email" name="email" required placeholder="abc@example.com"/>
                            </label>
                            
                        </div>

                        <div className="col col-md-7 col-lg-5 my-3  d-flex flex-column align-items-stretch ">

                            <label className='w-100' style={style.label}>Name
                            <input type='text' onChange={(e)=>setName(e.target.value)} className='w-100 border py-2 px-2 rounded border-dark w-adjust' id="name" name="name" required placeholder="Raj"/>
                            </label>
                            
                        </div>
                        
                        <div className="col col-md-7 col-lg-5 my-3 d-flex flex-column align-items-stretch ">

                            <label className='w-adjust' style={style.label}>Password
                            <input onChange={(e)=>setpwd(e.target.value)} type='password' className='w-100 border py-2 px-2 rounded border-dark' id="pwd" name="password" required/>
                            </label>
                            
                        </div>
                        <div className='w-100 d-flex justify-content-center' >
                            <button onClick={handleSubmit} disabled={loading} type="submit" style={style.button} className={`bg-danger rounded-pill border my-3 m-auto ${classes.googlepill}`}>
                            {loading?'Signing Up...':"Sign Up"}
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
            
            
            <div className='row w-100 '>
                <div className='col d-flex justify-content-center'>
                <div className="my-3 d-flex justify-content-center align-items-center" style={style.align}>
                    <Link to='/signin'>Already a user ? Click here to Log In</Link>
                </div>

                </div>
            </div>
            </div>
        </>
    );
}
export default SignIn;
const style={
    m_10:{
        marginTop:'5rem'
    },
    label:{
        fontWeight:'bolder'
    },
    align:{
        fontWeight:'bolder',
        overflowWrap:'break-word',
        textAlign:'center'
    },
    button:{
        color:'white'
    }
}