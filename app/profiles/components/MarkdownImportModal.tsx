'use client';

import React, { useState, useRef, FC } from 'react';
import styles from './MarkdownImportModal.module.css';

interface MarkdownImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (markdown: string) => void;
  isProcessing?: boolean;
}

const MarkdownImportModal: FC<MarkdownImportModalProps> = ({ 
  isOpen, 
  onClose, 
  onImport, 
  isProcessing = false 
}) => {
  const [markdown, setMarkdown] = useState('');
  const [importMethod, setImportMethod] = useState<'paste' | 'upload'>('paste');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = async (file: File) => {
    try {
      const text = await file.text();
      setMarkdown(text);
      setImportMethod('paste'); // Switch to paste view to show the content
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Failed to read the file. Please ensure it\'s a valid markdown file.');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'text/markdown' || file.type === 'text/plain' || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
        processFile(file);
      } else {
        alert('Please drop a markdown (.md) or text (.txt) file.');
      }
    }
  };

  const handleImport = () => {
    if (!markdown.trim()) {
      alert('Please provide some markdown content to import.');
      return;
    }
    console.log('Importing markdown content...');
    onImport(markdown);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setMarkdown('');
      setImportMethod('paste');
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Import Profile from Markdown</h2>
          <button 
            className={styles.closeButton} 
            onClick={handleClose}
            disabled={isProcessing}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className={styles.methodSelector}>
          <button
            className={`${styles.methodButton} ${importMethod === 'paste' ? styles.active : ''}`}
            onClick={() => setImportMethod('paste')}
            disabled={isProcessing}
          >
            📋 Paste Markdown
          </button>
          <button
            className={`${styles.methodButton} ${importMethod === 'upload' ? styles.active : ''}`}
            onClick={() => setImportMethod('upload')}
            disabled={isProcessing}
          >
            📁 Upload File
          </button>
        </div>

        <div className={styles.modalBody}>
          {importMethod === 'paste' ? (
            <div className={styles.pasteSection}>
              <label htmlFor="markdown-input" className={styles.label}>
                Paste your markdown content below:
              </label>
              <textarea
                id="markdown-input"
                className={styles.textarea}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder={`Paste your client profile markdown here...

Example format:
# Company Name

**Industry**: Technology
**Size**: Enterprise
**Annual Revenue**: $100M

## Strategic Initiatives
...`}
                disabled={isProcessing}
              />
            </div>
          ) : (
            <div className={styles.uploadSection}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.markdown,.txt"
                onChange={handleFileUpload}
                className={styles.fileInput}
                disabled={isProcessing}
              />
              <div 
                className={`${styles.uploadArea} ${isDragging ? styles.dragging : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className={styles.uploadIcon}>📄</div>
                <p className={styles.uploadText}>
                  {isDragging ? 'Drop your file here' : 'Click to upload or drag and drop'}
                </p>
                <p className={styles.uploadHint}>
                  Supports .md, .markdown, and .txt files
                </p>
              </div>
            </div>
          )}

          {markdown && importMethod === 'upload' && (
            <div className={styles.previewSection}>
              <h3 className={styles.previewTitle}>File Content Preview:</h3>
              <pre className={styles.preview}>{markdown.substring(0, 500)}...</pre>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={`btn btn-secondary ${styles.cancelButton}`}
            onClick={handleClose}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button 
            className={`btn btn-primary ${styles.importButton}`}
            onClick={handleImport}
            disabled={isProcessing || !markdown.trim()}
          >
            {isProcessing ? (
              <>
                <span className={styles.spinner}></span>
                Processing...
              </>
            ) : (
              'Import & Extract'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownImportModal; 