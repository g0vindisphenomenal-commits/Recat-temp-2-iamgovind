export type BlogPostSection = {
  type: "paragraph" | "heading" | "blockquote" | "takeaways" | "code" | "list";
  content?: string;
  items?: string[];
  code?: string;
  language?: string;
  author?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  imageAlt: string;
  imageRatio: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  sections: BlogPostSection[];
};

export const POSTS: BlogPost[] = [
  {
    id: "the-future-of-digital-marketing",
    title: "The Future of Digital Marketing: Trends & Innovations to Watch",
    description:
      "The world of digital marketing is evolving faster than ever. Discover how AI personalization, voice search, and interactive video content are reshaping brand strategy.",
    date: "Aug 11, 2025",
    category: "Digital Marketing",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Digital marketing analytics and growth strategy visualization",
    imageRatio: 16 / 10,
    author: {
      name: "Govind",
      role: "Digital Marketer & Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Digital Marketing", "AI", "SEO", "Video Strategy", "Automation"],
    sections: [
      {
        type: "paragraph",
        content:
          "The world of digital marketing has never stood still, and in the coming years, it’s set to evolve faster than ever. With technology advancing at lightning speed and consumer behavior changing just as quickly, brands must adapt to stay relevant. So, what does the future of digital marketing look like?",
      },
      {
        type: "heading",
        content: "1. AI-Powered Personalization Will Dominate",
      },
      {
        type: "paragraph",
        content:
          "Artificial Intelligence (AI) is no longer a futuristic idea—it’s here, and it’s transforming how brands connect with customers. In the future, expect hyper-personalized marketing campaigns where every email, ad, and recommendation feels tailor-made. AI will analyze browsing patterns, purchase history, and emotional cues to deliver the right message at the right time.",
      },
      {
        type: "heading",
        content: "2. Voice Search Will Redefine SEO",
      },
      {
        type: "paragraph",
        content:
          "The rise of voice assistants like Google Assistant, Alexa, and Siri is changing how people search for information. Voice search optimization will become crucial for firms hoping to show up in conversational queries. Businesses will need to focus on natural language, question-based keywords, and local SEO to stay competitive.",
      },
      {
        type: "heading",
        content: "3. Video and Interactive Content Will Lead Engagement",
      },
      {
        type: "paragraph",
        content:
          "Short-form videos, interactive polls, AR/VR experiences, and shoppable livestreams are gaining massive popularity. Static content will take a backseat as immersive, two-way content experiences become the norm. Consumers will expect not just to watch but to actively engage.",
      },
      {
        type: "blockquote",
        content:
          "The next decade is not about replacing human creativity with technology—it’s about using technology to enhance creativity, build trust, and connect with audiences.",
        author: "Govind",
      },
      {
        type: "heading",
        content: "4. Privacy, Transparency & Trust",
      },
      {
        type: "paragraph",
        content:
          "With data protection laws tightening and consumers becoming more privacy-conscious, trust will be a brand’s strongest currency. Companies will need to be transparent about how they collect and use data while offering clear value in exchange for customer information.",
      },
      {
        type: "takeaways",
        content: "Key Takeaways for Future Growth",
        items: [
          "Focus on hyper-personalized customer journeys using data-driven AI insights.",
          "Optimize content for conversational, long-tail voice search queries.",
          "Shift focus toward micro and nano influencers who build authentic community trust.",
          "Implement automated 24/7 customer resolution flows using conversational AI.",
        ],
      },
    ],
  },
  {
    id: "payment-gateway-with-zero-transaction-fee",
    title: "Payment Gateway with Zero Transaction Fee for E-Commerce",
    description:
      "Save thousands on payment processing fees! Learn how to integrate PhonePe Payment Gateway with 0% transaction fees into WooCommerce and Shopify stores.",
    date: "Jan 11, 2026",
    category: "E-Commerce",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Digital payment processing dashboard and transactions",
    imageRatio: 16 / 10,
    author: {
      name: "Govind",
      role: "Digital Marketer & Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Payments", "PhonePe", "WooCommerce", "Shopify", "E-Commerce"],
    sections: [
      {
        type: "paragraph",
        content:
          "High transaction fees can significantly erode profit margins for e-commerce businesses—especially when processing high volumes of sales in competitive markets. Selecting payment gateways with optimized rate structures is one of the fastest ways to improve bottom-line profitability.",
      },
      {
        type: "heading",
        content: "Why PhonePe Payment Gateway?",
      },
      {
        type: "paragraph",
        content:
          "PhonePe Payment Gateway offers Zero Percent (0%) transaction charges across all UPI transactions in India. For growing WooCommerce and Shopify merchants, eliminating 2% to 3% gateway commissions translates directly into net profit.",
      },
      {
        type: "takeaways",
        content: "Benefits of 0% Fee Integration",
        items: [
          "Zero transaction charges on UPI payments for Indian merchants.",
          "Seamless checkout plugins for WooCommerce & Shopify.",
          "Instant payment verification & automated order status updates.",
          "High success rates across Google Pay, PhonePe, Paytm & BHIM.",
        ],
      },
      {
        type: "paragraph",
        content:
          "To get started, register a verified business account on the PhonePe Business Portal, complete your KYC verification, and obtain your Merchant ID (MID) and API secret key for integration.",
      },
    ],
  },
  {
    id: "how-to-add-upi-payment-button-on-wordpress-website",
    title: "How to Add a Direct Mobile UPI Payment Button on WordPress",
    description:
      "Step-by-step guide and custom code snippet to add seamless UPI payment buttons (Google Pay, PhonePe, Paytm) to any WordPress site without expensive plugins.",
    date: "Feb 01, 2026",
    category: "WordPress & Dev",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",

    imageAlt: "Mobile UPI payment interface on smartphone",
    imageRatio: 16 / 10,
    author: {
      name: "Govind",
      role: "Digital Marketer & Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["UPI", "WordPress", "Custom Code", "Mobile UX", "Payments"],
    sections: [
      {
        type: "paragraph",
        content:
          "Mobile buyers in India prefer paying directly via UPI apps like Google Pay, PhonePe, and Paytm. Adding a direct UPI intent button allows mobile users to launch their preferred payment app with one click, eliminating manual VPA typing and reducing checkout drop-off.",
      },
      {
        type: "heading",
        content: "Custom HTML Code Snippet",
      },
      {
        type: "paragraph",
        content:
          "Paste this code into a Custom HTML widget inside Elementor, Gutenberg, or your theme widget area. Update your VPA address, Payee name, and transaction amount:",
      },
      {
        type: "code",
        language: "html",
        code: `<a href="upi://pay?pa=yourvpa@upi&pn=YourName&am=100&cu=INR" 
   class="upi-pay-btn">
   Pay ₹100 via UPI
</a>

<style>
.upi-pay-btn {
  display: inline-block;
  background: #5f259f;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
}
</style>`,
      },
      {
        type: "blockquote",
        content:
          "Direct UPI intent links only trigger on mobile devices with installed payment apps, making them ideal for mobile-first landing pages.",
        author: "Govind",
      },
    ],
  },
  {
    id: "how-to-fix-elementor-white-space-on-mobile-view",
    title: "How to Fix Elementor Mobile White Space & Overflow Bugs",
    description:
      "Tired of unwanted horizontal scrolling or white space on mobile screens in Elementor? Here is the exact CSS snippet to fix layout overflow instantly.",
    date: "Jan 18, 2026",
    category: "CSS & Web Dev",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Responsive mobile web design preview",
    imageRatio: 16 / 10,
    author: {
      name: "Govind",
      role: "Digital Marketer & Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["CSS", "Elementor", "Responsive Design", "WordPress", "Mobile Fix"],
    sections: [
      {
        type: "paragraph",
        content:
          "A common issue faced by WordPress developers using Elementor is unexpected horizontal scrolling on mobile devices. This is usually caused by elements with negative margins, wide absolute positioning, or uncontained animations exceeding viewport bounds.",
      },
      {
        type: "heading",
        content: "The Fix: Additional CSS Snippet",
      },
      {
        type: "paragraph",
        content:
          "To fix horizontal whitespace instantly, navigate to Appearance → Customize → Additional CSS (or your site's global stylesheet) and insert the following rule:",
      },
      {
        type: "code",
        language: "css",
        code: `/* Fix horizontal scroll and whitespace overflow on mobile view */
html, body {
  max-width: 100% !important;
  overflow-x: hidden !important;
}`,
      },
      {
        type: "paragraph",
        content:
          "This forces the browser document to clip any overflowing elements precisely at 100% viewport width, eliminating awkward horizontal wobble on touchscreens.",
      },
    ],
  },
  {
    id: "how-to-remove-page-title-from-the-top-elementor",
    title: "How to Hide Theme Page Titles in Elementor & WordPress",
    description:
      "Clean up your custom page designs by removing repetitive theme page titles from the top of your Elementor templates.",
    date: "Jan 11, 2026",
    category: "WordPress & Dev",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Clean code layout on developer monitor",
    imageRatio: 16 / 10,
    author: {
      name: "Govind",
      role: "Digital Marketer & Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["WordPress", "Elementor", "CSS", "UI Styling"],
    sections: [
      {
        type: "paragraph",
        content:
          "When designing custom landing pages in Elementor, default theme headers often output duplicate page titles at the top of the content area. Removing these default titles creates a clean canvas for custom hero sections.",
      },
      {
        type: "heading",
        content: "Method 1: Hide Title via Theme CSS",
      },
      {
        type: "paragraph",
        content:
          "Add this selector to Appearance → Customize → Additional CSS:",
      },
      {
        type: "code",
        language: "css",
        code: `/* Hide entry title on pages */
h1.entry-title {
  display: none !important;
}`,
      },
      {
        type: "heading",
        content: "Method 2: Switch Page Layout to Elementor Full Width",
      },
      {
        type: "paragraph",
        content:
          "Inside the Elementor editor, click Page Settings (gear icon in the bottom-left corner) → set Page Layout to 'Elementor Full Width' or 'Elementor Canvas'. This automatically disables theme default headers.",
      },
    ],
  },
  {
    id: "how-to-hyperlink-testimonial-carousel-widget-items",
    title: "How to Add Clickable Links to Testimonial Carousel Items",
    description:
      "Custom JavaScript snippet to convert static testimonial carousel items into interactive, clickable links pointing to client websites or reviews.",
    date: "Sep 14, 2025",
    category: "JavaScript & Dev",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Digital analytics graphs representing client reviews",
    imageRatio: 16 / 10,
    author: {
      name: "Govind",
      role: "Digital Marketer & Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["JavaScript", "DOM", "Elementor", "Web Dev", "Widgets"],
    sections: [
      {
        type: "paragraph",
        content:
          "Standard testimonial sliders often display client names and company titles as static text. Converting these cards into interactive, clickable links builds credibility by allowing visitors to verify real client sites and reviews.",
      },
      {
        type: "heading",
        content: "JavaScript DOM Attachment",
      },
      {
        type: "paragraph",
        content:
          "Insert an HTML element below your slider widget with this lightweight vanilla JS script:",
      },
      {
        type: "code",
        language: "javascript",
        code: `<script>
document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll(".swiper-slide");
  slides.forEach((slide, index) => {
    slide.style.cursor = "pointer";
    slide.addEventListener("click", function() {
      // Add custom link mapping per slide index
      window.open("https://example.com/client-review", "_blank");
    });
  });
});
</script>`,
      },
    ],
  },
  {
    id: "old-and-current-pic-ai-video",
    title: "How to Create Past vs. Present AI Photo Progression Videos",
    description:
      "Learn the exact prompt framework and copy-paste code prompts to generate viral aging progression and transformation videos using ChatGPT and Grok Imagine.",
    date: "Feb 11, 2026",
    category: "AI & Content",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "AI content generation and video creation workspace",
    imageRatio: 16 / 10,
    author: {
      name: "Govind",
      role: "Digital Marketer & Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["AI Video", "ChatGPT", "Grok Imagine", "Prompts", "Social Media"],
    sections: [
      {
        type: "paragraph",
        content:
          "AI-driven aging and photo progression videos have taken social platforms like Instagram Reels and TikTok by storm. Upload your present and old photos individually into ChatGPT or Grok Imagine, and copy the tested prompts below:",
      },
      {
        type: "heading",
        content: "1. ChatGPT Prompt (One-Click Copy)",
      },
      {
        type: "code",
        language: "text",
        code: `Keep the facial expressions and all facial features intact. The character should appear to be on a rapidly rotating round carousel at a playground, spinning in circles while the background appears to be moving rapidly. They are seated, looking straight at the camera, while the background rapidly rotates. The character should not move around the playground at all; they are sitting on a seat on the spinning carousel. The carousel is blue. The character has a calm expression, and the background should look like a playground at night. Only the face and upper body are visible in the frame. A swing is visible in the background, slightly blurred due to the movement. The background quickly rotates in a circle, creating the effect of intense spinning. The camera is fixed on the face. She is inside the spinning carousel, facing us. Notice that she is not sad, but simply serious, looking directly at the camera; she is in a small park. Take the photo in darker shades.`,
      },
      {
        type: "heading",
        content: "2. Grok Imagine Cinematic Prompt (One-Click Copy)",
      },
      {
        type: "code",
        language: "text",
        code: `Use the uploaded reference image/video frame as the exact identity source. Identity lock is mandatory — preserve the face, facial structure, skin texture, skin tone, hairstyle, body shape, and clothing exactly as-is. Do NOT beautify, slim, smooth, retouch, or modify the face or hair in any way.
Create a realistic cinematic NIGHT amusement park spinning teacups ride video shot.

SCENE:
- Location: amusement park teacups ride at night
- Only one teacup visible (the subject's cup)
- No visible sky
- No visible ride structure
- No visible people behind — only abstract blurred light shapes
- Background filled with strong motion blur light streaks
- Colors in background lights: clearly visible dim reds and blues
- Overall environment very dark to ensure night mood
- No green phone or bright object visible anywhere

CAMERA & FRAMING:
- Torso-up framing
- Camera slightly farther from subject (not close-up)
- Eye-level camera angle
- Subject centered
- 50mm cinematic lens look
- Shallow depth of field
- Subject perfectly sharp, background heavily motion blurred
- Teacup spinning to the RIGHT side only

SUBJECT POSE & EXPRESSION:
- Subject sitting straight in the rotating teacup
- Body upright
- Face slightly raised
- Looking directly into camera
- Serious expression but not overly intense
- Eyebrows neutral and natural
- Eyes open and steady — no blinking
- Both arms held close to the body
- Hands not visible at all (hidden near torso)

HAIR & CLOTHING RULES:
- Do NOT change hairstyle, hair texture, or hair length
- Hair motion must flow naturally toward the RIGHT due to spinning motion
- Realistic physics-based hair movement only
- Remove blue cap if present
- Do not change clothing design, color, or fit

LIGHTING:
- Very low-key cinematic night lighting
- Subject mostly in dark tones
- Very faint blue rim light reflection from the rotating cup on the subject's body only
- Red and blue lights strongly visible only in the blurred background
- No harsh frontal light
- No overexposure on face

MOTION RULES:
- Subject torso and face remain perfectly stable and sharp
- Only background and hair show motion effects
- Circular motion blur consistent with rightward spin
- No face warp, no face thinning, no texture loss

QUALITY:
- Ultra-realistic
- Cinematic color grading
- Natural skin detail preserved
- No AI smoothing artifacts
- High dynamic range night scene`,
      },
      {
        type: "takeaways",
        content: "Best Practices",
        items: [
          "Use high-resolution front-facing source photos with good lighting.",
          "Ensure eyes and facial structure match across both input images.",
          "Combine generated clips with trending ambient audio tracks for viral reach.",
        ],
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((post) => post.id === slug);
}

export function getRelatedPosts(currentSlug: string, count = 2): BlogPost[] {
  return POSTS.filter((post) => post.id !== currentSlug).slice(0, count);
}
