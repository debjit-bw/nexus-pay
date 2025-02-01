"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight, CheckCircle2, Globe2, Shield, Zap } from "lucide-react";
import mixpanel from "mixpanel-browser";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { idToken, activeAccountAdress } = useSelector(
    (state: any) => state.authSlice
  );

  const headerRef = useRef(null);
  const stepsRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const businessRef = useRef<HTMLElement>(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    mixpanel.track("landing_page_viewed");
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Payments",
      description: "Send and receive payments in seconds with near-zero fees",
    },
    {
      icon: <Globe2 className="w-8 h-8" />,
      title: "Global Access",
      description: "Use Nexus PayLink anywhere in the world, anytime",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Industry-Grade Security",
      description: "Your funds are protected with industry-grade encryption",
    },
  ];

  const businessSteps: Array<{
    title: string;
    description: string;
    icon: string;
  }> = [
    {
      title: "1. Integrate SDK",
      description: "Add our SDK to your application",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    },
    {
      title: "2. Send Payment Request",
      description: "Initiate a payment request with user's email.",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
    {
      title: "3. Receive Status",
      description:
        "Verify receive status about approval or rejection using our API.",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  const handleRedirect = () => {
    mixpanel.track("landing_login_clicked");
    router.push("/dashboard");
  };

  const handleScroll = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const scrollPosition = window.scrollY + rect.top;
      const headerHeight = 72;
      const bufferOffset = 100;
      const targetScrollPosition = scrollPosition - headerHeight - bufferOffset;
      window.scrollTo({
        top: targetScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const steps = [
    {
      title: "Create Account",
      description: "Get your unique Nexus ID in seconds",
      icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
    },
    {
      title: "Fund Wallet",
      description: "Add USDC to your wallet instantly",
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    },
    {
      title: "Start Using",
      description: "Pay anyone, anywhere, anytime",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08 .402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  const faqs = [
    {
      question: "Is Nexus PayLink secure?",
      answer:
        "Absolutely! We use advanced encryption and follow industry standards to ensure your funds are always safe.",
    },
    {
      question: "What are the fees?",
      answer:
        "Nexus PayLink charges less than $0.01 per transaction, regardless of the amount being sent. No hidden fees, no surprises.",
    },
    // {
    //   question: "Which cryptocurrencies are supported?",
    //   answer: "We currently support USDC on multiple chains with plans to add more stablecoins soon."
    // },
    {
      question: "How fast are transactions?",
      answer:
        "Transactions are near-instant, typically completing in under 2 seconds.",
    },
  ];

  return (
    <>
      <Head>
        <title>Nexus PayLink - The Future of Digital Payments</title>
        <meta
          name="description"
          content="Experience lightning-fast crypto payments with near-zero fees. Send, receive, and manage your digital assets with ease."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] text-white">
        <nav className="sticky top-0 z-50 bg-opacity-90 backdrop-filter backdrop-blur-lg bg-[#0D0D0D]">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div
              onClick={() => {
                handleScroll(headerRef);
                mixpanel.track("OnClick NexusPay Logo");
              }}
              className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer"
            >
              Nexus PayLink
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {["Steps", "Features", "Business", "FAQs"].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    handleScroll(
                      item === "Steps"
                        ? stepsRef
                        : item === "Features"
                          ? featuresRef
                          : item === "FAQs"
                            ? faqRef
                            : businessRef
                    )
                  }
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={handleRedirect}
                className="px-6 py-2 bg-blue-600 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-blue-500/30"
              >
                Launch App
              </button>
            </div>
          </div>
        </nav>

        <main
          ref={headerRef}
          className="container mx-auto lg:px-12 px-6 py-12 overflow-x-hidden"
        >
          <section className="min-h-[80vh] flex items-center">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8" data-aos="fade-right">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8 text-blue-300 text-center lg:text-start">
                  The Future of Digital Payments
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 text-center lg:text-start">
                  Experience lightning-fast stablecoin crypto payments with
                  near-zero fees. Send money to anyone, anywhere, instantly.
                </p>
                {/* <p className="text-lg font-semibold text-green-400 mt-4">
                  Backed by Aptos Labs
                </p> */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button
                    className="py-3 px-6 sm:px-8 bg-blue-600 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-xl hover:shadow-blue-500/30 flex items-center gap-2"
                    onClick={() => {
                      mixpanel.track("get_started_clicked");
                      router.push("/dashboard");
                    }}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    className="py-3 px-6 sm:px-8 bg-transparent text-blue-600 border-2 border-blue-600 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-xl hover:shadow-blue-500/30"
                    onClick={() => {
                      handleScroll(featuresRef);
                      mixpanel.track("learn_more_clicked");
                    }}
                  >
                    Learn more
                  </button>
                </div>

                <div className="flex gap-8 pt-8 justify-center lg:justify-start">
                  {[
                    ["300+", "Transactions"],
                    ["70", "Users"],
                    ["99.9%", "Uptime"],
                  ].map(([number, label]) => (
                    <div key={label}>
                      <div className="text-2xl font-bold text-blue-400">
                        {number}
                      </div>
                      <div className="text-gray-400">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="relative max-w-sm mx-auto lg:max-w-md"
                data-aos="fade-left"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                <img
                  src="/assets/dashboard_ss.png"
                  alt="Nexus PayLink Dashboard"
                  className="relative w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 max-w-[80%] mx-auto"
                />
              </div>
            </div>
          </section>

          <section
            ref={stepsRef}
            className="mb-32 min-h-[34vh]"
            data-aos="fade-up"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-center mb-16 text-blue-200">
              Steps
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  data-aos="fade-up"
                >
                  <div className="bg-blue-600 rounded-full p-4 inline-block mb-6">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={step.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section ref={featuresRef} className="py-24">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Why Choose Nexus PayLink?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-blue-600/20 p-4 rounded-full w-fit mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            ref={businessRef}
            className="mb-32 min-h-[34vh]"
            data-aos="fade-up"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-center mb-16 text-blue-200">
              For Businesses
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {businessSteps.map((step, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  data-aos="fade-up"
                >
                  <div className="bg-blue-600 rounded-full p-4 inline-block mb-6">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={step.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <a
                href="/docs"
                className="inline-block py-3 px-8 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-xl hover:shadow-blue-500/30"
              >
                View Integration Guide
              </a>
            </div>
          </section>

          <section ref={faqRef} className="py-24">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="bg-[#0D0D0D] py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3
                  onClick={() => handleScroll(headerRef)}
                  className="text-xl font-bold text-blue-400 mb-4 cursor-pointer hover:text-blue-300 transition-colors"
                >
                  Nexus PayLink
                </h3>
                <p className="text-gray-400">The future of digital payments.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      onClick={() => handleScroll(featuresRef)}
                      className="hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      Features
                    </a>
                  </li>
                  {/* <li>
                    <a 
                      onClick={() => handleScroll(stepsRef)}
                      className="hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      Security
                    </a>
                  </li> */}
                  <li>
                    <a
                      onClick={() => handleScroll(businessRef)}
                      className="hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      Business
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      onClick={() => handleScroll(headerRef)}
                      className="hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Help</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      onClick={() => handleScroll(faqRef)}
                      className="hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      FAQs
                    </a>
                  </li>
                  {/* <li>
                    <a 
                      onClick={() => handleScroll(featuresRef)}
                      className="hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      Support
                    </a>
                  </li> */}
                  {/* <li>
                    <a 
                      href="/privacy"
                      className="hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      Privacy
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>
                © {new Date().getFullYear()} Nexus PayLink. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
