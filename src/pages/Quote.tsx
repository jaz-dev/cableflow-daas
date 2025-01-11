import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Switch } from '@headlessui/react';
import { useAuth0 } from '@auth0/auth0-react';
import clsx from 'clsx';
import { FileUploadBox } from '../components/FileUploadBox';
import { useNavigate } from 'react-router-dom';

export const Quote = () => {
  const { isAuthenticated } = useAuth0();
  const [email, setEmail] = useState('');
  const [cableName, setCableName] = useState('');
  const [cableDescription, setCableDescription] = useState('');
  const [hasDeliveryDate, setHasDeliveryDate] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [quantities, setQuantities] = useState('');
  const [quantitiesError, setQuantitiesError] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    drawing: null,
    bom: null,
    fromTo: null
  });
  const navigate = useNavigate();

  const validateQuantities = (value: string) => {
    const validRegex = /^\s*\d+(?:\s*,\s*\d+)*\s*$/;
    const isValid = validRegex.test(value);
    
    if (!isValid) {
      setQuantitiesError('Please enter numbers separated by commas (e.g. 5, 25, 100)');
      return false;
    }

    setQuantitiesError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateQuantities(quantities)) {
      return;
    }
    if (files.drawing == null) {
      alert('Please upload a drawing file before submitting.');
      return;
    }

    // Form submission logic will be implemented later
    console.log('Form submitted', { files });
    navigate('/cables', { state: { showSuccessToast: true } });
  };

  const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium text-gray-700">{children}</span>
      <span className="text-red-500">*</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Request a Quote
        </h1>
        <p className="text-gray-600 mb-8">
          Fill out form to get a quote quickly. We'll reach out if any clarification is needed. 
          When your quote is ready, it will be updated on your quotes dashboard and you will also get an email notification.
          Reach out to us at <a 
            href="mailto:support@cableflow.com"
            className="text-blue-600 hover:text-blue-800"
          >
            support@cableflow.com
          </a> if you have any questions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            {!isAuthenticated && (
              <div>
                <RequiredLabel>Email</RequiredLabel>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            )}

            <div>
              <RequiredLabel>Cable Name</RequiredLabel>
              <input
                type="text"
                value={cableName}
                onChange={(e) => setCableName(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter cable name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cable or Project Description
              </label>
              <input
                type="text"
                value={cableDescription}
                onChange={(e) => setCableDescription(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FileUploadBox
              title="Upload Drawing"
              description="Drag files here or click to select files (PDF, JPEG, PNG, GIF, and BMP allowed. Max 50MB per file.)"
              exampleText="Example Drawing"
              required
              accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp"
              fileKey="drawing"
              files={files}
              setFiles={setFiles}
            />
            <FileUploadBox
              title="Upload BOM"
              description="Drag files here or click to select files (CSV, XLSX)"
              exampleText="Example BOM"
              accept=".csv,.xlsx"
              fileKey="bom"
              files={files}
              setFiles={setFiles}
            />
            <FileUploadBox
              title="Upload From-To Table"
              description="Drag files here or click to select files (CSV, XLSX)"
              exampleText="Example From-To Table"
              accept=".csv,.xlsx"
              fileKey="fromTo"
              files={files}
              setFiles={setFiles}
            />
          </div>

          <div className="space-y-4">
            <div>
              <RequiredLabel>What quantity(ies) should we quote?</RequiredLabel>
              <input
                type="text"
                value={quantities}
                onChange={(e) => setQuantities(e.target.value)}
                required
                className={clsx(
                  "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
                  quantitiesError
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                )}
                placeholder="Enter quantities"
              />
              {quantitiesError ? (
                <p className="mt-1 text-sm text-red-500">{quantitiesError}</p>
              ) : (
                <p className="mt-1 text-sm text-gray-500">
                  Let us know in a comma separated list (i.e. 5, 25, 100, etc.)
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Do you have a desired delivery date?
                </span>
                <div className="flex items-center gap-2">
                  <span className={clsx("text-sm", !hasDeliveryDate && "text-gray-900 font-medium")}>No</span>
                  <Switch
                    checked={hasDeliveryDate}
                    onChange={setHasDeliveryDate}
                    className={clsx(
                      hasDeliveryDate ? 'bg-blue-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
                    )}
                  >
                    <span
                      className={clsx(
                        hasDeliveryDate ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                  <span className={clsx("text-sm", hasDeliveryDate && "text-gray-900 font-medium")}>Yes</span>
                </div>
              </div>

              {hasDeliveryDate && (
                <div>
                  <RequiredLabel>When is the desired delivery date?</RequiredLabel>
                  <div className="relative mt-1">
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      required
                      className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Anything else we should know?
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any additional information"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Submit Quote Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};