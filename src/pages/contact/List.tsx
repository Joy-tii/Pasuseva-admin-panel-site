import React, { useEffect, useState } from 'react';

interface ContactItem {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const ContactList = () => {
  const [data, setData] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4013/api/contact')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-white)] text-[var(--text-primary)] p-6">
      <h1 className="text-3xl font-bold text-[var(--pasuseva-orange)] mb-8">Contact Queries</h1>

      {loading ? (
        <p className="text-[var(--pasuseva-orange)] text-lg">Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border border-[var(--pasuseva-green)]">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-[var(--pasuseva-green)] text-white uppercase text-left">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-[#fff9db]  transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{item.email}</td>
                  <td className="px-6 py-4">{item.message}</td>
                  <td className="px-6 py-4">{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-[var(--pasuseva-orange)]">
                    No contact queries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactList;
