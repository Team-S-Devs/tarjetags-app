import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../sections/Header';
import BoldTitle from '../components/texts/BoldTitle';
import { SITE_NAME } from '../utils/constants';
import useWindowSize from '../hooks/useWindowsSize';
import GreySubtitle from '../components/texts/GreySubtitle';
import { db } from '../utils/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import PaymentRow from '../components/admin/PaymentRow';
import { Helmet } from 'react-helmet';

const Payments = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(""); 
  const [paymentHistory, setPaymentHistory] = useState([]);
  const { width } = useWindowSize();

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const licenses = userData.licenses || [];
          setPaymentHistory(licenses);
          setUserEmail(userData.email)
        } else {
          console.error('User document not found');
        }

        setLoading(false);
      } catch (error) {
        alert("No se pudo obtener el historial de pagos")
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [userId]);

  useEffect(() => {
    document.title = `Historial De Pagos - ${SITE_NAME}`;
  }, []);

  const isPaymentsEmpty = paymentHistory.length < 1; 

  return (
    <div className="profile-container">
      <Helmet>
        <title>{`Historial de Pagos - ${SITE_NAME}`}</title>
        <meta
          name="description"
          content="Crea tarjetas de presentación irresistibles que te abran puertas y
            te conecten con oportunidades ilimitadas."
        />
      </Helmet>
      <Header />
      <Header />

      <div className="my-5 my-md-0 d-flex flex-column justify-content-center container cont-profile1" style={{ minHeight: "100vh" }}>
        <BoldTitle variant={width > 500 ? "h3" : "h5"} textAlign="center">
          Historial De Pagos
        </BoldTitle>

        <GreySubtitle variant={width > 500 ? "h5" : "h6"} textAlign="center">
          {userEmail}
        </GreySubtitle>

        <div className="bg-white adminTable">
          {loading ? (
            <div className="d-flex mt-4 mb-2 align-items-center justify-content-center loader_style">
              <span className="loader"></span>
            </div>
          ) :
            isPaymentsEmpty
              ? (<div className='container-not-found'>
                  <div className="not-found-style">
                    <h4>No hay registro de pagos</h4>
                    <p>prueba otro usuario</p>
                  </div>
                </div>)
              : (<div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nº</th>
                    <th >Fecha de Pago</th>
                    <th>Tipo de licencia</th>
                    <th>Codigo de descuento</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map(((license, index) => (
                    <PaymentRow data={license} nro={index} />
                  )))}
                </tbody>
              </table>
            </div>)
            }
        </div>
      </div>
    </div>
  );
};

export default Payments;
