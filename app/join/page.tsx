'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User,  CreditCard, FileCheck, Upload, 
  CheckCircle, ChevronRight, ChevronLeft, Truck 
} from 'lucide-react';

export default function DriverRegistration() {
  const [step, setStep] = useState(1);
  
  // FORM STATE
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', nida: '',
    licenseNumber: '', licenseClass: 'C', nitStatus: 'Certified',
    experience: '', location: ''
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* 1. HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-900">
            <div className="bg-blue-900 text-white p-1.5 rounded-lg">
              <Truck className="w-5 h-5" />
            </div>
            Smart Dereva
          </Link>
          <div className="text-sm font-medium text-slate-500">
            Driver Recruitment Portal
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full p-6 py-12">
        
        {/* PROGRESS BAR */}
        <div className="mb-12">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            <span className={step >= 1 ? 'text-blue-600' : ''}>1. Personal Info</span>
            <span className={step >= 2 ? 'text-blue-600' : ''}>2. Qualifications</span>
            <span className={step >= 3 ? 'text-blue-600' : ''}>3. Review</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out" 
              style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
            ></div>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          
          {/* STEP 1: PERSONAL DETAILS */}
          {step === 1 && (
            <div className="animate-in slide-in-from-right-10 fade-in duration-300">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Let's start with the basics.</h2>
              <p className="text-slate-500 mb-8">We need your official details as they appear on your NIDA ID.</p>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                    <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Juma" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                    <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Kapuya" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number (M-Pesa/Tigo)</label>
                  <input type="tel" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+255 7..." />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">NIDA Number</label>
                  <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="20000000..." />
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" /> We verify this with the National ID System automatically.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button onClick={handleNext} className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-800 transition">
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PROFESSIONAL QUALIFICATIONS */}
          {step === 2 && (
            <div className="animate-in slide-in-from-right-10 fade-in duration-300">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Driving Credentials.</h2>
              <p className="text-slate-500 mb-8">Smart Dereva maintains the highest standard of compliance.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Driving License Number</label>
                  <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="License No." />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">License Class</label>
                    <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                      <option>Class C (Coaster/Bus)</option>
                      <option>Class E (Heavy Truck)</option>
                      <option>Class D (Private)</option>
                      <option>Class A (Motorcycle)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Years of Experience</label>
                    <input type="number" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 5" />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <label className="block text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <FileCheck className="w-4 h-4" /> NIT Certification
                  </label>
                  <div className="flex gap-4 mt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="nit" className="w-4 h-4 text-blue-600" defaultChecked />
                      <span className="text-sm font-medium">I am NIT Certified</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="nit" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Not yet (I need training)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button onClick={handlePrev} className="text-slate-500 font-bold px-4 py-3 hover:text-slate-800">
                  Back
                </button>
                <button onClick={handleNext} className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-800 transition">
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & SUBMIT */}
          {step === 3 && (
            <div className="text-center animate-in zoom-in-95 fade-in duration-300">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Almost Done!</h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                By clicking submit, you agree to a background check with the Police Force and NIDA as part of our vetting process.
              </p>

              <div className="bg-slate-50 p-6 rounded-xl text-left mb-8 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Summary</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex justify-between border-b border-slate-200 pb-2">
                    <span>Full Name</span> <span className="font-bold text-slate-900">Juma Kapuya</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-200 pb-2">
                    <span>License</span> <span className="font-bold text-slate-900">Class C (Verified)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>NIT Status</span> <span className="font-bold text-green-600">Certified</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4 justify-center">
                <button onClick={handlePrev} className="text-slate-500 font-bold px-4 hover:text-slate-800">
                  Edit Details
                </button>
                <Link href="/driver-portal" className="bg-green-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-500 transition shadow-xl shadow-green-600/20">
                  Submit Application
                </Link>
              </div>
            </div>
          )}

        </div>
        
        {/* TRUST SIGNALS */}
        <div className="mt-12 flex justify-center gap-8 opacity-50 grayscale">
           <div className="flex items-center gap-2 font-bold text-slate-400">
             <FileCheck className="w-5 h-5" /> NIDA Verified
           </div>
           <div className="flex items-center gap-2 font-bold text-slate-400">
             <Truck className="w-5 h-5" /> NIT Partner
           </div>
        </div>

      </main>
    </div>
  );
}