import { useEffect } from 'react';

const useToggleModal = (setShowTagsModal: (isHidden: boolean) => void) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowTagsModal(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [setShowTagsModal]);
};

export default useToggleModal;

