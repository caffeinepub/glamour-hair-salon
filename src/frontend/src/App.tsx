import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import {
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Paintbrush,
  Phone,
  Scissors,
  Star,
  Twitter,
  Wind,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitBooking } from "./hooks/useQueries";

const GALLERY_IMAGES = [
  {
    src: "/assets/generated/gallery-1.dim_400x400.jpg",
    alt: "Balayage hair coloring",
  },
  { src: "/assets/generated/gallery-2.dim_400x400.jpg", alt: "Blowout waves" },
  {
    src: "/assets/generated/gallery-3.dim_400x400.jpg",
    alt: "Sleek bob haircut",
  },
  {
    src: "/assets/generated/gallery-4.dim_400x400.jpg",
    alt: "Auburn color treatment",
  },
  { src: "/assets/generated/gallery-5.dim_400x400.jpg", alt: "Elegant updo" },
  {
    src: "/assets/generated/gallery-6.dim_400x400.jpg",
    alt: "Platinum blonde",
  },
  { src: "/assets/generated/gallery-7.dim_400x400.jpg", alt: "Beach waves" },
  {
    src: "/assets/generated/gallery-8.dim_400x400.jpg",
    alt: "Layered haircut",
  },
  { src: "/assets/generated/gallery-9.dim_400x400.jpg", alt: "Hair treatment" },
  { src: "/assets/generated/gallery-10.dim_400x400.jpg", alt: "Pixie cut" },
];

const TEAM = [
  {
    name: "Sofia Martinez",
    title: "Master Stylist",
    specialty: "Balayage & Color",
    img: "/assets/generated/stylist-sofia.dim_400x400.jpg",
  },
  {
    name: "Marcus Chen",
    title: "Creative Director",
    specialty: "Precision Cuts",
    img: "/assets/generated/stylist-marcus.dim_400x400.jpg",
  },
  {
    name: "Jade Williams",
    title: "Senior Stylist",
    specialty: "Texture & Curls",
    img: "/assets/generated/stylist-jade.dim_400x400.jpg",
  },
  {
    name: "Elena Rossi",
    title: "Color Specialist",
    specialty: "Highlights & Toning",
    img: "/assets/generated/stylist-elena.dim_400x400.jpg",
  },
];

const SERVICES = [
  {
    icon: Scissors,
    name: "Hair Cut & Style",
    price: "$75+",
    description:
      "A precise, personalized haircut tailored to your face shape and lifestyle, finished with a professional blowout.",
  },
  {
    icon: Paintbrush,
    name: "Hair Coloring",
    price: "$150+",
    description:
      "From balayage to bold transformations — our colorists use premium, gentle formulas for stunning, long-lasting results.",
  },
  {
    icon: Wind,
    name: "Blowout & Styling",
    price: "$90+",
    description:
      "Achieve a salon-fresh blowout with voluminous waves, sleek straight styles, or polished updos for any occasion.",
  },
];

function SectionReveal({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    stylist: "",
    service: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitBooking = useSubmitBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (anchor: string) => {
    setMobileOpen(false);
    document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.stylist || !bookingForm.service) {
      toast.error("Please select a stylist and service.");
      return;
    }
    try {
      await submitBooking.mutateAsync(bookingForm);
      setSubmitted(true);
      toast.success("Appointment booked! We'll confirm shortly.");
    } catch {
      toast.error("Booking failed. Please try again.");
    }
  };

  const field = (key: keyof typeof bookingForm) => ({
    value: bookingForm[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setBookingForm((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const navLinks = [
    { label: "Home", anchor: "hero" },
    { label: "Services", anchor: "services" },
    { label: "Gallery", anchor: "gallery" },
    { label: "Team", anchor: "team" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Toaster richColors position="top-right" />

      {/* ========== HEADER ========== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream-header/95 shadow-card backdrop-blur-sm"
            : "bg-cream-header"
        }`}
        style={{
          backgroundColor: scrolled
            ? "oklch(0.91 0.03 75 / 0.97)"
            : "oklch(0.91 0.03 75)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Brand */}
          <button
            type="button"
            onClick={() => handleNav("hero")}
            className="flex flex-col items-start leading-none group"
            data-ocid="nav.link"
          >
            <span className="font-serif text-3xl font-bold tracking-tight text-foreground group-hover:text-gold transition-colors">
              AURORA
            </span>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-brown-muted -mt-1">
              Salon
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                type="button"
                key={l.anchor}
                onClick={() => handleNav(l.anchor)}
                className="text-sm font-medium tracking-wide text-foreground hover:text-gold transition-colors"
                data-ocid="nav.link"
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNav("booking")}
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gold text-primary-foreground hover:bg-gold-hover transition-colors shadow-gold"
              style={{
                backgroundColor: "oklch(0.61 0.1 75)",
                color: "oklch(0.978 0.018 82)",
              }}
              data-ocid="nav.primary_button"
            >
              Book Appointment
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-cream-header border-t border-border"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {navLinks.map((l) => (
                  <button
                    type="button"
                    key={l.anchor}
                    onClick={() => handleNav(l.anchor)}
                    className="text-sm font-medium text-left text-foreground hover:text-gold transition-colors"
                    data-ocid="nav.link"
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleNav("booking")}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold w-fit"
                  style={{
                    backgroundColor: "oklch(0.61 0.1 75)",
                    color: "oklch(0.978 0.018 82)",
                  }}
                  data-ocid="nav.primary_button"
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ========== HERO ========== */}
        <section
          id="hero"
          className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden"
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/assets/generated/salon-hero.dim_1400x800.jpg')",
            }}
          />
          {/* Left overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(35,30,25,0.78) 0%, rgba(35,30,25,0.5) 55%, rgba(35,30,25,0.1) 100%)",
            }}
          />
          {/* Model right */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
            <img
              src="/assets/generated/salon-model.dim_700x900.jpg"
              alt="Salon model"
              className="h-full w-full object-cover object-top"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 25%)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl"
            >
              <p
                className="text-sm font-medium tracking-[0.3em] uppercase mb-4"
                style={{ color: "oklch(0.75 0.08 75)" }}
              >
                Premium Hair Studio
              </p>
              <h1
                className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6"
                style={{ color: "oklch(0.97 0.012 82)" }}
              >
                Where Beauty
                <br />
                Finds Its Voice
              </h1>
              <p
                className="text-base md:text-lg leading-relaxed mb-8 max-w-sm"
                style={{ color: "oklch(0.87 0.018 75)" }}
              >
                Expert stylists, premium products, and a sanctuary designed for
                your transformation.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleNav("booking")}
                  className="px-7 py-3.5 rounded-sm font-semibold tracking-wide transition-all hover:shadow-gold hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "oklch(0.61 0.1 75)",
                    color: "oklch(0.978 0.018 82)",
                  }}
                  data-ocid="hero.primary_button"
                >
                  Book Your Experience
                </button>
                <button
                  type="button"
                  onClick={() => handleNav("services")}
                  className="px-7 py-3.5 rounded-sm font-semibold tracking-wide border transition-all hover:-translate-y-0.5"
                  style={{
                    borderColor: "oklch(0.75 0.08 75)",
                    color: "oklch(0.97 0.012 82)",
                  }}
                  data-ocid="hero.secondary_button"
                >
                  Our Services
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <div className="absolute bottom-0 left-0 right-0 z-10 hidden md:flex">
            <div
              className="max-w-6xl mx-auto w-full px-6 flex gap-12 py-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
              {[
                ["12+", "Years of Excellence"],
                ["4,800+", "Happy Clients"],
                ["98%", "Satisfaction Rate"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p
                    className="font-serif text-2xl font-bold"
                    style={{ color: "oklch(0.75 0.08 75)" }}
                  >
                    {num}
                  </p>
                  <p
                    className="text-xs tracking-wider uppercase"
                    style={{ color: "oklch(0.75 0.02 70)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== SERVICES ========== */}
        <section id="services" className="py-24 bg-background">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal className="text-center mb-14">
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold mb-3">
                What We Offer
              </p>
              <h2 className="font-serif text-4xl font-bold text-foreground">
                Our Services
              </h2>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {SERVICES.map((svc, i) => (
                <SectionReveal key={svc.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="bg-card border border-border rounded-sm p-7 flex flex-col gap-4 hover:shadow-card transition-shadow group"
                    data-ocid={`services.card.${i + 1}`}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "oklch(0.91 0.04 75)" }}
                    >
                      <svc.icon
                        size={20}
                        style={{ color: "oklch(0.61 0.1 75)" }}
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                        {svc.name}
                      </h3>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "oklch(0.61 0.1 75)" }}
                      >
                        {svc.price}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                      {svc.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleNav("booking")}
                      className="flex items-center gap-1 text-sm font-medium transition-colors"
                      style={{ color: "oklch(0.61 0.1 75)" }}
                      data-ocid={`services.link.${i + 1}`}
                    >
                      Explore Services <ChevronRight size={15} />
                    </button>
                  </motion.div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ========== GALLERY ========== */}
        <section
          id="gallery"
          className="py-24"
          style={{ backgroundColor: "oklch(0.91 0.024 78)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal className="text-center mb-12">
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold mb-3">
                Our Work
              </p>
              <h2 className="font-serif text-4xl font-bold text-foreground">
                Salon Gallery
              </h2>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
            </SectionReveal>

            <SectionReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {GALLERY_IMAGES.map((img, i) => (
                  <div
                    key={img.src}
                    className="aspect-square rounded-sm overflow-hidden group cursor-pointer"
                    data-ocid={`gallery.item.${i + 1}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal className="text-center mt-10">
              <button
                type="button"
                onClick={() => handleNav("booking")}
                className="px-8 py-3 rounded-sm font-semibold border-2 transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: "oklch(0.61 0.1 75)",
                  color: "oklch(0.61 0.1 75)",
                }}
                data-ocid="gallery.primary_button"
              >
                Book Your Transformation
              </button>
            </SectionReveal>
          </div>
        </section>

        {/* ========== TEAM ========== */}
        <section id="team" className="py-24 bg-background">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal className="text-center mb-14">
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold mb-3">
                Meet The Team
              </p>
              <h2 className="font-serif text-4xl font-bold text-foreground">
                Our Stylists
              </h2>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
            </SectionReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM.map((member, i) => (
                <SectionReveal key={member.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="group text-center"
                    data-ocid={`team.card.${i + 1}`}
                  >
                    <div className="aspect-square rounded-sm overflow-hidden mb-4">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p
                      className="text-xs tracking-widest uppercase mt-0.5"
                      style={{ color: "oklch(0.61 0.1 75)" }}
                    >
                      {member.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {member.specialty}
                    </p>
                    <div className="flex justify-center gap-0.5 mt-2">
                      <Star
                        size={12}
                        fill="oklch(0.61 0.1 75)"
                        style={{ color: "oklch(0.61 0.1 75)" }}
                      />
                      <Star
                        size={12}
                        fill="oklch(0.61 0.1 75)"
                        style={{ color: "oklch(0.61 0.1 75)" }}
                      />
                      <Star
                        size={12}
                        fill="oklch(0.61 0.1 75)"
                        style={{ color: "oklch(0.61 0.1 75)" }}
                      />
                      <Star
                        size={12}
                        fill="oklch(0.61 0.1 75)"
                        style={{ color: "oklch(0.61 0.1 75)" }}
                      />
                      <Star
                        size={12}
                        fill="oklch(0.61 0.1 75)"
                        style={{ color: "oklch(0.61 0.1 75)" }}
                      />
                    </div>
                  </motion.div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ========== BOOKING ========== */}
        <section
          id="booking"
          className="py-24"
          style={{ backgroundColor: "oklch(0.91 0.024 78)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left text */}
              <SectionReveal>
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold mb-3">
                  Reserve Your Visit
                </p>
                <h2 className="font-serif text-4xl font-bold text-foreground mb-5">
                  Book Your
                  <br />
                  Appointment
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Ready to transform your look? Schedule a session with one of
                  our expert stylists. We'll take care of the rest — from a
                  personalized consultation to the final reveal.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      icon: MapPin,
                      text: "123 Bloom Street, New York, NY 10001",
                    },
                    { icon: Phone, text: "+1 (212) 555-0178" },
                    { icon: Mail, text: "hello@aurorasalon.com" },
                    { icon: Clock, text: "Mon–Sat 9am–7pm · Sun 10am–5pm" },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <Icon size={16} style={{ color: "oklch(0.61 0.1 75)" }} />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              {/* Right form */}
              <SectionReveal>
                <div
                  className="bg-card border border-border rounded-sm p-8 shadow-card"
                  data-ocid="booking.panel"
                >
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                      data-ocid="booking.success_state"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: "oklch(0.91 0.04 75)" }}
                      >
                        <Star
                          size={28}
                          style={{ color: "oklch(0.61 0.1 75)" }}
                        />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                        Booking Confirmed!
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        We'll send a confirmation to {bookingForm.email}. We
                        look forward to seeing you!
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setBookingForm({
                            name: "",
                            email: "",
                            phone: "",
                            date: "",
                            time: "",
                            stylist: "",
                            service: "",
                          });
                        }}
                        className="mt-6 text-sm underline"
                        style={{ color: "oklch(0.61 0.1 75)" }}
                        data-ocid="booking.secondary_button"
                      >
                        Book another appointment
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                        Schedule a Visit
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="name"
                            className="text-xs uppercase tracking-wider text-muted-foreground"
                          >
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            placeholder="Sofia Johnson"
                            required
                            {...field("name")}
                            data-ocid="booking.input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="email"
                            className="text-xs uppercase tracking-wider text-muted-foreground"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="sofia@email.com"
                            required
                            {...field("email")}
                            data-ocid="booking.input"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label
                          htmlFor="phone"
                          className="text-xs uppercase tracking-wider text-muted-foreground"
                        >
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          {...field("phone")}
                          data-ocid="booking.input"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="date"
                            className="text-xs uppercase tracking-wider text-muted-foreground"
                          >
                            Date
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            required
                            {...field("date")}
                            data-ocid="booking.input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="time"
                            className="text-xs uppercase tracking-wider text-muted-foreground"
                          >
                            Time
                          </Label>
                          <Input
                            id="time"
                            type="time"
                            required
                            {...field("time")}
                            data-ocid="booking.input"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                          Stylist
                        </Label>
                        <Select
                          value={bookingForm.stylist}
                          onValueChange={(v) =>
                            setBookingForm((p) => ({ ...p, stylist: v }))
                          }
                        >
                          <SelectTrigger data-ocid="booking.select">
                            <SelectValue placeholder="Choose a stylist" />
                          </SelectTrigger>
                          <SelectContent>
                            {TEAM.map((t) => (
                              <SelectItem key={t.name} value={t.name}>
                                {t.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                          Service
                        </Label>
                        <Select
                          value={bookingForm.service}
                          onValueChange={(v) =>
                            setBookingForm((p) => ({ ...p, service: v }))
                          }
                        >
                          <SelectTrigger data-ocid="booking.select">
                            <SelectValue placeholder="Choose a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICES.map((s) => (
                              <SelectItem key={s.name} value={s.name}>
                                {s.name} — {s.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="submit"
                        disabled={submitBooking.isPending}
                        className="w-full py-3 font-semibold tracking-widest uppercase rounded-sm"
                        style={{
                          backgroundColor: "oklch(0.61 0.1 75)",
                          color: "oklch(0.978 0.018 82)",
                        }}
                        data-ocid="booking.submit_button"
                      >
                        {submitBooking.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            Scheduling...
                          </>
                        ) : (
                          "Schedule Now"
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      </main>

      {/* ========== FOOTER ========== */}
      <footer style={{ backgroundColor: "oklch(0.18 0.015 48)" }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div
            className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b"
            style={{ borderColor: "oklch(1 0 0 / 0.1)" }}
          >
            {/* Brand col */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-start leading-none mb-4">
                <span
                  className="font-serif text-3xl font-bold"
                  style={{ color: "oklch(0.88 0.028 80)" }}
                >
                  AURORA
                </span>
                <span
                  className="font-sans text-xs tracking-[0.25em] uppercase"
                  style={{ color: "oklch(0.72 0.018 70)" }}
                >
                  Salon
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.72 0.018 70)" }}
              >
                Premium hair care in the heart of New York. Your beauty is our
                craft.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="font-sans text-xs font-semibold tracking-widest uppercase mb-5"
                style={{ color: "oklch(0.88 0.028 80)" }}
              >
                Contact Info
              </h4>
              <ul
                className="space-y-3 text-sm"
                style={{ color: "oklch(0.72 0.018 70)" }}
              >
                <li className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0"
                    style={{ color: "oklch(0.61 0.1 75)" }}
                  />{" "}
                  123 Bloom St, New York, NY 10001
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} style={{ color: "oklch(0.61 0.1 75)" }} /> +1
                  (212) 555-0178
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} style={{ color: "oklch(0.61 0.1 75)" }} />{" "}
                  hello@aurorasalon.com
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4
                className="font-sans text-xs font-semibold tracking-widest uppercase mb-5"
                style={{ color: "oklch(0.88 0.028 80)" }}
              >
                Opening Hours
              </h4>
              <ul
                className="space-y-2 text-sm"
                style={{ color: "oklch(0.72 0.018 70)" }}
              >
                <li className="flex justify-between gap-4">
                  <span>Monday</span>
                  <span>9am – 7pm</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Tuesday</span>
                  <span>9am – 7pm</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Wednesday</span>
                  <span>9am – 7pm</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Thursday</span>
                  <span>9am – 7pm</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Friday</span>
                  <span>9am – 7pm</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Saturday</span>
                  <span>9am – 7pm</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Sunday</span>
                  <span>10am – 5pm</span>
                </li>
              </ul>
            </div>

            {/* Quick links */}
            <div>
              <h4
                className="font-sans text-xs font-semibold tracking-widest uppercase mb-5"
                style={{ color: "oklch(0.88 0.028 80)" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                {["Home", "Services", "Gallery", "Team", "Book Now"].map(
                  (label) => (
                    <li key={label}>
                      <button
                        type="button"
                        onClick={() =>
                          handleNav(
                            label === "Book Now"
                              ? "booking"
                              : label.toLowerCase(),
                          )
                        }
                        className="transition-colors hover:text-gold"
                        style={{ color: "oklch(0.72 0.018 70)" }}
                        data-ocid="footer.link"
                      >
                        {label}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4
                className="font-sans text-xs font-semibold tracking-widest uppercase mb-5"
                style={{ color: "oklch(0.88 0.028 80)" }}
              >
                Follow Us
              </h4>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="https://instagram.com"
                    aria-label={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: "oklch(0.25 0.015 50)",
                      color: "oklch(0.72 0.018 70)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "oklch(0.61 0.1 75)";
                      (e.currentTarget as HTMLElement).style.color =
                        "oklch(0.978 0.018 82)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "oklch(0.25 0.015 50)";
                      (e.currentTarget as HTMLElement).style.color =
                        "oklch(0.72 0.018 70)";
                    }}
                    data-ocid="footer.link"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
              <p
                className="text-xs mt-6 leading-relaxed"
                style={{ color: "oklch(0.55 0.012 60)" }}
              >
                Follow our journey and get inspired by our latest work.
              </p>
            </div>
          </div>

          <div
            className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
            style={{ color: "oklch(0.55 0.012 60)" }}
          >
            <p>
              © {new Date().getFullYear()} Aurora Salon. All rights reserved.
            </p>
            <p>
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                className="hover:underline transition-colors"
                style={{ color: "oklch(0.61 0.1 75)" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
