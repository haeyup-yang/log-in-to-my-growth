/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Code, 
  Book, 
  Calculator, 
  FlaskConical, 
  ChevronRight, 
  Github, 
  ExternalLink, 
  Timer, 
  StickyNote, 
  Trophy, 
  Target,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

// --- Types ---
interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface ProjectFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Components ---

const CritiqueModal = ({ isOpen, onClose, critique }: { isOpen: boolean, onClose: () => void, critique: { title: string, content: string } | null }) => {
  return (
    <AnimatePresence>
      {isOpen && critique && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={24} className="text-slate-400" />
            </button>
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-4 uppercase tracking-widest">
                Book Critique
              </span>
              <h3 className="text-3xl font-black text-slate-900">{critique.title}</h3>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed text-lg italic">
                "{critique.content}"
              </p>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end items-center">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all"
              >
                닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Project', href: '#project' },
    { name: 'Log', href: '#log' },
    { name: 'Reading', href: '#reading' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold text-blue-600 tracking-tight">
          Log-In to My Growth
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-600"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
    {subtitle && <p className="text-lg text-slate-500 max-w-2xl">{subtitle}</p>}
    <div className="w-20 h-1.5 bg-blue-600 mt-6 rounded-full"></div>
  </div>
);

export default function App() {
  const [selectedCritique, setSelectedCritique] = useState<{ title: string, content: string } | null>(null);

  const skills: Skill[] = [
    { name: 'Python', icon: <Code size={20} /> },
    { name: 'JavaScript', icon: <Code size={20} /> },
    { name: 'React', icon: <Code size={20} /> },
  ];

  const projectFeatures: ProjectFeature[] = [
    { title: 'Timer', description: '집중력을 높이는 뽀모도로 기법 적용', icon: <Timer className="text-blue-500" /> },
    { title: 'Note', description: '오답 노트를 디지털화하여 데이터베이스 관리', icon: <StickyNote className="text-blue-500" /> },
    { title: 'Reward', description: '게이미피케이션 요소를 도입하여 성취감 부여', icon: <Trophy className="text-blue-500" /> },
    { title: 'Goal Setting', description: '일/주/월 단위의 계층적 목표 수립 알고리즘', icon: <Target className="text-blue-500" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden bg-slate-50">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-mono font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full tracking-wider">
              // PORTFOLIO_V2026.CORE_RESEARCH
            </span>
            <h1 className="text-6xl md:text-9xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter uppercase">
              SCIENCE<br />
              <span className="text-blue-600">EXPLORER</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              데이터와 논리로 세상을 해석하고,<br />
              공학적 상상력으로 미래를 설계하는 저의 탐구 기록입니다.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
              <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200 w-36 md:w-44 hover:border-blue-200 hover:shadow-md transition-all group">
                <span className="text-3xl md:text-4xl font-black text-blue-600 mb-1 group-hover:scale-110 transition-transform">120+</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Books Read</span>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200 w-36 md:w-44 hover:border-blue-200 hover:shadow-md transition-all group">
                <span className="text-3xl md:text-4xl font-black text-blue-600 mb-1 group-hover:scale-110 transition-transform">45</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Projects</span>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200 w-36 md:w-44 hover:border-blue-200 hover:shadow-md transition-all group">
                <span className="text-3xl md:text-4xl font-black text-blue-600 mb-1 group-hover:scale-110 transition-transform">A+</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Math/Sci</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#project" className="px-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 shadow-lg shadow-slate-200 transition-all flex items-center gap-2 group">
                탐구 프로젝트 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" className="px-10 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all">
                자기소개
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Monospace Elements */}
        <div className="absolute bottom-10 left-10 hidden xl:block font-mono text-[10px] text-slate-300 leading-tight">
          <div>LATITUDE: 37.5665° N</div>
          <div>LONGITUDE: 126.9780° E</div>
          <div>STATUS: ACTIVE_RESEARCH</div>
          <div className="mt-2 text-blue-300 opacity-50">--------------------</div>
        </div>
        
        <div className="absolute bottom-10 right-10 hidden xl:block font-mono text-[10px] text-slate-300 text-right leading-tight">
          <div>SYSTEM_OS: NEURON_V2</div>
          <div>CORE_TEMP: OPTIMAL</div>
          <div>CONNECTION: SECURE</div>
          <div className="mt-2 text-blue-300 opacity-50">--------------------</div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="About Me" 
            subtitle="문제를 끝까지 해결하는 집요함과 융합적 사고를 가진 학생입니다."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Identity Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <User size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Identity</h3>
              <p className="text-slate-500 leading-relaxed">
                어려운 수학 문제를 만났을 때 며칠을 고민해서라도 스스로 풀어내는 집요함을 가지고 있습니다. 이러한 태도는 코딩 중 발생하는 복잡한 버그를 해결할 때도 큰 자산이 됩니다.
              </p>
            </motion.div>

            {/* Skill Stack Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Code size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Skill Stack</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-sm font-bold text-slate-700">
                    {skill.icon}
                    {skill.name}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-slate-400">
                아이디어를 실제 서비스로 구현하기 위해 필요한 도구들을 익히고 있습니다.
              </p>
            </motion.div>

            {/* Interest Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Interest</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-600 font-medium">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  수학 (기하, 수론)
                </li>
                <li className="flex items-center gap-3 text-slate-600 font-medium">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  과학 (물리, 천문)
                </li>
                <li className="flex items-center gap-3 text-slate-600 font-medium">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  독서 (수학, 과학 도서)
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Major Project Section */}
      <section id="project" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Major Project: 학습 가디언" 
            subtitle="친구들의 작심삼일 문제를 해결하기 위해 개발한 자기주도 학습 지원 앱입니다."
          />

          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-16 flex flex-col justify-center bg-slate-50/50">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-8">
                  <Code size={16} /> App Development
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">"작심삼일을 넘어, 성장의 습관으로"</h3>
                <p className="text-slate-600 text-lg mb-10 leading-relaxed italic border-l-4 border-blue-600 pl-6">
                  "친구들이 목표를 세워도 작심삼일에 그치는 문제를 해결하고 싶었습니다. 단순한 관리가 아닌, 성취감을 주는 시스템이 필요하다고 생각했습니다."
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {projectFeatures.map((feature) => (
                    <div key={feature.title} className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-lg flex items-center justify-center text-blue-500">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{feature.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-12 lg:p-16 flex flex-col justify-center border-l border-slate-100">
                <h4 className="text-xl font-bold text-slate-900 mb-8">성과 및 배운 점</h4>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Code size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 mb-2">기술적 오류 해결</h5>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        데이터베이스 동기화 과정에서 발생한 레이스 컨디션 문제를 해결하며 비동기 프로그래밍의 중요성을 깨달았습니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Calculator size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 mb-2">알고리즘 설계</h5>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        계층적 목표 수립 알고리즘을 설계하며 논리적 구조화의 힘을 경험했습니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                      <User size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 mb-2">사용자 피드백 반영</h5>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        베타 테스트를 통해 친구들의 피드백을 받고 UI/UX를 개선하며 진정한 문제 해결의 즐거움을 느꼈습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Math & Science Log Section */}
      <section id="log" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Math & Science Log" 
            subtitle="교과 과정을 넘어선 깊이 있는 탐구와 실생활 적용 사례입니다."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Math Log */}
            <div className="group">
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 h-full transition-all hover:shadow-xl hover:border-blue-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                    <Calculator size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">Mathematics</h3>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-blue-600 mb-2">앱 보상 시스템의 확률 설계</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      '학습 가디언' 앱의 랜덤 보상 시스템에 기댓값 이론을 적용하여, 사용자가 지속적으로 동기를 부여받을 수 있는 최적의 확률을 계산하고 적용했습니다.
                    </p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-blue-600 mb-2">공식의 직접 증명</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      교과서에 나오는 공식을 단순히 외우지 않고, 기하학적 접근과 대수적 접근을 통해 직접 유도하며 원리를 깊이 이해했습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Science Log */}
            <div className="group">
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 h-full transition-all hover:shadow-xl hover:border-blue-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                    <FlaskConical size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">Science</h3>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-emerald-600 mb-2">심화 실험 보고서: 물리</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      자유 낙하 운동과 공기 저항의 관계를 정밀 측정 장비를 활용해 실험하고, 오차의 원인을 물리적 변수로 분석하여 보고서를 작성했습니다.
                    </p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-emerald-600 mb-2">과학 뉴스 분석: 천문</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      제임스 웹 우주 망원경의 최신 관측 데이터를 분석한 기사를 읽고, 현대 천문학의 과제와 기술적 진보에 대해 탐구했습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Diary Section */}
      <section id="reading" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Reading Diary" 
            subtitle="단순한 요약을 넘어, 비평을 통해 세상을 보는 시야를 넓힙니다."
          />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Book 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="relative group h-[500px] rounded-[2rem] overflow-hidden shadow-lg"
            >
              <img 
                src="https://picsum.photos/seed/cosmos/800/1200" 
                alt="Cosmos" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 p-8">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-4">과학</span>
                <h3 className="text-2xl font-bold text-white mb-3">코스모스</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  "우주라는 거대한 캔버스 속에서 인간의 존재가 얼마나 작으면서도 소중한지 깨달았습니다. 기술의 발전이 인류의 겸손함과 함께 가야 함을 배웠습니다."
                </p>
                <button 
                  onClick={() => setSelectedCritique({
                    title: "코스모스",
                    content: "칼 세이건의 코스모스는 단순한 과학 서적을 넘어 인류의 철학적 위치를 재정의합니다. 우주의 방대함 앞에서 인간의 오만함을 경계하고, 우리가 가진 유일한 안식처인 지구를 아끼고 사랑해야 한다는 메시지는 공학을 공부하는 저에게 큰 울림을 주었습니다. 기술은 결국 인류를 위한 도구여야 하며, 그 바탕에는 생명에 대한 경외감이 있어야 함을 깨달았습니다."
                  })}
                  className="flex items-center gap-2 text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors"
                >
                  비평 읽기 <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Featured Book 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="relative group h-[500px] rounded-[2rem] overflow-hidden shadow-lg"
            >
              <img 
                src="https://picsum.photos/seed/sapiens/800/1200" 
                alt="Sapiens" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 p-8">
                <span className="inline-block px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full mb-4">인문</span>
                <h3 className="text-2xl font-bold text-white mb-3">사피엔스</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  "인류 역사의 흐름 속에서 '허구'를 믿는 능력이 어떻게 협력을 이끌어냈는지 분석하며, 현대 사회의 시스템을 수학적 구조로 이해하는 계기가 되었습니다."
                </p>
                <button 
                  onClick={() => setSelectedCritique({
                    title: "사피엔스",
                    content: "유발 하라리는 인류가 어떻게 지구의 지배자가 되었는지 '인지 혁명'이라는 키워드로 설명합니다. 특히 '상상의 질서'라는 개념은 사회 시스템을 이해하는 새로운 프레임을 제공했습니다. 수학적 모델링이 현실 세계의 복잡한 사회 현상을 완벽히 설명할 수는 없지만, 이러한 인문학적 통찰이 더해질 때 비로소 가치 있는 알고리즘이 탄생할 수 있다는 확신을 갖게 되었습니다."
                  })}
                  className="flex items-center gap-2 text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors"
                >
                  비평 읽기 <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Reading List */}
            <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Book size={24} className="text-blue-600" /> 독서 리스트
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">수학/과학</h4>
                  <ul className="space-y-2">
                    <li className="text-sm font-medium text-slate-700 flex justify-between">
                      <span>수학의 정석 (탐구형 독서)</span>
                      <span className="text-blue-500">완독</span>
                    </li>
                    <li className="text-sm font-medium text-slate-700 flex justify-between">
                      <span>이기적 유전자</span>
                      <span className="text-blue-500">완독</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">인문/자기계발</h4>
                  <ul className="space-y-2">
                    <li className="text-sm font-medium text-slate-700 flex justify-between">
                      <span>정의란 무엇인가</span>
                      <span className="text-blue-500">완독</span>
                    </li>
                    <li className="text-sm font-medium text-slate-700 flex justify-between">
                      <span>아주 작은 습관의 힘</span>
                      <span className="text-blue-500">읽는 중</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 p-6 bg-blue-600 rounded-2xl text-white">
                <p className="text-xs font-bold opacity-80 mb-2">My Philosophy</p>
                <p className="text-sm font-medium leading-relaxed">
                  "독서는 공학적 소양의 뿌리입니다. 기술은 인간을 향해야 하며, 그 방향은 책에서 찾을 수 있습니다."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Roadmap Section */}
      <section className="py-24 bg-blue-600 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-8">고등학교에서의 포부</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
            현재의 성장에 안주하지 않고, 고등학교 진학 후에는 인공지능을 활용한 사회 문제 해결 프로젝트를 수행하고 싶습니다. 수학적 모델링을 통해 더 정교한 알고리즘을 설계하는 융합형 인재로 거듭나겠습니다.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold mb-2">01</div>
              <div className="text-sm font-medium opacity-80 tracking-widest uppercase">Content Selection</div>
            </div>
            <div className="w-12 h-px bg-white/30 self-center hidden sm:block"></div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold mb-2">02</div>
              <div className="text-sm font-medium opacity-80 tracking-widest uppercase">Final Review</div>
            </div>
            <div className="w-12 h-px bg-white/30 self-center hidden sm:block"></div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold mb-2">03</div>
              <div className="text-sm font-medium opacity-80 tracking-widest uppercase">Submission</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-2">Log-In to My Growth</h3>
            <p className="text-sm text-slate-400">© 2026 [이름] Portfolio. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </footer>
      <CritiqueModal 
        isOpen={!!selectedCritique} 
        onClose={() => setSelectedCritique(null)} 
        critique={selectedCritique} 
      />
    </div>
  );
}
