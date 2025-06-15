# 📊 Structure des Données des Secteurs AfricaHub

## 🎯 **Vue d'ensemble**

AfricaHub couvre **6 secteurs principaux** avec des données complètes pour chaque marché africain. Cette documentation détaille l'organisation des fichiers JSON et des hooks associés.

## 📁 **Architecture des fichiers**

```
src/data/
├── products.json          # Assurance, Banque, Télécoms, Énergie
├── real-estate.json       # Secteur Immobilier
├── transport.json         # Secteur Transport
└── sectors.json           # Configuration globale des secteurs

src/hooks/
├── useDealsData.tsx       # Hook pour les bons plans (products.json)
├── useRealEstateData.tsx  # Hook pour l'immobilier
├── useTransportData.tsx   # Hook pour le transport
└── useSectorsData.tsx     # Hook global pour tous les secteurs
```

## 🏢 **Secteurs disponibles**

### **1. 🛡️ Assurance (Insurance)**
- **Fichier** : `products.json`
- **Hook** : `useDealsData`
- **Sous-catégories** :
  - Assurance Auto
  - Assurance Santé
  - Assurance Habitation
  - Assurance Vie
- **Pays couverts** : 15 pays africains
- **Fournisseurs** : 45 compagnies

### **2. 🏦 Banque (Banking)**
- **Fichier** : `products.json`
- **Hook** : `useDealsData`
- **Sous-catégories** :
  - Comptes Bancaires
  - Crédits
  - Cartes Bancaires
  - Investissement
- **Pays couverts** : 18 pays africains
- **Fournisseurs** : 32 banques

### **3. 📱 Télécoms (Telecommunications)**
- **Fichier** : `products.json`
- **Hook** : `useDealsData`
- **Sous-catégories** :
  - Forfaits Mobile
  - Internet Fixe
  - Téléphonie Fixe
  - Solutions Entreprise
- **Pays couverts** : 22 pays africains
- **Fournisseurs** : 28 opérateurs

### **4. ⚡ Énergie (Energy)**
- **Fichier** : `products.json`
- **Hook** : `useDealsData`
- **Sous-catégories** :
  - Électricité
  - Gaz
  - Énergie Solaire
  - Énergies Renouvelables
- **Pays couverts** : 12 pays africains
- **Fournisseurs** : 18 entreprises

### **5. 🏠 Immobilier (Real Estate)**
- **Fichier** : `real-estate.json`
- **Hook** : `useRealEstateData`
- **Sous-catégories** :
  - Vente Résidentielle
  - Location Résidentielle
  - Immobilier Commercial
  - Investissement Immobilier
- **Pays couverts** : 20 pays africains
- **Fournisseurs** : 156 agences

### **6. 🚗 Transport (Transport)**
- **Fichier** : `transport.json`
- **Hook** : `useTransportData`
- **Sous-catégories** :
  - Vente Automobile
  - Location de Véhicules
  - Motos et Scooters
  - Véhicules Utilitaires
- **Pays couverts** : 16 pays africains
- **Fournisseurs** : 67 concessionnaires

## 📊 **Structure des données**

### **Fichier `sectors.json` (Configuration globale)**
```json
{
  "sectors": [
    {
      "id": "insurance",
      "name": "Assurance",
      "description": "Assurances auto, habitation, santé et vie",
      "icon": "shield",
      "color": "blue",
      "dataFile": "products.json",
      "stats": {
        "providers": 45,
        "avgSavings": "25%",
        "reviews": 12500,
        "countries": 15
      },
      "isPopular": true,
      "isTrending": true,
      "subcategories": [...]
    }
  ],
  "globalStats": {...},
  "countryAvailability": {...},
  "sectorGrowth": {...}
}
```

### **Fichier `real-estate.json` (Immobilier)**
```json
{
  "sector": {
    "id": "real-estate",
    "name": "Immobilier",
    "description": "Achat, location et gestion immobilière"
  },
  "properties": [
    {
      "id": "prop-001",
      "title": "Villa Moderne 4 Chambres",
      "provider": "Immobilier Plateau",
      "country": "CI",
      "city": "Abidjan",
      "type": "villa",
      "transactionType": "sale",
      "price": 85000000,
      "currency": "XOF",
      "surface": 200,
      "rooms": 4,
      "features": [...],
      "amenities": [...]
    }
  ],
  "featuredProperties": [...]
}
```

### **Fichier `transport.json` (Transport)**
```json
{
  "sector": {
    "id": "transport",
    "name": "Transport",
    "description": "Véhicules, mobilité et solutions de transport"
  },
  "vehicles": [
    {
      "id": "veh-001",
      "title": "Toyota Corolla 2022",
      "provider": "Auto Plateau",
      "country": "CI",
      "brand": "Toyota",
      "model": "Corolla",
      "year": 2022,
      "price": 18500000,
      "currency": "XOF",
      "mileage": 25000,
      "fuelType": "essence",
      "features": [...],
      "equipment": [...]
    }
  ],
  "featuredVehicles": [...]
}
```

## 🔧 **Hooks disponibles**

### **1. `useSectorsData()` - Hook global**
```typescript
const {
  sectors,
  popularSectors,
  trendingSectors,
  globalStats,
  loading,
  error,
  getSectorById,
  getSectorsForCountry
} = useSectorsData()
```

### **2. `useDealsData()` - Bons plans**
```typescript
const {
  deals,
  featuredDeals,
  categories,
  loading,
  error
} = useDealsData()
```

### **3. `useRealEstateData()` - Immobilier**
```typescript
const {
  properties,
  featuredProperties,
  propertyTypes,
  loading,
  error
} = useRealEstateData()
```

### **4. `useTransportData()` - Transport**
```typescript
const {
  vehicles,
  featuredVehicles,
  vehicleTypes,
  categories,
  loading,
  error
} = useTransportData()
```

## 🌍 **Couverture géographique**

### **Pays avec couverture complète (6 secteurs)**
- 🇨🇮 **Côte d'Ivoire** - Hub principal
- 🇬🇭 **Ghana** - Marché anglophone
- 🇳🇬 **Nigeria** - Plus grande économie
- 🇰🇪 **Kenya** - Hub technologique
- 🇲🇦 **Maroc** - Porte du Maghreb
- 🇿🇦 **Afrique du Sud** - Marché développé

### **Pays avec couverture partielle**
- **4 secteurs** : Sénégal, Tunisie, Égypte
- **3 secteurs** : Éthiopie, Ouganda, Tanzanie, Zambie
- **2 secteurs** : Burkina Faso, Mali, Niger, Tchad
- **3 secteurs** : Cameroun, Gabon, Congo

## 💰 **Devises supportées**

### **Zone CFA**
- **XOF** (CFA Franc BCEAO) : Côte d'Ivoire, Sénégal, Mali, etc.
- **XAF** (CFA Franc BEAC) : Cameroun, Gabon, Tchad, etc.

### **Devises nationales**
- **NGN** (₦) - Nigeria Naira
- **GHS** (₵) - Ghana Cedi
- **KES** (KSh) - Kenya Shilling
- **ZAR** (R) - South African Rand
- **MAD** (د.م.) - Moroccan Dirham
- **EGP** (£) - Egyptian Pound
- **TND** (د.ت) - Tunisian Dinar

## 📈 **Statistiques de croissance**

### **Secteurs en forte croissance**
1. **Énergie** : +35% (très forte)
2. **Télécoms** : +22% (forte)
3. **Assurance** : +15% (forte)
4. **Transport** : +12% (modérée)

### **Secteurs stables**
1. **Banque** : +8% (stable)
2. **Immobilier** : +5% (stable)

## 🎯 **Utilisation recommandée**

### **Pour afficher tous les secteurs**
```typescript
const { sectors, loading } = useSectorsData()

if (loading) return <Loading />

return (
  <div>
    {sectors.map(sector => (
      <SectorCard key={sector.id} sector={sector} />
    ))}
  </div>
)
```

### **Pour un secteur spécifique**
```typescript
const { properties, loading } = useRealEstateData()
const { vehicles } = useTransportData()
```

### **Pour filtrer par pays**
```typescript
const { getSectorsForCountry } = useSectorsData()
const sectorsInCoteDivoire = getSectorsForCountry('CI')
```

## 🔄 **Mise à jour des données**

### **Fréquence de mise à jour**
- **Bons plans** : Quotidienne
- **Immobilier** : Hebdomadaire
- **Transport** : Hebdomadaire
- **Autres secteurs** : Mensuelle

### **Sources de données**
- **API partenaires** pour les prix en temps réel
- **Web scraping** pour les offres publiques
- **Saisie manuelle** pour les données vérifiées
- **Retours utilisateurs** pour la qualité

## 🚀 **Prochaines étapes**

### **Phase 1 - Immédiate**
- ✅ 6 secteurs avec données complètes
- ✅ Hooks TypeScript typés
- ✅ Couverture de 20+ pays africains

### **Phase 2 - Court terme**
- [ ] API backend pour données temps réel
- [ ] Système de cache intelligent
- [ ] Notifications de nouveaux deals
- [ ] Comparaison multi-secteurs

### **Phase 3 - Moyen terme**
- [ ] Machine Learning pour recommandations
- [ ] Intégration blockchain pour transparence
- [ ] Expansion vers 54 pays africains
- [ ] Nouveaux secteurs (Santé, Éducation)

Cette structure de données robuste permet à AfricaHub de fournir des comparaisons complètes et actualisées pour tous les secteurs clés de l'économie africaine ! 🌍✨
