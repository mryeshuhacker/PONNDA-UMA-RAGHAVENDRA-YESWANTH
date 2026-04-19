import { 
  Video, 
  Palette, 
  Megaphone, 
  Camera, 
  Youtube, 
  Instagram, 
  Clapperboard, 
  Layers, 
  Zap, 
  Users, 
  Trophy, 
  Mail 
} from "lucide-react";

export const SERVICES = [
  {
    category: "Video Editing",
    icon: Clapperboard,
    items: [
      "YouTube Video Editing",
      "Wedding Video Editing",
      "Reels Editing",
      "Shorts Editing",
      "Corporate Editing",
      "Commercial Ads Editing",
      "Motion Graphics",
      "Color Grading"
    ]
  },
  {
    category: "Design",
    icon: Palette,
    items: [
      "Canva Pro Designs",
      "Thumbnail Design",
      "Social Media Posters",
      "Photo Editing",
      "Brand Kits",
      "Product Design Kits"
    ]
  },
  {
    category: "Marketing",
    icon: Megaphone,
    items: [
      "Instagram Growth",
      "Social Media Marketing",
      "Paid Ads Management",
      "Lead Generation",
      "YouTube Channel Management",
      "Content Planning",
      "Brand Promotions"
    ]
  },
  {
    category: "Production",
    icon: Camera,
    items: [
      "Product Shoots",
      "Brand Shoots",
      "Commercial Ad Shoots"
    ]
  }
];

export const PRODUCTS = [
  {
    id: "pre-assets",
    name: "Premiere Pro Assets Pack",
    price: 499,
    image: "https://picsum.photos/seed/edit/800/600",
    features: ["100+ Transitions", "Glitch Effects", "Sound Effects Pack"]
  },
  {
    id: "ae-templates",
    name: "After Effects Templates",
    price: 999,
    image: "https://picsum.photos/seed/ae/800/600",
    features: ["Motion Titles", "Logo Reveals", "Lyrical Video Templates"]
  },
  {
    id: "lut-pack",
    name: "LUT Color Grading Pack",
    price: 299,
    image: "https://picsum.photos/seed/color/800/600",
    features: ["Cinematic LUTs", "Vlog Master LUTs", "Wedding Grades"]
  },
  {
    id: "thumb-pack",
    name: "Thumbnail Master Pack",
    price: 199,
    image: "https://picsum.photos/seed/thumb/800/600",
    features: ["PSD Presets", "High CTR Elements", "Background Textures"]
  },
  {
    id: "canva-bundle",
    name: "Canva Templates Bundle",
    price: 399,
    image: "https://picsum.photos/seed/canva/800/600",
    features: ["500+ Social Posts", "Agency Presentations", "Brand Identity"]
  },
  {
    id: "mg-bundle",
    name: "Motion Graphics Bundle",
    price: 799,
    image: "https://picsum.photos/seed/mg/800/600",
    features: ["Lower Thirds", "Animated Overlays", "Vector Assets"]
  }
];

export const PORTFOLIO = [
  {
    title: "Stephen Film Poster",
    type: "Design",
    image: "https://picsum.photos/seed/stephen-poster/800/1200"
  },
  {
    title: "Vlog Edit",
    type: "Video",
    image: "https://picsum.photos/seed/vlog/800/600",
    preview: "/portfolio/vlog.mp4"
  },
  {
    title: "Brand Poster",
    type: "Design",
    image: "https://picsum.photos/seed/poster/800/600"
  },
  {
    title: "Product Shoot",
    type: "Production",
    image: "https://picsum.photos/seed/shoot/800/600"
  },
  {
    title: "Reel Edit",
    type: "Video",
    image: "https://picsum.photos/seed/reel/800/600"
  }
];
