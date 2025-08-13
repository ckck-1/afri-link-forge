import { Job } from '@/components/ui/job-card';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Full-Stack Developer for E-commerce Platform',
    description: 'We are looking for an experienced full-stack developer to build a modern e-commerce platform for our African handicrafts business. The project involves creating a responsive web application with payment integration, inventory management, and user authentication.',
    budget: 5000,
    budgetType: 'fixed',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Stripe API'],
    client: {
      name: 'Kwame Asante',
      rating: 4.8,
      reviewCount: 23,
      location: 'Accra, Ghana'
    },
    postedAt: '2 hours ago',
    proposals: 8,
    duration: '2-3 months',
    experienceLevel: 'expert'
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    description: 'Need a talented designer to create beautiful, intuitive UI/UX for our mobile banking app targeting rural communities in East Africa. The design should be culturally sensitive and accessible.',
    budget: 45,
    budgetType: 'hourly',
    skills: ['Figma', 'UI/UX Design', 'Mobile Design', 'Prototyping'],
    client: {
      name: 'Fatima Okonkwo',
      rating: 4.9,
      reviewCount: 45,
      location: 'Lagos, Nigeria'
    },
    postedAt: '5 hours ago',
    proposals: 15,
    duration: '1 month',
    experienceLevel: 'intermediate'
  },
  {
    id: '3',
    title: 'WordPress Website for NGO',
    description: 'Looking for a WordPress developer to create a professional website for our education NGO. The site should include donation functionality, blog, and volunteer registration.',
    budget: 1200,
    budgetType: 'fixed',
    skills: ['WordPress', 'PHP', 'CSS', 'Elementor'],
    client: {
      name: 'Sarah Mwangi',
      rating: 4.6,
      reviewCount: 12,
      location: 'Nairobi, Kenya'
    },
    postedAt: '1 day ago',
    proposals: 22,
    duration: '3-4 weeks',
    experienceLevel: 'entry'
  },
  {
    id: '4',
    title: 'Python Data Analysis for Agricultural Project',
    description: 'Seeking a data scientist to analyze crop yield data and weather patterns for our agricultural tech startup. Experience with machine learning and agricultural data preferred.',
    budget: 75,
    budgetType: 'hourly',
    skills: ['Python', 'Pandas', 'Machine Learning', 'Data Visualization'],
    client: {
      name: 'Ahmed Hassan',
      rating: 4.7,
      reviewCount: 18,
      location: 'Cairo, Egypt'
    },
    postedAt: '2 days ago',
    proposals: 6,
    duration: '2 months',
    experienceLevel: 'expert'
  },
  {
    id: '5',
    title: 'Social Media Content Creation',
    description: 'Need a creative content creator to develop engaging social media content for our fashion brand. Must understand African fashion trends and social media best practices.',
    budget: 25,
    budgetType: 'hourly',
    skills: ['Content Creation', 'Social Media', 'Graphic Design', 'Photography'],
    client: {
      name: 'Aisha Abdulahi',
      rating: 4.5,
      reviewCount: 31,
      location: 'Addis Ababa, Ethiopia'
    },
    postedAt: '3 days ago',
    proposals: 28,
    duration: 'Ongoing',
    experienceLevel: 'intermediate'
  }
];

export const mockTransactions = [
  {
    id: '1',
    type: 'payment' as const,
    amount: 2500,
    description: 'E-commerce Platform Development - Milestone 1',
    client: 'Kwame Asante',
    status: 'completed' as const,
    date: '2024-01-15',
    projectId: '1'
  },
  {
    id: '2',
    type: 'payment' as const,
    amount: 1800,
    description: 'Mobile App UI/UX Design',
    client: 'Fatima Okonkwo',
    status: 'pending' as const,
    date: '2024-01-14',
    projectId: '2'
  },
  {
    id: '3',
    type: 'withdrawal' as const,
    amount: -1500,
    description: 'Bank Transfer to GTBank',
    client: '',
    status: 'completed' as const,
    date: '2024-01-12',
    projectId: ''
  },
  {
    id: '4',
    type: 'payment' as const,
    amount: 600,
    description: 'WordPress Website Development',
    client: 'Sarah Mwangi',
    status: 'completed' as const,
    date: '2024-01-10',
    projectId: '3'
  }
];

export const mockChatMessages = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Amara Okafor',
    message: 'Hi Kwame! I\'ve reviewed the project requirements and I\'m excited to work on your e-commerce platform.',
    timestamp: '2024-01-15T10:30:00Z',
    isMe: true
  },
  {
    id: '2',
    senderId: '2',
    senderName: 'Kwame Asante',
    message: 'Great! I\'m glad you\'re interested. Do you have any questions about the technical requirements?',
    timestamp: '2024-01-15T10:35:00Z',
    isMe: false
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'Amara Okafor',
    message: 'Yes, I wanted to clarify the payment integration. Are you planning to use Stripe or do you prefer a local payment gateway like Paystack?',
    timestamp: '2024-01-15T10:40:00Z',
    isMe: true
  },
  {
    id: '4',
    senderId: '2',
    senderName: 'Kwame Asante',
    message: 'Paystack would be perfect since we\'re targeting the African market. Can you also integrate mobile money payments?',
    timestamp: '2024-01-15T10:45:00Z',
    isMe: false
  },
  {
    id: '5',
    senderId: '1',
    senderName: 'Amara Okafor',
    message: 'Absolutely! Paystack supports mobile money for Ghana, Nigeria, and several other African countries. I\'ll include that in the implementation.',
    timestamp: '2024-01-15T10:50:00Z',
    isMe: true
  },
  {
    id: '6',
    senderId: '2',
    senderName: 'Kwame Asante',
    message: 'Perfect! When can you start? And what\'s your estimated timeline for the first milestone?',
    timestamp: '2024-01-15T11:00:00Z',
    isMe: false
  },
  {
    id: '7',
    senderId: '1',
    senderName: 'Amara Okafor',
    message: 'I can start immediately. For the first milestone (user authentication and basic product catalog), I estimate 2-3 weeks.',
    timestamp: '2024-01-15T11:05:00Z',
    isMe: true
  }
];