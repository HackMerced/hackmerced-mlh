import React, { Component } from 'react';
import './assets/css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpMsg: '',
      signUpEmail: '',
      signedUp: false,
      entered: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
      signedUp: false,
      entered: false
    });
  }

  onSignUp() {
    // Grab state and inform user of occurence
    const {
      signUpEmail,
    } = this.state;

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json',json);

        if (json.success) {
          this.setState({
            signUpEmail: ''
          });
        }

        this.setState({
          signUpMsg: json.message,
          signedUp: json.success,
          entered: true
        });

      });
  }

  render() {
    const {
      signUpEmail,
      signUpMsg
    } = this.state;

    return (
      <div className="App">
        <body className="body">
          <div className="header-section">
            <div className="container w-container">
              <h1>HackMerced</h1>
              <p className="subtitle">March 1st - 3rd @ UC Merced</p>
              <div className="sign-up-form w-form">
                <form name="wf-form-signup-form" data-name="Signup Form" className="w-clearfix" onSubmit={this.handleSubmit}>
                  <p className="prompt">Join our mailing list!</p>
                  <input
                    type="email"
                    name="email"
                    data-name="Email"
                    placeholder="Enter your email address"
                    maxlength="256"
                    value={signUpEmail}
                    onChange={this.onTextboxChangeSignUpEmail}
                    className="field w-input"
                    required
                  />
                  <button
                    type="submit"
                    onClick={this.onSignUp}
                    className="button w-button">
                    Get Notified
                  </button>
                </form>
                <p className={!(this.state.entered) ? 'none' :
                  (this.state.signedUp) ? 'success-message fadeIn' : 'error-message fadeIn'}
                  >
                  {signUpMsg}
                  </p>
              </div>
            </div>
          </div>

          <a id="mlh-trust-badge" style={{ display:"block", maxWidth:"100px", minWidth:"60px", position:"fixed", left:"50px", top:"0", width:"10%", zIndex:"10000"}}
            href="https://mlh.io/seasons/na-2019/events?utm_source=na-hackathon&amp;utm_medium=TrustBadge&amp;utm_campaign=2019-black&amp;utm_content=black"
            target="_blank">
            <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-black.svg" alt="Major League Hacking 2019 Hackathon Season"
            style={{width:"100%"}} className="mlh-badge" />
          </a>
        </body>
      </div>
    );
  }
}

export default App;
