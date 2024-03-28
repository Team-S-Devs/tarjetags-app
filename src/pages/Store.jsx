import React, { useEffect, useState } from "react";
import Header from "../sections/Header";
import BoldTitle from "../components/texts/BoldTitle";
import { MetaTags } from "react-meta-tags";
import { SITE_NAME } from "../utils/constants";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import StoreProductsList from "../sections/StoreProductsList";
import { db } from "../utils/firebase-config";
import StoreProductsCategories from "../sections/StoreProductsCategories";
import SmallPrimaryButton from "../components/buttons/SmallPrimaryButton";
import CircularProgress from "@mui/material/CircularProgress";
import BigPrimaryButton from "../components/buttons/BigPrimaryButton";
import useWindowSize from "../hooks/useWindowsSize";
import ThinTitle from "../components/texts/ThinTitle";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [loadingSaving, setLoadingSaving] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const storeDocRef = doc(db, "admin", "store");
        const storeDocSnapshot = await getDoc(storeDocRef);

        if (storeDocSnapshot.exists()) {
          const storeData = storeDocSnapshot.data();
          if (storeData && storeData.products) {
            setProducts(storeData.products);
            setCategories(storeData.categories);
          } else {
            alert("No hay datos de la tienda disponibles, inténtalo de nuevo.");
          }
        } else {
          alert("No se pudo acceder a los products, inténtalo de nuevo");
        }
      } catch (error) {
        alert("Error obteniendo datos de la tienda", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSave = async () => {
    setLoadingSaving(true);
    try {
      const adminCollectionRef = collection(db, "admin");
      const storeDocRef = doc(adminCollectionRef, "store");

      await updateDoc(storeDocRef, { products, categories });
    } catch (error) {
      alert("No se pudo guardar, inténtalo de nuevo.");
    } finally {
      setLoadingSaving(false);
    }
  };

  const { height, width } = useWindowSize();

  return (
    <div className="container">
      <MetaTags>
        <title>{`Tienda- ${SITE_NAME}`}</title>
      </MetaTags>
      <Header />
      <div
        style={{ flex: 100, marginTop: 100, width: "100%" }}
        className="d-flex flex-column"
      >
        <BoldTitle style={{ flex: 1, marginBottom: 40 }} textAlign="center">
          Tienda
        </BoldTitle>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <ThinTitle variant="h5" color="primary" textAlign="center">
              División de productos
            </ThinTitle>
            <br />
            <StoreProductsCategories
              categories={categories}
              setCategories={setCategories}
            />
            <br />
            <ThinTitle variant="h5" color="primary" textAlign="center">
              Productos
            </ThinTitle>
            <br />
            <StoreProductsList
              products={products}
              setProducts={setProducts}
              categories={categories}
            />
          </>
        )}

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            marginTop: 24,
            position: "fixed",
            bottom: height > 980 ? 140 : 48,
            left: width / 2 - 98,
          }}
        >
          <BigPrimaryButton onClick={handleSave} loading={loadingSaving}>
            Guardar
          </BigPrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Store;
