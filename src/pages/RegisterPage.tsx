import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert } from '@/components/ui/alert';
import { User, Mail, Lock, UserPlus, Building2, Store, Shield, MapPin, Phone, Globe, Briefcase, CreditCard, FileText, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const businessCategories = [
  { id: 'retail', label: 'Commerce de détail', icon: Store },
  { id: 'restaurant', label: 'Restauration', icon: Briefcase },
  { id: 'services', label: 'Services', icon: Globe },
  { id: 'manufacturing', label: 'Production', icon: Building2 },
  { id: 'tech', label: 'Technologie', icon: CreditCard },
  { id: 'health', label: 'Santé & Bien-être', icon: CheckCircle2 },
  { id: 'education', label: 'Éducation', icon: FileText },
  { id: 'other', label: 'Autre', icon: Store }
];

// Liste des pays d'Afrique
const africanCountries = [
  { code: 'DZ', name: 'Algérie' },
  { code: 'AO', name: 'Angola' },
  { code: 'BJ', name: 'Bénin' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'CM', name: 'Cameroun' },
  { code: 'CV', name: 'Cap-Vert' },
  { code: 'CF', name: 'République centrafricaine' },
  { code: 'TD', name: 'Tchad' },
  { code: 'KM', name: 'Comores' },
  { code: 'CG', name: 'Congo' },
  { code: 'CD', name: 'République démocratique du Congo' },
  { code: 'CI', name: 'Côte d\'Ivoire' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'EG', name: 'Égypte' },
  { code: 'GQ', name: 'Guinée équatoriale' },
  { code: 'ER', name: 'Érythrée' },
  { code: 'ET', name: 'Éthiopie' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambie' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GN', name: 'Guinée' },
  { code: 'GW', name: 'Guinée-Bissau' },
  { code: 'KE', name: 'Kenya' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Libéria' },
  { code: 'LY', name: 'Libye' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'ML', name: 'Mali' },
  { code: 'MR', name: 'Mauritanie' },
  { code: 'MU', name: 'Maurice' },
  { code: 'MA', name: 'Maroc' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'NA', name: 'Namibie' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'ST', name: 'São Tomé-et-Principe' },
  { code: 'SN', name: 'Sénégal' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SO', name: 'Somalie' },
  { code: 'ZA', name: 'Afrique du Sud' },
  { code: 'SS', name: 'Soudan du Sud' },
  { code: 'SD', name: 'Soudan' },
  { code: 'SZ', name: 'Eswatini' },
  { code: 'TZ', name: 'Tanzanie' },
  { code: 'TG', name: 'Togo' },
  { code: 'TN', name: 'Tunisie' },
  { code: 'UG', name: 'Ouganda' },
  { code: 'ZM', name: 'Zambie' },
  { code: 'ZW', name: 'Zimbabwe' }
];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, signInWithGoogle } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'user' | 'merchant',
    // Champs spécifiques pour les commerçants
    companyName: '',
    businessType: '',
    businessCategory: '',
    address: '',
    phone: '',
    website: '',
    description: '',
    country: '',
    userType: 'user',
    city: '',
    postalCode: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    }
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (value: 'user' | 'merchant') => {
    setFormData(prev => ({
      ...prev,
      role: value,
      // Réinitialiser les champs spécifiques
      companyName: '',
      businessType: '',
      businessCategory: '',
      address: '',
      phone: '',
      website: '',
      description: '',
      country: '',
      city: '',
      postalCode: '',
      socialMedia: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: ''
      }
    }));
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStepIndicator = () => {
    if (formData.role !== 'merchant') return null;
    
    return (
      <div className="flex justify-center mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep > index + 1
                  ? 'bg-marineBlue-600 text-white'
                  : currentStep === index + 1
                  ? 'bg-marineBlue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            {index < 3 && (
              <div
                className={`w-16 h-1 ${
                  currentStep > index + 1 ? 'bg-marineBlue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderUserForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-700 font-medium">
            Prénom
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Votre prénom"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-marineBlue-500 focus:ring-2 focus:ring-marineBlue-200 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-700 font-medium">
            Nom
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Votre nom"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-marineBlue-500 focus:ring-2 focus:ring-marineBlue-200 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="votre@email.com"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-marineBlue-500 focus:ring-2 focus:ring-marineBlue-200 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country" className="text-gray-700 font-medium">
          Pays
        </Label>
        <Select
          value={formData.country}
          onValueChange={(value) => handleInputChange({ target: { name: 'country', value } })}
        >
          <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-marineBlue-500 focus:ring-2 focus:ring-marineBlue-200 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200">
            <SelectValue placeholder="Sélectionnez votre pays" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {africanCountries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gray-700 font-medium">
          Téléphone
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+XXX XX XX XX XX"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-marineBlue-500 focus:ring-2 focus:ring-marineBlue-200 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-700 font-medium">
          Mot de passe
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-marineBlue-500 focus:ring-2 focus:ring-marineBlue-200 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
          Confirmer le mot de passe
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-marineBlue-500 focus:ring-2 focus:ring-marineBlue-200 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200"
          required
        />
      </div>
    </div>
  );

  const renderFormContent = () => {
    switch (formData.role) {
      case 'user':
        return renderUserForm();
      case 'merchant':
        switch (currentStep) {
          case 1:
            return (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName" className="text-marineBlue-800">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-marineBlue-600" />
                      Nom de l'entreprise
                    </div>
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="mt-1 border-marineBlue-200 focus:border-marineBlue-500 focus:ring-marineBlue-500"
                    placeholder="Entrez le nom de votre entreprise"
                  />
                </div>

                <div>
                  <Label htmlFor="businessCategory" className="text-marineBlue-800">
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-marineBlue-600" />
                      Catégorie d'activité
                    </div>
                  </Label>
                  <Select
                    value={formData.businessCategory}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, businessCategory: value }))}
                  >
                    <SelectTrigger className="mt-1 border-marineBlue-200 focus:border-marineBlue-500 focus:ring-marineBlue-500">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <category.icon className="w-4 h-4" />
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="businessType" className="text-marineBlue-800">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-marineBlue-600" />
                      Type d'activité spécifique
                    </div>
                  </Label>
                  <Input
                    id="businessType"
                    name="businessType"
                    type="text"
                    required
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="mt-1 border-marineBlue-200 focus:border-marineBlue-500 focus:ring-marineBlue-500"
                    placeholder="Précisez votre type d'activité"
                  />
                </div>
              </div>
            );
          case 2:
            return (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-marineBlue-800">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-marineBlue-600" />
                      Adresse de l'entreprise
                    </div>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 border-marineBlue-200 focus:border-marineBlue-500 focus:ring-marineBlue-500"
                    placeholder="Entrez l'adresse de votre entreprise"
                  />
                </div>

                <div>
                  <Label htmlFor="city" className="text-marineBlue-800">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-marineBlue-600" />
                      Ville
                    </div>
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 border-marineBlue-200 focus:border-marineBlue-500 focus:ring-marineBlue-500"
                    placeholder="Entrez la ville de votre entreprise"
                  />
                </div>

                <div>
                  <Label htmlFor="postalCode" className="text-marineBlue-800">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-marineBlue-600" />
                      Code postal
                    </div>
                  </Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="mt-1 border-marineBlue-200 focus:border-marineBlue-500 focus:ring-marineBlue-500"
                    placeholder="Entrez le code postal de votre entreprise"
                  />
                </div>
              </div>
            );
          case 3:
            return (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700 font-medium">
                    Description de votre entreprise
                  </Label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Décrivez votre entreprise, vos services, votre expertise..."
                    className="w-full min-h-[150px] px-4 py-3 rounded-lg border border-gray-300 focus:border-marineBlue-500 focus:ring-2 focus:ring-marineBlue-200 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200 resize-none"
                    required
                  />
                </div>
              </div>
            );
          case 4:
            return renderUserForm();
          default:
            return null;
        }
      default:
        return null;
    }
  };

  const renderNavigationButtons = () => (
    <div className="flex justify-between gap-4">
      {currentStep > 1 && (
        <Button
          type="button"
          onClick={prevStep}
          className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Précédent
        </Button>
      )}
      {currentStep < 4 ? (
        <Button
          type="button"
          onClick={nextStep}
          className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
        >
          Suivant
          <ArrowRight className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-300/20 border-t-gray-700 rounded-full animate-spin" />
              Inscription en cours...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              S'inscrire
            </>
          )}
        </Button>
      )}
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation des mots de passe
      if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        return;
      }

      // Création de l'objet utilisateur
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === 'merchant' && {
          companyName: formData.companyName,
          businessType: formData.businessType,
          businessCategory: formData.businessCategory,
          address: formData.address,
          phone: formData.phone,
          website: formData.website,
          description: formData.description,
          country: formData.country,
          city: formData.city,
          postalCode: formData.postalCode,
          socialMedia: formData.socialMedia
        })
      };

      await register(userData);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion avec Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fond avec dégradé */}
      <div className="absolute inset-0 bg-gradient-to-br from-marineBlue-600 via-brandSky to-marineBlue-500"></div>

      {/* Motifs décoratifs */}
      <div className="absolute inset-0">
        {/* Cercles flous */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        {/* Formes géométriques */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border-2 border-white/20 rounded-lg transform rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-white/20 rounded-full"></div>
        
        {/* Points décoratifs */}
        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-white/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/2 w-2 h-2 bg-white/30 rounded-full"></div>
        
        {/* Lignes décoratives */}
        <div className="absolute top-1/3 left-1/4 w-32 h-px bg-white/20 transform rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-px bg-white/20 transform -rotate-45"></div>
        
        {/* Motif de grille */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                            linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      {/* Overlay avec texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-marineBlue-900/10 via-transparent to-white/5"></div>

      <div className="relative container mx-auto px-4 z-10">
        {/* Logo Africahub */}
        <div className="absolute top-8 left-8">
          <Link
            to="/"
            className="flex items-center space-x-3 group flex-shrink-0"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-marineBlue-600 via-brandSky to-marineBlue-400 p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Globe className="w-full h-full text-white" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-marineBlue-800 tracking-tight">
                AfricaHub
              </h1>
              <p className="text-xs lg:text-sm text-marineBlue-600 font-medium">
                Votre comparateur africain
              </p>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-20">
          {/* Section gauche - Contenu décoratif */}
          <div className="hidden lg:block text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Rejoignez notre communauté</h1>
              <p className="text-lg text-white/80">
                Créez votre compte et commencez votre voyage avec nous
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <User className="w-8 h-8 mb-4 text-afroGold" />
                <h3 className="text-xl font-semibold mb-2">Utilisateur</h3>
                <p className="text-white/80">Accédez à tous nos services et fonctionnalités</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <Store className="w-8 h-8 mb-4 text-afroGold" />
                <h3 className="text-xl font-semibold mb-2">Commerçant</h3>
                <p className="text-white/80">Gérez votre entreprise et développez votre activité</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl col-span-2">
                <CheckCircle2 className="w-8 h-8 mb-4 text-afroGold" />
                <h3 className="text-xl font-semibold mb-2">Sécurité</h3>
                <p className="text-white/80">Vos données sont protégées et sécurisées</p>
              </div>
            </div>
          </div>

          {/* Section droite - Formulaire */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-marineBlue-800 mb-2">
                Créer un compte
              </h2>
              <p className="text-marineBlue-600">
                Rejoignez notre communauté et commencez votre voyage
              </p>
            </div>

            <div className="space-y-6">
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
                disabled={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-[#4285F4] font-medium">S'inscrire avec</span>
                <span className="text-[#EA4335] font-medium">G</span>
                <span className="text-[#FBBC05] font-medium">o</span>
                <span className="text-[#4285F4] font-medium">o</span>
                <span className="text-[#34A853] font-medium">g</span>
                <span className="text-[#EA4335] font-medium">l</span>
                <span className="text-[#4285F4] font-medium">e</span>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="bg-afroRed-light/10 border-afroRed-light text-afroRed-DEFAULT animate-fade-in">
                    {error}
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-marineBlue-800 font-medium">
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-marineBlue-600" />
                      Type de compte
                    </div>
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger className="mt-1 border-marineBlue-200 focus:border-marineBlue-500 focus:ring-marineBlue-500 transition-all duration-200">
                      <SelectValue placeholder="Sélectionnez un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Utilisateur
                        </div>
                      </SelectItem>
                      <SelectItem value="merchant">
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4" />
                          Commerçant
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {renderStepIndicator()}
                <div className="animate-fade-in">
                  {renderFormContent()}
                </div>

                {formData.role === 'merchant' ? (
                  renderNavigationButtons()
                ) : (
                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-300/20 border-t-gray-700 rounded-full animate-spin" />
                        Inscription en cours...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        S'inscrire
                      </>
                    )}
                  </Button>
                )}
              </form>
            </div>

            <div className="text-center text-sm text-marineBlue-600 mt-6">
              Déjà un compte ?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-marineBlue-800 font-semibold hover:text-marineBlue-600 transition-colors duration-200"
              >
                Connectez-vous
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
