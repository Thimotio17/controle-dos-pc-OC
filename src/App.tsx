
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
  // O estado DEVE começar como null para forçar o login
  const [usuarioLogado, setUsuarioLogado] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {/* BLOCO DE CONTROLE DE ACESSO */}
        {!usuarioLogado ? (
          // Se não tem usuário, renderiza APENAS o componente de Login
          <Login onLogin={(nome) => setUsuarioLogado(nome)} />
        ) : (
          // Se tem usuário, libera o roteamento do sistema
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