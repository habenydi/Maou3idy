'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import InformationFooter from '@/components/InformationFooter';

const DoctorPage = () => {
  const router = useRouter();

  return (
    <div className="bg-surface text-on-surface">
      <Navbar activeLink="specialties" />

      <main className="pt-24 pb-12 max-w-screen-2xl mx-auto px-6">
        <section className="mb-12">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">Find a Specialist</h1>
            <p className="text-on-surface-variant text-lg">Book appointments with top-rated medical professionals in your area.</p>
          </div>
          <div className="relative max-w-3xl">
            <div className="flex items-center bg-surface-container-lowest rounded-xl shadow-sm p-2 group focus-within:ring-2 ring-primary/20 transition-all">
              <span className="material-symbols-outlined px-4 text-outline">search</span>
              <input className="w-full border-none focus:ring-0 bg-transparent text-on-surface py-3 text-lg placeholder:text-outline-variant" placeholder="Search by doctor name, specialty, or hospital..." type="text" />
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-container transition-colors active:scale-95">Search</button>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-surface-container-low rounded-xl p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Filters</h2>
                <button className="text-primary text-sm font-semibold hover:underline">Reset All</button>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-4">Category</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input defaultChecked className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" />
                    <span className="text-on-surface group-hover:text-primary transition-colors">Cardiology</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" />
                    <span className="text-on-surface group-hover:text-primary transition-colors">Pediatrics</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" />
                    <span className="text-on-surface group-hover:text-primary transition-colors">Neurology</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" />
                    <span className="text-on-surface group-hover:text-primary transition-colors">Dermatology</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" />
                    <span className="text-on-surface group-hover:text-primary transition-colors">General Medicine</span>
                  </label>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-4">Minimum Rating</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 border-outline-variant text-primary focus:ring-primary/20" name="rating" type="radio" />
                    <span className="flex items-center gap-1 text-on-surface group-hover:text-primary transition-colors">
                      4.5 <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> &amp; above
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input defaultChecked className="w-5 h-5 border-outline-variant text-primary focus:ring-primary/20" name="rating" type="radio" />
                    <span className="flex items-center gap-1 text-on-surface group-hover:text-primary transition-colors">
                      4.0 <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> &amp; above
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-4">Availability</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" />
                    <span className="text-on-surface group-hover:text-primary transition-colors">Available Today</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" />
                    <span className="text-on-surface group-hover:text-primary transition-colors">Online Consultation</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-on-surface-variant font-medium">Showing <span className="text-on-surface font-bold">124</span> Doctors in Cardiology</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-outline font-medium">Sort by:</span>
                <select className="bg-transparent border-none focus:ring-0 text-sm font-bold text-primary cursor-pointer">
                  <option>Highest Rated</option>
                  <option>Most Experience</option>
                  <option>Availability</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Doctor Card 1 */}
              <div className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Professional male doctor in white coat with stethoscope smiling warmly in a clinical setting with soft natural light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2ERx1ojwLVXuGa700YtS-gTWrPU9YaRrzo-JluZIdwFqnOPbcDDXLIGcvK1P6bK2Cwbkg5GzCJRVNhghsQUnV5krqsjRp1rpJ6RZ4-myhWnY0n_d5ezXwe1ykCGeaIp5GWUccJZj1vCDv0kAo5tnqs3eeeUcEfIZwaI-Pj6Ah78wft3OeHMWGm1A60nEb_2Tmbhz6PkBGD79aiKz12vpCpK6NSiENdwTIpWtn8LXxBGx5h7HblfI4M14mEi6WcBPC434KDDl9kdg"/>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-bold text-on-surface">4.9</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-on-surface">Dr. James Wilson</h3>
                    <p className="text-primary font-semibold text-sm">Senior Cardiologist</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-surface-container-low text-on-surface-variant text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>history</span> 15 Years Exp.
                    </span>
                    <span className="bg-success/10 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full">Available Today</span>
                  </div>
                  <button onClick={() => router.push('/patients/booking?doctorId=1')} className="w-full bg-surface-container-highest text-on-surface font-bold py-3 rounded-lg hover:bg-primary-container hover:text-white transition-all active:scale-95">View Profile</button>
                </div>
              </div>
              {/* Doctor Card 2 */}
              <div className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Female doctor in professional medical attire looking confident and kind in a bright modern medical office" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNu0HU0MFvXhOqLJbfncK4K2tV5JCil6y4g6cRv1OnkcQdfVXXqV7yAznGUEIMp4PyB4LuD0JpvwmFhAJydCK-u1rqtfxxJOV7e4syptxzRpV_Je9sSjS0itO8NSBfDr3JoVoiXVZnS2vuv2cxzqu5uf1l2DSMoRjsDYNAWk34RPRGTp7abujPlTCI3IfYIYJyh7UR5N7rUa9_yd7lJRGuae6p2h6wrSU8sEF6cBJQ4DP4ZLBMZakQh80taaQH-Gaqv0x_JycMj7Q"/>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-bold text-on-surface">4.8</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-on-surface">Dr. Sarah Chen</h3>
                    <p className="text-primary font-semibold text-sm">Pediatric Specialist</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-surface-container-low text-on-surface-variant text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>history</span> 8 Years Exp.
                    </span>
                    <span className="bg-secondary-container/20 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">Telehealth Available</span>
                  </div>
                  <button onClick={() => router.push('/patients/booking?doctorId=2')} className="w-full bg-surface-container-highest text-on-surface font-bold py-3 rounded-lg hover:bg-primary-container hover:text-white transition-all active:scale-95">View Profile</button>
                </div>
              </div>
              {/* Doctor Card 3 */}
              <div className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Portrait of a friendly medical professional in a lab coat with a warm expression in a high-tech hospital corridor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVIl868Xjpmx8b2HReKuaoHLPEsQDBbz9JdWMBIAjJuAP37po2Zh3E2tTpKweC-DNSjeIM6WgHtX_SKs8zSR1MBLDMif1H_97rYXYVtaDRANkz5q-H9mJc5mWQMMd6Xd2eC4U92raS40V8GRoSf0ztfpNi2rtTz2ih1xUgPlA3hcjWY9wznPT6fpP7syyY1bp8DNsSBHTTLSfwA7yGWVmNxEPFDufSc7pVos9inpgXWOPuYTgVXl_J0RdIP19zM3pg8EV2Me8b1QQ"/>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-bold text-on-surface">5.0</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-on-surface">Dr. Michael Ross</h3>
                    <p className="text-primary font-semibold text-sm">Neurologist</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-surface-container-low text-on-surface-variant text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>history</span> 12 Years Exp.
                    </span>
                    <span className="bg-success/10 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full">Top Rated</span>
                  </div>
                  <button onClick={() => router.push('/patients/booking?doctorId=3')} className="w-full bg-surface-container-highest text-on-surface font-bold py-3 rounded-lg hover:bg-primary-container hover:text-white transition-all active:scale-95">View Profile</button>
                </div>
              </div>
              {/* Doctor Card 4 */}
              <div className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Middle-aged female physician in professional clinical environment with soft bokeh background and gentle lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATvuDmF1Fz74NDvuCzxNNy1OfUSKulKk8Tad0ualkNvUye8333yLXIWobn23aIWtxC1Ft6BVQ3UJWHVg3wtrLKHwIMWalbzoxx4DFAwu-xWhSCDjJnra0hRm9ArC21Urp8UUDI2FzMcaEyOoY4SyIQLxJ8_8MiV1zcFfYywrMUNOBUfrfnns2YEVSKAKF-SBovQ_DiOJKpwMTG2pVk0YX_u6aIvysTbk9ProF47giMjCchR0-p-x6uBEWY7-cGaLI1Od9P6N9bj4w"/>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-bold text-on-surface">4.7</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-on-surface">Dr. Sophia Martinez</h3>
                    <p className="text-primary font-semibold text-sm">Orthopedic Surgeon</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-surface-container-low text-on-surface-variant text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>history</span> 18 Years Exp.
                    </span>
                    <span className="bg-secondary-container/20 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">Hospital Visits</span>
                  </div>
                  <button onClick={() => router.push('/patients/booking?doctorId=4')} className="w-full bg-surface-container-highest text-on-surface font-bold py-3 rounded-lg hover:bg-primary-container hover:text-white transition-all active:scale-95">View Profile</button>
                </div>
              </div>
              {/* Doctor Card 5 */}
              <div className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Male doctor sitting in a modern office with medical equipment, warm smile and professional demeanor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZaWpzWprLmxNnOVNBx7nazwCZLeCw1ytGdWPzS_dPWj6yUAgefjwmwKIJYuBps20fq6IB3CIfIoBRhpz46VJMPXwnWzFbgPczFgRf-O6TFHTXICgm8uYQC_NPPMf7iPoOfIXhB8DD_VBtPD4U_WZ5blLVco6mdx7H1xi2NbxIIUXwP9Hm0JSaBiiyvtXeU4LKTGN8nhaOSSQbKJ6eyeGiPUpJwe6vgGpQIL1twBx3GBzgdSZrKpkZE19NMMcCAqfLlgMpgyC4QF0"/>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-bold text-on-surface">4.9</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-on-surface">Dr. David Miller</h3>
                    <p className="text-primary font-semibold text-sm">Dermatologist</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-surface-container-low text-on-surface-variant text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>history</span> 10 Years Exp.
                    </span>
                    <span className="bg-success/10 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full">Available Today</span>
                  </div>
                  <button onClick={() => router.push('/patients/booking?doctorId=5')} className="w-full bg-surface-container-highest text-on-surface font-bold py-3 rounded-lg hover:bg-primary-container hover:text-white transition-all active:scale-95">View Profile</button>
                </div>
              </div>
              {/* Doctor Card 6 */}
              <div className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Professional female surgeon in surgical attire looking focused and capable with clean clinical lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRJb8CcU5Kn6PR_2ktFFn8YzvO-aXTwndQAzCHFkE1qzRqVeMSxKY5N2vCzDwUOeaCPh2ayGQXkuiOIC58ZbtHTpE_-rcUCJQrCHUkYpOfJWsfaYXPq-WfttPSCVHuMY-h3gnnpKgtQXYiqFrJJr2CNBTyPpAfGGz9KnOqluEAI88mTQqrNrrKdBvAcLg2HovZ0nB-v-hHbhH06nOXNw2j5LN9-OEB-S2hXExG_3zbV7g0zW7nq_l7XVmwzTFdLk39_TQM3PUvMpo"/>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-bold text-on-surface">4.6</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-on-surface">Dr. Sophia Martinez</h3>
                    <p className="text-primary font-semibold text-sm">Orthopedic Surgeon</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-surface-container-low text-on-surface-variant text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>history</span> 18 Years Exp.
                    </span>
                    <span className="bg-secondary-container/20 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">Hospital Visits</span>
                  </div>
                  <button onClick={() => router.push('/patients/booking?doctorId=6')} className="w-full bg-surface-container-highest text-on-surface font-bold py-3 rounded-lg hover:bg-primary-container hover:text-white transition-all active:scale-95">View Profile</button>
                </div>
              </div>
            </div>

            <nav className="mt-12 flex justify-center items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-outline disabled:opacity-30" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold transition-all">1</button>
              <button className="w-10 h-10 rounded-lg hover:bg-surface-container-low text-on-surface font-bold transition-all">2</button>
              <button className="w-10 h-10 rounded-lg hover:bg-surface-container-low text-on-surface font-bold transition-all">3</button>
              <span className="text-outline px-2">...</span>
              <button className="w-10 h-10 rounded-lg hover:bg-surface-container-low text-on-surface font-bold transition-all">12</button>
              <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-on-surface">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </nav>
          </div>
        </div>
      </main>

      <InformationFooter />
    </div>
  );
};

export default DoctorPage;