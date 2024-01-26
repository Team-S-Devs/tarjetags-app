import React from 'react'
import MediumPrimaryButton from '../components/buttons/MediumPrimaryButton';
import useWindowSize from '../hooks/useWindowsSize';

const PreviewCardTab = ({ handleSave, loading }) => {
    const { width, height } = useWindowSize();
  return (
    <div style={{ flex: 2 }}>
        {
            width > 986 && (
                <div className="d-flex" style={{ position: "fixed", marginLeft: 120 }}>
                    <div style={{ flex: 10 }}></div>
                    <MediumPrimaryButton
                        loading={loading}
                        onClick={handleSave}
                        fontSize={21}
                    >Publicar Cambios</MediumPrimaryButton>
                    <div style={{ flex: 10 }}></div>
                </div>
            )
        }

        <div className="mt-4"></div>
        <div className="text-center" style={{ marginTop: 100 }}>AQUÍ IRÁ LA VISTA PREVIA</div>
    </div>
  )
}

export default PreviewCardTab