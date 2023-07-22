import classes from '../styles/Navbar.module.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/user';
function NavBar() {
    const navigate = useNavigate()
    const user = useSelector(state=>state.user.value)
    let pp = user ? user.avatar:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpaperaccess.com%2Fsolid-grey&psig=AOvVaw3ZDbqaAyxKLNQQSX6KXtXx&ust=1669223326825000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCOCIqM6jwvsCFQAAAAAdAAAAABAD'
    let dispatch = useDispatch();


    async function Signout(){
        dispatch(logout());
    }

    const style = {
        navdark:{
            backgroundColor:'rgb(0,0,0)'
        },
        brand:{
            fontFamily: "'Inner Vintage', sans-serif",
            color:'white',
            margin:'0 !important',
            fontWeight:'bold',
        },
        person:{
            backgroundImage:`url(${pp})`,
            backgroundSize:'cover'
        }
    }

    
    

    return(
        <nav className="navbar navbar-expand-lg" style={style.navdark}>
            <div className="container-fluid">
                <div className='navbar-brand d-flex'>
                    <div className={`${classes.w_6} me-3`}>
                        <Link to='/jasmusic'><div className={classes.aspectratio}></div></Link>
                    </div>
                    
                </div> 

                {user ? 
                <>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className={`navbar-toggler-icon ${classes.icon}`}><i className="fa-solid fa-bars"></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto mb-2 mb-lg-0 w-75">

                            <li className="nav-item my-3 me-lg-5">
                                <Link className={classes.homelinks} aria-current="page" to="/jasmusic">Home</Link>
                            </li>
                            <li className="nav-item my-3 ml-lg-5">
                                <Link className={classes.links} aria-current="page" to="/jasmusic/user">Favourites</Link>
                            </li>
                            
                            <li className='nav-item my-2 mb-3 ml-lg-5'>
                                
                                    <button onClick={Signout} type="button" className={`btn btn-outline-danger ${classes.signout}`}>Sign Out</button>
                                
                            </li>
                            <li className='nav-item mt-1'>
                                <Link className={classes.links} aria-current="page" to="/jasmusic/user">
                                    <div className={classes.profilepic} style={style.person}></div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </> : <> </>}
                
                
                
            </div>
        </nav>
    )

}


export default NavBar;