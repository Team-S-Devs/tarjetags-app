import React from 'react'
import BackButton from '../buttons/BackButton'
import BoldTitle from './BoldTitle'

const BoldTitleWithBackButton = ({ children, centered = false }) => {
    const getTitleStyle = () => centered ? { marginLeft: 16, flex: 10 } : { marginLeft: 16 };

    return (
        <div className="d-flex align-items-center">
            <div>
                <BackButton className="col-md-1" />
            </div>
            <div style={getTitleStyle()}>
                <BoldTitle className="col-md-8" variant='h3' color="#000">{children}</BoldTitle>
            </div>
        </div>
    )
}

export default BoldTitleWithBackButton