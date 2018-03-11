import React, { Component, PropTypes } from 'react'
import LinkPreview from '../utilities/react-native-link-preview'
import styled from 'styled-components'
// const LinkPreview = require('react-native-link-preview')

const propTypes = {
  link: PropTypes.string
}

const LinkCard = styled.div`
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  transition: 0.4s;
  border-radius: 5px;
`
const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 16px;
`
const LinkImage = styled.div`
  border-radius: 5px 5px 0 0;
  height: 60px;
  width: 100%;
`

class ShowLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingMeta: false,
      meta: null
    }
  }

  componentDidMount() {
    if (this.props.link) {
      this.setState({
        loadingMeta: true
      })
      LinkPreview.getPreview(this.props.link)
        .then(meta => {
          this.setState({ loadingMeta: false, meta })
        })
        .catch(err =>
          this.setState({
            loadingMeta: false,
            meta: null
          })
        )
    }
  }

  render() {
    return (
      <div style={{ padding: '10px 16px' }}>
        {this.state.meta ? (
          <div
            onTouchTap={() => {
              // window.navigator ?
              // window.navigator.app.loadUrl(
              //   this.state.meta.url
              //   , {openExternal : true}) :
              window.open(this.state.meta.url, '_system')
            }}>
            <LinkCard>
              {this.state.meta.images.length > 0 ? (
                <img
                  src={this.state.meta.images[0]}
                  style={{
                    height: '60px',
                    width: '100%',
                    objectFit: 'contain',
                    padding: '3px 5px',
                    borderRadius: '10px'
                  }}
                />
              ) : null}
              <LinkContainer>
                <h4>
                  <b>{this.state.meta.title}</b>
                </h4>
                <p>{this.state.meta.description}</p>
              </LinkContainer>
            </LinkCard>
          </div>
        ) : null}
      </div>
    )
  }
}
ShowLink.propTypes = propTypes
export default ShowLink
