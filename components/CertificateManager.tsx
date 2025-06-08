import React, { useState } from "react";
import {
  ICPCertificateService,
  Certificate,
} from "../lib/icp-certificate-service";

const service = new ICPCertificateService();

export default function CertificateManager() {
  const [hash, setHash] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<
    Certificate | null | undefined
  >();
  const [certificates, setCertificates] = useState<[string, Certificate][]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleStore = async () => {
    setLoading(true);
    setMessage("");
    try {
      await service.storeCertificate(hash);
      setMessage("Certificate stored successfully!");
      setHash("");
      await handleList();
    } catch (e) {
      setMessage("Error storing certificate");
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    setLoading(true);
    setVerifyResult(undefined);
    try {
      const result = await service.verifyCertificate(verifyHash);
      setVerifyResult(result);
    } catch (e) {
      setVerifyResult(null);
    }
    setLoading(false);
  };

  const handleList = async () => {
    setLoading(true);
    try {
      const result = await service.getCertificates();
      setCertificates(result);
    } catch (e) {
      setCertificates([]);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    handleList();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">ICP Certificate Manager</h2>
      <div className="mb-6">
        <label className="block mb-1 font-medium">Certificate Hash</label>
        <div className="flex gap-2">
          <input
            className="border rounded px-2 py-1 flex-1"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Enter hash to store"
            disabled={loading}
          />
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
            onClick={handleStore}
            disabled={loading || !hash}
          >
            Store
          </button>
        </div>
        {message && <div className="mt-2 text-green-600">{message}</div>}
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium">
          Verify Certificate Hash
        </label>
        <div className="flex gap-2">
          <input
            className="border rounded px-2 py-1 flex-1"
            value={verifyHash}
            onChange={(e) => setVerifyHash(e.target.value)}
            placeholder="Enter hash to verify"
            disabled={loading}
          />
          <button
            className="bg-green-600 text-white px-4 py-1 rounded disabled:opacity-50"
            onClick={handleVerify}
            disabled={loading || !verifyHash}
          >
            Verify
          </button>
        </div>
        {verifyResult !== undefined && (
          <div className="mt-2">
            {verifyResult ? (
              <div className="text-green-700">
                <strong>Found!</strong> Owner: {verifyResult.owner}, Timestamp:{" "}
                {verifyResult.timestamp.toString()}
              </div>
            ) : (
              <div className="text-red-600">Not found.</div>
            )}
          </div>
        )}
      </div>
      <div>
        <h3 className="font-semibold mb-2">All Certificates</h3>
        <button
          className="mb-2 bg-gray-200 px-3 py-1 rounded"
          onClick={handleList}
          disabled={loading}
        >
          Refresh
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Hash</th>
                <th className="border px-2 py-1">Owner</th>
                <th className="border px-2 py-1">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map(([hash, cert]) => (
                <tr key={hash}>
                  <td className="border px-2 py-1">{hash}</td>
                  <td className="border px-2 py-1">{cert.owner}</td>
                  <td className="border px-2 py-1">
                    {cert.timestamp.toString()}
                  </td>
                </tr>
              ))}
              {certificates.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-2">
                    No certificates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
