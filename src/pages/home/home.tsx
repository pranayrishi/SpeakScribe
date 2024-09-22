import HomeImage from '../../images/home.png'
import {Link} from 'react-router-dom';
import './home.css'
import ReadImage from '../../images/read.png'
import ListenImage from '../../images/listen.png'
import TouchImage from '../../images/touch.png'
import SimpleImage from '../../images/simple.png'
import MultiImage from '../../images/multi.png'
import Flashcards from '../../images/flashcards.png'
import Assignments from '../../images/assignment.png'

export const Home = () => {
    
    return(
        <div>
        <div className="container">
            <div className="text-container">
                <h1>Your learning in <span className="purple-gradient">multiple forms.</span></h1>
                <h3 className="text-description">SpeakScribe helps explore the right learning style for you!</h3>
                
                <Link to="/login"><button className="getstarted">Get Started</button></Link>
            </div>
            <div className="image-container">
                <img src={HomeImage} alt="home pic" className="home-image" />
            </div>
        </div>

        <div className="home-second-section">
            <h2>Leverage AI to study your teacher's notes.</h2>
            <div className="threeblock-container">
                <div className="left-container">
                    <img src={ReadImage} alt="read" className="threeblock-icon"/>
                    <h1>visual</h1>
                    <p className="threeblock-description">read your notes</p>
                </div>
                <div className="middle-container">
                    <img src={ListenImage} alt="listen" className="threeblock-icon"/>
                    <h1>auditory</h1>
                    <p className="threeblock-description">hear your notes</p>
                </div>
                <div className="right-container">
                    <img src={TouchImage} alt="touch" className="threeblock-icon" />
                    <h1>kinesthetic</h1>
                    <p className="threeblock-description">hands-on activities</p>
                </div>
            </div>
        </div>
        
        <div className="home-features-section">
            <h1>Features</h1>
        </div>

        <div className="grid-container">
  <div className="grid-item">
    <h2>Simplicity</h2>
    <p>Our interface is extremely easy to navigate and use!</p>
    <img src={SimpleImage} alt="simple"className="features-icon" />
  </div>
  <div className="grid-item">
    <h2>Multimodality</h2>
    <p>Get assignment notes from audio and video!</p>
    <img src={MultiImage} alt="multi" className="features-icon" />
  </div>
  <div className="grid-item">
    <h2>Flashcards</h2>
    <p>Read over your notes!</p>
    <img src={Flashcards} alt="flashcards" className="features-icon" />
  </div>
  <div className="grid-item">
    <h2>Personalized Assignments</h2>
    <p>Get assignments tailored to you!</p>
    <img src={Assignments} alt="assignments" className="features-icon" />
  </div>
</div>
    </div>
    );
}




