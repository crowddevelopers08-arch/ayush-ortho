export const PRIMARY_PHONE = "+91 91500 10387";
export const PRIMARY_PHONE_HREF = "tel:+919150010387";
export const BOOKING_ANCHOR = "#book-appointment";
export const LOGO_URL = "https://ik.imagekit.io/wwdlbhsjw/public/ayushhhhh.png";
// Treatment photos rotated in the hero arch. `position` keeps the people in frame
// when the wide photo is cropped to the tall arch.
export const heroImages = [
  // Only high-resolution originals (1480px+) here — the arch is ~540px tall, so
  // smaller uploads look blurry on retina screens.
  { src: "https://ik.imagekit.io/wwdlbhsjw/public/backban.webp?tr=h-1100,q-90", alt: "Man with neck and back pain", position: "40% center" },
  { src: "https://ik.imagekit.io/wwdlbhsjw/public/kneww.jpeg?tr=h-1100,q-90", alt: "Patient holding a painful knee", position: "62% center" },
  { src: "https://ik.imagekit.io/wwdlbhsjw/public/babbbb.jpg?tr=h-1100,q-80", alt: "Ayush Ortho clinic entrance", position: "45% center" },
  { src: "https://ik.imagekit.io/wwdlbhsjw/public/mainbabb.jpg?tr=q-90", alt: "Senior with neck pain", position: "78% center" },
];

export const runningBarItems = [
  "Knee Pain",
  "Back Pain",
  "Neck Pain",
  "Shoulder Pain",
  "Frozen Shoulder",
  "Arthritis",
];

export const painConcerns = ["Knee", "Back", "Neck", "Shoulder", "Foot Pain"];

export const integratedApproach = ["Ayurveda", "Varma Therapy", "OMT", "Chiropractic Care"];

// Google Maps reviews of Ayush Ortho, quoted as written by the patients.
export const googleReviews: { url: string; name: string; text: string }[] = [
  {
    url: "https://share.google/bGd9zAqDW9rs1O5Iv",
    name: "Shyam Sinnu",
    text: "My mother had severe knee pain and was struggling to walk. She recovered remarkably in just five sessions at Ayush Ortho. Special thanks to Dr. Pragathi and the wonderful team — Mr. Tinu, Ms. Sandra, and Ms. Anila — for their exceptional care and support throughout her recovery.",
  },
  {
    url: "https://share.google/s5QgnvZI9fwe3TrXA",
    name: "Apsara Zeenath",
    text: "As someone who does regular weight training, I started experiencing lower back problems. The therapy sessions helped me recover slowly and safely, and I feel much more comfortable with my daily activities now.",
  },
  {
    url: "https://share.google/gPgsYEjYEq3Ik8zG4",
    name: "MOHANA PRIYA.C",
    text: "I had sciatica nerves pain, I was suffering with the pain for more than 2 years and took allopathic medicine they gave only pain killer but it reduces pain for some months and again the issue occurs.I visited ayush ortho they suggested 7 days therapeutic treatment.I  have completed that therapeutic treatment I could see huge difference post that now I don't see the shooting pain in my lower back feeling relaxed. Therapist Riya and anjana was very caring enquiries everyday about the pain and the therapy was based on that.If any body suffering with sciatica nerves pls go for this ayurvedic treatment.",
  },
  {
    url: "https://share.google/SNLMbzHQu2ZUSNQlp",
    name: "s vijayalakshmi",
    text: "Thanks to Ayush Ortho for helping my problem in Lower back region and sciatica nerve issue. I took treatment for seven sessions  and the treatment followed by their excercise suggestions given by therapist sri.Riya.\nSpecial thanks to my therapist Sri.Riya and Sri.Anjana and Sri.Chitra\nWho did their job perfectly well..\nNow I am feeling much better.\n90 percent improvement is seen.\nOnce again thanks to all the staff in Ayush Ortho hospital for their sincere service.",
  },
  {
    url: "https://share.google/a0qDLGBePqQdB3jnV",
    name: "RAJAN CHIDAMBRAM",
    text: "I came for severe knee pain on both legs. Right leg knee swelling also exists. I could not perfom dairy walk. / routine.\nAfter taking therapy for 15 sittings I got 80 percentage relief. I can able to walk freely.\nShri Jithin who had done therapy is awesome I really thank full to him. Every sitting he got feed back from me & did alignment & therapy neatly. He is kind & taken care very well.\nOnce again I thank Doctors & Ayush staff for to get rid off my aliment.\nThank you🙏\nRajan. C",
  },
];

export const painCategories = [
  {
    title: "Knee Pain & Arthritis",
    image: "https://ik.imagekit.io/wwdlbhsjw/public/3.jpeg?tr=w-640",
    points: [
      "Age-related joint wear and stiffness",
      "Sports-related injuries and early-stage arthritis",
      "Advanced knee pain, including bone-on-bone concerns",
    ],
  },
  {
    title: "Neck, Shoulder & Frozen Shoulder",
    image: "https://ik.imagekit.io/wwdlbhsjw/public/necck5.jpg?tr=w-640",
    points: [
      "Frozen shoulder, including diabetes-associated concerns",
      "Cervical spondylosis and neck-related stiffness",
      "Stress-related neck and shoulder stiffness",
    ],
  },
  {
    title: "Hip & Leg Pain",
    image: "https://ik.imagekit.io/wwdlbhsjw/public/remedial.jpg?tr=w-640",
    points: [
      "Hip joint strain and movement-related concerns",
      "Sciatic pain extending from the back into the leg",
      "Mobility and alignment-related concerns",
    ],
  },
  {
    title: "Heel & Foot Pain",
    image: "https://ik.imagekit.io/wwdlbhsjw/public/gost.jpeg?tr=w-640",
    points: [
      "Heel spur and heel-related discomfort",
      "Plantar fascia-related pain",
      "Foot alignment and mobility concerns",
    ],
  },
];

export const treatmentPlans = [
  {
    days: "07",
    title: "Recent pain, mild stiffness",
    description:
      "Posture aches, a recent strain, a stiff neck from long desk hours. Most working professionals start here.",
  },
  {
    days: "14",
    title: "Pain that has stayed for months",
    description:
      "Frozen shoulder, sciatica, early-stage arthritis, recurring lower back pain that keeps coming back.",
  },
  {
    days: "21",
    title: "Chronic pain, surgery advised",
    description:
      "Long-standing pain, bone-on-bone knees, slip disc. If surgery has been recommended, try this first.",
  },
];

// Patient videos already published on the clinic's YouTube channel.
// Vertical (9:16) patient testimonials on Cloudinary. The poster is the same file
// with a .jpg extension, which Cloudinary renders from the frame at 1s.
const CLOUDINARY_VIDEO = "https://res.cloudinary.com/dzonmuzpx/video/upload";
const testimonialVideo = (version: string, path: string, name: string, concern: string) => ({
  src: `${CLOUDINARY_VIDEO}/${version}/${path}.mp4`,
  poster: `${CLOUDINARY_VIDEO}/so_1,w_720,q_auto/${version}/${path}.jpg`,
  name,
  concern,
});

export const patientVideos = [
  testimonialVideo(
    "v1791283152",
    "Ayush%20Orth/AQOfWmRoQSVhTpGwYyucQ9Y6BLTkj87vmKS4oyfPlL07m-ieND701zyjpopLdEohFLAezaN9pyR2JP9GfoREPG7EHJQZ20p6_1_tneeo9",
    "P. Ramesh",
    "Knee Pain",
  ),
  testimonialVideo(
    "v1791283153",
    "Ayush%20Orth/AQPW563ZeJcbF3l_diS0rAzxsG12OdWSxuMqqDDVa_tA8F2fc4-Na2Z0qXXhPiWfY2BU61mesIRlJdhdKsilYbuE261CHZr1_uybuzy",
    "R. Vaishnavi",
    "Disc Bulge",
  ),
  testimonialVideo(
    "v1791283153",
    "Ayush%20Orth/AQOTskwMFe--MT8fFaAbCPCJIp_hAekVOyK1ebLLTx4ZfhkzZ3TFgfHFOxU9Co-bpDKxua91RIRd-XDDDOzgE6wVlU8NKcAs_f8e3ao",
    "Kesavan",
    "Joint Pain",
  ),
];

export const branches = [
  {
    name: "Ayush Ortho, Tambaram",
    timings: "10 AM – 8 PM",
    address: "23/5A Valmiki Street, East Tambaram, Chennai – 600059",
    phone: "+91 91500 10387",
  },
  {
    name: "Ayush Ortho, T. Nagar",
    timings: "Mon – Sun  10:00 AM – 8:00 PM",
    address: "23A, N Boag Rd, Drivers Colony, T. Nagar, Chennai, Greater Chennai, Tamil Nadu 600017",
    phone: "+91 91500 10389",
  },
  {
    name: "Ayush Ortho, Ambattur",
    timings: "Open Daily: 10 AM – 8 PM",
    address: "2nd Floor, 122/124/1, Vijayalakshmipuram, Redhills Road, Ambattur, Chennai - 600053",
    phone: "+91 95144 17318",
  },
  {
    name: "Ayush Ortho, Puducherry",
    timings: "Open Daily: 10 AM – 8 PM",
    address: "C Block, Lakshmi Homes, Mariamman Koil St, Vinoba nagar, Saram, Puducherry, Tamil Nadu 605008",
    phone: "+91 91509 00387",
  },
];

export const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
