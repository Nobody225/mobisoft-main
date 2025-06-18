import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  People as PeopleIcon,
  Store as StoreIcon,
  Inventory2 as Inventory2Icon,
  ShoppingCart as ShoppingCartIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
} from '@mui/icons-material';
import AdminOverview from '../components/admin/AdminOverview';

// Composant Paper personnalisé avec le style des autres tableaux de bord
const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '0.625rem',
  boxShadow: '0 8px 20px rgba(30, 58, 95, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  background: 'linear-gradient(to bottom right, #ffffff, #f0f4f8)',
  border: '1px solid rgba(30, 58, 95, 0.05)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 15px 35px rgba(30, 58, 95, 0.2)',
  },
}));

// Composant Card personnalisé avec le style des autres tableaux de bord
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '0.625rem',
  boxShadow: '0 6px 15px rgba(30, 58, 95, 0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  background: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)',
  border: '1px solid rgba(30, 58, 95, 0.05)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 30px rgba(30, 58, 95, 0.15)',
  },
}));

// Section d'accueil stylisée
const WelcomeSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to right, #1e3a5f 0%, #4180be 100%)',
  color: '#ffffff',
  padding: theme.spacing(4),
  borderRadius: '0.625rem',
  marginBottom: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  boxShadow: '0 8px 25px rgba(30, 58, 95, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
    transform: 'rotate(45deg)',
    pointerEvents: 'none',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-dashboard-tabpanel-${index}`}
      aria-labelledby={`admin-dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  // État pour le nom de l'administrateur (à remplacer par les données réelles de l'utilisateur)
  const [adminName, setAdminName] = useState('[Nom de l\'Admin]'); 

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabs = [
    { label: 'Vue d\'ensemble', icon: <DashboardIcon /> },
    { label: 'Gestion des Utilisateurs', icon: <PeopleIcon /> },
    { label: 'Gestion des Marchands', icon: <StoreIcon /> },
    { label: 'Vue d\'ensemble des Produits', icon: <Inventory2Icon /> },
    { label: 'Gestion des Commandes', icon: <ShoppingCartIcon /> },
    { label: 'Paramètres Système', icon: <SettingsIcon /> },
  ];

  const platformStats = [
    {
      title: 'Utilisateurs Totaux',
      value: '15,000+',
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#4180be' }} />,
    },
    {
      title: 'Marchands Enregistrés',
      value: '500+',
      icon: <StoreIcon sx={{ fontSize: 40, color: '#009639' }} />,
    },
    {
      title: 'Produits Listés',
      value: '10,000+',
      icon: <Inventory2Icon sx={{ fontSize: 40, color: '#fcd116' }} />,
    },
    {
      title: 'Commandes Traitées',
      value: '2,500+',
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: '#ce1126' }} />,
    },
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4f8 0%, #e0eaf4 100%)',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Section d'accueil Administrateur */}
        <WelcomeSection>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 64, height: 64, border: '2px solid rgba(255,255,255,0.4)' }}>
                <AdminPanelSettingsIcon sx={{ fontSize: 40, color: '#ffffff' }} />
              </Avatar>
              <Box>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  Bienvenue, {adminName} !
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Tableau de bord de l'administrateur AfricaHub. Gérez l'ensemble de la plateforme.
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                  <Chip 
                    label="Administrateur" 
                    icon={<ManageAccountsIcon sx={{ color: 'inherit !important' }} />}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      '& .MuiChip-icon': { color: 'inherit' }
                    }}
                  />
                  <Chip 
                    label="Connecté" 
                    icon={<CheckCircleOutlineIcon sx={{ color: 'inherit !important' }} />}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      '& .MuiChip-icon': { color: 'inherit' }
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Button 
              variant="outlined" 
              sx={{
                color: '#ffffff',
                borderColor: 'rgba(255,255,255,0.4)',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#ffffff',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Voir les logs système
            </Button>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {platformStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box display="flex" alignItems="center" gap={1}>
                  {stat.icon}
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </WelcomeSection>

        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: '#1e3a5f',
            fontWeight: 'bold',
            mb: 4,
            textShadow: '0 1px 2px rgba(30, 58, 95, 0.1)',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: 0,
              width: '60px',
              height: '4px',
              background: 'linear-gradient(to right, #1e3a5f, #4180be)',
              borderRadius: '2px',
            }
          }}
        >
          AfricaHub - Tableau de Bord Administrateur
        </Typography>

        {/* Onglets principaux */}
        <DashboardPaper>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  color: '#1e3a5f',
                  textTransform: 'none',
                  fontWeight: 'normal',
                  minHeight: '48px',
                  px: 2,
                  mr: 1,
                  borderRadius: '8px 8px 0 0',
                  '&.Mui-selected': {
                    color: '#ffffff',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #1e3a5f, #4180be)',
                    boxShadow: '0 2px 8px rgba(30, 58, 95, 0.2)',
                  },
                  '&:hover': {
                    bgcolor: 'rgba(30, 58, 95, 0.05)',
                    color: '#1e3a5f',
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  icon={tab.icon}
                  label={tab.label}
                  iconPosition="start"
                  sx={{
                    '& .MuiSvgIcon-root': {
                      color: activeTab === index ? '#ffffff' : '#1e3a5f',
                      mr: 0.5,
                    }
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Contenu des onglets */}
          <TabPanel value={activeTab} index={0}>
            <AdminOverview />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Typography variant="h6" sx={{ color: '#1e3a5f', mb: 2 }}>
              Gestion des Utilisateurs
            </Typography>
            {/* Contenu de la gestion des utilisateurs */}
            <Box sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
              <Typography>Tableau de gestion des utilisateurs à venir...</Typography>
            </Box>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Typography variant="h6" sx={{ color: '#1e3a5f', mb: 2 }}>
              Gestion des Marchands
            </Typography>
            {/* Contenu de la gestion des marchands */}
            <Box sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
              <Typography>Tableau de gestion des marchands à venir...</Typography>
            </Box>
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <Typography variant="h6" sx={{ color: '#1e3a5f', mb: 2 }}>
              Vue d'ensemble des Produits
            </Typography>
            {/* Contenu de la vue d'ensemble des produits */}
            <Box sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
              <Typography>Statistiques et gestion des produits à venir...</Typography>
            </Box>
          </TabPanel>

          <TabPanel value={activeTab} index={4}>
            <Typography variant="h6" sx={{ color: '#1e3a5f', mb: 2 }}>
              Gestion des Commandes
            </Typography>
            {/* Contenu de la gestion des commandes */}
            <Box sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
              <Typography>Liste et détails des commandes à venir...</Typography>
            </Box>
          </TabPanel>

          <TabPanel value={activeTab} index={5}>
            <Typography variant="h6" sx={{ color: '#1e3a5f', mb: 2 }}>
              Paramètres Système
            </Typography>
            {/* Contenu des paramètres système */}
            <Box sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
              <Typography>Options de configuration du système à venir...</Typography>
            </Box>
          </TabPanel>
        </DashboardPaper>
      </Container>
    </Box>
  );
};

export default AdminDashboard; 