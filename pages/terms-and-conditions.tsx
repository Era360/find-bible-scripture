import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

// local imports
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing and using Find Bible Scripture ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
    },
    {
      id: "description",
      title: "2. Service Description",
      content: `Find Bible Scripture is an AI-powered scripture search platform that helps users find relevant biblical passages based on their queries. The service includes:
      
      • AI-powered scripture search functionality
      • Search history and bookmarking features
      • Multiple subscription tiers with varying search limits
      • Integration with various Bible translations
      • Export capabilities for search results
      • API access for premium users`,
    },
    {
      id: "registration",
      title: "3. User Registration and Account",
      content: `To access certain features of the Service, you must register for an account using Google Authentication. By registering, you agree to:
      
      • Provide accurate, current, and complete information
      • Maintain the security of your account credentials
      • Accept responsibility for all activities under your account
      • Notify us immediately of any unauthorized use of your account
      
      We reserve the right to refuse service, terminate accounts, or cancel subscriptions at our sole discretion.`,
    },
    {
      id: "subscription",
      title: "4. Subscription Plans and Billing",
      content: `Find Bible Scripture offers multiple subscription tiers:
      
      • Basic Plan: TZS 5,000/month - 100 searches per month
      • Pro Plan: TZS 15,000/month - 500 searches per month
      • Premium Plan: TZS 35,000/month - Unlimited searches
      
      Billing terms:
      • Monthly and yearly billing cycles available
      • Yearly plans offer 17% discount
      • Automatic renewal unless cancelled
      • Refunds processed according to our refund policy
      • Price changes with 30-day notice`,
    },
    {
      id: "usage",
      title: "5. Acceptable Use Policy",
      content: `You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:
      
      • Use the Service for any illegal or unauthorized purpose
      • Violate any laws in your jurisdiction
      • Transmit any harmful or malicious code
      • Attempt to gain unauthorized access to the Service
      • Use the Service to harass, abuse, or harm others
      • Distribute spam or unsolicited communications
      • Reverse engineer or attempt to extract source code
      • Violate the intellectual property rights of others`,
    },
    {
      id: "content",
      title: "6. Content and Intellectual Property",
      content: `Biblical Content:
      • Scripture passages are sourced from public domain and licensed translations
      • We respect the intellectual property rights of Bible publishers
      • Users are responsible for respecting copyright when sharing content
      
      Service Content:
      • All software, design, text, and other materials are owned by Find Bible Scripture
      • Users retain ownership of their search queries and personal data
      • Limited license granted for personal, non-commercial use
      • No reproduction or redistribution without written permission`,
    },
    {
      id: "privacy",
      title: "7. Privacy and Data Protection",
      content: `We take your privacy seriously and are committed to protecting your personal information:
      
      • Search queries and history are private and secure
      • We use encryption to protect your data
      • No sharing of personal information with third parties
      • Users can request data deletion at any time
      • Compliance with applicable data protection laws
      • Regular security audits and updates
      
      For detailed information, please review our Privacy Policy.`,
    },
    {
      id: "limitations",
      title: "8. Service Limitations and Availability",
      content: `Service Availability:
      • We strive for 99.9% uptime but cannot guarantee uninterrupted service
      • Scheduled maintenance may cause temporary unavailability
      • Service may be limited or suspended for technical reasons
      
      Usage Limits:
      • Monthly search limits apply based on subscription tier
      • API rate limits for premium users
      • Fair usage policies to prevent abuse
      • Temporary restrictions for unusual activity patterns`,
    },
    {
      id: "disclaimer",
      title: "9. Disclaimer of Warranties",
      content: `The Service is provided "as is" without warranty of any kind. We disclaim all warranties, including:
      
      • Merchantability and fitness for a particular purpose
      • Non-infringement of third-party rights
      • Accuracy or completeness of search results
      • Uninterrupted or error-free operation
      
      Users should verify important biblical references through multiple sources and consult with qualified religious leaders for theological interpretations.`,
    },
    {
      id: "limitation-liability",
      title: "10. Limitation of Liability",
      content: `To the maximum extent permitted by law, Find Bible Scripture shall not be liable for:
      
      • Any indirect, incidental, special, or consequential damages
      • Loss of profits, data, or business opportunities
      • Damages resulting from use or inability to use the Service
      • Third-party content or actions
      
      Our total liability shall not exceed the amount paid by you for the Service in the preceding 12 months.`,
    },
    {
      id: "termination",
      title: "11. Termination",
      content: `Either party may terminate this agreement at any time:
      
      User Termination:
      • Cancel subscription through account settings
      • Access continues until end of billing period
      • Data deletion upon request
      
      Our Termination Rights:
      • Immediate termination for violation of terms
      • Suspension for non-payment
      • Discontinuation of service with reasonable notice
      
      Effects of Termination:
      • Loss of access to premium features
      • Data retention according to privacy policy
      • Refunds according to refund policy`,
    },
    {
      id: "governing-law",
      title: "12. Governing Law and Jurisdiction",
      content: `These Terms shall be governed by and construed in accordance with the laws of Tanzania. Any disputes arising from or relating to these Terms or the Service shall be resolved through:
      
      • Good faith negotiations between parties
      • Mediation if direct negotiation fails
      • Arbitration in Dar es Salaam, Tanzania
      • Tanzanian courts as final jurisdiction
      
      Users agree to submit to the personal jurisdiction of Tanzanian courts for any legal proceedings.`,
    },
    {
      id: "changes",
      title: "13. Changes to Terms",
      content: `We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. We will notify users of significant changes through:
      
      • Email notification to registered users
      • Prominent notice on the Service
      • In-app notifications
      
      Continued use of the Service after changes constitutes acceptance of the new Terms. If you disagree with changes, you may terminate your account.`,
    },
    {
      id: "contact",
      title: "14. Contact Information",
      content: `For questions about these Terms or the Service, please contact us:
      
      • Email: support@findbiblescripture.com
      • Help Center: Available through your account dashboard
      • Physical Address: Dar es Salaam, Tanzania
      
      We will respond to inquiries within 48 hours during business days.`,
    },
  ];

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen surface">
      <Head>
        <title>Terms and Conditions - Find Bible Scripture</title>
        <meta
          name="description"
          content="Terms and Conditions for Find Bible Scripture. Read our legal terms, usage policies, and user agreements."
        />
      </Head>

      <Header />

      <main className="container flex-grow max-w-5xl px-4 py-8 mx-auto">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 heading-1">Terms and Conditions</h1>
          <p className="body-1 text-azure-600 dark:text-azure-300 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using Find
            Bible Scripture
          </p>
          <div className="mt-6 p-4 bg-azure-50 dark:bg-azure-900 rounded-lg border border-azure-200 dark:border-azure-700">
            <p className="text-sm text-azure-700 dark:text-azure-300">
              <strong>Last Updated:</strong> January 15, 2025
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 p-6 bg-white dark:bg-azure-900 border border-azure-200 dark:border-azure-700 rounded-lg">
          <h2 className="heading-3 text-azure-900 dark:text-azure-100 mb-4">
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className="text-left p-2 rounded text-azure-600 dark:text-azure-400 hover:text-azure-800 dark:hover:text-azure-200 hover:bg-azure-50 dark:hover:bg-azure-800 transition-colors"
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Terms Content */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white dark:bg-azure-900 border border-azure-200 dark:border-azure-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 text-left hover:bg-azure-50 dark:hover:bg-azure-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="heading-4 text-azure-900 dark:text-azure-100">
                    {section.title}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-azure-500 transform transition-transform ${
                      activeSection === section.id ? "rotate-180" : ""
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
              {activeSection === section.id && (
                <div className="px-6 pb-6 animate-fadeIn">
                  <div className="pt-4 border-t border-azure-200 dark:border-azure-700">
                    <div className="body-2 text-azure-700 dark:text-azure-200 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Agreement Statement */}
        <div className="mt-12 p-6 bg-azure-50 dark:bg-azure-900 border border-azure-200 dark:border-azure-700 rounded-lg">
          <h3 className="heading-4 text-azure-900 dark:text-azure-100 mb-4">
            Agreement Acknowledgment
          </h3>
          <p className="body-2 text-azure-700 dark:text-azure-200 mb-4">
            By using Find Bible Scripture, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/privacy-policy" className="button button-secondary">
              Privacy Policy
            </Link>
            <Link href="/help-center" className="button button-primary">
              Help Center
            </Link>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Legal Notice
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                These terms constitute a legal agreement between you and Find
                Bible Scripture. If you have questions about these terms, please
                contact our support team before using the service.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
