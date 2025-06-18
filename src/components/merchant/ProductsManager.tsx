import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Produit 1',
    price: 15000,
    stock: 10,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Produit 2',
    price: 25000,
    stock: 5,
    image: 'https://via.placeholder.com/150',
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '0.625rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1e3a5f',
  color: 'white',
  '&:hover': {
    backgroundColor: '#162b49',
  },
}));

const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
  });

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
      });
    } else {
      setSelectedProduct(null);
      setFormData({ name: '', price: '', stock: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setFormData({ name: '', price: '', stock: '' });
  };

  const handleSave = () => {
    if (selectedProduct) {
      // Mise à jour du produit
      setProducts(products.map(p =>
        p.id === selectedProduct.id
          ? {
              ...p,
              name: formData.name,
              price: Number(formData.price),
              stock: Number(formData.stock),
            }
          : p
      ));
    } else {
      // Ajout d'un nouveau produit
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: 'https://via.placeholder.com/150',
      };
      setProducts([...products, newProduct]);
    }
    handleCloseDialog();
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ color: '#1e3a5f', fontWeight: 'bold' }}>
          Gestion des Produits
        </Typography>
        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Ajouter un produit
        </StyledButton>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <StyledCard>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#1e3a5f' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Prix: {product.price.toLocaleString()} FCFA
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stock: {product.stock} unités
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton 
                    onClick={() => handleOpenDialog(product)}
                    sx={{ color: '#1e3a5f' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(product.id)}
                    sx={{ color: '#ce1126' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: '#1e3a5f' }}>
          {selectedProduct ? 'Modifier le produit' : 'Ajouter un produit'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom du produit"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Prix"
            type="number"
            fullWidth
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Stock"
            type="number"
            fullWidth
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <StyledButton onClick={handleSave}>
            {selectedProduct ? 'Modifier' : 'Ajouter'}
          </StyledButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsManager; 