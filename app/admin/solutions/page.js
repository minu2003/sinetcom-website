'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { db } from '../../firebase/firebaseClient';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import FormInput from '../../components/admin/FormInput';
import SelectDropdown from '../../components/admin/SelectDropdown';
import SearchBar from '../../components/admin/SearchBar';
import ImageUpload from '../../components/admin/ImageUpload';

export default function SolutionsAdmin() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '', shortTitle: '', description: '', type: 'Sophos', category: '', url: '', image: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'solutions'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(items);
      } catch (error) {
        console.error("Error fetching solutions: ", error);
        setData([]);
      }
    };
    fetchData();
  }, []);

  // Derived filtered data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter ? item.type === typeFilter : true;
      const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [data, searchTerm, typeFilter, categoryFilter]);

  // Handlers
  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        shortTitle: item.shortTitle || '',
        description: item.description || '',
        type: item.type,
        category: item.category || '',
        url: item.url || '',
        image: item.image
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '', shortTitle: '', description: '', type: 'Sophos', category: '', url: '', image: null
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      try {
        if (typeof item.id === 'string') {
          await deleteDoc(doc(db, 'solutions', item.id));
        }
        setData(data.filter(d => d.id !== item.id));
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanData = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== undefined));
      if (editingItem) {
        if (typeof editingItem.id === 'string') {
          const itemRef = doc(db, 'solutions', editingItem.id);
          await updateDoc(itemRef, cleanData);
        }
        setData(data.map(d => d.id === editingItem.id ? { ...d, ...cleanData } : d));
      } else {
        const docRef = await addDoc(collection(db, 'solutions'), cleanData);
        setData([...data, { id: docRef.id, ...cleanData }]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Firebase error: " + error.message + "\n(Hint: Check your Firestore Security Rules if permission is denied!)");
    }
  };

  const columns = [
    { title: 'Image' },
    { title: 'Title' },
    { title: 'Type' },
    { title: 'Category' },
  ];

  const renderRow = (item) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-10 w-16 bg-gray-100 rounded-md overflow-hidden relative border border-gray-200">
          {item.image ? (
            <Image src={item.image} alt={item.title} fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full w-full text-xs text-gray-400">No Img</div>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-semibold text-gray-900">{item.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          {item.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.type === 'Sophos' ? '-' : item.category}
      </td>
    </>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solutions Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage solutions, filtered by Type and Category.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="w-5 h-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Solution
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4">
        <SearchBar 
          placeholder="Search solutions by title..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <SelectDropdown 
          name="typeFilter" 
          value={typeFilter} 
          onChange={(e) => setTypeFilter(e.target.value)} 
          options={[{label: 'All Types', value: ''}, {label: 'Sophos', value: 'Sophos'}, {label: 'StorONE', value: 'StorONE'}, {label: 'Huawei', value: 'Huawei'}]}
          className="w-full md:w-48 mb-0"
        />
        <SelectDropdown 
          name="catFilter" 
          value={categoryFilter} 
          onChange={(e) => setCategoryFilter(e.target.value)} 
          options={[{label: 'All Categories', value: ''}, {label: 'Backup', value: 'Backup'}, {label: 'UPS', value: 'UPS'}, {label: 'Smart Server Rack', value: 'Smart Server Rack'}]}
          className="w-full md:w-56 mb-0"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={filteredData} 
        onEdit={handleOpenModal} 
        onDelete={handleDelete} 
        renderRow={renderRow} 
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "Edit Solution" : "Add New Solution"}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectDropdown 
              label="Solution Type" 
              name="type" 
              value={formData.type} 
              onChange={(e) => setFormData({...formData, type: e.target.value, category: e.target.value === 'Sophos' ? '' : formData.category})} 
              options={[{label: 'Sophos', value: 'Sophos'}, {label: 'StorONE', value: 'StorONE'}, {label: 'Huawei', value: 'Huawei'}]}
              required
            />
            
            {formData.type !== 'Sophos' && (
              <SelectDropdown 
                label="Category" 
                name="category" 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})} 
                options={[{label: 'Backup', value: 'Backup'}, {label: 'UPS', value: 'UPS'}, {label: 'Smart Server Rack', value: 'Smart Server Rack'}]}
                required
              />
            )}
            
            <FormInput 
              label="Title" 
              name="title" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              required 
              className={formData.type !== 'Sophos' ? 'md:col-span-2' : ''}
            />
            
            <FormInput 
              label="Short Title (Optional)" 
              name="shortTitle" 
              value={formData.shortTitle} 
              onChange={(e) => setFormData({...formData, shortTitle: e.target.value})} 
            />
            
            <FormInput 
              label="URL" 
              name="url" 
              value={formData.url} 
              onChange={(e) => setFormData({...formData, url: e.target.value})} 
            />
            
            <div className="md:col-span-2">
              <FormInput 
                label="Description" 
                name="description" 
                type="textarea"
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
              />
            </div>
            
            <div className="md:col-span-2">
              <ImageUpload 
                label="Solution Image" 
                initialImage={formData.image}
                onChange={(url) => setFormData({...formData, image: url})} 
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {editingItem ? 'Save Changes' : 'Create Solution'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
