import { motion, AnimatePresence } from 'framer-motion';

const Alert = ({ type, color, message }) => {
  return (
    <AnimatePresence>
      <motion.div
        role="alert"
        className={`p-2 mt-4 alert alert-${type || 'error'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        key={message}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 shrink-0 stroke-current text-${color}`}
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className={`pb-1 text-${color}`}>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
}

export default Alert;