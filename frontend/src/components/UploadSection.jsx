import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const UploadSection = ({ onUploadComplete }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (selectedFile) => {
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError(null);
            uploadFile(selectedFile);
        } else {
            setError('Please upload a valid PDF file.');
            setFile(null);
        }
    };

    const uploadFile = async (fileToUpload) => {
        setUploading(true);
        setSuccess(false);
        setError(null);

        const formData = new FormData();
        formData.append('file', fileToUpload);

        try {
            // Assuming backend is on localhost:8000
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess(true);
            onUploadComplete(response.data.chunks); // Pass info back to parent
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.detail || err.message || 'Upload failed. Please try again.';
            setError(errorMessage);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <motion.div
                layout
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-colors duration-200 ease-in-out ${isDragging ? 'border-primary bg-blue-50' : 'border-slate-300 bg-white'
                    } ${success ? 'border-green-500 bg-green-50' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf"
                    className="hidden"
                />

                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <AnimatePresence mode="wait">
                        {uploading ? (
                            <motion.div
                                key="uploading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                <p className="mt-2 text-sm text-slate-500">Processing your resume...</p>
                            </motion.div>
                        ) : success ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <CheckCircle className="w-12 h-12 text-green-500" />
                                <p className="mt-2 text-lg font-medium text-slate-900">Resume Uploaded!</p>
                                <p className="text-sm text-slate-500">{file?.name}</p>
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="mt-4 text-sm text-primary hover:underline"
                                >
                                    Replace file
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="default"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <div className="p-4 bg-blue-100 rounded-full mb-2">
                                    <UploadCloud className="w-8 h-8 text-primary" />
                                </div>
                                <p className="text-lg font-medium text-slate-900">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-sm text-slate-500">PDF (max 10MB)</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center text-sm"
                    >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {error}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default UploadSection;
