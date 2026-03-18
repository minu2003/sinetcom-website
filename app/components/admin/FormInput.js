export default function FormInput({ label, type = 'text', name, value, onChange, placeholder, required = false, className = '' }) {
  const baseClasses = "block w-full rounded-xl border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-blue-500 focus:bg-white focus:ring-blue-500 sm:text-sm py-2.5 px-3 transition-colors";
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={baseClasses}
        />
      )}
    </div>
  );
}
