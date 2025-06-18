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
  People as PeopleIcon,
  Store as StoreIcon,
  Inventory2 as Inventory2Icon,
  ShoppingCart as ShoppingCartIcon,
  MonetizationOn as MonetizationOnIcon,
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon,
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

interface StatItem {
  id: string;
  label: string;
  value: string;
  icon: React.ReactElement;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

interface ActivityLog {
  id: string;
  type: 'user' | 'merchant' | 'product' | 'order';
  description: string;
  date: string;
}

// Données de test
const mockKeyStats: StatItem[] = [
  {
    id: 'users',
    label: 'Nouveaux Utilisateurs',
    value: '150',
    icon: <PeopleIcon sx={{ color: '#4180be' }} />,
    trend: 'up',
    trendValue: '+15%',
  },
  {
    id: 'merchants',
    label: 'Nouveaux Marchands',
    value: '12',
    icon: <StoreIcon sx={{ color: '#009639' }} />,
    trend: 'up',
    trendValue: '+8%',
  },
  {
    id: 'products',
    label: 'Produits Ajoutés',
    value: '500',
    icon: <Inventory2Icon sx={{ color: '#fcd116' }} />,
    trend: 'stable',
  },
  {
    id: 'revenue',
    label: 'Revenus Estimés',
    value: '500,000 F CFA',
    icon: <MonetizationOnIcon sx={{ color: '#ce1126' }} />,
    trend: 'up',
    trendValue: '+20%',
  },
];

const mockRecentActivity: ActivityLog[] = [
  { id: '1', type: 'user', description: 'Nouvel utilisateur enregistré : Jean Dupont', date: '2024-03-22' },
  { id: '2', type: 'merchant', description: 'Nouveau marchand validé : Boutique XYZ', date: '2024-03-21' },
  { id: '3', type: 'product', description: 'Produit mis à jour : Smartphone Pro V2', date: '2024-03-20' },
  { id: '4', type: 'order', description: 'Commande #CMD005 traitée', date: '2024-03-19' },
];

const AdminOverview: React.FC = () => {
  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon sx={{ color: '#009639', fontSize: 18 }} />;
      case 'down':
        return <TrendingDownIcon sx={{ color: '#ce1126', fontSize: 18 }} />;
      default:
        return null;
    }
  };

  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'user':
        return <PeopleIcon sx={{ color: '#4180be' }} />;
      case 'merchant':
        return <StoreIcon sx={{ color: '#009639' }} />;
      case 'product':
        return <Inventory2Icon sx={{ color: '#fcd116' }} />;
      case 'order':
        return <ShoppingCartIcon sx={{ color: '#ce1126' }} />;
      default:
        return <InfoIcon sx={{ color: '#1e3a5f' }} />;
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Statistiques Clés */}
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ color: '#1e3a5f', mb: 2, fontWeight: 'bold' }}>
          Statistiques Clés (Ce Mois-ci)
        </Typography>
        <Grid container spacing={3}>
          {mockKeyStats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.id}>
              <StyledCard>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {stat.icon}
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e3a5f' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                    {stat.trend && (
                      <Box display="flex" alignItems="center" gap={0.5} sx={{ mt: 0.5 }}>
                        {getTrendIcon(stat.trend)}
                        <Typography variant="caption" color="text.secondary">
                          {stat.trendValue || (stat.trend === 'up' ? '+ ' : '- ') + '0%'}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Activité Récente */}
      <Grid item xs={12} md={6}>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#1e3a5f', mb: 2, fontWeight: 'bold' }}>
              Activité Récente
            </Typography>
            <List>
              {mockRecentActivity.map((log) => (
                <React.Fragment key={log.id}>
                  <ListItem sx={{ py: 1.5, borderRadius: '8px', '&:hover': { bgcolor: 'rgba(30, 58, 95, 0.03)' } }}>
                    <ListItemIcon>
                      {getActivityIcon(log.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography sx={{ color: '#1e3a5f', fontWeight: 'medium' }}>{log.description}</Typography>}
                      secondary={<Typography variant="body2" color="text.secondary">{log.date}</Typography>}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" sx={{ ml: 6, borderColor: 'rgba(30, 58, 95, 0.05)' }} />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </StyledCard>
      </Grid>

      {/* Espace pour d'autres widgets (ex: Graphiques, Alertes) */}
      <Grid item xs={12} md={6}>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#1e3a5f', mb: 2, fontWeight: 'bold' }}>
              Vue Rapide & Alertes
            </Typography>
            <Box sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
              {/* Contenu à ajouter ici, par exemple des graphiques ou des notifications importantes */}
              <Typography>Contenu dynamique à venir...</Typography>
            </Box>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default AdminOverview; 