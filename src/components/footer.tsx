import './footer.css'
import LogoImage from '/Users/rthieu/study-website/src/images/login.png'

export const Footer = () => {
    return(
        <div>
           <hr className="footerhr" />
           <footer className="footer">
                <div className="footer-container">
                    <div className="footer__content">
                    <div className="footer__section footer__section--main">
                    <img src={LogoImage} alt="Logo" className="footer__logo" width="1000" height="1000" />
                    <h1 className="custom-heading">
                    <span className="gradient-text-footer">Learn with AI</span>
                    </h1>
                </div>
                </div>
                <ul className="footer-column">
                    <li className="footerelementheading">Navigate</li>
                    <li className="footerelement"><a href="/upload">Upload</a></li>
                    <li className="footerelement"><a href="/assignments">Assignments</a></li>
                </ul>
                <ul className="footer-column">
                <li className="footerelementheading">SpeakScribe</li>
                    <li className="footerelement">Made in 2024</li>
                    <li className="footerelement">@PennApps</li>
                </ul>
            </div>
            </footer>

        </div>
    );
}