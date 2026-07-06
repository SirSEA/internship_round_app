import { Link } from "react-router-dom";

const features = [
  {
    title: "LifeCircle Map",
    desc: "Build a digital map of your life, reconnect with schools, faith centers, neighborhoods, workplaces, family, and every community you belong to.",
    icon: "🗺️",
  },
  {
    title: "Rediscover Relationships",
    desc: "Strengthen existing bonds through shared experiences. Find people you grew up with, worked with, or worshipped with.",
    icon: "🤝",
  },
  {
    title: "Community Events",
    desc: "Organize and join events that bring your communities together, from festivals to fundraisers.",
    icon: "📅",
  },
  {
    title: "Savings & Cooperatives",
    desc: "Save together, operate cooperatives, contribute to community funds, and invest collectively.",
    icon: "💰",
  },
  {
    title: "Economic Network",
    desc: "Support one another through commerce. Buy, sell, and trade within trusted community networks.",
    icon: "🏪",
  },
  {
    title: "Collective Investment",
    desc: "Pool resources with your community for land, real estate, and business investments.",
    icon: "📈",
  },
];

const communityTypes = [
  { label: "Schools", icon: "🎓", desc: "Reconnect with classmates" },
  { label: "Churches", icon: "⛪", desc: "Faith communities" },
  { label: "Mosques", icon: "🕌", desc: "Islamic centers" },
  { label: "Neighborhoods", icon: "🏘️", desc: "Where you grew up" },
  { label: "Workplace", icon: "💼", desc: "Colleagues & alumni" },
  { label: "Family", icon: "👨‍👩‍👧‍👦", desc: "Clans & circles" },
  { label: "Social Clubs", icon: "🎨", desc: "Hobbies & interests" },
  { label: "Village/Town", icon: "🌍", desc: "Home associations" },
  { label: "Professional", icon: "📋", desc: "Industry networks" },
];

const previewCategories = [
  { label: "Schools", icon: "🎓", count: 2 },
  { label: "Faith", icon: "🕊️", count: 3 },
  { label: "Neighborhoods", icon: "🏘️", count: 1 },
  { label: "Family", icon: "👨‍👩‍👧‍👦", count: 4 },
  { label: "Workplace", icon: "💼", count: 2 },
  { label: "Social", icon: "🎨", count: 3 },
  { label: "Village/Town", icon: "🌍", count: 2 },
  { label: "Professional", icon: "📋", count: 1 },
];

export default function Landing() {
  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section id="home" className="lc-hero">
        <div className="lc-hero-bg" />
        <div className="lc-container py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="lc-hero-badge">
              <span className="lc-hero-dot" />
              Now available, start mapping your life
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-brand leading-tight mb-6">
              Reconnect. Rebuild.
              <br />
              <span className="text-brand-dark">Thrive Together.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
              ROUND helps you build a digital map of your life, reconnecting you with
              schools, faith centers, neighborhoods, workplaces, and every community
              that shaped who you are. Collaborate, support one another, and create
              economic opportunity together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="lc-btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="lc-btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Types */}
      <section id="communities" className="lc-section lc-section-alt">
        <div className="lc-container">
          <div className="text-center mb-12">
            <h2 className="lc-section-title">
              Map Every Part of Your Life
            </h2>
            <p className="lc-section-desc">
              Connect with every community that has shaped your journey, from your
              childhood neighborhood to your professional network.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {communityTypes.map((ct) => (
              <div key={ct.label} className="lc-community-card">
                <span className="text-2xl">{ct.icon}</span>
                <div>
                  <h3 className="font-semibold text-brand">{ct.label}</h3>
                  <p className="text-xs text-brand/60">{ct.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="lc-section">
        <div className="lc-container">
          <div className="text-center mb-12">
            <h2 className="lc-section-title">
              Everything You Need to Thrive
            </h2>
            <p className="lc-section-desc">
              Tools to reconnect, collaborate, and build economic power with your communities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="lc-feature-card">
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="text-lg font-bold text-brand mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LifeCircle Map Preview */}
      <section id="map" className="lc-section lc-section-alt">
        <div className="lc-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="lc-section-title">
                Your Life, Mapped
              </h2>
              <p className="text-gray-500 mb-6 text-lg">
                See every community you belong to in one place. Rediscover old
                connections, strengthen existing relationships, and find new
                opportunities through your shared life experiences.
              </p>
              <div className="space-y-3">
                {previewCategories.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium text-brand">{item.label}</span>
                    <span className="text-sm text-brand/60 ml-1">
                      {item.count} communities
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lc-card-gradient p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Your ROUND</p>
                  <p className="text-sm text-white/70">12 communities connected</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {previewCategories.slice(0, 8).map((item) => (
                  <div key={item.label} className="lc-map-preview">
                    <span className="text-xl block mb-1">{item.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/70">{item.count} communities</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lc-section">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="lc-section-title">
            Ready to Reconnect?
          </h2>
          <p className="text-gray-500 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands rebuilding their community networks and creating economic
            opportunity together.
          </p>
          <Link
            to="/register"
            className="lc-btn-primary"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
