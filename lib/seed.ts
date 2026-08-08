export const seedServices = [
  {
    id: 'business-outsourcing',
    name: 'Business Outsourcing',
    slug: 'business-outsourcing',
    shortDescription: 'Streamline operations with our expert outsourcing solutions.',
    description: 'Optimize your operational efficiency by delegating critical but non-core functions to our team of experts. We provide end-to-end outsourcing solutions tailored to your corporate needs.',
    iconName: 'Briefcase',
    benefits: [
      'Cost reduction and operational efficiency',
      'Access to specialized global talent',
      'Focus on core business objectives',
      'Scalable operations on demand'
    ],
    functions: [
      { title: 'Customer Support', desc: '24/7 omnichannel customer service and helpdesk.' },
      { title: 'Back-office Processing', desc: 'Data entry, document management, and record keeping.' },
      { title: 'Financial Operations', desc: 'Accounting, payroll, and compliance processing.' }
    ],
    workflow: [
      'Requirement Assessment',
      'Strategy & Resource Planning',
      'Transition & Execution',
      'Monitoring & Optimization'
    ],
    useCases: ['Scaling startups needing customer support', 'Enterprises seeking to reduce overhead costs'],
    industries: ['Fintech', 'Healthcare', 'Retail', 'Technology'],
    faqs: [
      { question: 'How do you ensure data security?', answer: 'We follow ISO 27001 standards and implement strict access controls.' },
      { question: 'Can we scale our team up or down?', answer: 'Yes, our model allows for flexible resource allocation based on your current needs.' }
    ]
  },
  {
    id: 'btl-services',
    name: 'BTL Services',
    slug: 'btl-services',
    shortDescription: 'Engaging below-the-line marketing strategies for direct impact.',
    description: 'Create memorable, direct interactions with your target audience through experiential marketing, activations, and on-ground campaigns designed to drive immediate conversions.',
    iconName: 'Network',
    benefits: [
      'Direct audience engagement',
      'High conversion rates',
      'Measurable localized impact',
      'Enhanced brand recall'
    ],
    functions: [
      { title: 'Brand Activations', desc: 'On-ground events and experiential campaigns.' },
      { title: 'Direct Mail Marketing', desc: 'Targeted physical promotional materials.' },
      { title: 'In-store Promotions', desc: 'Retail sampling and point-of-sale displays.' }
    ],
    workflow: [
      'Market & Audience Analysis',
      'Campaign Conceptualization',
      'On-ground Execution',
      'Impact Measurement'
    ],
    useCases: ['Product launches requiring direct consumer interaction', 'Localized promotional campaigns'],
    industries: ['FMCG', 'Consumer Electronics', 'Automotive', 'Real Estate'],
    faqs: [
      { question: 'What regions do you cover?', answer: 'We have a nationwide network for comprehensive campaign execution.' },
      { question: 'How do you measure BTL ROI?', answer: 'We track direct interactions, coupon redemptions, and immediate sales spikes.' }
    ]
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    shortDescription: 'Data-driven campaigns to elevate your online presence.',
    description: 'Dominate the digital landscape with comprehensive strategies encompassing SEO, performance marketing, social media, and content creation tailored for your target audience.',
    iconName: 'Globe2',
    benefits: [
      'Increased online visibility',
      'Targeted lead generation',
      'Data-driven campaign optimization',
      'Higher return on ad spend (ROAS)'
    ],
    functions: [
      { title: 'Search Engine Optimization', desc: 'Organic ranking improvements and local SEO.' },
      { title: 'Performance Marketing', desc: 'PPC, display ads, and retargeting campaigns.' },
      { title: 'Social Media Management', desc: 'Brand building across major social platforms.' }
    ],
    workflow: [
      'Digital Audit & Goal Setting',
      'Strategy Formulation',
      'Campaign Launch',
      'Analytics & Iteration'
    ],
    useCases: ['Brands looking to increase e-commerce sales', 'B2B companies needing qualified digital leads'],
    industries: ['E-commerce', 'SaaS', 'Education', 'Finance'],
    faqs: [
      { question: 'Which platforms do you focus on?', answer: 'We tailor our platform selection (Google, Meta, LinkedIn) based on your specific audience.' },
      { question: 'When will we see results?', answer: 'Performance campaigns show immediate results, while SEO typically takes 3-6 months.' }
    ]
  },
  {
    id: 'brand-promotion',
    name: 'Brand Promotion',
    slug: 'brand-promotion',
    shortDescription: 'Build lasting brand equity with targeted promotional activities.',
    description: 'Elevate your brand perception and equity through strategic PR, influencer partnerships, and comprehensive promotional activities that resonate with your core audience.',
    iconName: 'Megaphone',
    benefits: [
      'Enhanced brand equity and trust',
      'Expanded market reach',
      'Positive public relations',
      'Influential market positioning'
    ],
    functions: [
      { title: 'Public Relations', desc: 'Media outreach and reputation management.' },
      { title: 'Influencer Marketing', desc: 'Strategic partnerships with key opinion leaders.' },
      { title: 'Brand Identity', desc: 'Consistent messaging and visual brand alignment.' }
    ],
    workflow: [
      'Brand Audit',
      'Messaging Strategy',
      'Promotion Execution',
      'Sentiment Analysis'
    ],
    useCases: ['Companies undergoing rebranding', 'New market entry campaigns'],
    industries: ['Fashion', 'Entertainment', 'Hospitality', 'Tech'],
    faqs: [
      { question: 'How do you choose influencers?', answer: 'We analyze audience demographics, engagement rates, and brand alignment.' },
      { question: 'Do you handle crisis communication?', answer: 'Yes, our PR team is equipped to manage and mitigate brand crises.' }
    ]
  },
  {
    id: 'big-data-service',
    name: 'Big Data Service',
    slug: 'big-data-service',
    shortDescription: 'Actionable insights from complex data ecosystems.',
    description: 'Unlock the power of your data with our advanced analytics, data engineering, and business intelligence solutions designed to drive strategic corporate decisions.',
    iconName: 'Database',
    benefits: [
      'Data-driven decision making',
      'Predictive market insights',
      'Optimized operational efficiency',
      'Enhanced customer personalization'
    ],
    functions: [
      { title: 'Data Engineering', desc: 'Building robust data pipelines and warehouses.' },
      { title: 'Advanced Analytics', desc: 'Machine learning and predictive modeling.' },
      { title: 'Business Intelligence', desc: 'Interactive dashboards and reporting.' }
    ],
    workflow: [
      'Data Infrastructure Assessment',
      'Pipeline Architecture',
      'Analytics Implementation',
      'Continuous Monitoring'
    ],
    useCases: ['Financial institutions needing fraud detection', 'Retailers requiring inventory optimization'],
    industries: ['Finance', 'Logistics', 'Healthcare', 'E-commerce'],
    faqs: [
      { question: 'What tech stack do you use?', answer: 'We utilize modern stacks including Snowflake, AWS, Python, and Tableau/PowerBI.' },
      { question: 'Is our data secure?', answer: 'Absolutely, we employ enterprise-grade encryption and compliance measures.' }
    ]
  },
  {
    id: 'merchant-user-deployment',
    name: 'Merchant / User Deployment',
    slug: 'merchant-user-deployment',
    shortDescription: 'Efficient onboarding and deployment at scale.',
    description: 'Accelerate your network growth with our specialized merchant acquisition, user onboarding, and scalable deployment strategies for fintech and tech platforms.',
    iconName: 'Users',
    benefits: [
      'Rapid network expansion',
      'Seamless onboarding experience',
      'High retention rates',
      'Scalable operational support'
    ],
    functions: [
      { title: 'Merchant Acquisition', desc: 'Targeted outreach and sign-up campaigns.' },
      { title: 'Onboarding Support', desc: 'KYC, setup, and training for new users.' },
      { title: 'Account Management', desc: 'Ongoing support and relationship building.' }
    ],
    workflow: [
      'Target Profiling',
      'Acquisition Campaign',
      'Onboarding & Setup',
      'Retention Management'
    ],
    useCases: ['Payment gateways expanding merchant base', 'App startups driving user adoption'],
    industries: ['Fintech', 'SaaS', 'Marketplaces', 'Gig Economy'],
    faqs: [
      { question: 'Do you handle KYC processes?', answer: 'Yes, we manage end-to-end KYC and verification protocols.' },
      { question: 'What is your capacity?', answer: 'We can scale our teams to handle thousands of deployments per month.' }
    ]
  },
  {
    id: 'corporate-solutions',
    name: 'Corporate Solutions',
    slug: 'corporate-solutions',
    shortDescription: 'Tailored fintech strategies for enterprise success.',
    description: 'Bespoke fintech consulting, enterprise software integration, and strategic corporate solutions designed to modernize your financial operations.',
    iconName: 'Building2',
    benefits: [
      'Modernized financial infrastructure',
      'Improved compliance and risk management',
      'Customized enterprise software',
      'Strategic technological alignment'
    ],
    functions: [
      { title: 'Fintech Consulting', desc: 'Strategic advisory for financial digital transformation.' },
      { title: 'System Integration', desc: 'Connecting legacy systems with modern APIs.' },
      { title: 'Custom Software', desc: 'Tailored enterprise financial applications.' }
    ],
    workflow: [
      'Enterprise Needs Analysis',
      'Solution Architecture',
      'Development & Integration',
      'Deployment & Training'
    ],
    useCases: ['Traditional banks undergoing digital transformation', 'Large corporations optimizing treasury operations'],
    industries: ['Banking', 'Enterprise Corporate', 'Insurance', 'Manufacturing'],
    faqs: [
      { question: 'Do you integrate with legacy systems?', answer: 'Yes, we specialize in bridging modern solutions with existing legacy infrastructure.' },
      { question: 'Are your solutions compliant with regulations?', answer: 'We ensure all solutions adhere to local and international financial regulations.' }
    ]
  }
];

export const seedLeads = [
  {
    id: 'lead-1',
    leadReference: 'MRQ-100234',
    fullName: 'Rahul Sharma',
    companyName: 'TechGrow Solutions',
    mobile: '9876543210',
    email: 'rahul.s@techgrow.in',
    service: 'Digital Marketing',
    city: 'Mumbai',
    businessType: 'B2B Software',
    estimatedRequirement: 'Monthly SEO and Paid Ads',
    preferredContact: 'Phone',
    message: 'Looking for a complete digital overhaul.',
    source: 'Website',
    status: 'NEW',
    assignedTo: 'emp-2',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    nextFollowUp: new Date(Date.now() + 86400000 * 1).toISOString(),
    notes: []
  },
  {
    id: 'lead-2',
    leadReference: 'MRQ-100235',
    fullName: 'Priya Desai',
    companyName: 'FinVest Corp',
    mobile: '9988776655',
    email: 'priya.d@finvest.com',
    service: 'Corporate Solutions',
    city: 'Bangalore',
    businessType: 'Financial Services',
    estimatedRequirement: 'Legacy System Integration',
    preferredContact: 'Email',
    message: 'Need consultation on API integrations.',
    source: 'LinkedIn',
    status: 'CONTACTED',
    assignedTo: 'emp-2',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    nextFollowUp: new Date(Date.now() + 86400000 * 2).toISOString(),
    notes: [
      {
        id: 'note-1',
        content: 'Initial call completed. Requested a technical proposal.',
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
        createdBy: 'Sales Manager'
      }
    ]
  }
];

export const seedEmployees = [
  { id: 'emp-1', name: 'Admin User', role: 'SUPER ADMIN' },
  { id: 'emp-2', name: 'Sarah Jenkins', role: 'SALES EXECUTIVE' },
  { id: 'emp-3', name: 'Mike Ross', role: 'SALES MANAGER' }
];
