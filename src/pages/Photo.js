import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Webcam from 'react-webcam';
import {withPhoto} from "../lib/PhotoProvider"


class Photo extends Component {

    state={
        isTaken:false,
    };

    componentDidMount = () => {
        this.takePhoto();
    }

    takePhoto = () => {
        setTimeout(() => {
            const screenshot = this.refs.webcam.getScreenshot();
            this.props.setPhoto(screenshot);
            this.setState({isTaken:true});
        }, 3000);
    }

    handleClick = () => {
        this.setState({isTaken:false});
    }

    render() {
        const {isTaken, handleClick} = this.state;
        const {screenshot, style, message} = this.props;
        const validation = isTaken ? style : "screenshot";

        return (
            <div className='div-image'>
                <div className='background'>
                    <div className='container'>
                        <p className=' white bold'>Take a picture</p>
                        <p className=' white'>Fit your ID card inside the frame.</p>
                        <p className=' white'>The picture will be taken automatically.</p>
                        <div className="webcam">

                            { isTaken 
                                ? <img className={validation} src={screenshot} /> 
                                : <Webcam className='video' audio ={false} ref='webcam'/> 
                            }

                        </div> 

                        <p className='confirmation'>{message}</p>   
                        
                        {isTaken ? null : <p className='white'>💡 Room lightning is too low</p>}
                        
                        <Link className='cancel' onClick={handleClick} to={"/"}>CANCEL</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withPhoto(Photo)