import React from 'react'
import BackButton from '../buttons/BackButton'
import BoldTitle from './BoldTitle'

const BoldTitleWithBackButton = ({ children, centered = false, variant='h3' }) => {
    const getTitleStyle = () => centered ? { marginLeft: 16, flex: 10 } : { marginLeft: 16 };

    return (
        <div className="d-flex align-items-center">
            <div>
                <BackButton />
            </div>
            <div style={getTitleStyle()}>
                <BoldTitle 
                    textAlign={centered ? "center" : "left"} 
                    variant={variant} 
                    color="#000"
                >{children}</BoldTitle>
            </div>
            { centered &&
                <div>
                    <BackButton color='transparent' disabled />
                </div>
            }
        </div>
    )
}

export default BoldTitleWithBackButton