export default function FilterSidebar() {
  return (
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
  );
}