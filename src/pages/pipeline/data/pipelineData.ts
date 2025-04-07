
import { LeadSource, LeadStatus, PipelineStage } from './pipelineTypes';

export const pipelineStages: PipelineStage[] = [
  {
    id: 'lead-identified',
    name: 'Lead Identified',
    description: 'Initial contact information captured'
  },
  {
    id: 'initial-contact',
    name: 'Initial Contact',
    description: 'First touchpoint established'
  },
  {
    id: 'discovery',
    name: 'Discovery',
    description: 'Understanding needs and qualification'
  },
  {
    id: 'proposal-sent',
    name: 'Proposal Sent',
    description: 'Formal offer presented'
  },
  {
    id: 'negotiation',
    name: 'Negotiation',
    description: 'Terms and details discussion'
  },
  {
    id: 'pending-agreement',
    name: 'Pending Agreement',
    description: 'Awaiting final signature'
  },
  {
    id: 'won',
    name: 'Won',
    description: 'Deal closed successfully'
  },
  {
    id: 'lost',
    name: 'Lost',
    description: 'Opportunity not converted'
  }
];

export const initialLeadsData = [
  {
    id: 'lead-1',
    company: 'Acme Logistics',
    contact: 'Jane Smith',
    title: 'Operations Director',
    email: 'jane.smith@acmelogistics.com',
    phone: '020 7946 0981',
    value: 45000,
    probability: 75,
    source: LeadSource.WEBSITE,
    stage: 'discovery',
    created: '2025-03-15T14:30:00',
    lastActivity: '2025-03-28T11:15:00',
    status: LeadStatus.ACTIVE,
    notes: 'Looking for temperature-controlled distribution across UK.',
    tags: ['high-value', 'urgent'],
    assignedTo: 'user-1'
  },
  {
    id: 'lead-2',
    company: 'Global Freight Ltd',
    contact: 'Robert Johnson',
    title: 'Logistics Manager',
    email: 'robert.j@globalfreight.co.uk',
    phone: '0161 359 7721',
    value: 28000,
    probability: 50,
    source: LeadSource.REFERRAL,
    stage: 'initial-contact',
    created: '2025-03-18T09:45:00',
    lastActivity: '2025-03-25T16:30:00',
    status: LeadStatus.ACTIVE,
    notes: 'Interested in European lanes. Currently with competitor but contract ending in 2 months.',
    tags: ['competitive'],
    assignedTo: 'user-2'
  },
  {
    id: 'lead-3',
    company: 'Quick Deliveries',
    contact: 'Sarah Williams',
    title: 'CEO',
    email: 's.williams@quickdel.co.uk',
    phone: '0117 329 4488',
    value: 65000,
    probability: 90,
    source: LeadSource.LINKEDIN,
    stage: 'proposal-sent',
    created: '2025-03-10T11:00:00',
    lastActivity: '2025-04-02T09:30:00',
    status: LeadStatus.ACTIVE,
    notes: 'Small but growing company. Looking to outsource all transport needs.',
    tags: ['growth-potential'],
    assignedTo: 'user-1'
  },
  {
    id: 'lead-4',
    company: 'Retail Solutions',
    contact: 'Mark Davis',
    title: 'Supply Chain Director',
    email: 'mdavis@retails.com',
    phone: '020 3861 5522',
    value: 120000,
    probability: 60,
    source: LeadSource.EVENT,
    stage: 'negotiation',
    created: '2025-02-28T16:15:00',
    lastActivity: '2025-04-01T14:45:00',
    status: LeadStatus.ACTIVE,
    notes: 'Large retail chain looking for nationwide distribution partner.',
    tags: ['high-value', 'strategic'],
    assignedTo: 'user-3'
  },
  {
    id: 'lead-5',
    company: 'Tech Innovations',
    contact: 'Alex Turner',
    title: 'Procurement Manager',
    email: 'alex@techinnovations.io',
    phone: '0131 557 3300',
    value: 35000,
    probability: 40,
    source: LeadSource.COLD_CALL,
    stage: 'lead-identified',
    created: '2025-03-25T10:30:00',
    lastActivity: '2025-03-30T11:00:00',
    status: LeadStatus.ACTIVE,
    notes: 'Ships high-value electronics requiring secure transport.',
    tags: ['technical', 'sensitive'],
    assignedTo: 'user-2'
  },
  {
    id: 'lead-6',
    company: 'Food Distributors UK',
    contact: 'Helen Barnes',
    title: 'Head of Logistics',
    email: 'hbarnes@fooddist.co.uk',
    phone: '0121 716 8844',
    value: 75000,
    probability: 85,
    source: LeadSource.REFERRAL,
    stage: 'pending-agreement',
    created: '2025-03-05T09:00:00',
    lastActivity: '2025-04-03T15:30:00',
    status: LeadStatus.ACTIVE,
    notes: 'Requires temperature-controlled vehicles for nationwide food distribution.',
    tags: ['high-value', 'specialized'],
    assignedTo: 'user-1'
  },
  {
    id: 'lead-7',
    company: 'Construction Supplies Ltd',
    contact: 'David Wilson',
    title: 'Operations Manager',
    email: 'd.wilson@constructsupplies.com',
    phone: '0114 299 7700',
    value: 48000,
    probability: 95,
    source: LeadSource.WEBSITE,
    stage: 'won',
    created: '2025-02-20T14:00:00',
    lastActivity: '2025-04-05T10:15:00',
    status: LeadStatus.ACTIVE,
    notes: 'Heavy loads requiring specialized vehicles. Contract signed for 12 months.',
    tags: ['heavy-transport'],
    assignedTo: 'user-3'
  },
  {
    id: 'lead-8',
    company: 'Fashion Retailers Group',
    contact: 'Emma Clark',
    title: 'Logistics Coordinator',
    email: 'eclark@fashionretail.co.uk',
    phone: '020 7112 3366',
    value: 32000,
    probability: 0,
    source: LeadSource.EMAIL_CAMPAIGN,
    stage: 'lost',
    created: '2025-03-12T11:30:00',
    lastActivity: '2025-03-29T16:00:00',
    status: LeadStatus.INACTIVE,
    notes: 'Lost to competitor due to pricing. Potential to revisit in 6 months when current contract ends.',
    tags: ['price-sensitive'],
    assignedTo: 'user-2'
  }
];
