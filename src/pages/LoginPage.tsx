import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert } from '../components/ui/alert';
import { Globe, UserPlus, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, signInWithGoogle, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      if (user) {
        switch (user.role) {
          case 'merchant':
            navigate('/merchant/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'user':
            navigate('/user/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await signInWithGoogle();
      if (user) {
        switch (user.role) {
          case 'merchant':
            navigate('/merchant/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'user':
            navigate('/user/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Erreur lors de la connexion avec Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-marineBlue-900 via-marineBlue-800 to-marineBlue-900 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cercles flous */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-marineBlue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-marineBlue-300/20 rounded-full blur-3xl" />

        {/* Formes géométriques */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-white/10 rounded-lg rotate-45" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border-2 border-white/10 rounded-full" />

        {/* Points décoratifs */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full" />
        <div className="absolute top-40 left-40 w-1 h-1 bg-white/30 rounded-full" />
        <div className="absolute top-60 left-60 w-3 h-3 bg-white/30 rounded-full" />
        <div className="absolute top-80 left-80 w-2 h-2 bg-white/30 rounded-full" />
        <div className="absolute top-20 right-20 w-3 h-3 bg-white/30 rounded-full" />
        <div className="absolute top-40 right-40 w-2 h-2 bg-white/30 rounded-full" />
        <div className="absolute top-60 right-60 w-1 h-1 bg-white/30 rounded-full" />
        <div className="absolute top-80 right-80 w-2 h-2 bg-white/30 rounded-full" />

        {/* Lignes décoratives */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Grille de points */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff05_1px,transparent_0)] bg-[size:20px_20px]" />
      </div>

      {/* Overlay avec texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

      {/* Logo et nom */}
      <div className="absolute top-8 left-8 z-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-marineBlue-600 to-marineBlue-700 flex items-center justify-center shadow-lg">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AfricaHub</h1>
            <p className="text-sm text-white/80">Votre comparateur africain</p>
          </div>
        </Link>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-20">
          {/* Section gauche - Contenu informatif */}
          <div className="hidden lg:block text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Bienvenue sur AfricaHub</h1>
              <p className="text-lg text-white/80">
                Connectez-vous pour accéder à tous nos services et fonctionnalités
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <Shield className="w-8 h-8 mb-4 text-afroGold" />
                <h3 className="text-xl font-semibold mb-2">Sécurité</h3>
                <p className="text-white/80">Vos données sont protégées et sécurisées</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <Zap className="w-8 h-8 mb-4 text-afroGold" />
                <h3 className="text-xl font-semibold mb-2">Rapidité</h3>
                <p className="text-white/80">Connectez-vous en un clic avec Google</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl col-span-2">
                <Sparkles className="w-8 h-8 mb-4 text-afroGold" />
                <h3 className="text-xl font-semibold mb-2">Fonctionnalités</h3>
                <p className="text-white/80">Accédez à des fonctionnalités exclusives</p>
              </div>
            </div>
          </div>

          {/* Section droite - Formulaire */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-marineBlue-900 mb-2">Connexion</h2>
              <p className="text-marineBlue-600">
                Bienvenue ! Connectez-vous à votre compte
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6 animate-fade-in">
                {error}
              </Alert>
            )}

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
                <span className="flex items-center gap-1">
                  <span className="text-[#4285F4]">S</span>
                  <span className="text-[#EA4335]">e</span>
                  <span className="text-[#FBBC05]"> c</span>
                  <span className="text-[#4285F4]">o</span>
                  <span className="text-[#34A853]">n</span>
                  <span className="text-[#EA4335]">n</span>
                  <span className="text-[#FBBC05]">e</span>
                  <span className="text-[#4285F4]">c</span>
                  <span className="text-[#34A853]">t</span>
                  <span className="text-[#EA4335]">e</span>
                  <span className="text-[#FBBC05]">r</span>
                  <span className="text-[#4285F4]"> a</span>
                  <span className="text-[#34A853]">v</span>
                  <span className="text-[#EA4335]">e</span>
                  <span className="text-[#FBBC05]">c</span>
                  <span className="text-[#4285F4]"> G</span>
                  <span className="text-[#34A853]">o</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">g</span>
                  <span className="text-[#4285F4]">l</span>
                  <span className="text-[#34A853]">e</span>
                </span>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
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
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      className="h-4 w-4 text-marineBlue-600 focus:ring-marineBlue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                      Se souvenir de moi
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-marineBlue-600 hover:text-marineBlue-500">
                      Mot de passe oublié ?
                    </a>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-300/20 border-t-gray-700 rounded-full animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Se connecter
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center text-sm text-gray-600">
                Pas encore de compte ?{' '}
                <Link to="/register" className="font-medium text-marineBlue-600 hover:text-marineBlue-500">
                  S'inscrire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
