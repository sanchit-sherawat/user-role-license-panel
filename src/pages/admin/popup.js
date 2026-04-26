import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Popup = ({ message, type, isVisible, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className={`${bgColor} text-white px-4 py-2 rounded shadow-lg fixed top-5 right-5 z-50`}
        >
          <div className="flex justify-between items-center gap-4">
            <span>{message}</span>
            <button onClick={onClose} className="text-white font-bold">×</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
