import React from "react";
import photoService from "./photoService"

const { Consumer, Provider } = React.createContext();

// --> HOC to create Consumer <-- //

const withPhoto = (WrappedComponent) => {
    return class extends React.Component {
      render() {
        return (
          <Consumer>
            {({
                screenshot,
                setPhoto,
                style,
                message,
                isCorrect
            }) => {
              return (
                <WrappedComponent
                    screenshot={screenshot}
                    setPhoto={setPhoto}
                    style={style}
                    message={message}
                    isCorrect={isCorrect}
                  {...this.props}
                />
              );
            }}
          </Consumer>
        );
      }
    };
  };
  
  // --> Provider <-- //
  
  class PhotoProvider extends React.Component {
    state = {
        screenshot: null,
        style: '',
        message: '',
        isCorrect: null,
    };
  
   setPhoto = (photo) => {
     this.setState({screenshot:null})
    photoService
    .validatePhoto(photo)
    .then((response) => {
      const outcome = response.summary.outcome;
      let {message} = this.state;
      let borderStyle;
      let validation;
      if (outcome === "Too Much Glare"){
        borderStyle = "redBorder";
        validation = false;
      }
      else if (outcome === "Approved") {
        borderStyle = "greenBorder";
        message = "✅ Picture taken!";
        validation = true;
      }
      this.setState({screenshot:photo, style:borderStyle, isCorrect:validation, message})
    })
    .catch((err) => console.log(err))
   };

  
    render() {
      const {
        screenshot,
        style,
        message,
        isCorrect
      } = this.state;
  
      const {
        setPhoto
      } = this;
  
      return (
        <Provider
          value={{
            screenshot,
            style,
            message,
            setPhoto,
            isCorrect
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
  }
  
  export { withPhoto, PhotoProvider };