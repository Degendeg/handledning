import { motion } from 'framer-motion';

const UserStatusCell = ({ status }) => {
  return (
    <td className="w-2/5 text-right py-3 px-4">
      <motion.div
        key={status}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {status === 'pending' ? (
          <span className="dot-flashing"></span>
        ) : status === 'completed' ? (
          <span>✅</span>
        ) : null}
      </motion.div>
    </td>
  );
};

export default UserStatusCell;
