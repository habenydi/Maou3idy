import { DoctorDetailResponse } from "@/types/types";

type Props = {
  doctor: DoctorDetailResponse['doctor'];
};

export default function DoctorHero({ doctor }: Props) {
    return (
        <section>
              <h3 className="text-2xl font-headline font-bold mb-6 text-on-surface">
                About Dr. Wilson
              </h3>
              <div className="bg-surface-container-lowest p-8 rounded-3xl leading-relaxed text-on-surface-variant">
                <p className="mb-4">
                  Dr. James Wilson is a board-certified cardiologist with over 15
                  years of experience in cardiovascular medicine. He specializes in
                  preventative cardiology, heart failure management, and advanced
                  echocardiography. His patient-centric approach focuses on
                  utilizing the latest diagnostic technologies while maintaining a
                  compassionate, individual care plan for every patient.
                </p>
                <p>
                  Having published over 30 peer-reviewed articles, Dr. Wilson
                  remains at the forefront of medical innovation, ensuring his
                  patients receive the most current and effective treatments
                  available in modern medicine.
                </p>
              </div>
            </section>
    );
}