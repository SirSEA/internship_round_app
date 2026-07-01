import { Link } from "react-router-dom";
import { lifeCircleMap } from "../data/mock";

const features = [
  {
    title: "LifeCircle Map",
    desc: "Build a digital map of your life — reconnect with schools, faith centers, neighborhoods, workplaces, family, and every community you belong to.",
    icon: "🗺️",
  },
  {
    title: "Rediscover Relationships",
    desc: "Strengthen existing bonds through shared experiences. Find people you grew up with, worked with, or worshipped with.",
    icon: "🤝",
  },
  {
    title: "Community Events",
    desc: "Organize and join events that bring your communities together — from festivals to fundraisers.",
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
  { label: "Schools", icon: "🎓", count: "Reconnect with classmates" },
  { label: "Churches", icon: "⛪", count: "Faith communities" },
  { label: "Mosques", icon: "🕌", count: "Islamic centers" },
  { label: "Neighborhoods", icon: "🏘️", count: "Where you grew up" },
  { label: "Workplace", icon: "💼", count: "Colleagues & alumni" },
  { label: "Family", icon: "👨‍👩‍👧‍👦", count: "Clans & circles" },
  { label: "Social Clubs", icon: "🎨", count: "Hobbies & interests" },
  { label: "Village/Town", icon: "🌍", count: "Home associations" },
  { label: "Professional", icon: "📋", count: "Industry networks" },
];

export default function Landing() {
  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800/5 to-green-900/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
              Now available — start mapping your life
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 leading-tight mb-6">
              Reconnect. Rebuild.
              <br />
              <span className="text-green-700">Thrive Together.</span>
            </h1>
            <p className="text-lg md:text-xl text-green-700/80 mb-8 max-w-2xl">
              LifeCircle helps you build a digital map of your life — reconnecting you with
              schools, faith centers, neighborhoods, workplaces, and every community
              that shaped who you are. Collaborate, support one another, and create
              economic opportunity together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-green-800 text-cream-50 px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-900/20"
              >
                Start Your LifeCircle
              </Link>
              <Link
                to="/login"
                className="border-2 border-green-800 text-green-800 px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Types */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Map Every Part of Your Life
            </h2>
            <p className="text-green-700/70 max-w-2xl mx-auto text-lg">
              Connect with every community that has shaped your journey — from your
              childhood neighborhood to your professional network.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {communityTypes.map((ct) => (
              <div
                key={ct.label}
                className="flex items-center gap-4 p-4 rounded-xl bg-cream-50 border border-cream-200 hover:border-green-300 hover:bg-green-50/50 transition-all cursor-pointer"
              >
                <span className="text-2xl">{ct.icon}</span>
                <div>
                  <h3 className="font-semibold text-green-900">{ct.label}</h3>
                  <p className="text-xs text-green-600">{ct.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Everything You Need to Thrive
            </h2>
            <p className="text-green-700/70 max-w-2xl mx-auto text-lg">
              Tools to reconnect, collaborate, and build economic power with your communities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white p-6 rounded-xl border border-cream-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-900/5 transition-all"
              >
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="text-lg font-bold text-green-900 mb-2">{f.title}</h3>
                <p className="text-green-700/70 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LifeCircle Map Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
                Your Life, Mapped
              </h2>
              <p className="text-green-700/70 mb-6 text-lg">
                See every community you belong to in one place. Rediscover old
                connections, strengthen existing relationships, and find new
                opportunities through your shared life experiences.
              </p>
              <div className="space-y-3">
                {lifeCircleMap.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <span className="font-medium text-green-900">{item.label}</span>
                      <span className="text-green-600 text-sm ml-2">
                        {item.communities.join(", ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-2xl p-8 text-cream-50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-cream-50/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-cream-50" />
                </div>
                <div>
                  <p className="font-semibold">Your LifeCircle</p>
                  <p className="text-sm text-cream-300">12 communities connected</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lifeCircleMap.slice(0, 8).map((item) => (
                  <div
                    key={item.label}
                    className="bg-cream-50/10 rounded-lg p-3 hover:bg-cream-50/20 transition-colors"
                  >
                    <span className="text-xl block mb-1">{item.icon}</span>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-cream-300">{item.communities.length} communities</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Ready to Reconnect?
          </h2>
          <p className="text-green-700/70 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands rebuilding their community networks and creating economic
            opportunity together.
          </p>
          <Link
            to="/register"
            className="inline-block bg-green-800 text-cream-50 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-900/20"
          >
            Create Your LifeCircle Free
          </Link>
        </div>
      </section>
    </div>
  );
}
