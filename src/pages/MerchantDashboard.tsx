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
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Compare as CompareIcon,
  Business as BusinessIcon,
  Star as StarIcon,
  Analytics as AnalyticsIcon,
  Help as HelpIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  MonetizationOn as MonetizationOnIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
  Info as InfoIcon,
  Article as ArticleIcon,
  BarChart as BarChartIcon,
  CallSplit as CallSplitIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import OrdersTable from '../components/merchant/OrdersTable';
import ProductsManager from '../components/merchant/ProductsManager';
import DashboardOverview from '../components/merchant/DashboardOverview';

// Composant Paper personnalisé avec le style de la page d'accueil
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

// Composant Card personnalisé avec le style de la page d'accueil
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
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const MerchantDashboard: React.FC = () => {
  // État pour le nom du marchand (à remplacer par les données réelles de l'utilisateur)
  const [merchantName, setMerchantName] = useState('[Nom du Marchand]'); 

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabs = [
    { label: 'Vue d\'ensemble', icon: <DashboardIcon /> },
    { label: 'Produits', icon: <InventoryIcon /> },
    { label: 'Comparaisons', icon: <CompareIcon /> },
    { label: 'Profil', icon: <BusinessIcon /> },
    { label: 'Avis', icon: <StarIcon /> },
    { label: 'Analyses', icon: <AnalyticsIcon /> },
    { label: 'Support', icon: <HelpIcon /> },
    { label: 'Notifications', icon: <NotificationsIcon /> },
    { label: 'Paramètres', icon: <SettingsIcon /> },
  ];

  const statCards = [
    {
      title: 'Produits publiés',
      value: 45,
      icon: <ArticleIcon sx={{ fontSize: 40, color: '#4180be' }} />,
    },
    {
      title: 'Vues totales',
      value: '1,234',
      icon: <BarChartIcon sx={{ fontSize: 40, color: '#009639' }} />,
    },
    {
      title: 'Comparaisons',
      value: 567,
      icon: <CallSplitIcon sx={{ fontSize: 40, color: '#fcd116' }} />,
    },
    {
      title: 'Note moyenne',
      value: '4.5/5',
      icon: <StarBorderIcon sx={{ fontSize: 40, color: '#ce1126' }} />,
    },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4f8 0%, #e0eaf4 100%)',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Section d'accueil */}
        <WelcomeSection>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 64, height: 64, border: '2px solid rgba(255,255,255,0.4)' }}>
                <PersonIcon sx={{ fontSize: 40, color: '#ffffff' }} />
              </Avatar>
              <Box>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  Bienvenue, {merchantName} !
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Gérez votre activité avec efficacité.
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                  <Chip 
                    label="Marchand" 
                    icon={<PersonIcon sx={{ color: 'inherit !important' }} />}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      '& .MuiChip-icon': { color: 'inherit' }
                    }}
                  />
                  <Chip 
                    label="Actif" 
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
              Voir le profil
            </Button>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <MonetizationOnIcon sx={{ color: '#fcd116', fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                    25,000 F CFA
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Revenus ce mois-ci
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <ShoppingCartIcon sx={{ color: '#009639', fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                    120
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Commandes traitées
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <VisibilityIcon sx={{ color: '#4180be', fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                    5,600
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Vues sur les produits
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </WelcomeSection>

        {/* Bannière de félicitations */}
        <Box sx={{
          bgcolor: '#4180be',
          color: '#ffffff',
          p: 2,
          borderRadius: '0.625rem',
          mb: 4,
          boxShadow: '0 4px 10px rgba(65, 128, 190, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <InfoIcon sx={{ color: '#ffffff' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Félicitations ! Votre compte a été créé avec succès
            </Typography>
            <Typography variant="body2">
              Vous pouvez maintenant explorer les produits, comparer les prix et découvrir les meilleures offres sur AfricaHub.
            </Typography>
          </Box>
        </Box>

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
          AfricaHub - Espace Marchand
        </Typography>

        {/* Statistiques principales */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StyledCard>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {card.icon}
                  <Box>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" sx={{ 
                      color: '#1e3a5f', 
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #1e3a5f 0%, #4180be 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {card.value}
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

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
            <DashboardOverview />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <ProductsManager />
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Typography variant="h6" sx={{ 
              color: '#1e3a5f', 
              mb: 2,
              fontWeight: 'bold',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(to right, #1e3a5f, #4180be)',
                borderRadius: '2px',
              }
            }}>
              Gestion des comparaisons
            </Typography>
            {/* Contenu de la gestion des comparaisons */}
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <Typography variant="h6" sx={{ 
              color: '#1e3a5f', 
              mb: 2,
              fontWeight: 'bold',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(to right, #1e3a5f, #4180be)',
                borderRadius: '2px',
              }
            }}>
              Profil de la société
            </Typography>
            {/* Contenu du profil de la société */}
          </TabPanel>

          <TabPanel value={activeTab} index={4}>
            <Typography variant="h6" sx={{ 
              color: '#1e3a5f', 
              mb: 2,
              fontWeight: 'bold',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(to right, #1e3a5f, #4180be)',
                borderRadius: '2px',
              }
            }}>
              Avis et notes
            </Typography>
            {/* Contenu des avis et notes */}
          </TabPanel>

          <TabPanel value={activeTab} index={5}>
            <Typography variant="h6" sx={{ 
              color: '#1e3a5f', 
              mb: 2,
              fontWeight: 'bold',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(to right, #1e3a5f, #4180be)',
                borderRadius: '2px',
              }
            }}>
              Analyses de performance
            </Typography>
            {/* Contenu des analyses */}
          </TabPanel>

          <TabPanel value={activeTab} index={6}>
            <Typography variant="h6" sx={{ 
              color: '#1e3a5f', 
              mb: 2,
              fontWeight: 'bold',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(to right, #1e3a5f, #4180be)',
                borderRadius: '2px',
              }
            }}>
              Support et assistance
            </Typography>
            {/* Contenu du support */}
          </TabPanel>

          <TabPanel value={activeTab} index={7}>
            <Typography variant="h6" sx={{ 
              color: '#1e3a5f', 
              mb: 2,
              fontWeight: 'bold',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(to right, #1e3a5f, #4180be)',
                borderRadius: '2px',
              }
            }}>
              Notifications
            </Typography>
            {/* Contenu des notifications */}
          </TabPanel>

          <TabPanel value={activeTab} index={8}>
            <Typography variant="h6" sx={{ 
              color: '#1e3a5f', 
              mb: 2,
              fontWeight: 'bold',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(to right, #1e3a5f, #4180be)',
                borderRadius: '2px',
              }
            }}>
              Paramètres et intégrations
            </Typography>
            {/* Contenu des paramètres */}
          </TabPanel>
        </DashboardPaper>
      </Container>
    </Box>
  );
};

export default MerchantDashboard; 