import React from 'react';
import StyledCard from './StyledCard';
import ThinTitle from '../texts/ThinTitle';
import AccentButton from '../buttons/AccentButton';
import lightPurpleSvg from '../../assets/images/light-purple.svg';
import '../../assets/styles/userCard.css';
import { Grid } from '@mui/material';
import FullSmallPrimaryButton from '../buttons/FullSmallPrimaryButton';
import { useNavigate } from 'react-router-dom';

const UserCardDisplay = ({ userCards = [] }) => {
  const navigate = useNavigate();
  return (
    <div style={{ overflow: "hidden" }}>
      <ThinTitle color='primary' variant='h6' textAlign='center'>Mi tarjeta</ThinTitle>
      <div className="mt-3"></div>
      <Grid container spacing={3} justifyContent="center">
        {userCards.map((userCard, index) => (
          <Grid item key={index}>
            <StyledCard>
              <div className="d-flex flex-column align-items-center">
                <img src={(userCard.coverPhoto?.url && userCard.coverPhoto?.url !== "") ? userCard.coverPhoto.url : lightPurpleSvg} alt={`${userCard.title}`} className='portrait-card-img' />
                <img src={(userCard.profilePhoto?.url && userCard.profilePhoto?.url !== "") ? userCard.profilePhoto.url : lightPurpleSvg} alt={`${userCard.title}`} className='profile-card-img' />
                <ThinTitle variant='h4'>{userCard.title === "" ? "Tarjeta" : userCard.title}</ThinTitle>
                <div className="mt-3"></div>
                <AccentButton>{`https://tarjetag.com/${userCard.urlPage}`}</AccentButton>
                <div className="mt-4"></div>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={4}>
                    <FullSmallPrimaryButton onClick={() => navigate(`/editar/${userCard.id}`)}>Editar</FullSmallPrimaryButton>
                  </Grid>
                  <Grid item xs={4}>
                    <FullSmallPrimaryButton>Visitar</FullSmallPrimaryButton>
                  </Grid>
                  <Grid item xs={4}>
                    <FullSmallPrimaryButton>Detalles</FullSmallPrimaryButton>
                  </Grid>
                </Grid>
              </div>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default UserCardDisplay;
