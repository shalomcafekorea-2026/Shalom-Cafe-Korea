import { useEffect, useState, type FormEvent } from "react";
import {
  Soup, Flame, Beef, CookingPot, Drumstick, Salad, Utensils, UtensilsCrossed,
  Coffee, IceCreamBowl, CupSoda, Phone, Star, MapPin, Clock, ChevronDown,
  ChevronUp, Menu, X, MessageCircle, ChevronLeft, ChevronRight, Camera,
  Send, Loader2, CheckCircle2, Truck,
  type LucideIcon,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "./lib/supabase";

/* ============================================================
   FACEBOOK ICON COMPONENT
   ============================================================ */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

/* ============================================================
   NAVIGATION ITEMS - Edit labels/hrefs here
   ============================================================ */
const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

/* ============================================================
   MENU DATA - EDIT YOUR MENU ITEMS HERE
   Each category has: cat (category name), items array
   Each item: icon (Lucide icon), n (name), d (description), p (price)
   ============================================================ */
type MenuImage = { src: string; alt: string };
type MenuItem = { icon: LucideIcon; n: string; d: string; p: string };
type MenuCategory = { cat: string; images: MenuImage[]; items: MenuItem[] };

const menuCategories: MenuCategory[] = [
  {
    cat: "Bibimbap & Rice",
    images: [
      { src: "/img/menu-bibimbap-rice.webp", alt: "Bibimbap & Rice menu page with prices" },
    ],
    items: [
      { icon: Soup, n: "Pork Bulgogi Bibimbap", d: "Rice bowl with stir-fried pork marinated in sweet & spicy sauce.", p: "₱175" },
      { icon: Soup, n: "Beef Bulgogi Bibimbap", d: "Rice bowl with stir-fried beef marinated in sweet & savory soy sauce.", p: "₱195" },
      { icon: Flame, n: "Hot Stone Bibimbap", d: "Rice bowl with two kinds of stir-fried meat, beef & pork, in a sizzling stone pot.", p: "₱265" },
      { icon: Flame, n: "Hot Stone Samgyeopsal Fried Rice", d: "Stir-fried pork belly fried rice bowl in a hot stone pot.", p: "₱225" },
      { icon: UtensilsCrossed, n: "Kimchi Fried Rice", d: "Solo or share size, made with aged kimchi.", p: "₱85 / ₱299" },
      { icon: UtensilsCrossed, n: "Spam Fried Rice", d: "Solo or share size, a Shalom favorite.", p: "₱85 / ₱299" },
      { icon: Flame, n: "Hot Stone Cheese Kimchi Fried Rice", d: "Kimchi fried rice in a hot stone pot topped with melted cheese.", p: "₱189" },
      { icon: UtensilsCrossed, n: "Plain Rice", d: "Steamed white rice, solo or share size.", p: "₱40 / ₱165" },
    ],
  },
  {
    cat: "Beef & Pork",
    images: [
      { src: "/img/menu-beef-pork.webp", alt: "Beef & others menu page with prices" },
      { src: "/img/menu-pork.webp", alt: "Pork dishes menu page with prices" },
    ],
    items: [
      { icon: Beef, n: "Beef Bulgogi", d: "Stir-fried beef marinated in sweet & savory soy sauce.", p: "₱365" },
      { icon: CookingPot, n: "Beef Bulgogi Hot Pot", d: "Beef marinated in Shalom's secret sauce, cooked with rich broth in a hot pot.", p: "₱425" },
      { icon: Flame, n: "Samgyeopsal", d: "Korean grilled pork belly, cooked tableside.", p: "₱285" },
      { icon: Flame, n: "Cheese Samgyeopsal", d: "Spicy grilled pork belly loaded with cheese topping.", p: "₱359" },
      { icon: Beef, n: "Soy Pork Bulgogi", d: "Pork grilled in sweet & savory soy sauce.", p: "₱279" },
      { icon: Beef, n: "Spicy Pork Bulgogi", d: "Pork grilled in sweet & spicy sauce.", p: "₱279" },
      { icon: Beef, n: "Osam Bulgogi", d: "Squid & pork belly stir-fried in sweet & spicy sauce.", p: "₱299" },
      { icon: Beef, n: "Tangsuyuk", d: "Deep-fried pork with sweet & sour sauce.", p: "₱329" },
      { icon: Beef, n: "Tonkatsu", d: "Breaded, deep-fried pork cutlet.", p: "₱299" },
    ],
  },
  {
    cat: "Chicken",
    images: [
      { src: "/img/menu-chicken.webp", alt: "Chicken menu page with prices" },
    ],
    items: [
      { icon: Drumstick, n: "Dak Gangjeong", d: "Boneless chicken stir-fried in Shalom's special spicy Korean sauce.", p: "₱385 / ₱645" },
      { icon: Drumstick, n: "Fried Chicken", d: "Made with authentic Korean ingredients, crispy every time.", p: "₱295 / ₱565" },
      { icon: Drumstick, n: "Soy Chicken", d: "Coated in sweet & savory soy sauce.", p: "₱295 / ₱565" },
      { icon: Drumstick, n: "Honey Butter Chicken", d: "Coated in real honey & butter.", p: "₱325 / ₱585" },
      { icon: Drumstick, n: "Honey Wings", d: "Coated with real honey & butter.", p: "₱265" },
      { icon: Utensils, n: "Chicken Katsu with Cheese Sauce", d: "Crispy breaded chicken cutlet with a rich, creamy cheese sauce.", p: "₱350" },
    ],
  },
  {
    cat: "Ramyun & Soup",
    images: [
      { src: "/img/menu-ramyun-soup.webp", alt: "Ramyun & Soup menu page with prices" },
    ],
    items: [
      { icon: CookingPot, n: "Budae Jjigae", d: "Various meats & kimchi cooked in a mouth-watering spicy broth.", p: "₱325" },
      { icon: CookingPot, n: "Kimchi Jjigae", d: "Spicy kimchi stew made with pork & vegetables.", p: "₱295" },
      { icon: Soup, n: "Ramyun", d: "Spicy Korean noodle soup.", p: "₱150" },
      { icon: Soup, n: "Bibim Ramyun", d: "Cold sweet & spicy noodles.", p: "₱179" },
      { icon: Soup, n: "Jjajang Ramyun", d: "Korean black bean noodles topped with a fried egg.", p: "₱179" },
      { icon: Soup, n: "Cheese Ramyun", d: "Classic spicy ramyun topped with melted cheese.", p: "₱189" },
      { icon: Soup, n: "Miso Soup", d: "Fermented soybean paste soup.", p: "₱200" },
      { icon: Soup, n: "Fish Cake Soup", d: "Korean fish cake soup.", p: "₱285" },
    ],
  },
  {
    cat: "Kimbap & Sides",
    images: [
      { src: "/img/menu-kimbap-sides.webp", alt: "Salad Kimbap menu page with prices" },
      { src: "/img/menu-beef-pork.webp", alt: "Sides menu page with prices" },
    ],
    items: [
      { icon: Salad, n: "Salad Kimbap", d: "Seaweed rice roll packed with crisp vegetables, crab meat & mayo.", p: "₱215" },
      { icon: UtensilsCrossed, n: "Beef Bulgogi Kimbap", d: "Seaweed rice rolls with stir-fried beef marinated in soy sauce.", p: "₱110 / ₱200" },
      { icon: UtensilsCrossed, n: "Pork Bulgogi Kimbap", d: "Seaweed rice rolls with stir-fried pork.", p: "₱105 / ₱195" },
      { icon: UtensilsCrossed, n: "Spam Kimbap", d: "Seaweed rice rolls with spam.", p: "₱110 / ₱200" },
      { icon: UtensilsCrossed, n: "Mango & Crab Meat Kimbap", d: "A sweet-savory twist on the classic seaweed rice roll.", p: "₱225" },
      { icon: UtensilsCrossed, n: "Kimbap Dosirak", d: "Assorted rice roll box.", p: "₱425" },
      { icon: Utensils, n: "Mandu", d: "Fried dumplings, 4 pcs.", p: "₱169" },
      { icon: Salad, n: "Green Salad", d: "Fresh crisp greens with cherry tomatoes.", p: "₱225" },
      { icon: Salad, n: "Mango & Crab Salad", d: "Mango, crab and greens tossed in a light dressing.", p: "₱245" },
      { icon: UtensilsCrossed, n: "Pajeon", d: "Korean vegetable pancake.", p: "₱200" },
      { icon: UtensilsCrossed, n: "Japchae", d: "Glass noodles & vegetables stir-fried in savory soy sauce.", p: "₱250" },
      { icon: UtensilsCrossed, n: "Tteokbokki", d: "Rice cakes & veggies stir-fried in sweet & spicy sauce.", p: "₱215" },
      { icon: UtensilsCrossed, n: "Cheese Tteokbokki", d: "Tteokbokki topped with melted cheese.", p: "₱275" },
      { icon: UtensilsCrossed, n: "Gyeranjjim", d: "Light, fluffy & savory steamed eggs.", p: "₱215" },
      { icon: UtensilsCrossed, n: "Gyeranmari", d: "Korean egg roll.", p: "₱189" },
      { icon: UtensilsCrossed, n: "Fun Platter", d: "Assorted finger foods with dipping sauces.", p: "₱265" },
      { icon: UtensilsCrossed, n: "French Fries", d: "Crispy golden fries.", p: "₱85 / ₱125" },
      { icon: UtensilsCrossed, n: "Sandwich of the Day with Fries", d: "Daily sandwich special served with fries.", p: "₱175" },
    ],
  },
  {
    cat: "Coffee & Drinks",
    images: [
      { src: "/img/menu-drinks.webp", alt: "Coffee & Drinks menu page with prices" },
    ],
    items: [
      { icon: Coffee, n: "Cafe Latte", d: "Hot or iced, small or medium.", p: "₱115 / ₱130" },
      { icon: Coffee, n: "Caramel Macchiato", d: "Iced, espresso-based.", p: "₱145" },
      { icon: IceCreamBowl, n: "Affogato", d: "Espresso poured over vanilla ice cream.", p: "₱165" },
      { icon: CupSoda, n: "Mango or Strawberry Shake", d: "Small or medium, blended fresh.", p: "₱110 / ₱140" },
      { icon: IceCreamBowl, n: "Mango Bingsu", d: "Shaved ice dessert topped with fresh mango.", p: "₱244" },
      { icon: IceCreamBowl, n: "Strawberry Bingsu", d: "Shaved ice dessert topped with fresh strawberry.", p: "₱244" },
      { icon: IceCreamBowl, n: "Cookies & Cream Bingsu", d: "Shaved ice dessert topped with cookies & cream.", p: "₱244" },
      { icon: IceCreamBowl, n: "Red Bean Bingsu", d: "Shaved ice dessert topped with sweet red beans.", p: "₱215" },
      { icon: CupSoda, n: "Cucumber Lemonade", d: "Single glass or pitcher — great for sharing.", p: "₱80 / ₱260" },
      { icon: CupSoda, n: "Iced Tea", d: "Single glass or pitcher.", p: "₱75 / ₱235" },
      { icon: CupSoda, n: "Citron Tea", d: "Hot or cold.", p: "₱85" },
      { icon: CupSoda, n: "Soda in Can", d: "Assorted flavors.", p: "₱65" },
      { icon: CupSoda, n: "Bottled Water", d: "Purified drinking water.", p: "₱40" },
      { icon: CupSoda, n: "Soda (1.5L)", d: "Large soda for sharing.", p: "₱130" },
      { icon: Coffee, n: "Hot Tea", d: "Assorted hot tea flavors.", p: "₱64" },
      { icon: Coffee, n: "Americano", d: "Hot or iced.", p: "₱95 / ₱110" },
      { icon: Coffee, n: "Spanish Latte", d: "Hot or iced.", p: "₱115 / ₱145" },
      { icon: Coffee, n: "Vanilla Latte", d: "Hot or iced.", p: "₱115 / ₱145" },
      { icon: Coffee, n: "Cafe Mocha", d: "Hot or iced.", p: "₱135 / ₱145" },
      { icon: Coffee, n: "Hot Choco", d: "Rich hot chocolate.", p: "₱93" },
      { icon: Coffee, n: "Korean Coffee (3in1)", d: "Classic Korean instant coffee.", p: "₱64" },
      { icon: IceCreamBowl, n: "Ice Cream", d: "Assorted flavors.", p: "₱84" },
      { icon: IceCreamBowl, n: "Assorted Ice Cream", d: "Multiple scoops of assorted flavors.", p: "₱189" },
    ],
  },
  {
    cat: "Value Meals",
    images: [
      { src: "/img/menu-value-meals-1.webp", alt: "Value Meal P219 menu page with prices" },
      { src: "/img/menu-value-meals-2.webp", alt: "Super Solo Meal menu page with prices" },
    ],
    items: [
      { icon: Utensils, n: "Fried Chicken with Rice & French Fries", d: "Value meal served with iced tea.", p: "₱219" },
      { icon: Utensils, n: "Beef Bulgogi with Rice", d: "Stir-fried beef marinated in sweet & savory soy sauce with rice. Served with iced tea.", p: "₱219" },
      { icon: Utensils, n: "Tonkatsu with Rice", d: "Breaded, deep-fried pork cutlet with rice. Served with iced tea.", p: "₱219" },
      { icon: Utensils, n: "Soy or Spicy Pork Bulgogi with Rice", d: "Pork grilled in sweet & spicy sauce with rice. Served with iced tea.", p: "₱219" },
      { icon: Utensils, n: "Tangsuyuk with Rice", d: "Deep-fried pork with sweet & sour sauce. Served with iced tea.", p: "₱219" },
      { icon: Utensils, n: "Samgyupsal", d: "Korean grilled pork belly served with fresh greens, garlic, dipping sauce, and traditional side dishes. Served with miso soup.", p: "₱345" },
      { icon: Utensils, n: "Beef Bulgogi Hotpot", d: "Beef marinated in Shalom's secret sauce cooked with rich broth in a hot pot. Served with miso soup.", p: "₱375" },
      { icon: Utensils, n: "Kimchi Jjigae", d: "Spicy kimchi stew cooked with juicy pork & vegetables. Served with miso soup.", p: "₱355" },
      { icon: Utensils, n: "Tangsuyuk", d: "Deep-fried pork with sweet & sour sauce. Served with miso soup.", p: "₱345" },
      { icon: Utensils, n: "Soy or Spicy Pork Bulgogi", d: "Pork belly stir-fried in sweet & spicy sauce. Served with miso soup.", p: "₱335" },
      { icon: Utensils, n: "Chicken Katsu", d: "Crispy Korean-style chicken cutlet served with rich, creamy sauce. Served with miso soup.", p: "₱345" },
    ],
  },
  {
    cat: "Set Meals",
    images: [
      { src: "/img/menu-set-meals-1.webp", alt: "Value Set Menu page with prices" },
      { src: "/img/menu-set-meals-2.webp", alt: "Set Menu page with prices" },
    ],
    items: [
      { icon: Utensils, n: "Better Together Set (Good for 4)", d: "Includes Pajeon, Kimchi Jjigae, Gyeran-jjim, Rice Platter, and Drinks. Upgrade rice to kimchi or spam fried rice for ₱90.", p: "₱1,099" },
      { icon: Utensils, n: "Meat Lovers Set (Good for 4)", d: "Includes Soy or Spicy Pork Bulgogi, Chicken (small), Tonkatsu, Ramyun, Rice Platter, and Drinks. Upgrade rice to kimchi or spam fried rice for ₱90.", p: "₱1,399" },
      { icon: Utensils, n: "Family Feast Set (Good for 6)", d: "Includes Pajeon, Soy or Spicy Pork Bulgogi, Chicken (large), Cheese Ramyun, Japchae or Salad, Tangsuyuk or Tonkatsu, Rice Platter, and Pitcher. Upgrade rice to kimchi or spam fried rice for ₱90.", p: "₱2,299" },
      { icon: Utensils, n: "Shalom Special Set (Good for 6)", d: "Includes Tangsuyuk, Osam Bulgogi or Spicy Bulgogi, Cheese Samgyeopsal, Beef Bulgogi Hotpot, Kimchi Jjigae, Dakgangjeong, Salad, Rice Platter, 2 slices assorted cake, Assorted Ice Cream, and Pitcher. Upgrade rice to kimchi or spam fried rice for ₱90.", p: "₱2,799" },
    ],
  },
  {
    cat: "Combos",
    images: [
      { src: "/img/menu-combos.webp", alt: "Value Combo Meal menu page with prices" },
    ],
    items: [
      { icon: Utensils, n: "Combo 1: Ramyun with Mandu", d: "Korean noodles with fried dumplings (2 pcs).", p: "₱229" },
      { icon: Utensils, n: "Combo 2: Ramyun with Kimbap", d: "Korean noodles with seaweed rice rolls (half).", p: "₱249" },
      { icon: Utensils, n: "Combo 3: Tteokbokki with Mandu", d: "Korean rice cakes with fried dumplings (2 pcs).", p: "₱209" },
      { icon: Utensils, n: "Combo 4: Tteokbokki with Kimbap", d: "Rice cakes & veggies stir-fried in sweet & spicy sauce (half) with half seaweed rice rolls.", p: "₱229" },
    ],
  },
  {
    cat: "Rice Bowls (Delivery Only)",
    images: [
      { src: "/img/menu-rice-bowls.webp", alt: "Rice Bowl delivery-only menu page with prices" },
    ],
    items: [
      { icon: Utensils, n: "Kimchi Fried Rice with Egg and Spam", d: "Delivery exclusive. Add kimchi stew or miso soup for ₱79.", p: "₱109" },
      { icon: Utensils, n: "Fried Rice with Egg and Spam", d: "Delivery exclusive. Add kimchi stew or miso soup for ₱79.", p: "₱109" },
      { icon: Utensils, n: "Soy Pork Bulgogi Rice Bowl", d: "Delivery exclusive. Add kimchi stew or miso soup for ₱79.", p: "₱169" },
      { icon: Utensils, n: "Spicy Pork Bulgogi Rice Bowl", d: "Delivery exclusive. Add kimchi stew or miso soup for ₱79.", p: "₱169" },
      { icon: Utensils, n: "Beef Bulgogi Rice Bowl", d: "Delivery exclusive. Add kimchi stew or miso soup for ₱79.", p: "₱189" },
      { icon: Utensils, n: "Donkatsu Rice Bowl", d: "Delivery exclusive. Add kimchi stew or miso soup for ₱79.", p: "₱199" },
    ],
  },
];

/* ============================================================
   GALLERY IMAGES - EDIT IMAGE PATHS AND LABELS HERE
   Paths point at the optimized WebP files in /public/img
   ============================================================ */
const galleryImages = [
  { src: "/img/hero.webp", alt: "Signature Shalom spread", label: "Our Signature Spread" },
  { src: "/img/about-cafe.webp", alt: "Coffee and cake at Shalom Cafe", label: "Coffee, Cakes & Cozy Vibes" },
  { src: "/img/menu-bibimbap-rice.webp", alt: "Bibimbap & Rice menu page", label: "Bibimbap & Rice" },
  { src: "/img/menu-chicken.webp", alt: "Chicken menu page", label: "Korean Fried Chicken" },
  { src: "/img/menu-ramyun-soup.webp", alt: "Ramyun & Soup menu page", label: "Ramyun & Soup" },
  { src: "/img/menu-kimbap-sides.webp", alt: "Kimbap & Sides menu page", label: "Kimbap & Sides" },
  { src: "/img/menu-set-meals-2.webp", alt: "Family & group set meals menu page", label: "Family & Group Sets" },
  { src: "/img/menu-drinks.webp", alt: "Coffee, shakes & bingsu menu page", label: "Coffee, Shakes & Bingsu" },
];

/* ============================================================
   CUSTOMER REVIEWS - EDIT REVIEWS HERE
   n = name, t = title/role, q = quote, stars = rating (1-5)
   ============================================================ */
const reviews = [
  { n: "Julac Ontina", t: "Local Guide · 18 reviews", q: "Food is amazing. Would definitely come back for more bibimbap and chicken. Worth every peso!", stars: 5 },
  { n: "Shiela Agalon", t: "Local Guide · 19 reviews", q: "We had a terrific brunch here. Food is so dependably good. Service was excellent, almost like our private dining. Fun, fun, fun!!", stars: 5 },
  { n: "Oca Nacional Jr", t: "Local Guide · 64 reviews", q: "An authentic taste of Korea in my hometown. One of the best places to bond and celebrate occasions with your family.", stars: 5 },
  { n: "LarDarius Veldheer", t: "Local Guide", q: "They serve my favorite delicious Korean foods.", stars: 5 },
  { n: "Arjijiii", t: "Local Guide", q: "Food: 5. Service: 5. Everything we ordered was spot on.", stars: 5 },
  { n: "Mhay S.", t: "Guest", q: "Good food 😊", stars: 5 },
];

/* ============================================================
   CONTACT INFORMATION - EDIT YOUR DETAILS HERE
   ============================================================ */
const PHONE = "09569256576";                                    // Display phone number
const PHONE_TEL = "tel:+69569256576";                            // Clickable phone link
const DELIVERY_PHONE = "0956 925 6576";                           // Delivery-exclusive line (from Rice Bowl menu page)
const DELIVERY_TEL = "tel:+639569256576";                         // Clickable delivery phone link
const FB_URL = "https://www.facebook.com/p/Shalom-Caf%C3%A8-100064145404745/"; // Facebook page URL
const ADDRESS = "San Juan Bautista St. Goa, Camarines Sur, 4422"; // ✅ UPDATED ADDRESS

/* ============================================================
   FAQ - EDIT QUESTIONS AND ANSWERS HERE
   Format: ["Question", "Answer"]
   ============================================================ */
const faqs: [string, string][] = [
  ["What are your opening hours?", "We're open daily and close at 8 PM, serving breakfast, brunch, lunch, dinner and dessert."],
  ["Is there parking?", "Yes — we have a free parking lot plus free street parking along San Juan Bautista Street."],
  ["Is it kid-friendly?", "Absolutely. Shalom Cafe is good for kids, with mild dishes and a cozy, casual atmosphere."],
  ["Can I order takeout?", "Yes, every menu item is available for takeout. Call ahead and we'll have it ready."],
  ["Do you cater for events?", "Yes! We cater for small gatherings and celebrations. Contact us to discuss your needs."],
  ["Do you deliver?", `Yes — our Rice Bowl menu is exclusive to delivery. Call or text ${DELIVERY_PHONE} to order.`],
];

/* ============================================================
   REVEAL ANIMATION HOOK - Controls scroll-triggered animations
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ============================================================
   SCROLL POSITION HOOK - Tracks vertical scroll for navbar/parallax
   ============================================================ */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const f = () => setY(window.scrollY);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return y;
}

/* ============================================================
   LIGHTBOX - Full-screen photo viewer used by the Menu and
   Gallery sections to show the real, high-res menu page photos.
   ============================================================ */
type LightboxState = { images: MenuImage[]; index: number } | null;

function Lightbox({
  state,
  onClose,
  onNav,
}: {
  state: LightboxState;
  onClose: () => void;
  onNav: (dir: -1 | 1) => void;
}) {
  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state, onClose, onNav]);

  if (!state) return null;
  const img = state.images[state.index];
  const hasMultiple = state.images.length > 1;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {hasMultiple && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onNav(-1); }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNav(1); }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <img
        src={img.src}
        alt={img.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-full rounded-lg shadow-2xl object-contain"
      />

      {hasMultiple && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-wider">
          {state.index + 1} / {state.images.length}
        </div>
      )}
    </div>
  );
}

function useLightbox() {
  const [state, setState] = useState<LightboxState>(null);
  const open = (images: MenuImage[], index = 0) => setState({ images, index });
  const close = () => setState(null);
  const nav = (dir: -1 | 1) =>
    setState((s) => s && { images: s.images, index: (s.index + dir + s.images.length) % s.images.length });
  return { state, open, close, nav };
}

/* ============================================================
   NAVBAR COMPONENT - Top navigation bar
   ============================================================ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollY();

  useEffect(() => {
    setScrolled(scrollY > 40);
  }, [scrollY]);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - edit text here */}
          <a href="#home" onClick={() => handleClick("#home")} className="flex items-center gap-2 group">
            <span className={`text-2xl font-serif font-bold tracking-tight transition-colors duration-300 ${scrolled ? "text-charcoal" : "text-white"}`}>
              Shalom
            </span>
            <span className={`text-sm font-light tracking-widest uppercase transition-colors duration-300 ${scrolled ? "text-warm-700" : "text-warm-100"}`}>
              Café Korea
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className={`nav-link px-3 py-2 text-sm font-medium transition-colors duration-300 ${scrolled ? "text-stone-600 hover:text-warm-700" : "text-white/80 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
            <a
              href={PHONE_TEL}
              className="ml-3 inline-flex items-center gap-2 px-5 py-2.5 bg-warm-700 text-white text-sm font-semibold rounded-full hover:bg-warm-800 transition-colors duration-300 shadow-lg shadow-warm-700/25"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${scrolled ? "text-charcoal" : "text-white"}`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-stone-100 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="block w-full text-left px-4 py-3 text-stone-700 hover:text-warm-700 hover:bg-warm-50 rounded-lg transition-colors text-sm font-medium"
            >
              {item.label}
            </button>
          ))}
          <a
            href={PHONE_TEL}
            className="flex items-center gap-2 px-4 py-3 text-warm-700 font-semibold text-sm"
          >
            <Phone className="w-4 h-4" />
            {PHONE}
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ============================================================
   HERO SECTION - Full-screen banner at top
   Edit background image path and text content here
   ============================================================ */
function Hero() {
  const scrollY = useScrollY();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax - EDIT IMAGE PATH */}
      <div
        className="absolute inset-0 hero-bg"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src="/img/hero.webp"
          alt="A spread of Shalom Café Korea's signature dishes: samgyeopsal, kimchi jjigae, dak gangjeong, kimchi bulgogi bibimbap and tonkatsu"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Decorative blur circles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-warm-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-700/10 rounded-full blur-3xl" />
      </div>

      {/* Hero content - EDIT TEXT HERE */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="rv">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-[0.2em] uppercase text-warm-100 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            Authentic Korean Cuisine
          </span>
        </div>
        <h1 className="rv rv-delay-1 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Shalom<br />
          <span className="text-warm-100">Café Korea</span>
        </h1>
        <p className="rv rv-delay-2 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Experience the warm flavors of Korea in the heart of Goa, Camarines Sur.
          From sizzling bibimbap to crispy fried chicken — taste the tradition.
        </p>
        <div className="rv rv-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#menu"
            onClick={(e) => { e.preventDefault(); document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-warm-700 text-white font-semibold rounded-full hover:bg-warm-800 transition-all duration-300 shadow-xl shadow-warm-700/30 text-sm tracking-wide"
          >
            Explore Our Menu
          </a>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border border-white/25 text-sm tracking-wide"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT SECTION - Story and info about the restaurant
   EDIT TEXT AND IMAGE PATH HERE
   ============================================================ */
function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* About image - EDIT IMAGE PATH */}
          <div className="rv img-zoom rounded-2xl overflow-hidden shadow-2xl shadow-stone-300/30 order-2 lg:order-1">
            <img
              src="/img/about-cafe.webp"
              alt="Iced coffee, chocolate cake and latte art at Shalom Café Korea"
              className="w-full h-[400px] lg:h-[520px] object-cover"
            />
          </div>

          {/* About text - EDIT CONTENT HERE */}
          <div className="order-1 lg:order-2">
            <div className="rv">
              <span className="inline-block text-warm-700 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
                Our Story
              </span>
            </div>
            <h2 className="rv rv-delay-1 font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-6 leading-tight">
              A Taste of Korea,<br />
              <span className="text-warm-700">Made with Love</span>
            </h2>
            <div className="rv rv-delay-2 space-y-4 text-stone-600 leading-relaxed">
              <p>
                Shalom Café Korea brings the vibrant, authentic flavors of Korean cuisine to
                Goa, Camarines Sur. Every dish is carefully prepared using traditional
                recipes and the freshest ingredients — from our sizzling hot stone bibimbap to our
                signature crispy Korean fried chicken.
              </p>
              <p>
                &ldquo;Shalom&rdquo; means peace, and that&rsquo;s exactly what we want you to feel
                when you walk through our doors. Whether you&rsquo;re gathering with family over
                samgyeopsal, enjoying a quiet brunch, or treating yourself to our famous mango bingsu
                — we promise a dining experience that warms the heart.
              </p>
              <p>
                From our cozy café space on San Juan Bautista Street, we welcome
                you to discover the rich, comforting flavors that have made Korean food beloved
                around the world — right here at home.
              </p>
            </div>
            <div className="rv rv-delay-3 mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-warm-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warm-700" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-charcoal">Open Daily from Monday-Saturday</div>
                  <div className="text-xs text-stone-500">Until 8:00 PM</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-warm-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-warm-700" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-charcoal">Free Parking</div>
                  <div className="text-xs text-stone-500">On-site & street</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MENU SECTION - Interactive menu with category tabs
   Data comes from menuCategories array above
   ============================================================ */
function MenuSection() {
  const [activeCat, setActiveCat] = useState(0);
  const lightbox = useLightbox();
  const catImages = menuCategories[activeCat].images;

  return (
    <section id="menu" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Menu header */}
        <div className="text-center mb-14">
          <div className="rv">
            <span className="inline-block text-warm-700 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Our Menu
            </span>
          </div>
          <h2 className="rv rv-delay-1 font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Flavors of Korea
          </h2>
          <p className="rv rv-delay-2 text-stone-500 max-w-xl mx-auto">
            Every dish is crafted with authentic Korean recipes and the freshest ingredients.
          </p>
        </div>

        {/* Category tabs - auto-generated from menuCategories */}
        <div className="rv rv-delay-2 mb-10 flex flex-wrap justify-center gap-2">
          {menuCategories.map((c, i) => (
            <button
              key={c.cat}
              onClick={() => setActiveCat(i)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCat === i
                  ? "bg-warm-700 text-white shadow-lg shadow-warm-700/25"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {c.cat}
            </button>
          ))}
        </div>

        {/* Photo of the real printed menu page(s) for this category */}
        {catImages.length > 0 && (
          <div className="rv rv-delay-3 mb-10 flex items-center justify-center gap-4 flex-wrap">
            {catImages.map((img, i) => (
              <button
                key={img.src}
                onClick={() => lightbox.open(catImages, i)}
                className="group relative w-24 sm:w-28 aspect-[1414/2000] rounded-lg overflow-hidden border border-stone-200 shadow-md hover:shadow-xl transition-shadow"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </button>
            ))}
            <span className="text-xs text-stone-400 max-w-[10rem]">Tap to view the full menu page photo</span>
          </div>
        )}

        {/* Menu items grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {menuCategories[activeCat].items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.n}
                className="menu-card rv bg-cream rounded-xl p-6 border border-stone-100"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-warm-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-warm-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-charcoal text-sm leading-snug">{item.n}</h3>
                      <span className="flex-shrink-0 text-warm-700 font-bold text-sm whitespace-nowrap">{item.p}</span>
                    </div>
                    <p className="text-stone-500 text-xs leading-relaxed">{item.d}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox state={lightbox.state} onClose={lightbox.close} onNav={lightbox.nav} />
    </section>
  );
}

/* ============================================================
   GALLERY SECTION - Photo grid
   Images come from galleryImages array above
   ============================================================ */
function Gallery() {
  const lightbox = useLightbox();
  const lightboxImages: MenuImage[] = galleryImages.map(({ src, alt }) => ({ src, alt }));

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="rv">
            <span className="inline-block text-warm-700 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Gallery
            </span>
          </div>
          <h2 className="rv rv-delay-1 font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            A Feast for the Eyes
          </h2>
          <p className="rv rv-delay-2 text-stone-500 max-w-xl mx-auto">
            Every plate tells a story — see what awaits you at Shalom Café Korea. Tap any photo for a closer look.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => lightbox.open(lightboxImages, i)}
              className={`group rv img-zoom rounded-2xl overflow-hidden shadow-lg shadow-stone-200/50 relative text-left ${
                i === 0 || i === 5 ? "row-span-2" : ""
              }`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover ${
                  i === 0 || i === 5 ? "h-full min-h-[300px]" : "h-[200px] sm:h-[240px]"
                }`}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-semibold tracking-wide">{img.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <Lightbox state={lightbox.state} onClose={lightbox.close} onNav={lightbox.nav} />
    </section>
  );
}

/* ============================================================
   REVIEWS SECTION - Customer testimonials
   Reviews come from reviews array above
   ============================================================ */
function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-charcoal relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-warm-700/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-700/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="rv">
            <span className="inline-block text-warm-600 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Testimonials
            </span>
          </div>
          <h2 className="rv rv-delay-1 font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            What Our Guests Say
          </h2>
          <p className="rv rv-delay-2 text-stone-400 max-w-xl mx-auto">
            Don&rsquo;t just take our word for it — hear from the people who keep coming back.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.n}
              className="rv rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-5 italic">
                &ldquo;{r.q}&rdquo;
              </p>
              <div>
                <div className="text-white font-semibold text-sm">{r.n}</div>
                <div className="text-stone-500 text-xs mt-0.5">{r.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ SECTION - Accordion-style questions
   Questions come from faqs array above
   ============================================================ */
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="rv">
            <span className="inline-block text-warm-700 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              FAQ
            </span>
          </div>
          <h2 className="rv rv-delay-1 font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Common Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map(([q, a], i) => (
            <div
              key={q}
              className="rv rounded-xl border border-stone-200 bg-white overflow-hidden"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-charcoal text-sm pr-4">{q}</span>
                {openIdx === i ? (
                  <ChevronUp className="w-5 h-5 text-warm-700 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />
                )}
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIdx === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 text-stone-600 text-sm leading-relaxed">
                  {a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT SECTION - Contact info cards + map embed
   Edit PHONE, FB_URL, ADDRESS constants above
   ============================================================ */
/* ============================================================
   MESSAGE FORM - "Send us a message" form
   Saves submissions to a Supabase table called "messages".
   See README.md for the SQL to create the table + env var setup.
   If Supabase isn't configured yet, the form still renders but
   explains that it isn't connected, instead of crashing.
   ============================================================ */
function MessageForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabase) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("messages").insert({
      name,
      contact,
      message,
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("sent");
    setName("");
    setContact("");
    setMessage("");
  };

  if (status === "sent") {
    return (
      <div className="rv rounded-2xl p-8 bg-cream border border-stone-100 text-center">
        <CheckCircle2 className="w-10 h-10 text-warm-700 mx-auto mb-3" />
        <h3 className="font-semibold text-charcoal mb-1">Message sent!</h3>
        <p className="text-sm text-stone-500 mb-4">
          Thanks for reaching out — we&rsquo;ll get back to you as soon as we can.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-warm-700 hover:text-warm-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rv rounded-2xl p-6 sm:p-8 bg-cream border border-stone-100 space-y-4">
      <div>
        <h3 className="font-serif text-xl font-bold text-charcoal mb-1">Send Us a Message</h3>
        <p className="text-sm text-stone-500">Questions, reservations, or catering inquiries — we&rsquo;d love to hear from you.</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5">Name</label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-warm-700/30 focus:border-warm-700"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="contact" className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5">Phone or Email</label>
        <input
          id="contact"
          type="text"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-warm-700/30 focus:border-warm-700"
          placeholder="So we can reply to you"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5">Message</label>
        <textarea
          id="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-warm-700/30 focus:border-warm-700 resize-none"
          placeholder="How can we help?"
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-rose-600">
          {isSupabaseConfigured
            ? "Something went wrong sending your message. Please try again, or call/message us directly."
            : "This form isn't connected yet — please call, text, or message us on Facebook instead."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-warm-700 text-white font-semibold rounded-full hover:bg-warm-800 transition-colors duration-300 shadow-lg shadow-warm-700/25 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="rv">
            <span className="inline-block text-warm-700 text-sm font-semibold tracking-[0.15em] uppercase mb-4">
              Visit Us
            </span>
          </div>
          <h2 className="rv rv-delay-1 font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
            Come & Dine With Us
          </h2>
          <p className="rv rv-delay-2 text-stone-500 max-w-xl mx-auto">
            We&rsquo;d love to welcome you. Drop by, call, or message us anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact info cards */}
          <div className="space-y-5">
            {/* Phone card */}
            <a
              href={PHONE_TEL}
              className="rv block group rounded-2xl p-6 bg-cream border border-stone-100 hover:border-warm-200 hover:shadow-lg hover:shadow-warm-700/5 transition-all duration-300"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-warm-100 flex items-center justify-center group-hover:bg-warm-700 transition-colors duration-300">
                  <Phone className="w-6 h-6 text-warm-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 mb-1 font-medium uppercase tracking-wider">Phone / Text</div>
                  <div className="text-lg font-bold text-charcoal group-hover:text-warm-700 transition-colors">{PHONE}</div>
                </div>
              </div>
            </a>

            {/* Facebook card */}
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rv rv-delay-1 block group rounded-2xl p-6 bg-cream border border-stone-100 hover:border-warm-200 hover:shadow-lg hover:shadow-warm-700/5 transition-all duration-300"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  <FacebookIcon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 mb-1 font-medium uppercase tracking-wider">Facebook Page</div>
                  <div className="text-lg font-bold text-charcoal group-hover:text-blue-600 transition-colors">Shalom Cafè</div>
                </div>
              </div>
            </a>

            {/* Address card */}
            <div className="rv rv-delay-2 rounded-2xl p-6 bg-cream border border-stone-100">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-warm-100 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-warm-700" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 mb-1 font-medium uppercase tracking-wider">Address</div>
                  <div className="text-sm font-bold text-charcoal leading-snug">{ADDRESS}</div>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="rv rv-delay-3 rounded-2xl p-6 bg-cream border border-stone-100">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-warm-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warm-700" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 mb-1 font-medium uppercase tracking-wider">Hours</div>
                  <div className="text-sm font-bold text-charcoal">Open Daily from Monday to Saturday</div>
                  <div className="text-xs text-stone-500 mt-0.5">Closes at 8:00 PM</div>
                </div>
              </div>
            </div>

            {/* Delivery card */}
            <a
              href={DELIVERY_TEL}
              className="rv rv-delay-3 block group rounded-2xl p-6 bg-cream border border-stone-100 hover:border-warm-200 hover:shadow-lg hover:shadow-warm-700/5 transition-all duration-300"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-warm-100 flex items-center justify-center group-hover:bg-warm-700 transition-colors duration-300">
                  <Truck className="w-6 h-6 text-warm-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 mb-1 font-medium uppercase tracking-wider">Delivery Orders</div>
                  <div className="text-lg font-bold text-charcoal group-hover:text-warm-700 transition-colors">{DELIVERY_PHONE}</div>
                </div>
              </div>
            </a>

            {/* Google Maps embed - EDIT src URL for your location */}
            <div className="rv rv-delay-3 rounded-2xl overflow-hidden border border-stone-200 shadow-lg min-h-[280px]">
              <iframe
                title="Shalom Cafe Korea Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.5!2d123.5!3d13.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGoa%2C%20Camarines%20Sur!5e0!3m2!1sen!2sph!4v1700000000000"
                className="w-full h-full min-h-[280px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Message form */}
          <MessageForm />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER - Bottom of page with links and contact info
   ============================================================ */
function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-serif font-bold text-white">Shalom</span>
              <span className="text-xs font-light tracking-widest uppercase text-warm-600">Café Korea</span>
            </div>
            <p className="text-sm leading-relaxed max-w-md mb-6">
              Authentic Korean cuisine in the heart of Goa, Camarines Sur.
              From sizzling bibimbap to crispy fried chicken — taste the tradition.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={PHONE_TEL}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-warm-700 transition-colors duration-300"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`sms:+69569256576`}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                aria-label="Message"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-2.5">
              {["About", "Menu", "Gallery", "Reviews", "FAQ", "Contact"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${label.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block text-sm hover:text-warm-600 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm">
              <a href={PHONE_TEL} className="flex items-center gap-2 hover:text-warm-600 transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                {PHONE}
              </a>
              <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-warm-600 transition-colors">
                <FacebookIcon className="w-4 h-4 flex-shrink-0" />
                Shalom Cafè
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                Open daily until 8 PM
              </div>
              <a href={DELIVERY_TEL} className="flex items-center gap-2 hover:text-warm-600 transition-colors">
                <Truck className="w-4 h-4 flex-shrink-0" />
                Delivery: {DELIVERY_PHONE}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Shalom Café Korea. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Made with ❤️ in Goa, Camarines Sur
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   MAIN APP - Root component that assembles all sections
   ============================================================ */
export default function App() {
  useReveal();

  return (
    <div className="bg-cream text-charcoal font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <MenuSection />
      <Gallery />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
