
import { supabase } from './lib/supabase';


const salvarLogNoBanco = async (nome: string) => {
  const { error } = await supabase
    .from('logs_atividades')
    .insert([
      { operador: nome, acao: 'Entrou no sistema', computador: 'N/A' }
    ]);

  if (error) console.log('Erro ao salvar no banco:', error);
  else console.log('Log salvo com sucesso no Supabase!');
};
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react"; 
import { Login } from "./components/Login"; // Verifique se este caminho está correto
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import './index.css'; // Tailwind geralmente está aqui
import './App.css';   // O seu CSS com o neon deve vir DEPOIS



const queryClient = new QueryClient();

const App = () => {
  const [usuarioLogado, setUsuarioLogado] = useState<string | null>(null);

  // Criamos essa função para rodar o login e o log ao mesmo tempo
  const realizarLogin = async (nome: string) => {
    setUsuarioLogado(nome);        // 1. Libera a tela
    await salvarLogNoBanco(nome);  // 2. Manda pro Supabase
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {!usuarioLogado ? (
          // AQUI: Troque o (nome) => setUsuarioLogado(nome) pela nossa nova função
          <Login onLogin={realizarLogin} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index usuario={usuarioLogado} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
        
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;