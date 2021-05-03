export default function Footer(){
    return(
        <footer className="footer">
            <div className="footer-up ">
                <div className=" subscribe ">
                    <h4 className="subscribe-title">GET OUR NEWSLETTER</h4>
                    <p className="subscribe-subtitle">Sign up now for designs and inspiration.</p>
                    <div class="subscribe-box">
                        <div className="subscribe-email">
                            <input type="search" id="search" placeholder="Enter Your Email" />
                        </div>
                        <div className=" div-subscribe-btn ">
                            <button  type="button" class="subscribe-btn">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" footer-container" style={{ display:"flex", justifyContent:"center"}}>
                <div className="footer-down">
                        <div className="your-home footer-container">
                            <h4 className="header-title" style={{ margin:"0" }}>Your Home</h4>
                            <p className="header-title">have a nice day.</p>   

                        </div>
                        <div className=" footer-container  footer-down-right">
                            <div className="icons ">
                                <img className="footer-icon" src="https://raw.githubusercontent.com/shakuneko/icon/master/instergram.png"/>
                                <img className="footer-icon" src="https://raw.githubusercontent.com/shakuneko/icon/master/fb.png"/>
                                <img className="footer-icon" src="https://raw.githubusercontent.com/shakuneko/icon/master/twitter.png"/> 
                                <img className="footer-icon" src="https://raw.githubusercontent.com/shakuneko/icon/master/pinterest.png"/> 
                            </div> 
                            <div className=" icons ">
                                <div className="footer-options">
                                    <ul className="footer-about">
                                        <li style={{marginBottom:"0.5rem"}}><a className="options-title">ABOUT</a></li>
                                        <li><a className="options"/></li>
                                        <li><a className="options">About Us</a></li>
                                        <li><a className="options">Newsletter</a></li>
                                        <li><a className="options">Wholesale Program</a></li>
                                        <li><a className="options">Trade Program</a></li>
                                    </ul>
                                    <ul className="footer-help">
                                        <li style={{marginBottom:"0.5rem"}}><a className="options-title">HELP</a></li>
                                        <li><a className="options">Track My Order</a></li>
                                        <li><a className="options">Return My Order</a></li>
                                        <li><a className="options">Contact Us</a></li>
                                    </ul>
                                    <ul className="footer-shop">
                                        <li style={{marginBottom:"0.5rem"}}><a className="options-title">SHOP</a></li>
                                        <li><a className="options">Clock</a></li>
                                        <li><a className="options">Chair</a></li>
                                        <li><a className="options">Table</a></li>
                                        <li><a className="options">Light</a></li>
                                        <li><a className="options">Book Shelf</a></li>
                                    </ul>
                                </div> 
                            </div>
                        </div>
                        <div style={{ width:"100%", display:"flex", justifyContent:"center", flexDirection:"column" }}>
                            <hr className=" footer-line "/> 
                            <p className=" copyright ">© 2021 Your Home. All Rights Reserved.</p>
                        </div>


   
                </div>
                
            </div>
        </footer> 
        
         
    );
}