import { Dialog, Typography, DialogActions, Button } from "@mui/material";
import React from "react";
import useWindowSize from "../../hooks/useWindowsSize";
import { useNavigate } from "react-router-dom";
import { FaLock, FaStar } from "react-icons/fa";
import { LICENSE_TYPES } from "../../utils/constants";

const UpdateLicenseModal = ({
  open,
  setOpen,
  keyLic = "admin",
  handleSave,
}) => {
  const { width } = useWindowSize();
  const navigation = useNavigate();
  return (
    <Dialog open={open} onClose={() => setOpen(false)} style={{ margin: 0 }}>
      <div
        style={{
          padding: width > 768 ? 24 : 16,
          marginLeft: 14,
          marginTop: 12,
        }}
      >
        <Typography variant="h5" color={"primary"}>
          <FaLock style={{ marginRight: 12, marginBottom: 6 }} />
          Función bloqueada
        </Typography>
      </div>
      <Typography
        style={{
          wordWrap: "break-word",
          textAlign: "left",
        }}
        marginLeft={5}
        marginRight={2}
        marginBottom={2}
      >
        {keyLic === "products" + LICENSE_TYPES.PROFESSIONAL
          ? "Llegaste a la máxima cantidad de productos/servicios que se puede añadir"
          : keyLic === "products"
          ? "Llegaste a la máxima cantidad de products que se puede añadir con tu actual licencia"
          : `Esta función solo está disponible para usuarios con Licencia ${keyLic}`}
      </Typography>
      <DialogActions style={{ marginBottom: 16, marginRight: 20 }}>
        {keyLic === "products" + LICENSE_TYPES.PROFESSIONAL ? (
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            color="primary"
          >
            Aceptar
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                handleSave();
                navigation("/plans");
              }}
              startIcon={<FaStar />}
              variant="contained"
              color="primary"
            >
              Adquirir Licencia
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UpdateLicenseModal;
