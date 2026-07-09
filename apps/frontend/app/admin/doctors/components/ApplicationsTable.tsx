import ApplicationRow from './ApplicationRow';

const applications = [
  {
    name: 'Dr. Julianne White',
    email: 'julianne.w@medclinic.com',
    specialty: 'Neurosurgeon',
    date: 'Oct 12, 2023',
    image: 'https:////lh3.googleusercontent.com/aida-public/AB6AXuCBjDWk6NjxRZQjErGRFTKvSiKzuD4XKP31oD0QgnHFCPBxoEc3oN-Y7Iuo04ebt4OVipN5BD1MBFuqGanpv7ITYMNdmUgF5rtR101vbNfQqdYCXv7ESXrMFQQC77I0SMI62gZcl4tZPbIeXrxHNudVnxZ39qEz_EZ_wJrwkK5QXI8UnGHsRLi-Ep_ibUNy_iZKGGWxDtBCXcxo0UWem8EOpm6MnhE_7tIqEQmY7bHF-dao-ynWD8r_86ACUKqyILh_wyv2XCmcC_g',
  },
  {
    name: 'Dr. Marcus Low',
    email: 'm.low@university.edu',
    specialty: 'Pediatrics',
    date: 'Oct 11, 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKWH_eLit2VkCepAL3yJxt8xLWZABy5Q7zWTS13KSOtTXotL9JEmhs7KoQWUBLYHUFvybvbLC7zzL1WgrAl9YIFZF-XMEU3rfCBpYnNYg3DsBrMZ-1trBIdR-xHaaO6CAfqe3o-FFt8d9AE9ozc2mAfiUpTYUmr8UbpNXe7rrgvDq2KxPQgn661pP7RetbuozagpUOdaE4wsOj113GmuS70ESHahXULkjtGEqcMiXXnx43bxZR-0H6-h8mBleX0OvtzFV8lbCmSQs',
  },
  {
    name: 'Dr. Elena Soros',
    email: 'soros.md@globalcare.org',
    specialty: 'Cardiology',
    date: 'Oct 09, 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeBxw_iils1TMOk7w05uKeNEuNb91eGJZaESLgBGHOAXBLLtx0ei_PFDnR_mCwqJdhc7qTNUDTySso3GMeKhA4baxu_WuMfqGt95DVpuWFuaquVbE7g1IoRu3qufEBqilh1NxrJUUdtHo2KmK-3Ajp7OEMsVGGxPTXRLL5vrtan4csH-1jH-r2INwREr1FSbUavrub1rS6lgelsP9UMrYsGVCnGATUMpv8XjySG_cOC3y-N9O4X3xZstEPKCZF3fshb0mn9yH5KRI',
  },
];

export default function ApplicationsTable() {
  return (
    <div className="bg-surface-container-low rounded-3xl p-1 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">
              <th className="px-6 py-4">Practitioner Name</th>
              <th className="px-6 py-4">Specialization</th>
              <th className="px-6 py-4">Date Applied</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">
                Action Cluster
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <ApplicationRow
                key={application.email}
                {...application}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}