import { supabase } from './lib/supabase';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react"; 
import { Login } from "./components/Login";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import './index.css';
import './App.css';

// Função de log (fora do componente)
const salvarLogNoBanco = async (nome: string) => {
  const { error } = await supabase
    .from('logs_atividades')
    .insert([
      { operador: nome, acao: 'Entrou no sistema', computador: 'N/A' }
    ]);

  if (error) console.log('Erro ao salvar no banco:', error);
  else console.log('Log salvo com sucesso no Supabase!');
};

const queryClient = new QueryClient();

const App = () => { 
  const [usuarioLogado, setUsuarioLogado] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Vigia de Autenticação
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const nome = session.user.user_metadata.display_name || session.user.email?.split('@')[0];
          setUsuarioLogado(nome);
        }
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const nome = session.user.user_metadata.display_name || session.user.email?.split('@')[0];
        setUsuarioLogado(nome);
      } else {
        setUsuarioLogado(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const realizarLogin = async (nome: string) => {
    setUsuarioLogado(nome);
    await salvarLogNoBanco(nome);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <SonnerToaster position="top-right" />
        
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                loading ? (
                  /* Tela preta enquanto checa o login para evitar a piscada */
                  <div className="h-screen w-screen bg-[#0E0D10]" /> 
                ) : usuarioLogado ? (
                  <Index usuario={usuarioLogado} />
                ) : (
                  <Login onLogin={realizarLogin} />
                )
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;