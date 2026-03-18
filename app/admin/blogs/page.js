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

export default function BlogsAdmin() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '', slug: '', author: 'Admin User', publishDate: new Date().toISOString().split('T')[0], status: 'Draft', content: '', metaTitle: '', metaDescription: '', image: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(items);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
        setData([]);
      }
    };
    fetchData();
  }, []);

  // Derived filtered & sorted data
  const processedData = useMemo(() => {
    let filtered = data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    filtered.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    return filtered;
  }, [data, searchTerm]);

  // Auto-generate slug when title changes (only if it's a new post or slug is empty/auto-generated)
  useEffect(() => {
    if (!editingItem) {
      const generatedSlug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, editingItem]);

  // Handlers
  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        slug: item.slug,
        author: item.author,
        publishDate: item.publishDate,
        status: item.status,
        content: item.content || '',
        metaTitle: item.metaTitle || '',
        metaDescription: item.metaDescription || '',
        image: item.image
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '', slug: '', author: 'Admin User', publishDate: new Date().toISOString().split('T')[0], status: 'Draft', content: '', metaTitle: '', metaDescription: '', image: null
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (confirm(`Are you sure you want to delete blog "${item.title}"?`)) {
      try {
        if (typeof item.id === 'string') {
          await deleteDoc(doc(db, 'blogs', item.id));
        }
        setData(data.filter(d => d.id !== item.id));
      } catch (error) {
        console.error("Error deleting blog: ", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanData = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== undefined));
      if (editingItem) {
        if (typeof editingItem.id === 'string') {
          const itemRef = doc(db, 'blogs', editingItem.id);
          await updateDoc(itemRef, cleanData);
        }
        setData(data.map(d => d.id === editingItem.id ? { ...d, ...cleanData } : d));
      } else {
        const docRef = await addDoc(collection(db, 'blogs'), cleanData);
        setData([...data, { id: docRef.id, ...cleanData }]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving blog: ", error);
      alert("Firebase error: " + error.message + "\n(Hint: Check your Firestore Security Rules if permission is denied!)");
    }
  };

  const columns = [
    { title: 'Cover' },
    { title: 'Blog Title' },
    { title: 'Author' },
    { title: 'Publish Date' },
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
        <div className="text-sm font-semibold text-gray-900 line-clamp-1">{item.title}</div>
        <div className="text-xs text-gray-400 mt-1">/{item.slug}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.author}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(item.publishDate).toLocaleDateString()}
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
          <h1 className="text-2xl font-bold text-gray-900">Blogs Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage articles, news, and insights.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="w-5 h-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Blog
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex gap-4">
        <SearchBar 
          placeholder="Search blogs by title..." 
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "Edit Blog Post" : "Add New Blog Post"}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div className="md:col-span-2">
              <FormInput 
                label="Post Title" 
                name="title" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                required 
              />
            </div>

            <div className="md:col-span-2">
              <FormInput 
                label="URL Slug" 
                name="slug" 
                value={formData.slug} 
                onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                required 
                className="font-mono text-sm"
              />
            </div>
            
            <FormInput 
              label="Author" 
              name="author" 
              value={formData.author} 
              onChange={(e) => setFormData({...formData, author: e.target.value})} 
              required
            />

            <FormInput 
              label="Publish Date" 
              name="publishDate" 
              type="date"
              value={formData.publishDate} 
              onChange={(e) => setFormData({...formData, publishDate: e.target.value})} 
              required
            />
            
            <div className="md:col-span-2">
              <FormInput 
                label="Post Content" 
                name="content" 
                type="textarea"
                value={formData.content} 
                onChange={(e) => setFormData({...formData, content: e.target.value})} 
                className="h-32"
              />
            </div>
            
            <div className="md:col-span-2">
              <ImageUpload 
                label="Cover Image" 
                initialImage={formData.image}
                onChange={(url) => setFormData({...formData, image: url})} 
              />
            </div>

            <hr className="md:col-span-2 my-4 border-gray-200" />
            <div className="md:col-span-2 mb-2">
              <h4 className="text-sm font-semibold text-gray-900">SEO Meta Data</h4>
            </div>

            <FormInput 
              label="Meta Title (Optional)" 
              name="metaTitle" 
              value={formData.metaTitle} 
              onChange={(e) => setFormData({...formData, metaTitle: e.target.value})} 
            />
            
            <FormInput 
              label="Meta Description (Optional)" 
              name="metaDescription" 
              value={formData.metaDescription} 
              onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} 
            />

          </div>
          
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 flex-row border bg-gray-50 p-1.5 rounded-xl">
               <button 
                  type="button" 
                  onClick={() => setFormData({...formData, status: 'Draft'})}
                  className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${formData.status === 'Draft' ? 'bg-white shadow-sm text-gray-900 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 Draft
               </button>
               <button 
                  type="button" 
                  onClick={() => setFormData({...formData, status: 'Published'})}
                  className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${formData.status === 'Published' ? 'bg-white shadow-sm text-green-700 border border-green-200' : 'text-gray-500 hover:text-green-600'}`}
               >
                 Published
               </button>
            </div>
            <div className="flex gap-2 relative z-50">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm transition-colors"
              >
                {editingItem ? 'Save Changes' : 'Create Blog'}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
