import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Popup = ({ message, type = 'success', isVisible, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`${bgColor} text-white shadow-xl rounded-xl p-4 flex items-center gap-4 max-w-sm w-full fixed top-6 right-6 z-50`}
        >
          <Icon size={24} className="text-white" />
          <div className="flex-1 text-sm font-medium">{message}</div>
          <button onClick={onClose}>
            <X size={18} className="text-white hover:scale-110 transition-transform" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
