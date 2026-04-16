import React, { useState } from 'react';

interface LoginProps {
  onLogin: (name: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      
      onLogin(email.split('@')[0]);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#0E0D10] via-[#0E0D10] to-[#121216]">
      <main className="max-md:justify-center max-md:rounded-3xl lg:rounded-3xl xl:rounded-4xl container flex justify-between items-center bg-[#070709] w-[1106px] h-[654px] rounded-4xl overflow-hidden">
        
        {/* Lado Esquerdo: Formulário */}
        <section className="max-md:ml-0 form flex flex-col justify-center ml-[49px]">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex justify-center items-baseline gap-[5px]">
              <p className="max-lg:text-4xl font-[700] text-[50px] text-[#e5e7eb] mb-[70px] flex items-baseline gap-2">
                Faça seu login
                <span className="bg-gradient-to-r from-[#5a0000] via-[#a00000] to-[#ff3b3b] w-[12px] h-[12px] rounded-full inline-block"></span>
              </p>
            </div>

            <label htmlFor="email" className="text-[#9ca3af] font-sans mb-3">Login</label>
            <input 
              type="email" 
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[355px] h-[55px] rounded-[14.5px] bg-[#111112] mb-6 text-gray-400 text-center text-xl focus:border-2 border-white/10 outline-none" 
            />

            <label htmlFor="senha" className="text-[#9ca3af] font-sans mb-3">Senha</label>
            <input 
              type="password" 
              id="senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[355px] h-[55px] rounded-[14.5px] bg-[#111112] mb-6 text-gray-400 text-center text-xl focus:border-2 border-white/10 outline-none" 
            />

            <a href="#" className="text-[#9ca3af] underline text-right text-sm">Esqueci minha senha</a>

            <button 
              type="submit"
              className="bg-gradient-to-tr from-[#2b0000] via-[#7a0000] to-[#d32f2f] opacity-80 cursor-pointer w-[354px] h-[55px] mb-6 rounded-[14.5px] mt-[40px] text-white font-bold text-2xl text-center hover:opacity-100 transition-opacity"
            >
              Entrar
            </button>

            <a href="#" className="text-[#9ca3af] underline text-center mt-2 text-sm">Ainda não tenho uma conta</a>
          </form>
        </section>

        {/* Lado Direito: Imagem (Escondido em telas pequenas) */}
        <section className="hidden md:block imgs relative w-[600px] h-[654px]">
          <div className="w-full h-full">
            {/* Certifique-se que a imagem existe na pasta public/img do seu projeto novo */}
            <img 
              src="/img/image 1.png" 
              alt="imagem1" 
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=654&auto=format&fit=crop"; }} 
            />
          </div>
          <div className="absolute inset-0 z-10 bg-[#070708] opacity-70 backdrop-blur-sm rounded-4xl"></div>
        </section>
      </main>
    </div>
  );
}