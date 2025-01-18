import React, { useEffect } from 'react';

const PrivacyPolicyModal = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position and lock body scroll
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position when modal closes
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    // Cleanup function
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex !text-black items-center justify-center bg-black/50">
      <div className="relative p-20 w-full xl:max-w-[1070px] h-screen xl:h-auto xl:max-h-[80vh] bg-[#AA9A81] xl:rounded-lg overflow-hidden">
        <div className="flex justify-between w-full items-start">
          <h1 className='max-sm:text-[26px] max-md:text-[52px] md:text-[4rem] font-normal text-black font-["Scheherazade_New"] tracking-[-2px] md:tracking-[-4px] uppercase'>
            PRIVACY POLICY
          </h1>
          <button 
            onClick={onClose}
            className="relative p-4 hover:bg-black/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="scrollable overflow-y-auto mt-6 pr-4 -mr-4">
          <div 
            className="space-y-6 text-black" 
            dangerouslySetInnerHTML={{ __html: data }} 
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;