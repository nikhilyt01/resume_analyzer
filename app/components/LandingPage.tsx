import { usePuterStore } from "~/lib/puter";
import { Link } from "react-router";

const LandingPage = () => {
  const { auth } = usePuterStore();

  const handleGetStarted = () => {
    auth.signIn();
  };

  return (
    <div className="landing-page overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero-section min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>

        <div className="max-w-4xl space-y-8 animate-fade-in-up">
          <h1 className="text-7xl md:text-8xl font-black tracking-tight text-gradient leading-tight">
            Elevate Your Career with <span className="text-blue-600">ResumeRefine</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get instant, AI-powered feedback on your resume. Optimize for ATS,
            score your skills, and land your dream job faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button
              onClick={handleGetStarted}
              className="primary-button text-xl px-12 py-5 font-bold hover:scale-105 transition-transform shadow-2xl"
            >
              Get Started for Free
            </button>

          </div>
        </div>

        {/* Floating decorations */}
        <div className="mt-20 relative w-full max-w-5xl h-64 md:h-96 hidden md:block">
          <div className="absolute top-0 left-0 w-64 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 animate-float">
            <div className="h-4 w-3/4 bg-gray-100 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-100 rounded mb-6"></div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-xs font-bold">95</span>
              </div>
              <span className="text-sm font-semibold text-gray-500">ATS Score</span>
            </div>
          </div>

          <div className="absolute bottom-0 right-10 w-72 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 animate-float delay-500">
            <div className="flex gap-4 mb-4">
              <div className="h-10 w-10 bg-blue-100 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-2/3"></div>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 italic">"Strong focus on quantitative results. Improving action verbs..."</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Why Professionals Choose Resumind</h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "AI Analysis",
                desc: "Deep analysis of your resume content using state-of-the-art AI models.",
                icon: "🤖"
              },
              {
                title: "ATS Optimization",
                desc: "Ensure your resume gets past the gatekeepers with precise ATS scoring.",
                icon: "📈"
              },
              {
                title: "Instant Results",
                desc: "No more waiting for days. Get comprehensive feedback in seconds.",
                icon: "⚡"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center px-6">
        <div className="gradient-border max-w-4xl mx-auto !p-1">
          <div className="bg-white rounded-2xl p-16 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Land Your Dream Job?</h2>
            <p className="text-xl text-gray-600">Join thousands of job seekers who improved their resumes with AI.</p>
            <button
              onClick={handleGetStarted}
              className="primary-button text-2xl px-16 py-6 font-bold w-fit mx-auto mt-4"
            >
              Start Analyzing Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-gray-500 font-medium">
        <p>© 2026 Resumind. Powered by Puter.js</p>
      </footer>
    </div>
  );
};

export default LandingPage;
