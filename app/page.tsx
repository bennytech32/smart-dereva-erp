'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Car, Briefcase, Truck, Bus, GraduationCap, 
  Menu, X, Check, CheckCircle, Shield, ShieldCheck, 
  Wrench, Sparkles, Banknote, MapPin, Phone, Mail, 
  ArrowRight, Send, User, Building2, Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingType, setBookingType] = useState('individual');
  
  const [formData, setFormData] = useState({ name: '', phone: '', field1: '', field2: '' });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (type: string) => {
    setBookingType(type);
    setModalOpen(true);
    setFormData({ name: '', phone: '', field1: '', field2: '' });
  };

  const getModalContent = () => {
    switch (bookingType) {
      case 'corporate':
        return { title: "Corporate Partnership", subtitle: "For Banks, Government & Private Companies", label1: "Company HQ", label2: "Requirements", placeholder1: "e.g. Posta HQ", placeholder2: "e.g. 10 Drivers", icon: <Briefcase className="w-8 h-8 text-blue-600" />, color: "bg-blue-50" };
      case 'transit':
        return { title: "Transit & Clearing", subtitle: "Hire a driver for Port/Transit movement.", label1: "Yard Location", label2: "Destination", placeholder1: "e.g. TPA Gate 3", placeholder2: "e.g. Tunduma", icon: <Truck className="w-8 h-8 text-orange-600" />, color: "bg-orange-50" };
      case 'special':
        return { title: "Special Hire (Coaster)", subtitle: "Bus Rental for Weddings & Events.", label1: "Passengers", label2: "Event Type", placeholder1: "e.g. 25 People", placeholder2: "e.g. Wedding", icon: <Bus className="w-8 h-8 text-amber-600" />, color: "bg-amber-50" };
      default:
        return { title: "Book a Driver", subtitle: "For personal car hire.", label1: "Pickup", label2: "Destination", placeholder1: "e.g. Masaki", placeholder2: "e.g. Mbezi", icon: <Car className="w-8 h-8 text-blue-600" />, color: "bg-blue-50" };
    }
  };

  const content = getModalContent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const myNumber = "255745517500"; 
    const message = `Booking: ${bookingType}%0AClient: ${formData.name}%0APhone: ${formData.phone}%0ADetails: ${formData.field1} to ${formData.field2}`;
    window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
    setModalOpen(false);
  };

  return (
    <div className="font-sans flex flex-col min-h-screen bg-white text-slate-900">
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-100' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-900 text-white p-2.5 rounded-xl shadow-lg">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <span className={`font-extrabold text-xl tracking-tight leading-none block ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
                  SMART DEREVA
                </span>
                <span className={`text-[10px] font-bold tracking-widest uppercase ${isScrolled ? 'text-slate-400' : 'text-blue-200'}`}>Holdings Ltd</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className={`text-sm font-semibold transition ${isScrolled ? 'text-slate-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>Services</a>
              <a href="#membership" className="text-sm font-bold text-amber-500">Smart Club 👑</a>
              
              <Link href="/join" className={`text-sm font-bold px-4 py-2 rounded-lg border-2 transition ${isScrolled ? 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white' : 'border-white text-white hover:bg-white hover:text-blue-900'}`}>
                Join as Driver
              </Link>

              <Link href="/login" className="bg-blue-900 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:bg-blue-800">
                ERP Login
              </Link>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden p-2 ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069')" }}
      >
        <div className="absolute inset-0 bg-slate-900/75"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pt-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-white mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            OFFICIAL PARTNER: NIT & POLICE FORCE
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Gari Lako. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Dereva Wetu.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Professional driver management for Tanzanian enterprises and car owners. We recruit, vet, and insure[cite: 8, 22].
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => openModal('individual')} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition transform hover:-translate-y-1">
              <Car className="w-5 h-5" /> Book a Driver
            </button>
            <Link href="/join" className="w-full sm:w-auto bg-white text-blue-900 px-10 py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition transform hover:-translate-y-1">
              <User className="w-5 h-5" /> Join as Driver
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES CARDS */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition group">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition"><Car /></div>
              <h3 className="text-xl font-bold mb-3">On-Demand</h3>
              <p className="text-slate-500 text-sm mb-6">Safe drivers for personal cars. Ideal for events or long safaris.</p>
              <button onClick={() => openModal('individual')} className="text-blue-600 font-bold text-sm">Book Now &rarr;</button>
            </div>

            <div className="bg-blue-900 p-8 rounded-3xl shadow-xl text-white group">
              <div className="w-12 h-12 bg-blue-800 text-blue-300 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition"><Briefcase /></div>
              <h3 className="text-xl font-bold mb-3">Corporate</h3>
              <p className="text-blue-100/70 text-sm mb-6">Full payroll and NSSF management for Bank and Gov fleets[cite: 23].</p>
              <button onClick={() => openModal('corporate')} className="text-blue-300 font-bold text-sm">Request Quote &rarr;</button>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition group">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition"><Truck /></div>
              <h3 className="text-xl font-bold mb-3">Transit</h3>
              <p className="text-slate-500 text-sm mb-6">Secure port-to-destination drivers. We manage fuel and ensure safety.</p>
              <button onClick={() => openModal('transit')} className="text-orange-600 font-bold text-sm">Hire Logistics &rarr;</button>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition group">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition"><Bus /></div>
              <h3 className="text-xl font-bold mb-3">Special Hire</h3>
              <p className="text-slate-500 text-sm mb-6">Premium Coasters for weddings, staff transport, and events.</p>
              <button onClick={() => openModal('special')} className="text-amber-600 font-bold text-sm">Check Price &rarr;</button>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL FOOTER */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-1.5 rounded">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">Smart Dereva</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Tanzania&apos;s National Digital Driver Registry. We combine Tanzanian software talent with rigorous HR compliance[cite: 61].
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-400 transition"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-pink-600 transition"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-700 transition"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-blue-400">Our Solutions</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Corporate Fleet Management</a></li>
                <li><a href="#" className="hover:text-white transition">Personal Driver Hire</a></li>
                <li><a href="#" className="hover:text-white transition">Transit Logistics</a></li>
                <li><a href="#" className="hover:text-white transition">Special Hire (Coasters)</a></li>
              </ul>
            </div>

            {/* Column 3: Trust & Safety */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-blue-400">Trust & Safety</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> NIT Certified Drivers</li>
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Police Records Verified</li>
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> NIDA Integrated</li>
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Smart Shield Insurance</li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-blue-400">Contact Us</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex gap-3 items-start"><MapPin className="w-5 h-5 text-blue-500 shrink-0" /> Posta Mpya, Dar es Salaam, Tanzania</li>
                <li className="flex gap-3 items-center"><Phone className="w-5 h-5 text-blue-500" /> +255 745 517 500</li>
                <li className="flex gap-3 items-center"><Mail className="w-5 h-5 text-blue-500" /> info@smartdereva.co.tz</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
            <p>© 2026 Smart Dereva Holdings Ltd. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">PEA License</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL SYSTEM */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
            <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 transition"><X /></button>
            <div className="text-center mb-8">
               <div className={`${content.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>{content.icon}</div>
               <h3 className="text-2xl font-bold text-slate-900">{content.title}</h3>
               <p className="text-sm text-slate-500 mt-1">{content.subtitle}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
               <input type="text" placeholder="Full Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
               <input type="tel" placeholder="WhatsApp Number" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" required onChange={(e) => setFormData({...formData, phone: e.target.value})} />
               <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder={content.placeholder1} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" required onChange={(e) => setFormData({...formData, field1: e.target.value})} />
                  <input type="text" placeholder={content.placeholder2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" required onChange={(e) => setFormData({...formData, field2: e.target.value})} />
               </div>
               <button type="submit" className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition shadow-lg flex justify-center items-center gap-2">
                 Submit Request <Send className="w-4 h-4" />
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}