import React from 'react'
import SmallPrimaryButton from '../components/buttons/SmallPrimaryButton'
import { useNavigate } from 'react-router-dom'
import MediumPrimaryButton from '../components/buttons/MediumPrimaryButton';
import useWindowSize from '../hooks/useWindowsSize';

const PreviewCardTab = () => {
    const { width, height } = useWindowSize();

    const navigate = useNavigate();
  return (
    <div style={{ flex: 2 }}>
        {
            width > 968 && (
                <div className="d-flex">
                    <div style={{ flex: 10 }}></div>
                    <MediumPrimaryButton
                        onClick={() => navigate("/")}
                        disabled={true}
                    >Publicar Cambios</MediumPrimaryButton>
                    <div style={{ flex: 10 }}></div>
                </div>
            )
        }

        <div className="mt-4"></div>
        <div className="text-center">VISTA PREVIA</div>
    </div>
  )
}

export default PreviewCardTab