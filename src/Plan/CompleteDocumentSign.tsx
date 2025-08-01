import React from "react";

type Props = {};

const CompleteDocumentSignModal: React.FC<Props> = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-4 text-green-600">
          ✅ Complete!
        </h2>
        <p className="text-gray-700 mb-6">
          The process has been successfully completed. You may now close this
          modal and continue with the next steps.
        </p>
      </div>
    </div>
  );
};

export default CompleteDocumentSignModal;
