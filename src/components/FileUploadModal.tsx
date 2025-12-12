import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload,
  X,
  File,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  Plus,
  Minus,
  Tag,
  Folder,
  Globe,
  Lock,
  Check,
  AlertCircle
} from 'lucide-react';
import Button from './common/Button';
import Card from './common/Card';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[], metadata: any) => void;
  categories: string[];
  isUploading: boolean;
}

interface SelectedFile {
  file: File;
  preview?: string;
  id: string;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  categories,
  isUploading
}) => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isDragOver, setIsDragOver] = useState(false);
  const [step, setStep] = useState<'upload' | 'details'>('upload');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 처리
  const handleFileSelect = (files: FileList | File[]) => {
    const filesArray = Array.from(files);
    const newFiles: SelectedFile[] = filesArray.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    
    setSelectedFiles(prev => [...prev, ...newFiles]);
    
    // 파일이 선택되면 상세 정보 단계로 이동
    if (filesArray.length > 0) {
      setStep('details');
    }
  };

  // 드래그 앤 드롭 처리
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.currentTarget === e.target) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles);
    }
  };

  // 파일 제거
  const removeFile = (id: string) => {
    setSelectedFiles(prev => {
      const newFiles = prev.filter(f => f.id !== id);
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      
      // 모든 파일이 제거되면 업로드 단계로 돌아가기
      if (newFiles.length === 0) {
        setStep('upload');
      }
      
      return newFiles;
    });
  };

  // 태그 추가
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  // 태그 제거
  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  // 업로드 처리
  const handleUpload = () => {
    if (selectedFiles.length === 0) return;
    
    const metadata = {
      category,
      tags,
      description,
      isPublic
    };
    
    onUpload(selectedFiles.map(f => f.file), metadata);
  };

  // 모달 리셋
  const handleClose = () => {
    // 미리보기 URL 정리
    selectedFiles.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    
    setSelectedFiles([]);
    setCategory('general');
    setTags([]);
    setTagInput('');
    setDescription('');
    setIsPublic(true);
    setStep('upload');
    onClose();
  };

  // 파일 아이콘 가져오기
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <ImageIcon className="w-8 h-8" />;
    if (fileType.startsWith('video/')) return <Video className="w-8 h-8" />;
    if (fileType.startsWith('audio/')) return <Music className="w-8 h-8" />;
    return <FileText className="w-8 h-8" />;
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  파일 업로드
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {step === 'upload' ? '업로드할 파일을 선택하세요' : '파일 정보를 입력하세요'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={handleClose}
              className="p-2"
              disabled={isUploading}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 'upload' ? (
              /* Upload Step */
              <div className="space-y-6">
                {/* Drop Zone */}
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                    isDragOver
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className={`w-16 h-16 mx-auto mb-4 ${
                    isDragOver ? 'text-primary' : 'text-gray-400'
                  }`} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    파일을 여기에 드롭하세요
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    또는 클릭하여 파일을 선택하세요
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    파일 선택
                  </Button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="*/*"
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                    className="hidden"
                  />
                  
                  <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    최대 100MB • 모든 파일 형식 지원
                  </div>
                </div>

                {/* File Types Info */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { icon: ImageIcon, label: '이미지', types: 'JPG, PNG, GIF, WebP' },
                    { icon: Video, label: '비디오', types: 'MP4, AVI, MOV, WebM' },
                    { icon: Music, label: '오디오', types: 'MP3, WAV, OGG' },
                    { icon: FileText, label: '문서', types: 'PDF, DOC, XLS, TXT' }
                  ].map((type, index) => (
                    <Card key={index} className="p-4 text-center">
                      <type.icon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {type.label}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {type.types}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              /* Details Step */
              <div className="space-y-6">
                {/* Selected Files */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    선택된 파일 ({selectedFiles.length}개)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedFiles.map((selectedFile) => (
                      <Card key={selectedFile.id} className="p-3">
                        <div className="flex items-center gap-3">
                          {selectedFile.preview ? (
                            <img
                              src={selectedFile.preview}
                              alt={selectedFile.file.name}
                              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                              {getFileIcon(selectedFile.file.type)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                              {selectedFile.file.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatFileSize(selectedFile.file.size)}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile(selectedFile.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Upload Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Folder className="w-4 h-4 inline mr-2" />
                      카테고리
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Public/Private */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      공개 설정
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="visibility"
                          checked={isPublic}
                          onChange={() => setIsPublic(true)}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <Globe className="w-4 h-4 text-green-600" />
                        <span className="text-gray-900 dark:text-white">공개</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="visibility"
                          checked={!isPublic}
                          onChange={() => setIsPublic(false)}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <Lock className="w-4 h-4 text-red-600" />
                        <span className="text-gray-900 dark:text-white">비공개</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Tag className="w-4 h-4 inline mr-2" />
                    태그
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        placeholder="태그를 입력하세요"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                      <Button
                        onClick={addTag}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        추가
                      </Button>
                    </div>
                    
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
                          >
                            #{tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    설명 (선택사항)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="파일에 대한 설명을 입력하세요..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  />
                </div>

                {/* Upload Summary */}
                <Card className="p-4 bg-gray-50 dark:bg-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">업로드 요약</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">파일 수:</span>
                      <span className="font-medium text-gray-900 dark:text-white ml-2">
                        {selectedFiles.length}개
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">총 크기:</span>
                      <span className="font-medium text-gray-900 dark:text-white ml-2">
                        {formatFileSize(selectedFiles.reduce((acc, file) => acc + file.file.size, 0))}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">카테고리:</span>
                      <span className="font-medium text-gray-900 dark:text-white ml-2">
                        {category}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">공개:</span>
                      <span className={`font-medium ml-2 ${
                        isPublic ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isPublic ? '공개' : '비공개'}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <AlertCircle className="w-4 h-4" />
              {step === 'upload' ? (
                '드래그 앤 드롭 또는 파일 선택을 사용하세요'
              ) : (
                `${selectedFiles.length}개 파일 준비됨`
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {step === 'details' && (
                <Button
                  variant="outline"
                  onClick={() => setStep('upload')}
                  disabled={isUploading}
                >
                  이전
                </Button>
              )}
              
              {step === 'upload' ? (
                <Button
                  onClick={handleClose}
                  variant="outline"
                  disabled={isUploading}
                >
                  취소
                </Button>
              ) : (
                <Button
                  onClick={handleUpload}
                  disabled={selectedFiles.length === 0 || isUploading}
                  className="flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      업로드 중...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      업로드 시작
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FileUploadModal;