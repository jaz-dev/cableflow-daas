import { Check, Crown } from 'lucide-react';

const plans = [
  {
    name: 'ENTRY',
    description: 'For occasional cable drawing projects.',
    features: [
      '1 Project',
      '2 Iterations',
      '2 Expert Calls',
      '2 Months Plan',
    ],
    buttonText: 'Book a call with our team',
    highlighted: false,
  },
  {
    name: 'PRO',
    description: 'For frequent cable drawing projects.',
    features: [
      '1 Project',
      'Unlimited iterations',
      '5 Expert Calls',
      '12 Months Plan',
    ],
    buttonText: 'Book a call with our team',
    highlighted: true,
  },
  {
    name: 'ULTIMATE',
    description: 'For regular cable drawing project needs.',
    features: [
      '3 Projects',
      'Unlimited iterations',
      '12 Expert Calls',
      '12 Months Plan',
    ],
    buttonText: 'Book a call with our team',
    highlighted: false,
  },
];

export const Plan = () => {
  // In a real app, this would come from a user context or API
  const currentPlan = 'PRO';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Simple Plans, Flexible Pricing
          </h1>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
          <Crown className="h-5 w-5 text-blue-600" />
          <span className="text-blue-600 font-medium">Current Plan: {currentPlan}</span>
        </div>
        <p className="text-lg text-gray-600 mt-4">
          Our flexible options adapt to your cable drawing project needs, supporting you from initial design concepts all the way to completion.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrentPlan = plan.name === currentPlan;
          return (
            <div
              key={plan.name}
              className={`bg-white rounded-xl shadow-sm p-8 border ${
                plan.highlighted ? 'border-blue-500' : 'border-gray-200'
              } ${isCurrentPlan ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                {isCurrentPlan && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Current Plan
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  isCurrentPlan
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
                }`}
                disabled={isCurrentPlan}
              >
                {isCurrentPlan ? 'Current Plan' : plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};