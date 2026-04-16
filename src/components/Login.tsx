import React, { useState, useEffect } from 'react'; // Adicione o useEffect aqui
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface LoginProps {
  onLogin: (name: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  // 1. Atualizei o tipo do modo para aceitar 'redefinir'
  const [modo, setModo] = useState<'login' | 'cadastro' | 'recuperar' | 'redefinir'>('login');
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');

  // 2. O useEffect deve ficar DENTRO da função Login
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") {
        setModo('redefinir');
      }
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error("E-mail ou senha incorretos.");
    else if (data.user) {
      const nomeExibicao = data.user.user_metadata.display_name || email.split('@')[0];
      onLogin(nomeExibicao);
    }
    setLoading(false);
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: nome } }
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Cadastro realizado! Verifique seu e-mail.");
      setModo('login');
    }
    setLoading(false);
  };

  const handleRecuperar = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin, // Isso pega automaticamente meu localhost
  });
  
  if (error) toast.error(error.message);
  else toast.success("Link de recuperação enviado ao seu e-mail!");
  
  setLoading(false);
};

  const handleNovaSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) toast.error(error.message);
    else {
      toast.success("Senha atualizada!");
      setModo('login');
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#0E0D10] via-[#0E0D10] to-[#121216]">
      <main className="max-md:justify-center max-md:rounded-3xl lg:rounded-3xl xl:rounded-4xl container flex justify-between items-center bg-[#070709] w-[1106px] h-[654px] rounded-4xl overflow-hidden shadow-2xl border border-white/5">
        
        <section className="max-md:ml-0 form flex flex-col justify-center ml-[49px]">
          <form 
            onSubmit={
              modo === 'login' ? handleLogin : 
              modo === 'cadastro' ? handleCadastro : 
              modo === 'redefinir' ? handleNovaSenha : handleRecuperar
            } 
            className="flex flex-col"
          >
            <div className="flex justify-center items-baseline gap-[5px]">
              <p className="max-lg:text-4xl font-[700] text-[40px] text-[#e5e7eb] mb-[50px] flex items-baseline gap-2">
                {modo === 'login' ? 'Faça seu login' : 
                 modo === 'cadastro' ? 'Criar conta' : 
                 modo === 'redefinir' ? 'Nova Senha' : 'Recuperar'}
                <span className="bg-gradient-to-r from-[#5a0000] via-[#a00000] to-[#ff3b3b] w-[12px] h-[12px] rounded-full inline-block"></span>
              </p>
            </div>

            {modo === 'cadastro' && (
              <>
                <label className="text-[#9ca3af] font-sans mb-3 text-sm">Nome do Operador</label>
                <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)}
                  className="w-[355px] h-[50px] rounded-[14.5px] bg-[#111112] mb-4 text-gray-400 text-center text-lg focus:border-2 border-red-900/50 outline-none transition-all" />
              </>
            )}

            {modo !== 'redefinir' && (
              <>
                <label className="text-[#9ca3af] font-sans mb-3 text-sm">E-mail</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-[355px] h-[50px] rounded-[14.5px] bg-[#111112] mb-4 text-gray-400 text-center text-lg focus:border-2 border-red-900/50 outline-none transition-all" />
              </>
            )}

            {(modo === 'login' || modo === 'cadastro' || modo === 'redefinir') && (
              <>
                <label className="text-[#9ca3af] font-sans mb-3 text-sm">
                    {modo === 'redefinir' ? 'Nova Senha' : 'Senha'}
                </label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-[355px] h-[50px] rounded-[14.5px] bg-[#111112] mb-4 text-gray-400 text-center text-lg focus:border-2 border-red-900/50 outline-none transition-all" />
              </>
            )}

            <div className="flex justify-between items-center mt-2">
              {modo === 'login' && (
                <button type="button" onClick={() => setModo('recuperar')} className="text-[#9ca3af] underline text-sm hover:text-white transition-colors">
                  Esqueci minha senha
                </button>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="bg-gradient-to-tr from-[#2b0000] via-[#7a0000] to-[#d32f2f] opacity-80 cursor-pointer w-[354px] h-[55px] rounded-[14.5px] mt-[30px] text-white font-bold text-xl text-center hover:opacity-100 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Processando..." : 
               modo === 'login' ? "Entrar" : 
               modo === 'cadastro' ? "Cadastrar" : 
               modo === 'redefinir' ? "Salvar Senha" : "Enviar Link"}
            </button>

            <button type="button" onClick={() => setModo(modo === 'login' ? 'cadastro' : 'login')}
              className="text-[#9ca3af] underline text-center mt-4 text-sm hover:text-white transition-colors"
            >
              {modo === 'login' ? "Ainda não tenho uma conta" : "Voltar para o Login"}
            </button>
          </form>
        </section>

        <section className="hidden md:block imgs relative w-[600px] h-[654px]">
          <div className="w-full h-full">
            <img src="/img/image 1.png" alt="imagem1" className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=654&auto=format&fit=crop"; }} />
          </div>
          <div className="absolute inset-0 z-10 bg-[#070708] opacity-60 backdrop-blur-[2px] rounded-4xl"></div>
        </section>
      </main>
    </div>
  );
}