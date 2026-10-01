import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ayush Ortho",
  description: "Terms and conditions for using the Ayush Ortho website and booking treatment at our clinics.",
};

const sections: LegalSection[] = [
  {
    heading: "About Our Services",
    content: (
      <p>
        Ayush Ortho provides integrated, non-surgical care for joint, muscle, spine and mobility concerns using Ayurveda, Varma
        Therapy, Chiropractic Care and OMT at our branches in Tambaram, T. Nagar, Ambattur and Puducherry. These Terms apply to
        your use of this website and to appointments booked through it.
      </p>
    ),
  },
  {
    heading: "Appointments & Website Forms",
    content: (
      <ul>
        <li>Submitting a form on this website is a request for an appointment, not a confirmed booking.</li>
        <li>Our team will contact you on the mobile number you provide to confirm the date, time and branch.</li>
        <li>You agree to provide accurate details. Bookings made with false or incomplete information may be cancelled.</li>
        <li>Appointment times are subject to availability and may occasionally need to be rescheduled.</li>
      </ul>
    ),
  },
  {
    heading: "Medical Disclaimer",
    content: (
      <>
        <p>
          The information on this website is for general awareness only and is not a substitute for a medical diagnosis. Please
          consult a qualified practitioner before starting any treatment.
        </p>
        <p>
          Your treatment plan, including its duration, is decided only after an assessment at the clinic. Results differ from
          person to person, and we do not guarantee any specific outcome. Patient reviews and videos reflect individual
          experiences.
        </p>
        <p>In a medical emergency, please contact your nearest hospital or emergency service immediately.</p>
      </>
    ),
  },
  {
    heading: "Your Responsibilities as a Patient",
    content: (
      <ul>
        <li>Share your complete medical history, current medication, allergies and previous reports with our doctors.</li>
        <li>Follow the treatment, diet and exercise advice given by our team.</li>
        <li>Inform us promptly about any discomfort or change in your condition during treatment.</li>
        <li>Arrive on time for your sessions and treat our staff and other patients with respect.</li>
      </ul>
    ),
  },
  {
    heading: "Fees & Payments",
    content: (
      <p>
        Consultation and treatment fees are explained to you at the clinic before treatment begins. Payments are made at the
        branch as per the clinic&apos;s billing process. Cancellations and refunds are governed by our{" "}
        <a href="/cancellation-refund-policy" className="font-semibold text-[#e13e20] hover:underline">
          Cancellation &amp; Refund Policy
        </a>
        .
      </p>
    ),
  },
  {
    heading: "Website Content & Intellectual Property",
    content: (
      <p>
        All content on this website, including text, images, videos, logos and design, belongs to Ayush Ortho or is used with
        permission. You may not copy, reproduce or distribute it without our written consent.
      </p>
    ),
  },
  {
    heading: "Third-Party Links",
    content: (
      <p>
        This website may link to third-party services such as Google Maps, Google Reviews and YouTube. We are not responsible
        for the content or privacy practices of those websites.
      </p>
    ),
  },
  {
    heading: "Limitation of Liability",
    content: (
      <p>
        To the extent permitted by law, Ayush Ortho is not liable for any loss arising from the use of information on this
        website, or from delays or interruptions in the website&apos;s availability.
      </p>
    ),
  },
  {
    heading: "Privacy",
    content: (
      <p>
        We handle your personal and health information as described in our{" "}
        <a href="/privacy-policy" className="font-semibold text-[#e13e20] hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    ),
  },
  {
    heading: "Governing Law",
    content: (
      <p>
        These Terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts in Chennai,
        Tamil Nadu.
      </p>
    ),
  },
  {
    heading: "Changes to These Terms",
    content: (
      <p>
        We may update these Terms from time to time. The latest version will always be available on this page, with the date
        it was last updated.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro={
        <p>
          Welcome to <span className="font-semibold text-[#e13e20]">Ayush Ortho</span>. By using this website or booking an
          appointment with us, you agree to the following terms. Please read them carefully.
        </p>
      }
      sections={sections}
    />
  );
}
