import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload,
  File,
  X,
  AlertCircle,
  ArrowLeft,
  FileText,
  Folder,
  Globe,
  Lock,
} from 'lucide-react';
import { uploadFile, createResource } from '../../services/resourceService';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const categories = [
  { value: 'manual', label: '매뉴얼', icon: FileText },
  { value: 'form', label: '신청서', icon: File },
  { value: 'report', label: '보고서', icon: FileText },
  { value: 'certificate', label: '성적서', icon: File },
  { value: 'other', label: '기타', icon: Folder },
];

const ResourceForm: React.FC = () => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'manual',
    isPublic: true,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  // 관리자 권한 확인
  if (!user || userData?.role !== 'admin') {
    return (
      <Card className="p-8 text-center max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          접근 권한이 없습니다
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          관리자만 자료를 업로드할 수 있습니다.
        </p>
        <Button onClick={() => navigate('/board/resources')} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          자료실로 돌아가기
        </Button>
      </Card>
    );
  }

  const validateFile = (file: File): string | null => {
    // 파일 크기 체크 (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return '파일 크기는 10MB를 초과할 수 없습니다.';
    }

    // 파일 형식 체크
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/zip',
      'application/x-zip-compressed',
    ];

    if (!allowedTypes.includes(file.type)) {
      return '지원하지 않는 파일 형식입니다. (PDF, Word, Excel, PowerPoint, 이미지, ZIP 파일만 가능)';
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('파일을 선택해주세요.');
      return;
    }

    if (!formData.title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }

    if (!formData.description.trim()) {
      setError('설명을 입력해주세요.');
      return;
    }

    try {
      setUploading(true);
      setError('');
      setUploadProgress(30);

      // 파일 업로드
      const fileData = await uploadFile(selectedFile, formData.category);
      setUploadProgress(70);

      // 자료 등록
      await createResource({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category as "manual" | "form" | "report" | "certificate" | "other",
        fileName: fileData.fileName,
        fileSize: fileData.fileSize,
        fileType: fileData.fileType,
        fileUrl: fileData.fileUrl,
        uploadedBy: {
          uid: user.uid,
          name: user.displayName || '관리자'
        },
        isPublic: formData.isPublic,
      });

      setUploadProgress(100);

      // 자료실로 이동
      setTimeout(() => {
        navigate('/board/resources');
      }, 500);
    } catch (error) {
      console.error('Failed to upload resource:', error);
      setError(error instanceof Error ? error.message : '업로드에 실패했습니다.');
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* 헤더 */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate('/board/resources')}
          variant="ghost"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          자료실로
        </Button>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          자료 업로드
        </h1>
      </div>

      {/* 업로드 폼 */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 파일 업로드 영역 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              파일 선택 *
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                dragOver
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                  : 'border-neutral-300 dark:border-neutral-600 hover:border-primary-400'
              }`}
            >
              {selectedFile ? (
                <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <File className="w-8 h-8 text-primary-600" />
                    <div className="text-left">
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={handleRemoveFile}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                    파일을 드래그하거나 클릭하여 업로드
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                    PDF, Word, Excel, PowerPoint, 이미지, ZIP (최대 10MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-primary-600 hover:bg-primary-700 text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    파일 선택
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              제목 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="자료 제목을 입력하세요"
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              maxLength={100}
              required
              />
            </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              설명 *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="자료에 대한 설명을 입력하세요"
              rows={4}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
              maxLength={500}
              required
            />
            </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              카테고리 *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            >
              {categories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            </div>

          {/* 공개 설정 */}
          <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-neutral-800 dark:bg-neutral-700 dark:border-neutral-600"
              />
              <label htmlFor="isPublic" className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {formData.isPublic ? (
                  <>
                    <Globe className="w-4 h-4 text-green-600" />
                    공개 자료로 등록
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-600" />
                    관리자 전용
                  </>
                )}
              </label>
            </div>
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              {formData.isPublic 
                ? '모든 사용자가 다운로드할 수 있습니다.' 
                : '관리자만 확인하고 다운로드할 수 있습니다.'
              }
            </p>
            </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* 업로드 진행상황 */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                <span>업로드 중...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* 버튼들 */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={() => navigate('/board/resources')}
              variant="outline"
              className="flex-1"
              disabled={uploading}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  업로드 중...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  업로드
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default ResourceForm;
