import { DoctorDetailResponse } from '@/types';

type Props = {
  locations: DoctorDetailResponse['locations'];
};

export default function DoctorLocations({ locations }: Props) {
    return (
        <section>
              <h3 className="text-2xl font-headline font-bold mb-6 text-on-surface">
                Available Locations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {locations.map((location) => (
                  <div key={location.id} className={`bg-surface-container-low p-6 rounded-3xl ${!location.isActive ? 'border border-dashed border-outline-variant/30 opacity-70' : ''}`}>
                    {location.isActive && (
                      <div className="aspect-video bg-slate-300 rounded-2xl mb-4 overflow-hidden relative">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url("${location.mapImageUrl}")`,
                          }}
                        />
                      </div>
                    )}
                    <h6 className="font-bold text-on-surface">{location.name}</h6>
                    <p className="text-sm text-on-surface-variant mb-4">
                      {location.address}, {location.city}, {location.state}
                    </p>
                    {location.isActive && (
                      <button className="text-primary text-sm font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">directions</span>
                        Get Directions
                      </button>
                    )}
                    {!location.isActive && (
                      <p className="text-sm text-on-surface-variant">Currently no available slots at this location</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
    );
}