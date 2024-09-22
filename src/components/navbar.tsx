import './navbar.css'
import {Link} from 'react-router-dom';
import Logo from '../images/login.png'
import {auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'
import defaultPfp from '../images/defaultpfp.png'

export const Navbar = () => {
    const [user] = useAuthState(auth);

    const signUserOut = async() => {
        await signOut(auth);
    }
    const teacher = 'xzyYKXWUm4MWHY28U5aJdA8kpp72';
    return(
        <div>
        <nav className="nav">
        <div className="navbar">
            <div className="logo-container">
            <Link to="/"><img src={Logo} alt="logo" className="logoimage" /></Link>
            </div>
            {!user ? (
          <>
            <div className="nav-links">
            <Link to="login">
            <button type="button" className="button">Sign in</button></Link>
            </div>
            </>
        ) : user.uid === teacher ?(
          <div className="nav-links">
          <Link to ="/upload" className="navbarlink">Upload</Link>
            <Link to ="/assignments" className="navbarlink">Assignments</Link>
            
            <p className="displayname">{user.displayName}</p>
            <img src={defaultPfp } className="pfp" alt="User" />
            <button type="button" className="button" onClick={signUserOut}>
            Sign Out</button>
          </div>
        ):(
           <div className="nav-links">
            <Link to ="/assignments" className="navbarlink">Assignments</Link>
            
            <p className="displayname">{user.displayName}</p>
            <img src={defaultPfp } className="pfp" alt="User" />
            <button type="button" className="button" onClick={signUserOut}>
            Sign Out</button>
           </div> 
        )}
            
        </div>
        </nav>
        <hr className="navbarhr"/>
        </div>
    );
}


/**
 
if teacher is logged in, then add upload to navbar
<Link to="/">Home</Link>
            <Link to ="upload">Upload</Link>
* 
 */


     /*       <nav className="nav">
            <div className="navbar">
                <Link to="/"><img src={Logo} alt="logo" className="logoimage" /></Link>
                {!user ? (
                 <></>
                ) : (
                    <>
                <Link to ="/upload">Upload</Link>
                <Link to ="/chat">Chat</Link>
                </>
                )}
                <Link to="login">
                <button type="button" className="button">Login</button>
    
                </Link>
            </div>
            </nav>*/