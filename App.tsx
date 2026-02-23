
import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Users,
  Target,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Compass,
  Briefcase,
  CheckCircle2,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface FormData {
  nome: string;
  empresa: string;
  segmento: string;
  faturamento: string;
  colaboradores: string;
  cidade: string;
  social: string;
  motivo: string;
  desafios: string;
}

// --- Helper Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O Hub', href: '#o-que-e' },
    { name: 'Pilares', href: '#pilares' },
    { name: 'Para Quem', href: '#para-quem' },
    { name: 'Processo', href: '#processo' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-gold/20' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center font-bold text-black text-xl">T3</div>
          <span className="text-2xl font-black tracking-tighter gold-text-gradient">HUB</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-lg font-medium hover:text-gold uppercase tracking-widest">{link.name}</a>
          ))}
          <a href="#candidatura" className="bg-gold text-black px-6 py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-white transition-all">
            Quero ser membro
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gold" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-b border-gold/20 absolute top-full left-0 right-0 p-6 flex flex-col gap-6 animate-fadeIn">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium hover:text-gold uppercase tracking-widest">{link.name}</a>
            ))}
            <a href="#candidatura" onClick={() => setMobileMenuOpen(false)} className="bg-gold text-black px-6 py-3 rounded-sm font-bold text-center uppercase tracking-wider">
              Quero ser membro
            </a>
          </div>
        )}
    </nav>
  );
};

// Fix: Changed children to be optional in SectionTitle to satisfy TypeScript's JSX requirements across all usages
const SectionTitle = ({ children, subtitle, centered = false }: { children?: React.ReactNode, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-5xl title-caps mb-4 leading-tight">{children}</h2>
    {subtitle && <p className="text-gold/80 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    <div className={`h-1 w-20 bg-gold mt-4 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const PillarCard = ({ icon: Icon, title, description, details }: { icon: any, title: string, description: string, details: string }) => (
  <div className="bg-grayDark/50 border border-gold/10 p-8 rounded-lg hover:border-gold/40 transition-all group">
    <div className="mb-6 p-4 bg-gold/10 rounded-full w-fit group-hover:bg-gold group-hover:text-black transition-all">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold uppercase mb-2 tracking-tight">{title}</h3>
    <p className="text-gold font-medium mb-4">{description}</p>
    <p className="text-gray-400 text-sm leading-relaxed">{details}</p>
  </div>
);

// --- Main App ---

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    nome: '', empresa: '', segmento: '', faturamento: '', colaboradores: '', cidade: '', social: '', motivo: '', desafios: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw6kQLYyw57v_GpMiNqyyx0MfaNgJqB1RqKeSmNSioysoiEoE4lF5CSrNPjmsiVGtxH/exec';

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      alert('Candidatura enviada com sucesso! Nossa equipe entrará em contato em breve.');
      setFormData({
        nome: '', empresa: '', segmento: '', faturamento: '', colaboradores: '', cidade: '', social: '', motivo: '', desafios: ''
      });
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar candidatura. Por favor, tente novamente ou entre em contato diretamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-montserrat overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-1 border border-gold/40 rounded-full text-gold text-xs uppercase tracking-[0.3em] font-bold mb-8 animate-pulse">
            Comunidade Estruturada
          </div>
          <h1 className="text-4xl md:text-7xl title-caps mb-8 leading-[1.1] max-w-5xl mx-auto">
            Em qual liga sua empresa <br />
            <span className="gold-text-gradient">está jogando?</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            O campeonato que você escolhe disputar determina a grandeza do seu team.
            O T3 Hub é a comunidade de empresários do Norte de Minas que decidiram elevar o nível do jogo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#candidatura" className="bg-gold text-black px-10 py-5 rounded-sm font-black text-lg uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 flex items-center justify-center gap-3">
              Quero ser membro <ArrowRight size={20} />
            </a>
            <a href="#o-que-e" className="border border-gold text-gold px-10 py-5 rounded-sm font-black text-lg uppercase tracking-widest hover:bg-gold hover:text-black transition-all flex items-center justify-center">
              Descobrir o HUB
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-gold/50 text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"></div>
        </div>
      </header>

      {/* CONCEITO SECTION */}
      <section className="py-24 bg-grayDark/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl title-caps mb-8 leading-tight">
                O que muda o jogo não é o que você sabe. <br />
                <span className="text-gold">É com quem você está.</span>
              </h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>Empresas crescem quando o ambiente evolui.</p>
                <p>
                  Depois de anos conectando negócios, participando de grandes centros e acompanhando
                  a evolução de centenas de empresas, uma conclusão ficou clara:
                </p>
                <div className="grid grid-cols-1 gap-4 py-4">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded border-l-4 border-gold">
                    <Compass className="text-gold" />
                    <span className="text-white font-bold uppercase tracking-wider">Ambiente define direção.</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded border-l-4 border-gold">
                    <Target className="text-gold" />
                    <span className="text-white font-bold uppercase tracking-wider">Direção define resultado.</span>
                  </div>
                </div>
                <p className="text-white font-medium italic">O T3 Hub nasceu para ser esse ambiente.</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gold/10 border border-gold/20 rounded-2xl overflow-hidden flex items-center justify-center">
                <img
                  src="https://picsum.photos/seed/t3hub/800/800"
                  alt="Ambiente Empresarial"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-gold font-bold text-2xl uppercase italic">Direção define resultado.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE É SECTION */}
      <section id="o-que-e" className="py-24 border-y border-white/5">
        <div className="container mx-auto px-6">
          <SectionTitle>Uma comunidade de negócios estruturada para líderes do Interior</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { title: "Não é clube social", desc: "Foco total em performance e estratégia." },
              { title: "Não é grupo informal", desc: "Metodologia e estrutura de governança clara." },
              { title: "Não é apenas conteúdo", desc: "Relacionamento prático e trocas de bastidores." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="mt-1"><X className="text-red-500" size={24} /></div>
                <div>
                  <h4 className="font-bold text-xl uppercase mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-gold/20 to-transparent p-10 rounded-lg border border-gold/30">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-black uppercase mb-6 italic">Espaço Estratégico</h3>
                <p className="text-gray-300 text-lg mb-8">
                  Com critérios claros de participação, criamos um filtro que protege o nível intelectual
                  e relacional do grupo. Aqui, o topo não é solitário.
                </p>
                <div className="flex gap-10">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-gold" />
                    <div>
                      <span className="block font-bold">Montes Claros</span>
                      <span className="text-xs text-gold/60 uppercase">Base de Operação</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-gold" />
                    <div>
                      <span className="block font-bold">80+ Municípios</span>
                      <span className="text-xs text-gold/60 uppercase">Conexões Regionais</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-6xl md:text-8xl font-black opacity-10 uppercase tracking-tighter select-none">
                Norte de Minas
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OS PILARES SECTION */}
      <section id="pilares" className="py-24 bg-grayDark/20">
        <div className="container mx-auto px-6">
          <SectionTitle centered subtitle="Imagine um ambiente onde você tivesse as ferramentas certas para cada etapa da jornada.">
            OS PILARES DO T3 HUB
          </SectionTitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PillarCard
              icon={TrendingUp}
              title="Curadoria de Alto Nível"
              description="Aprendizado com quem executa."
              details="Conteúdo de grandes centros aplicado diretamente à realidade regional, sem teorias vazias."
            />
            <PillarCard
              icon={ShieldCheck}
              title="Grupo Fechado e Seletivo"
              description="Participação limitada por segmento."
              details="Ambiente seguro para compartilhar dados e estratégias, livre de concorrência predatória."
            />
            <PillarCard
              icon={Compass}
              title="Missões Empresariais"
              description="Imersões estratégicas."
              details="Experiências nacionais e internacionais que ampliam a visão e o posicionamento do seu negócio."
            />
            <PillarCard
              icon={Users}
              title="Crescimento em Equipe"
              description="Capacitação para gestores."
              details="Alinhamento real entre a visão da liderança e a execução dos seus colaboradores."
            />
            <PillarCard
              icon={Briefcase}
              title="Consultoria de Suporte"
              description="Do aprendizado à prática."
              details="Acompanhamento próximo para garantir que o conhecimento se transforme em ação e lucro."
            />
            <div className="bg-gold p-8 rounded-lg flex flex-col justify-between items-start">
              <h3 className="text-black font-black text-2xl uppercase leading-tight">Pronto para elevar o nível?</h3>
              <a href="#candidatura" className="bg-black text-white w-full py-4 text-center font-bold uppercase tracking-widest mt-6 hover:bg-gray-900 transition-colors">
                Iniciar Candidatura
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* POSICIONAMENTO SECTION */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl title-caps mb-8 italic">Não é sobre quantidade. <span className="text-gold">É sobre nível.</span></h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16">
              <div className="p-8 border border-gold/20 rounded-full w-48 h-48 flex flex-col items-center justify-center">
                <span className="text-5xl font-black gold-text-gradient">80+</span>
                <span className="text-xs uppercase tracking-tighter text-gold/60">Empresários</span>
              </div>
              <p className="text-xl md:text-2xl text-gray-400 max-w-lg text-left border-l-2 border-gold pl-8">
                Empresas relevantes da região escolheram estar nesse ambiente. O movimento já começou e quem dita o ritmo são os realizadores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARA QUEM É SECTION */}
      <section id="para-quem" className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://picsum.photos/seed/executive/600/800"
                alt="Líder T3"
                className="rounded-lg shadow-2xl border border-white/10"
              />
            </div>
            <div>
              <SectionTitle>Para quem é o T3 Hub</SectionTitle>
              <div className="space-y-6">
                {[
                  "Empresários que já construíram algo sólido",
                  "Desejam expandir com estrutura",
                  "Buscam conexões estratégicas de verdade",
                  "Valorizam um ambiente de confiança",
                  "Querem evoluir junto com outros líderes"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-lg font-medium group">
                    <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all">
                      <CheckCircle2 size={18} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSO SELETIVO SECTION */}
      <section id="processo" className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle centered>Processo Seletivo</SectionTitle>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16 text-lg">
            Participação mediante candidatura. O T3 Hub mantém critérios rígidos para preservar o ecossistema.
            <span className="block mt-4 text-gold font-bold italic">Nem todos os interessados são aprovados.</span>
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Análise de Perfil", desc: "Avaliação do histórico do empresário." },
              { step: "02", title: "Segmento", desc: "Verificação de disponibilidade no nicho." },
              { step: "03", title: "Triagem Jurídica", desc: "Compliance e reputação empresarial." },
              { step: "04", title: "Alinhamento", desc: "Checagem de valores e visão de futuro." }
            ].map((p, i) => (
              <div key={i} className="bg-grayDark p-8 border-b-4 border-gold group hover:bg-gold/5 transition-all">
                <span className="text-gold font-black text-4xl mb-4 block opacity-40 group-hover:opacity-100">{p.step}</span>
                <h4 className="text-xl font-bold uppercase mb-2">{p.title}</h4>
                <p className="text-sm text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL & FORMULÁRIO */}
      <section id="candidatura" className="py-24 bg-gradient-to-b from-black to-grayDark/50 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-black border border-gold/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,192,142,0.1)]">
            <div className="grid md:grid-cols-2">
              <div className="p-12 gold-gradient flex flex-col justify-center text-black">
                <h2 className="text-4xl title-caps mb-6 leading-tight">Agora a decisão é sua.</h2>
                <p className="text-xl font-medium mb-8">
                  Em qual liga sua empresa vai jogar nos próximos anos? O tempo das decisões medianas acabou.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-sm">
                    <ChevronRight size={16} /> Seleção Ativa
                  </div>
                  <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-sm">
                    <ChevronRight size={16} /> Vagas Limitadas por Segmento
                  </div>
                </div>
              </div>
              <div className="p-12">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text" name="nome" placeholder="Nome Completo" required
                      className="bg-transparent border-b border-white/20 p-3 focus:border-gold outline-none w-full transition-all"
                      value={formData.nome} onChange={handleInputChange}
                    />
                    <input
                      type="text" name="empresa" placeholder="Sua Empresa" required
                      className="bg-transparent border-b border-white/20 p-3 focus:border-gold outline-none w-full transition-all"
                      value={formData.empresa} onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text" name="segmento" placeholder="Segmento" required
                      className="bg-transparent border-b border-white/20 p-3 focus:border-gold outline-none w-full transition-all"
                      value={formData.segmento} onChange={handleInputChange}
                    />
                    <select
                      name="faturamento" required
                      className="bg-transparent border-b border-white/20 p-3 focus:border-gold outline-none w-full transition-all text-gray-400"
                      value={formData.faturamento} onChange={handleInputChange}
                    >
                      <option value="">Faturamento Anual</option>
                      <option value="ate-1m">Até R$ 1M</option>
                      <option value="1m-5m">R$ 1M a R$ 5M</option>
                      <option value="5m-15m">R$ 5M a R$ 15M</option>
                      <option value="acima-15m">Acima de R$ 15M</option>
                    </select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text" name="cidade" placeholder="Cidade / Estado" required
                      className="bg-transparent border-b border-white/20 p-3 focus:border-gold outline-none w-full transition-all"
                      value={formData.cidade} onChange={handleInputChange}
                    />
                    <input
                      type="text" name="social" placeholder="Instagram ou Site"
                      className="bg-transparent border-b border-white/20 p-3 focus:border-gold outline-none w-full transition-all"
                      value={formData.social} onChange={handleInputChange}
                    />
                  </div>
                  <textarea
                    name="motivo" placeholder="Por que deseja participar do T3 Hub?" rows={3}
                    className="bg-transparent border border-white/10 p-4 rounded focus:border-gold outline-none w-full transition-all"
                    value={formData.motivo} onChange={handleInputChange}
                  />
                  <textarea
                    name="desafios" placeholder="Quais são seus principais desafios hoje?" rows={3}
                    className="bg-transparent border border-white/10 p-4 rounded focus:border-gold outline-none w-full transition-all"
                    value={formData.desafios} onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-black py-5 font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Preencher Candidatura'}
                  </button>
                  <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest">
                    Seus dados estão protegidos por criptografia e serão usados apenas para a triagem.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-6 h-6 bg-gold rounded-sm flex items-center justify-center font-bold text-black text-sm">T3</div>
            <span className="text-xl font-black tracking-tighter gold-text-gradient">HUB</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">© 2024 T3 Hub. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-gold/60 hover:text-gold transition-colors text-xs uppercase tracking-widest">Política de Privacidade</a>
            <a href="#" className="text-gold/60 hover:text-gold transition-colors text-xs uppercase tracking-widest">Termos de Uso</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
