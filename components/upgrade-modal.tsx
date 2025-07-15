import React, { useState, useEffect } from "react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  credits: string;
  features: PlanFeature[];
  popular?: boolean;
  currentPlan?: boolean;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  // USD to TZS conversion rate (approximate)
  const USD_TO_TZS = 2500;

  const plans: Plan[] = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for casual users",
      monthlyPrice: 2 * USD_TO_TZS,
      yearlyPrice: 2 * 12 * 0.83 * USD_TO_TZS, // 17% discount
      credits: "100 searches",
      features: [
        { text: "100 scripture searches per month", included: true },
        { text: "Basic search functionality", included: true },
        { text: "Search history", included: true },
        { text: "Email support", included: true },
        { text: "Advanced filters", included: false },
        { text: "Priority support", included: false },
        { text: "API access", included: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      description: "Great for regular users",
      monthlyPrice: 6 * USD_TO_TZS,
      yearlyPrice: 6 * 12 * 0.83 * USD_TO_TZS, // 17% discount
      credits: "500 searches",
      popular: true,
      features: [
        { text: "500 scripture searches per month", included: true },
        { text: "Advanced search functionality", included: true },
        { text: "Search history & bookmarks", included: true },
        { text: "Priority email support", included: true },
        { text: "Advanced filters & sorting", included: true },
        { text: "Export search results", included: true },
        { text: "API access", included: false },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      description: "Best for power users",
      monthlyPrice: 14 * USD_TO_TZS,
      yearlyPrice: 14 * 12 * 0.83 * USD_TO_TZS, // 17% discount
      credits: "Unlimited searches",
      features: [
        { text: "Unlimited scripture searches", included: true },
        { text: "Advanced search functionality", included: true },
        { text: "Search history & bookmarks", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Advanced filters & sorting", included: true },
        { text: "Export search results", included: true },
        { text: "Full API access", included: true },
        { text: "Custom integrations", included: true },
      ],
    },
  ];

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-TZ", {
      style: "currency",
      currency: "TZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getYearlySavings = (plan: Plan) => {
    const yearlySavings = plan.monthlyPrice * 12 - plan.yearlyPrice;
    return formatPrice(yearlySavings);
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // TODO: Implement plan selection logic
    console.log(`Selected plan: ${planId}, billing: ${billingCycle}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full h-screen mx-auto overflow-y-auto">
        <div className="bg-white dark:bg-azure-900 h-full">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-azure-900 border-b border-azure-200 dark:border-azure-700 px-6 py-4 rounded-t-lg">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col items-center space-x-4 w-full">
                <h2 className="text-2xl font-bold text-azure-900 dark:text-azure-100">
                  Upgrade Your Plan
                </h2>
                <p className="text-azure-600 dark:text-azure-400 mt-1">
                  Choose the perfect plan for your scripture search needs
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-azure-100 absolute right-8 dark:hover:bg-azure-800 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6 text-azure-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="pt-40 flex flex-col align-middle my-auto">
            {/* Billing Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-azure-100 dark:bg-azure-800 rounded-lg p-1 flex">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingCycle === "monthly"
                      ? "bg-white dark:bg-azure-700 text-azure-900 dark:text-azure-100 shadow-sm"
                      : "text-azure-600 dark:text-azure-400 hover:text-azure-800 dark:hover:text-azure-200"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    billingCycle === "yearly"
                      ? "bg-white dark:bg-azure-700 text-azure-900 dark:text-azure-100 shadow-sm"
                      : "text-azure-600 dark:text-azure-400 hover:text-azure-800 dark:hover:text-azure-200"
                  }`}
                >
                  Yearly
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    17% OFF
                  </span>
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-lg ${
                    plan.popular
                      ? "border-[var(--brand-primary)] bg-gradient-to-b from-azure-50 to-white dark:from-azure-900 dark:to-azure-900"
                      : "border-azure-200 dark:border-azure-700 bg-white dark:bg-azure-900"
                  } ${
                    selectedPlan === plan.id
                      ? "ring-2 ring-[var(--brand-primary)] ring-opacity-50"
                      : ""
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[var(--brand-primary)] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-azure-900 dark:text-azure-100 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-azure-600 dark:text-azure-400 text-sm mb-4">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-azure-900 dark:text-azure-100">
                        {formatPrice(
                          billingCycle === "monthly"
                            ? plan.monthlyPrice
                            : plan.yearlyPrice
                        )}
                      </span>
                      <span className="text-azure-600 dark:text-azure-400 text-sm ml-1">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </div>

                    {/* Yearly savings */}
                    {billingCycle === "yearly" && (
                      <div className="text-green-600 dark:text-green-400 text-sm">
                        Save {getYearlySavings(plan)} per year
                      </div>
                    )}

                    {/* Credits */}
                    <div className="text-azure-600 dark:text-azure-400 text-sm font-medium mt-2">
                      {plan.credits}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className={`w-5 h-5 mr-3 mt-0.5 ${
                              feature.included
                                ? "text-green-500"
                                : "text-azure-300 dark:text-azure-600"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={
                                feature.included
                                  ? "M5 13l4 4L19 7"
                                  : "M6 18L18 6M6 6l12 12"
                              }
                            />
                          </svg>
                          <span
                            className={`text-sm ${
                              feature.included
                                ? "text-azure-700 dark:text-azure-300"
                                : "text-azure-400 dark:text-azure-500 line-through"
                            }`}
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-dark)]"
                        : "bg-azure-100 dark:bg-azure-800 text-azure-900 dark:text-azure-100 hover:bg-azure-200 dark:hover:bg-azure-700"
                    }`}
                  >
                    {plan.currentPlan ? "Current Plan" : "Choose Plan"}
                  </button>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-azure-600 dark:text-azure-400 text-sm">
                All plans include secure payments, 24/7 uptime, and data backup.
                <br />
                Cancel anytime. No hidden fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
