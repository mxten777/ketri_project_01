import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Building2,
  User,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { createQuote } from '../services/quoteService';
import { useAuth } from '../contexts/AuthContext';

const serviceOptions = [
  { value: 'industrial-health', label: '산업보건 컨설팅', icon: Building2 },
  { value: 'water-testing', label: '먹는물 검사', icon: FileText },
  { value: 'dialysis-water', label: '혈액투석용수 검사', icon: FileText },
  { value: 'indoor-air', label: '실내공기질 측정', icon: FileText },
  { value: 'asbestos', label: '석면 조사·분석', icon: FileText },
  { value: 'other', label: '기타 서비스', icon: MessageSquare },
];

interface FormData {
  serviceType: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  preferredDate: string;
  location: string;
  details: string;
}

const QuoteRequest: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    companyName: '',
    contactPerson: user?.displayName || '',
    phone: '',
    email: user?.email || '',
    preferredDate: '',
    location: '',
    details: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const totalSteps = 3;

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.serviceType) {
        newErrors.serviceType = '서비스를 선택해주세요.';
      }
    }

    if (step === 2) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = '회사명을 입력해주세요.';
      }
      if (!formData.contactPerson.trim()) {
        newErrors.contactPerson = '담당자명을 입력해주세요.';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = '연락처를 입력해주세요.';
      } else if (!/^[\d-]+$/.test(formData.phone)) {
        newErrors.phone = '올바른 연락처 형식이 아닙니다.';
      }
      if (!formData.email.trim()) {
        newErrors.email = '이메일을 입력해주세요.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = '올바른 이메일 형식이 아닙니다.';
      }
      if (!formData.location.trim()) {
        newErrors.location = '현장 위치를 입력해주세요.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    try {
      setSubmitting(true);

      await createQuote({
        serviceType: formData.serviceType as 'water' | 'dialysis' | 'asbestos' | 'indoor-air' | 'industrial-health',
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        phone: formData.phone,
        email: formData.email,
        preferredDate: formData.preferredDate || undefined,
        location: formData.location,
        details: formData.details,
        userId: user?.uid || undefined,
        userName: user?.displayName || formData.contactPerson,
        userEmail: user?.email || formData.email,
      });

      alert('견적 요청이 성공적으로 제출되었습니다.\n빠른 시일 내에 연락드리겠습니다.');
      navigate('/');
    } catch (error) {
      console.error('Failed to submit quote:', error);
      alert('견적 요청 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {[1, 2, 3].map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                currentStep > step
                  ? 'bg-green-500 text-white'
                  : currentStep === step
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}
            >
              {currentStep > step ? <Check className="w-6 h-6" /> : step}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                currentStep >= step
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-400'
              }`}
            >
              {step === 1 ? '서비스 선택' : step === 2 ? '상세 정보' : '확인 및 제출'}
            </span>
          </div>
          {index < 2 && (
            <div
              className={`w-24 h-1 mx-2 ${
                currentStep > step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        어떤 서비스가 필요하신가요?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        필요하신 서비스를 선택해주세요.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {serviceOptions.map((service) => {
          const Icon = service.icon;
          return (
            <button
              key={service.value}
              onClick={() => setFormData({ ...formData, serviceType: service.value })}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                formData.serviceType === service.value
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
              }`}
            >
              <Icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {service.label}
              </h3>
            </button>
          );
        })}
      </div>

      {errors.serviceType && (
        <p className="mt-4 text-sm text-red-500 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {errors.serviceType}
        </p>
      )}
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        상세 정보를 입력해주세요
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        정확한 견적을 위해 상세 정보를 입력해주세요.
      </p>

      <div className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            회사명 *
          </label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className={`w-full pl-12 pr-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.companyName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="회사명을 입력하세요"
            />
          </div>
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
          )}
        </div>

        {/* Contact Person */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            담당자명 *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              className={`w-full pl-12 pr-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.contactPerson ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="담당자명을 입력하세요"
            />
          </div>
          {errors.contactPerson && (
            <p className="mt-1 text-sm text-red-500">{errors.contactPerson}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            연락처 *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full pl-12 pr-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="010-1234-5678"
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            이메일 *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full pl-12 pr-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="example@company.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            현장 위치 *
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white ${
              errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="서울시 강남구..."
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-500">{errors.location}</p>
          )}
        </div>

        {/* Preferred Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            희망 날짜 (선택)
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            상세 요청사항 (선택)
          </label>
          <textarea
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white resize-none"
            placeholder="추가 요청사항이 있으시면 입력해주세요..."
            maxLength={500}
          />
          <p className="mt-1 text-sm text-gray-500">
            {formData.details.length}/500
          </p>
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => {
    const selectedService = serviceOptions.find((s) => s.value === formData.serviceType);
    
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          입력하신 정보를 확인해주세요
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          제출하시기 전에 정보를 다시 한번 확인해주세요.
        </p>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 space-y-4">
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-3">
            <span className="text-gray-600 dark:text-gray-400">서비스</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {selectedService?.label}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-3">
            <span className="text-gray-600 dark:text-gray-400">회사명</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formData.companyName}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-3">
            <span className="text-gray-600 dark:text-gray-400">담당자</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formData.contactPerson}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-3">
            <span className="text-gray-600 dark:text-gray-400">연락처</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formData.phone}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-3">
            <span className="text-gray-600 dark:text-gray-400">이메일</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formData.email}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-3">
            <span className="text-gray-600 dark:text-gray-400">현장 위치</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formData.location}
            </span>
          </div>
          {formData.preferredDate && (
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-3">
              <span className="text-gray-600 dark:text-gray-400">희망 날짜</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formData.preferredDate}
              </span>
            </div>
          )}
          {formData.details && (
            <div className="pt-3">
              <span className="text-gray-600 dark:text-gray-400 block mb-2">
                상세 요청사항
              </span>
              <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                {formData.details}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            견적 요청
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            필요하신 서비스에 대한 견적을 요청해주세요
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          {renderStepIndicator()}

          <AnimatePresence mode="wait">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </AnimatePresence>

          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
                이전
              </button>
            )}
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                다음
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {submitting ? '제출 중...' : '제출하기'}
                <Check className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuoteRequest;
