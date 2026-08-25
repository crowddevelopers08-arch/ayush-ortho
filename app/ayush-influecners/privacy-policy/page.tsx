import { Thankheader } from "@/components/influecners/thankheader";
import Link from "next/link";

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information we collect",
    body: [
      "When you fill out an assessment or booking form, we collect your name, phone number, email address, and any health-related details you choose to share about your hair, scalp, or joint concerns.",
      "We also automatically collect basic technical information — device type, browser, and pages visited — to understand how our site is used and to keep it working properly.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "2. How we use your information",
    body: [
      "Your details are used to schedule and confirm your assessment, connect you with the right specialist, and follow up on your care.",
      "We may use your contact information to send appointment reminders, treatment updates, or relevant information about our services. You can opt out of non-essential communication at any time.",
    ],
  },
  {
    id: "sharing",
    title: "3. Sharing your information",
    body: [
      "We do not sell your personal information to third parties.",
      "We share information only with the clinicians and staff directly involved in your care, and with service providers (such as scheduling or payment tools) who are bound to protect your data under contract.",
    ],
  },
  {
    id: "data-security",
    title: "4. How we protect your data",
    body: [
      "We use industry-standard safeguards — including encrypted storage and restricted access — to protect the information you share with us.",
      "No method of transmission over the internet is completely secure, so while we work to protect your data, we cannot guarantee absolute security.",
    ],
  },
  {
    id: "cookies",
    title: "5. Cookies",
    body: [
      "Our website uses cookies to remember your preferences and understand aggregate visitor behaviour. You can disable cookies through your browser settings, though some features of the site may not work as intended.",
    ],
  },
  {
    id: "your-rights",
    title: "6. Your rights",
    body: [
      "You can request to see, correct, or delete the personal information we hold about you at any time by contacting us using the details below.",
      "If you've submitted a form and no longer wish to be contacted, let us know and we'll remove you from our outreach list.",
    ],
  },
  {
    id: "changes",
    title: "7. Changes to this policy",
    body: [
      "We may update this policy from time to time to reflect changes in our practices. The date below shows when it was last revised.",
    ],
  },
  {
    id: "contact",
    title: "8. Contact us",
    body: [
      "If you have questions about this policy or how your data is handled, reach out to us at privacy@ayushortho.com or call +91 12345 67890.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white font-[var(--font-geist)] text-black">
        <Thankheader />
      <section className="mx-auto max-w-[700px] px-5 pb-12 pt-20 sm:px-7 sm:pb-14 sm:pt-[84px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e13e20] sm:text-[11px]">Ayush Ortho</p>
        <h1 className="mt-2 text-[24px] font-semibold leading-tight tracking-[-.35px] sm:text-[30px]">Privacy Policy</h1>
        <p className="mt-3.5 text-[13px] leading-[1.65] text-black/65 sm:text-[14px]">
          This policy explains what personal information Ayush Ortho collects when you use our website or book an
          assessment, how we use it, and the choices you have.
        </p>

        <nav aria-label="Section navigation" className="mt-5 flex flex-wrap gap-x-3.5 gap-y-1.5 border-y border-[#eceef1] py-3 text-[11.5px] sm:text-[12px]">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="text-black/55 underline-offset-4 hover:text-[#e13e20] hover:underline">
              {section.title.replace(/^\d+\.\s/, "")}
            </a>
          ))}
        </nav>

        <div className="mt-7 flex flex-col gap-6 sm:gap-7">
          {sections.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-20">
              <h2 className="text-[15px] font-semibold tracking-[-.15px] sm:text-[17px]">{section.title}</h2>
              <div className="mt-1.5 flex flex-col gap-1.5">
                {section.body.map((paragraph, index) => (
                  <p key={index} className="text-[12.5px] leading-[1.65] text-black/65 sm:text-[13.5px]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-9 border-t border-[#eceef1] pt-4">
          <Link href="/ayush-influecners" className="text-[12.5px] font-medium text-black/70 underline underline-offset-4 hover:text-[#e13e20]">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
