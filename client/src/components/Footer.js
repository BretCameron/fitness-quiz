import React from 'react'

export default class Footer extends React.PureComponent {
  shouldComponentUpdate = (nextProps, nextState) => {
    return false;
  }

  render() {
    return (
      <div className="footer">
        <div className="container">
          <p><strong>Need Help? Email us and one of our team will get back to you: <a href="support@rogerhuynhfit.com">support@rogerhuynhfit.com</a></strong></p>
          <img className="logo" src={require('../images/logo.svg')} alt="Design My Fit Logo" />
          <div style={{ display: 'block' }}>
            <a href="https://www.instagram.com/design.my.fit/">
              <img className="social-icon" src={require('../images/instagram.svg')} alt="Instagram" />
            </a>
            <a href="https://www.youtube.com/user/design.my.fit">
              <img className="social-icon" src={require('../images/youtube.svg')} alt="YouTube" />
            </a>
            <a href="https://www.facebook.com/groups/dmftribe/">
              <img className="social-icon" src={require('../images/facebook.svg')} alt="Facebook" />
            </a>
          </div>
          <hr />
          <p><em>Copyright DesignMyFit.com © 2019</em>. All Rights Reserved.<br /><a href="https://www.designmyfit.com/privacy-policy">Privacy Policy</a> | <a href="https://www.designmyfit.com/terms-and-conditions">Terms</a></p>
        </div>
      </div>
    )
  }
}
