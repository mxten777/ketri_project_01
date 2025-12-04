// User Types
export interface User {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  companyName?: string;
  address?: {
    zipCode: string;
    address: string;
    detailAddress: string;
  };
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
  emailVerified: boolean;
  profileImage?: string;
  bookmarks: string[];
  preferences: {
    darkMode: boolean;
    notifications: {
      email: boolean;
      sms: boolean;
    };
  };
}

// Certificate Types
export interface Certificate {
  certificateId: string;
  certificateNumber: string;
  password: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceType: 'water' | 'dialysis' | 'asbestos' | 'indoor-air';
  testItems: TestItem[];
  sampleInfo: {
    sampleName: string;
    sampleLocation: string;
    collectionDate: Date;
    collectionMethod: string;
  };
  testDate: Date;
  issueDate: Date;
  expiryDate: Date;
  pdfUrl: string;
  status: 'pending' | 'processing' | 'completed' | 'expired';
  results: TestResult[];
  remarks?: string;
  inspectorName: string;
  inspectorSignature: string;
  isPublic: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface TestItem {
  itemName: string;
  testMethod: string;
  result: string;
  unit: string;
  standard: string;
  isPass: boolean;
}

export interface TestResult {
  category: string;
  items: TestItem[];
}

// Quote Request Types
export interface QuoteRequest {
  requestId: string;
  userId?: string;
  serviceType: 'water' | 'dialysis' | 'asbestos' | 'indoor-air' | 'industrial-health';
  requesterInfo: {
    name: string;
    email: string;
    phone: string;
    companyName?: string;
    position?: string;
  };
  facilityInfo: {
    facilityType: string;
    facilityName: string;
    address: string;
    area?: number;
    buildingYear?: string;
  };
  requestDetails: {
    testItems: string[];
    sampleCount: number;
    urgency: 'normal' | 'urgent';
    preferredDate: Date;
    additionalRequests?: string;
  };
  status: 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'rejected' | 'completed';
  estimatedCost?: number;
  quotePdfUrl?: string;
  adminNotes?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  respondedAt?: Date;
  completedAt?: Date;
}

// Notice Types
export interface Notice {
  noticeId: string;
  title: string;
  content: string;
  excerpt: string;
  category: 'general' | 'service' | 'system' | 'event';
  isImportant: boolean;
  isPinned: boolean;
  author: {
    uid: string;
    name: string;
  };
  attachments: Attachment[];
  viewCount: number;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface Attachment {
  fileName: string;
  fileSize: number;
  fileType: string;
  downloadUrl: string;
  uploadedAt: Date;
}

// QnA Types
export interface QnA {
  id: string;
  title: string;
  content: string;
  category: 'general' | 'service' | 'technical' | 'account';
  authorId: string;
  authorName: string;
  authorEmail: string;
  isSecret: boolean;
  isAnswered: boolean;
  views: number;
  comments: Comment[];
  createdAt: any;
  updatedAt: any;
}

// Comment Types
export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  isAdmin: boolean;
  createdAt: any;
}

// Board Types
export interface Post {
  postId: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  attachments: Attachment[];
  tags: string[];
  status: 'published' | 'deleted' | 'reported';
  createdAt: Date;
  updatedAt: Date;
}

// Resource Types
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'manual' | 'form' | 'report' | 'certificate' | 'other';
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  thumbnailUrl?: string;
  uploadedBy: {
    uid: string;
    name: string;
  };
  downloads: number;
  views: number;
  isPublic: boolean;
  createdAt: any;
  updatedAt: any;
}

// Service Types
export interface Service {
  serviceId: string;
  serviceName: string;
  serviceCategory: 'industrial-health' | 'water' | 'dialysis' | 'asbestos' | 'indoor-air';
  title: string;
  content: string;
  featuredImage: string;
  gallery: string[];
  overview: string;
  keyPoints: string[];
  process: ProcessStep[];
  relatedServices: string[];
  documents: Attachment[];
  faqs: FAQ[];
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
  };
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Statistics Types
export interface Statistics {
  date: string;
  pageViews: {
    home: number;
    services: Record<string, number>;
    board: Record<string, number>;
    total: number;
  };
  uniqueVisitors: number;
  newUsers: number;
  quoteRequests: {
    total: number;
    byServiceType: Record<string, number>;
  };
  certificatesIssued: number;
  searchKeywords: Record<string, number>;
  topPages: PageStat[];
  deviceStats: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  createdAt: Date;
}

export interface PageStat {
  path: string;
  views: number;
}

// Site Config Types
export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  logo: {
    light: string;
    dark: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    fax: string;
    address: {
      zipCode: string;
      address: string;
      detailAddress: string;
    };
    kakaoTalkId?: string;
  };
  businessInfo: {
    registrationNumber: string;
    representativeName: string;
    certifications: Certification[];
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    blog?: string;
  };
  maintenance: {
    isActive: boolean;
    message: string;
    startTime?: Date;
    endTime?: Date;
  };
  features: {
    darkMode: boolean;
    search: boolean;
    socialLogin: boolean;
  };
  updatedAt: Date;
  updatedBy: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: Date;
  certificateUrl?: string;
}

// Activity Log Types
export interface ActivityLog {
  logId: string;
  userId: string;
  userName: string;
  action: 'login' | 'logout' | 'create' | 'update' | 'delete' | 'download';
  target: string;
  targetId: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  phoneNumber: string;
  companyName?: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Menu Types
export interface MenuItem {
  label: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}

// Search Types
export interface SearchResult {
  id: string;
  type: 'page' | 'notice' | 'qna' | 'resource' | 'certificate';
  title: string;
  excerpt: string;
  url: string;
  createdAt: Date;
  highlight?: string;
}
