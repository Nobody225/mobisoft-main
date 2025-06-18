import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface Order {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

const mockOrders: Order[] = [
  {
    id: 'CMD001',
    customerName: 'Jean Dupont',
    date: '2024-03-20',
    amount: 25000,
    status: 'pending',
  },
  {
    id: 'CMD002',
    customerName: 'Marie Martin',
    date: '2024-03-19',
    amount: 15000,
    status: 'processing',
  },
  {
    id: 'CMD003',
    customerName: 'Pierre Durand',
    date: '2024-03-18',
    amount: 35000,
    status: 'completed',
  },
];

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '0.625rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: '#f0f4f8',
    color: '#1e3a5f',
    fontWeight: 'bold',
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return '#fcd116'; // afroGold
    case 'processing':
      return '#4180be'; // brandSky
    case 'completed':
      return '#009639'; // afroGreen
    case 'cancelled':
      return '#ce1126'; // afroRed
    default:
      return '#1e3a5f'; // marineBlue
  }
};

const getStatusLabel = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'En attente';
    case 'processing':
      return 'En cours';
    case 'completed':
      return 'Terminée';
    case 'cancelled':
      return 'Annulée';
    default:
      return status;
  }
};

const OrdersTable: React.FC = () => {
  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Client</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Montant</StyledTableCell>
            <StyledTableCell>Statut</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockOrders.map((order) => (
            <TableRow key={order.id}>
              <StyledTableCell>{order.id}</StyledTableCell>
              <StyledTableCell>{order.customerName}</StyledTableCell>
              <StyledTableCell>{order.date}</StyledTableCell>
              <StyledTableCell>{order.amount.toLocaleString()} FCFA</StyledTableCell>
              <StyledTableCell>
                <Chip
                  label={getStatusLabel(order.status)}
                  sx={{
                    backgroundColor: getStatusColor(order.status),
                    color: 'white',
                    fontWeight: 'medium',
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                <Tooltip title="Voir les détails">
                  <IconButton
                    size="small"
                    sx={{
                      color: '#1e3a5f',
                      '&:hover': {
                        backgroundColor: '#f0f4f8',
                      },
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default OrdersTable; 