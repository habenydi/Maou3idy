"use client";
import { useEffect, useState } from "react";
import { getDoctorDetail } from "@/services/bookingService";
import { DoctorDetailResponse } from "@/types";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import InformationFooter from "@/components/InformationFooter";
import DoctorHero from "./components/DoctorHero";
import DoctorAbout from "./components/DoctorAbout";
import DoctorServices from "./components/DoctorServices";
import DoctorLocations from "./components/DoctorLocations";
import BookingSidebar from "./components/BookingSidebar";
import ReviewsTeaser from "./components/ReviewsTeaser";
import DoctorReviews from "./components/DoctorReviews";
import { useAuth } from "../layout";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Booking() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId") || "";
  const { user, loading: Loading } = useAuth();
  const route = useRouter();
  const [doctorData, setDoctorData] = useState<DoctorDetailResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const data = await getDoctorDetail(doctorId);
        setDoctorData(data);
      } catch (error) {
        console.error("Error loading doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorId]);


  useEffect(() => {
    if (Loading) return;

    if (!user) {
      toast.error("You must be logged in to book an appointment.");
      route.push("/login");
    }
  }, [user, route, Loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!doctorData) {
    return <div>Error loading doctor data</div>;
  }
  const { doctor, services, publications, reviews } = doctorData;

  return (
    <>
      <Navbar activeLink="doctors" />

      <main className="pt-24 pb-20 max-w-screen-2xl mx-auto px-6">
        <DoctorHero doctor={doctor} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <DoctorAbout doctor={doctor} publications={publications} />

            <DoctorServices services={services} />

            <DoctorLocations locations={doctor.location} />

            <DoctorReviews
              reviews={reviews}
              rating={doctor.rating}
              reviewCount={doctor.reviewCount}
            />
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <BookingSidebar
                doctorId={doctorId}
                doctorName={doctor.user.name}
              />
              <ReviewsTeaser reviews={reviews} rating={doctor.rating} />
            </div>
          </aside>
        </div>
      </main>

      <InformationFooter />
    </>
  );
}

export default Booking;
