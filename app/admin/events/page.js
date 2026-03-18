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
import StatusBadge from '../../components/admin/StatusBadge';

export default function EventsAdmin() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '', date: '', location: '', status: 'Upcoming', description: '', image: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(items);
      } catch (error) {
        console.error("Error fetching events: ", error);
        setData([]);
      }
    };
    fetchData();
  }, []);

  // Derived filtered & sorted data
  const processedData = useMemo(() => {
    let filtered = data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Sort by latest date descending
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return filtered;
  }, [data, searchTerm]);

  // Handlers
  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        date: item.date,
        location: item.location,
        status: item.status,
        description: item.description || '',
        image: item.image
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '', date: '', location: '', status: 'Upcoming', description: '', image: null
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (confirm(`Are you sure you want to delete event "${item.title}"?`)) {
      try {
        if (typeof item.id === 'string') {
          await deleteDoc(doc(db, 'events', item.id));
        }
        setData(data.filter(d => d.id !== item.id));
      } catch (error) {
        console.error("Error deleting event: ", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanData = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== undefined));
      if (editingItem) {
        if (typeof editingItem.id === 'string') {
          const itemRef = doc(db, 'events', editingItem.id);
          await updateDoc(itemRef, cleanData);
        }
        setData(data.map(d => d.id === editingItem.id ? { ...d, ...cleanData } : d));
      } else {
        const docRef = await addDoc(collection(db, 'events'), cleanData);
        setData([...data, { id: docRef.id, ...cleanData }]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving event: ", error);
      alert("Firebase error: " + error.message + "\n(Hint: Check your Firestore Security Rules if permission is denied!)");
    }
  };

  const columns = [
    { title: 'Image' },
    { title: 'Event Title' },
    { title: 'Date' },
    { title: 'Location' },
    { title: 'Status' },
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
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.location}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={item.status} />
      </td>
    </>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage corporate events, webinars, and summits.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="w-5 h-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Event
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex gap-4">
        <SearchBar 
          placeholder="Search events by title..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 max-w-md"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={processedData} 
        onEdit={handleOpenModal} 
        onDelete={handleDelete} 
        renderRow={renderRow} 
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "Edit Event" : "Add New Event"}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <FormInput 
                label="Event Title" 
                name="title" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                required 
              />
            </div>
            
            <FormInput 
              label="Date" 
              name="date" 
              type="date"
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})} 
              required
            />
            
            <FormInput 
              label="Location" 
              name="location" 
              value={formData.location} 
              onChange={(e) => setFormData({...formData, location: e.target.value})} 
              required
            />
            
            <div className="md:col-span-2">
              <SelectDropdown 
                label="Status" 
                name="status" 
                value={formData.status} 
                onChange={(e) => setFormData({...formData, status: e.target.value})} 
                options={[{label: 'Upcoming', value: 'Upcoming'}, {label: 'Past', value: 'Past'}]}
                required
              />
            </div>
            
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
                label="Event Banner" 
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
              {editingItem ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
