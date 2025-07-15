import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

// local imports
import Header from "@/components/header";
import Footer from "@/components/footer";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const faqs: FAQItem[] = [
    {
      id: "1",
      question: "How do I start searching for biblical scriptures?",
      answer:
        "To begin searching, simply sign in with your Google account and navigate to the search page. Enter your query describing a biblical story, situation, or topic, and our AI will find relevant scripture passages for you.",
      category: "getting-started",
    },
    {
      id: "2",
      question: "What types of search queries work best?",
      answer:
        "Our AI works best with descriptive queries about biblical situations, stories, or themes. For example: 'Jesus walking on water', 'parables about forgiveness', 'David and Goliath', or 'verses about love and compassion'.",
      category: "search",
    },
    {
      id: "3",
      question: "How many searches can I perform per month?",
      answer:
        "This depends on your plan: Basic users get 100 searches per month, Pro users get 500 searches, and Premium users have unlimited searches. You can upgrade your plan anytime from your account settings.",
      category: "account",
    },
    {
      id: "4",
      question: "Can I save my search results?",
      answer:
        "Yes! All users can access their search history. Pro and Premium users can also bookmark their favorite results and export them in various formats for personal study or sharing.",
      category: "features",
    },
    {
      id: "5",
      question: "Is my search history private?",
      answer:
        "Absolutely. Your search history is completely private and only accessible to you. We use secure encryption to protect your data and never share your search queries with third parties.",
      category: "account",
    },
    {
      id: "6",
      question: "Which Bible versions are supported?",
      answer:
        "Our AI searches across multiple Bible versions including NIV, ESV, NASB, KJV, and many others. The results will show you the most relevant passages regardless of the version, with clear attribution to the source.",
      category: "search",
    },
    {
      id: "7",
      question: "Why am I not getting relevant results?",
      answer:
        "If your search results aren't relevant, try rephrasing your query with more specific biblical terms or contexts. Also, ensure you're describing the situation or story clearly. For persistent issues, contact our support team.",
      category: "technical",
    },
    {
      id: "8",
      question: "How do I upgrade my plan?",
      answer:
        "Click on your avatar in the top right corner, select 'Upgrade Plan', and choose from our Basic, Pro, or Premium options. You can switch between monthly and yearly billing, with yearly plans offering 17% savings.",
      category: "account",
    },
    {
      id: "9",
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period, and you won't be charged for the next cycle.",
      category: "account",
    },
    {
      id: "10",
      question: "What advanced features are available?",
      answer:
        "Pro and Premium users get access to advanced search filters, result sorting options, bookmark management, export capabilities, and priority support. Premium users also get full API access for custom integrations.",
      category: "features",
    },
    {
      id: "11",
      question: "How do I contact support?",
      answer:
        "You can reach our support team through the help menu in your account dropdown. Basic users get email support, Pro users get priority email support, and Premium users get 24/7 priority support.",
      category: "getting-started",
    },
    {
      id: "12",
      question: "Is there an API available?",
      answer:
        "Yes! Premium users get full API access to integrate our scripture search functionality into their own applications. Documentation and examples are available in your account dashboard.",
      category: "features",
    },
    {
      id: "13",
      question: "What happens if I exceed my search limit?",
      answer:
        "If you reach your monthly search limit, you'll be prompted to upgrade your plan or wait until the next billing cycle. You can monitor your usage in your account dashboard.",
      category: "technical",
    },
    {
      id: "14",
      question: "Can I search in different languages?",
      answer:
        "Currently, our AI primarily supports English queries, but we're working on expanding to other languages. The scripture results include various translations and versions in English.",
      category: "search",
    },
    {
      id: "15",
      question: "How accurate are the search results?",
      answer:
        "Our AI is trained on comprehensive biblical texts and provides highly accurate results. However, we recommend cross-referencing important passages and consulting with pastoral guidance for theological interpretations.",
      category: "search",
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen surface">
      <Head>
        <title>Help Center - Find Bible Scripture | FAQ & Support</title>
        <meta
          name="description"
          content="Get help with Find Bible Scripture. Browse our comprehensive FAQ, search tips, and support resources."
        />
      </Head>

      <Header />

      <main className="container flex-grow max-w-6xl px-4 py-8 mx-auto">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 heading-1">Help Center</h1>
          <p className="body-1 text-azure-600 dark:text-azure-300 max-w-2xl mx-auto">
            Find answers to frequently asked questions and get the most out of
            your scripture search experience
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-azure-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help topics..."
              className="w-full pl-10 pr-4 py-3 input"
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-azure-900 border border-azure-200 dark:border-azure-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left hover:bg-azure-50 dark:hover:bg-azure-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="heading-5 text-azure-900 dark:text-azure-100 pr-4">
                        {faq.question}
                      </h3>
                      <svg
                        className={`w-5 h-5 text-azure-500 transform transition-transform ${
                          openFAQ === faq.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
                  {openFAQ === faq.id && (
                    <div className="px-6 pb-4 animate-fadeIn">
                      <div className="pt-2 border-t border-azure-200 dark:border-azure-700">
                        <p className="body-2 text-azure-700 dark:text-azure-200 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-azure-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.239 0-4.3-.726-5.967-1.963"
                />
              </svg>
              <h3 className="heading-4 text-azure-900 dark:text-azure-100 mb-2">
                No results found
              </h3>
              <p className="body-2 text-azure-600 dark:text-azure-400 mb-6">
                Try adjusting your search terms or browse different categories
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="button button-primary"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 p-8 bg-white dark:bg-azure-900 border border-azure-200 dark:border-azure-700 rounded-lg text-center">
          <h3 className="heading-3 text-azure-900 dark:text-azure-100 mb-4">
            Still need help?
          </h3>
          <p className="body-1 text-azure-600 dark:text-azure-400 mb-6">
            Can't find the answer you're looking for? Our support team is here
            to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contribution" className="button button-secondary">
              View Contributing Guide
            </Link>
            <button
              onClick={() => {
                // TODO: Implement contact support functionality
                console.log("Contact support clicked");
              }}
              className="button button-primary"
            >
              Contact Support
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
