import React from "react";
import { FileTextIcon, X, ShieldIcon, MailIcon } from "lucide-react";

interface SunlightDocuSignProps {
  isOpen: boolean;
  signingUrl?: string;
  onCancel: () => void;
}

const SunlightDocuSign: React.FC<SunlightDocuSignProps> = ({
  isOpen,
  signingUrl,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl w-full max-w-6xl flex flex-col border border-gray-200"
        style={{ height: "800px" }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FileTextIcon className="w-5 h-5 text-black" />
            <h3 className="text-lg font-semibold text-black">
              Sunlight Loan Contract
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            type="button"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Iframe or Loader */}
        <div className="flex-1 p-4">
          <div className="w-full h-full bg-white rounded-lg overflow-hidden">
            {signingUrl ? (
              <iframe
                src={signingUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="DocuSign Document Signing"
                className="rounded-lg"
                id="docuSignIframe"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600">Loading signing interface...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <ShieldIcon className="w-5 h-5 text-gray-600" />
              <span>Secure & Legally Binding</span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="w-5 h-5 text-gray-600" />
              <span>Auto-notification Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunlightDocuSign;
