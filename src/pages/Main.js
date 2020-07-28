import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {withPhoto} from "../lib/PhotoProvider"

class Main extends Component {

    render() {
        const {screenshot, isCorrect, style} = this.props;

        return (
            <div className='page'>
                <header>
                    <h1>BankClient</h1>
                    <hr/>
                </header>
                <div>
                    <h2>Scan your ID</h2>
                    <p className='instructions'>Take a picture. It may take time to validate your personal information.</p>
                   
                    {
                        screenshot 
                        ? <div className="webcam">
                            <img className={style} src={screenshot} alt='DNI photo' />
                            {isCorrect 
                                ? null 
                                : <Link className='retake' to={"/photo"}>RETAKE PICTURE</Link>
                            }
                            {isCorrect 
                                ? <p>✔ ACCEPTED</p> 
                                : <p>X REJECTED</p> 
                            }
                          </div>
                        : <div className='grey'>
                            <div className='take-photo'>
                                <Link className='take' to={"/photo"} >TAKE PICTURE</Link>
                            </div>
                          </div>
                    }
                        
                </div>
            </div>
        )
    }
}

export default withPhoto(Main);