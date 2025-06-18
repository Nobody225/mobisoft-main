import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Visibility as VisibilityIcon,
  Compare as CompareIcon,
  Star as StarIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

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

interface ProductStats {
  id: string;
  name: string;
  views: number;
  comparisons: number;
  rating: number;
  trend?: 'up' | 'down' | 'stable'; // Ajout de la propriété de tendance
}

interface ModificationHistory {
  type: 'add' | 'edit' | 'delete';
  productName: string;
  date: string;
  user: string;
}

// Données de test
const mockTopProducts: ProductStats[] = [
  { id: '1', name: 'Produit A', views: 450, comparisons: 120, rating: 4.5, trend: 'up' },
  { id: '2', name: 'Produit B', views: 380, comparisons: 95, rating: 4.2, trend: 'stable' },
  { id: '3', name: 'Produit C', views: 290, comparisons: 75, rating: 4.8, trend: 'up' },
];

const mockMostCompared: ProductStats[] = [
  { id: '1', name: 'Produit A', views: 450, comparisons: 120, rating: 4.5, trend: 'up' },
  { id: '2', name: 'Produit B', views: 380, comparisons: 95, rating: 4.2, trend: 'down' },
  { id: '3', name: 'Produit C', views: 290, comparisons: 75, rating: 4.8, trend: 'stable' },
];

const mockModifications: ModificationHistory[] = [
  { type: 'add', productName: 'Nouveau Produit', date: '2024-02-20', user: 'Admin' },
  { type: 'edit', productName: 'Produit Modifié', date: '2024-02-19', user: 'Admin' },
  { type: 'delete', productName: 'Produit Supprimé', date: '2024-02-18', user: 'Admin' },
];

const DashboardOverview: React.FC = () => {
  const getModificationIcon = (type: string) => {
    switch (type) {
      case 'add':
        return <AddIcon sx={{ color: '#009639' }} />; // afroGreen
      case 'edit':
        return <EditIcon sx={{ color: '#4180be' }} />; // brandSky
      case 'delete':
        return <DeleteIcon sx={{ color: '#ce1126' }} />; // afroRed
      default:
        return null;
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUpwardIcon sx={{ color: '#009639', fontSize: 16 }} />;
      case 'down':
        return <ArrowDownwardIcon sx={{ color: '#ce1126', fontSize: 16 }} />;
      case 'stable':
        return null;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Produits les plus vus */}
      <Grid item xs={12} md={4}>
        <StyledCard>
          <CardContent>
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
              Produits les plus vus
            </Typography>
            <List>
              {mockTopProducts.map((product) => (
                <React.Fragment key={product.id}>
                  <ListItem 
                    sx={{
                      py: 1.5, 
                      borderRadius: '8px',
                      '&:hover': {
                        bgcolor: 'rgba(30, 58, 95, 0.03)',
                      }
                    }}
                  >
                    <ListItemIcon>
                      <VisibilityIcon sx={{ color: '#1e3a5f' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ 
                          color: '#1e3a5f',
                          fontWeight: 'medium'
                        }}>
                          {product.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {product.views} vues
                          </Typography>
                          {getTrendIcon(product.trend)}
                          <Chip
                            size="small"
                            icon={<StarIcon />}
                            label={product.rating}
                            sx={{ 
                              bgcolor: '#fcd116',
                              color: '#000',
                              fontWeight: 'bold',
                              '& .MuiChip-icon': {
                                color: '#000'
                              }
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" sx={{ ml: 6, borderColor: 'rgba(30, 58, 95, 0.05)' }} />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </StyledCard>
      </Grid>

      {/* Produits les plus comparés */}
      <Grid item xs={12} md={4}>
        <StyledCard>
          <CardContent>
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
              Produits les plus comparés
            </Typography>
            <List>
              {mockMostCompared.map((product) => (
                <React.Fragment key={product.id}>
                  <ListItem 
                    sx={{
                      py: 1.5, 
                      borderRadius: '8px',
                      '&:hover': {
                        bgcolor: 'rgba(30, 58, 95, 0.03)',
                      }
                    }}
                  >
                    <ListItemIcon>
                      <CompareIcon sx={{ color: '#1e3a5f' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ 
                          color: '#1e3a5f',
                          fontWeight: 'medium'
                        }}>
                          {product.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {product.comparisons} comparaisons
                          </Typography>
                          {getTrendIcon(product.trend)}
                          <Chip
                            size="small"
                            icon={<StarIcon />}
                            label={product.rating}
                            sx={{ 
                              bgcolor: '#fcd116',
                              color: '#000',
                              fontWeight: 'bold',
                              '& .MuiChip-icon': {
                                color: '#000'
                              }
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" sx={{ ml: 6, borderColor: 'rgba(30, 58, 95, 0.05)' }} />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </StyledCard>
      </Grid>

      {/* Dernières modifications */}
      <Grid item xs={12} md={4}>
        <StyledCard>
          <CardContent>
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
              Dernières modifications
            </Typography>
            <List>
              {mockModifications.map((mod, index) => (
                <React.Fragment key={index}>
                  <ListItem 
                    sx={{
                      py: 1.5, 
                      borderRadius: '8px',
                      '&:hover': {
                        bgcolor: 'rgba(30, 58, 95, 0.03)',
                      }
                    }}
                  >
                    <ListItemIcon>
                      {getModificationIcon(mod.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ 
                          color: '#1e3a5f',
                          fontWeight: 'medium'
                        }}>
                          {mod.productName}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {mod.user} - {mod.date}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" sx={{ ml: 6, borderColor: 'rgba(30, 58, 95, 0.05)' }} />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default DashboardOverview; 