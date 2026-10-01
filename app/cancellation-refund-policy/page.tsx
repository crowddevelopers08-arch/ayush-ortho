import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Ayush Ortho",
  description: "How to cancel or reschedule an appointment at Ayush Ortho, and how refunds are handled.",
};

const sections: LegalSection[] = [
  {
    heading: "Cancelling or Rescheduling an Appointment",
    content: (
      <ul>
        <li>You can cancel or reschedule your appointment free of charge.</li>
        <li>
          Please inform us at least <strong>24 hours in advance</strong> by calling{" "}
          <a href="tel:+919150010387" className="font-semibold text-[#e13e20]">
            +91 91500 10387
          </a>{" "}
          or your branch, so we can offer the slot to another patient.
        </li>
        <li>Rescheduled appointments are subject to the availability of the doctor and therapist.</li>
      </ul>
    ),
  },
  {
    heading: "Missed Appointments",
    content: (
      <p>
        If you miss a scheduled treatment session without informing us, that session may be counted as used in your treatment
        package. We will always try to reschedule wherever possible.
      </p>
    ),
  },
  {
    heading: "Cancellations by Ayush Ortho",
    content: (
      <p>
        If we have to cancel or reschedule your appointment because of doctor unavailability or unforeseen circumstances, we
        will inform you in advance and offer a new slot. If you have paid in advance and do not wish to reschedule, the amount
        paid for that appointment will be refunded in full.
      </p>
    ),
  },
  {
    heading: "Consultation Fees",
    content: <p>Consultation fees are non-refundable once the consultation has taken place.</p>,
  },
  {
    heading: "Treatment Packages",
    content: (
      <ul>
        <li>Sessions that have already been taken are not refundable.</li>
        <li>
          If you discontinue a prepaid treatment package, the amount for unused sessions may be refunded or adjusted against
          future treatment, after deducting the sessions already taken.
        </li>
        <li>Requests for package refunds are reviewed by the clinic and must be raised within the package validity period.</li>
      </ul>
    ),
  },
  {
    heading: "Non-Refundable Items",
    content: (
      <p>
        Medicines, oils and other products dispensed to you cannot be returned or refunded once they have been handed over, for
        hygiene and safety reasons.
      </p>
    ),
  },
  {
    heading: "How to Request a Refund",
    content: (
      <ul>
        <li>Call us or visit the branch where you made the payment, with your bill or payment receipt.</li>
        <li>Approved refunds are processed within 7–10 working days.</li>
        <li>Refunds are made to the original mode of payment wherever possible.</li>
      </ul>
    ),
  },
  {
    heading: "Changes to This Policy",
    content: (
      <p>
        We may update this policy from time to time. The latest version will always be available on this page, with the date it
        was last updated.
      </p>
    ),
  },
];

export default function CancellationRefundPolicyPage() {
  return (
    <LegalPage
      title="Cancellation & Refund Policy"
      intro={
        <p>
          At <span className="font-semibold text-[#e13e20]">Ayush Ortho</span>, we want your treatment to be convenient and
          transparent. This policy explains how appointments can be cancelled or rescheduled, and how refunds are handled.
        </p>
      }
      sections={sections}
    />
  );
}
