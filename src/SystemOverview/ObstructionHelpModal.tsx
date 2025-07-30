import { motion } from "framer-motion";

interface ObstructionHelpModalProps {
  onClose: () => void;
}

export default function ObstructionHelpModal({
  onClose,
}: ObstructionHelpModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1001] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 max-w-md w-full"
      >
        <h3 className="text-xl font-light text-white mb-8 text-center">
          Remove Panels
        </h3>
        <p className="text-gray-300 mb-6 text-left">
          Got something on your roof preventing panels from being placed?
          <br />
          Or simply want to remove a panel for any reason?
          <br />
          Click on any panel to remove it from any possible configurations.{" "}
          <br />
          This works for manual panels.
          <br />
          Removed panels will:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 pl-8 text-left">
          <li>Become transparent with a red border</li>
          <li>Be removed from all configurations</li>
          <li>Not contribute to energy production</li>
        </ul>
        <p className="text-gray-300 mb-8">
          Click a marked panel again to remove the obstruction.
        </p>

        <div className="px-5 py-5 pb-3 border-t border-white/10">
          <div className="relative">
            <motion.div
              className="absolute -inset-1 rounded-full z-0"
              animate={{
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-white/30 to-blue-500/20 rounded-full blur-[20px]" />
            </motion.div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-sheen relative z-10 w-full h-[52px] flex items-center rounded-full justify-center gap-3 px-8 text-white shadow-xl transition-all duration-500 text-sm font-medium tracking-wider group"
            >
              Got it
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
