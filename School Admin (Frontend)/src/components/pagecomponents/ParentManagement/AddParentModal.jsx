import { useState } from 'react';

const AddParentModal = ({ isOpen, onClose, onAddParent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    children: '',
    route: 'Route 1 (Green Valley)',
    bus: 'Bus 12',
    status: 'Active',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const names = formData.name.trim().split(' ');
    const initials = names.length >= 2
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : formData.name.slice(0, 2).toUpperCase();

    const childrenArray = formData.children
      ? formData.children.split(',').map((c) => {
          const parts = c.trim().split('(');
          const name = parts[0].trim();
          const grade = parts[1] ? parts[1].replace(')', '').trim() : 'Grade 5';
          return { name, grade };
        })
      : [{ name: 'New Student', grade: 'Grade 5' }];

    onAddParent({
      ...formData,
      initials,
      avatarBg: 'bg-blue-100 text-blue-600',
      children: childrenArray,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" x2="20" y1="8" y2="14"></line>
                <line x1="23" x2="17" y1="11" y2="11"></line>
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900">Add New Parent</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-base"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Sana Ahmed"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="sana.ahmed@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="text"
                required
                placeholder="+92 300 1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Linked Children (Name (Grade))</label>
            <input
              type="text"
              placeholder="e.g. Ayesha Khan (Grade 5), Zoya Malik (Grade 5)"
              value={formData.children}
              onChange={(e) => setFormData({ ...formData, children: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Route</label>
              <select
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 cursor-pointer"
              >
                <option value="Route 1 (Green Valley)">Route 1 (Green Valley)</option>
                <option value="Route 2 (Model Town)">Route 2 (Model Town)</option>
                <option value="Route 3 (University)">Route 3 (University)</option>
                <option value="Route 4 (Johar Town)">Route 4 (Johar Town)</option>
                <option value="Route 5 (Canal Road)">Route 5 (Canal Road)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Bus</label>
              <select
                value={formData.bus}
                onChange={(e) => setFormData({ ...formData, bus: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 cursor-pointer"
              >
                <option value="Bus 12">Bus 12</option>
                <option value="Bus 07">Bus 07</option>
                <option value="Bus 09">Bus 09</option>
                <option value="Bus 15">Bus 15</option>
                <option value="Bus 18">Bus 18</option>
                <option value="Bus 05">Bus 05</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm"
            >
              Save Parent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddParentModal;
