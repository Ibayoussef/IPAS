import React from 'react';

const PrivacyPolicyModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex !text-black items-center justify-center bg-black/50">
      <div className="relative w-full xl:max-w-2xl h-screen xl:h-auto xl:max-h-[80vh] bg-[#AA9A81] xl:rounded-lg overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-secondary/10 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#000" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="p-6 overflow-y-auto h-screen xl:max-h-[80vh]">
          <div className="space-y-6 text-black" dangerouslySetInnerHTML={{ __html: data }} />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;