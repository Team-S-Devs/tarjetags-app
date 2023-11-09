import React from 'react'
import GreySubtitle from './GreySubtitle'
import LinkComponent from '../buttons/LinkComponent'

const GreySubtitleWithLink = ({ subtitleText = "", linkText = "", centered, linkSize =22 }) => {
    const getTitleStyle = () => centered ? { marginLeft: 16, flex: 10 } : { marginLeft: 16 };

  return (
    <div className="d-flex align-items-center resp-grey-subtitle-link">
        <div>
            <GreySubtitle>{subtitleText}</GreySubtitle>
        </div>
        <div style={getTitleStyle()}>
            <LinkComponent size={linkSize}>{linkText}</LinkComponent>
        </div>
    </div>
  )
}

export default GreySubtitleWithLink