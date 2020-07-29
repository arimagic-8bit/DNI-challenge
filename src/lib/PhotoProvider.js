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
                isCorrect,
                isRedirect
            }) => {
              return (
                <WrappedComponent
                    screenshot={screenshot}
                    setPhoto={setPhoto}
                    style={style}
                    message={message}
                    isCorrect={isCorrect}
                    isRedirect={isRedirect}
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
        isRedirect: false
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
      let redirect;
      if (outcome === "Too Much Glare"){
        borderStyle = "redBorder";
        validation = false;
      }
      else if (outcome === "Approved") {
        borderStyle = "greenBorder";
        message = "✅ Picture taken!";
        validation = true;
        redirect = true;
      }
      this.setState({screenshot:photo, style:borderStyle, isCorrect:validation, isRedirect: redirect, message});
      if (this.state.validation) {
        this.props.history.push("/")
      }
    })
    .catch((err) => console.log(err))
   };


  
    render() {
      const {
        screenshot,
        style,
        message,
        isCorrect,
        isRedirect
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
            isCorrect,
            isRedirect
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
  }
  
  export { withPhoto, PhotoProvider };