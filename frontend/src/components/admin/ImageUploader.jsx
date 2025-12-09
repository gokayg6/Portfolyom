import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const ImageUploader = ({
    value,
    onChange,
    onUploadComplete,
    accept = 'image/*',
    maxSize = 5 * 1024 * 1024, // 5MB default
    placeholder = 'Dosya seçin veya sürükleyin'
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(value || null);
    const inputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFile = async (file) => {
        setError(null);

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Lütfen bir resim dosyası seçin');
            return;
        }

        // Validate file size
        if (file.size > maxSize) {
            setError(`Dosya boyutu ${Math.round(maxSize / 1024 / 1024)}MB'dan küçük olmalı`);
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
        };
        reader.readAsDataURL(file);

        // Upload file
        setIsUploading(true);
        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                }
            });

            const uploadedUrl = response.data.url;
            onChange?.(uploadedUrl);
            onUploadComplete?.(response.data);
            setPreview(uploadedUrl);
        } catch (err) {
            console.error('Upload error:', err);
            setError('Yükleme başarısız oldu. Lütfen tekrar deneyin.');
            // Keep preview even on error for UX
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onChange?.('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            {/* Upload Area */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`
          relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
          transition-all duration-200
          ${isDragging
                        ? 'border-violet-500 bg-violet-500/10'
                        : 'border-white/10 hover:border-white/20 bg-white/[0.02]'}
          ${error ? 'border-red-500/50' : ''}
        `}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-h-40 mx-auto rounded-lg object-contain"
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove();
                            }}
                            className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        {isUploading && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                <div className="text-white text-sm font-medium">{uploadProgress}%</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-white/[0.04] flex items-center justify-center">
                            {isUploading ? (
                                <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Upload className="w-6 h-6 text-white/40" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-white/60">{placeholder}</p>
                            <p className="text-xs text-white/30 mt-1">
                                PNG, JPG, GIF - Max {Math.round(maxSize / 1024 / 1024)}MB
                            </p>
                        </div>
                    </div>
                )}

                {/* Progress Bar */}
                {isUploading && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-xl overflow-hidden">
                        <div
                            className="h-full bg-violet-500 transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
