import React, { useState, useContext, useRef, ChangeEvent } from 'react';
import { AppContext } from '../contexts/AppContext';
import { FormField, Stylist, Style, Product } from '../types';
import { extractColorsFromImage } from '../services/themeService';
import { initialSettings, initialFormFields, initialStylists, initialStyles, initialProducts } from '../data/initialData';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const {
    appSettings,
    updateSettings,
    formFields,
    updateFormFields,
    stylists,
    updateStylists,
    styles,
    updateStyles,
    products,
    updateProducts,
    blockedDates,
    addBlockedDate,
    removeBlockedDate,
    bookings,
    updatePassword,
    logout
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('general');
  const [localSettings, setLocalSettings] = useState(appSettings);
  const [localFormFields, setLocalFormFields] = useState(formFields);
  const [localStylists, setLocalStylists] = useState(stylists);
  const [localStyles, setLocalStyles] = useState(styles);
  const [localProducts, setLocalProducts] = useState(products);
  const [newPasswordField, setNewPasswordField] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [calendarDate, setCalendarDate] = useState(new Date());


  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checkedValue = (e.target as HTMLInputElement).checked;

    const keys = name.split('.');
    if (keys.length === 2) {
      setLocalSettings(prev => ({
        ...prev,
        pages: {
          ...prev.pages,
          [keys[0]]: {
            ...prev.pages[keys[0] as keyof typeof prev.pages],
            [keys[1]]: value,
          },
        },
      }));
    } else {
      setLocalSettings(prev => ({ ...prev, [name]: isCheckbox ? checkedValue : value }));
    }
  };

  const handleLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target && typeof event.target.result === 'string') {
          const imageUrl = event.target.result;
          setLocalSettings(prev => ({ ...prev, logoUrl: imageUrl }));
          try {
            const theme = await extractColorsFromImage(imageUrl);
            setLocalSettings(prev => ({ ...prev, theme }));
          } catch (error) {
            console.error("Failed to extract colors:", error);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleStylistChange = (index: number, field: keyof Stylist, value: string) => {
      const newStylists = [...localStylists];
      newStylists[index] = { ...newStylists[index], [field]: value };
      setLocalStylists(newStylists);
  };

  const handleStylistImageUpload = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target && typeof event.target.result === 'string') {
                handleStylistChange(index, 'imageUrl', event.target.result);
            }
        };
        reader.readAsDataURL(file);
    }
  };

  const addStylist = () => {
      setLocalStylists([...localStylists, { id: `stylist_${Date.now()}`, name: 'New Stylist', imageUrl: 'https://via.placeholder.com/150', username: '', password: '' }]);
  };
  
  const removeStylist = (index: number) => {
      setLocalStylists(localStylists.filter((_, i) => i !== index));
  };
  
  const togglePasswordVisibility = (stylistId: string) => {
    setPasswordVisibility(prev => ({...prev, [stylistId]: !prev[stylistId]}));
  };

  const handleStyleChange = (index: number, field: keyof Style, value: string) => {
      const newStyles = [...localStyles];
      newStyles[index] = { ...newStyles[index], [field]: value as Style['category'] };
      setLocalStyles(newStyles);
  };

  const addStyle = () => {
      setLocalStyles([...localStyles, { id: `style_${Date.now()}`, name: 'New Style', imageUrl: 'https://via.placeholder.com/300', category: 'Female' }]);
  };
  
  const removeStyle = (index: number) => {
      setLocalStyles(localStyles.filter((_, i) => i !== index));
  };
  
  const handleProductChange = (index: number, field: keyof Product, value: string | number) => {
      const newProducts = [...localProducts];
      newProducts[index] = { ...newProducts[index], [field]: value };
      setLocalProducts(newProducts);
  };

  const addProduct = () => {
      setLocalProducts([...localProducts, { id: `product_${Date.now()}`, name: 'New Product', price: 0, imageUrl: 'https://via.placeholder.com/300', description: 'Product description', category: 'General' }]);
  };
  
  const removeProduct = (index: number) => {
      setLocalProducts(localProducts.filter((_, i) => i !== index));
  };

  const handleFormFieldChange = (index: number, field: keyof FormField, value: string | boolean | string[]) => {
    const newFields = [...localFormFields];
    (newFields[index] as any)[field] = value;
    setLocalFormFields(newFields);
  };
  
  const addFormField = () => {
    setLocalFormFields([...localFormFields, { id: `field_${Date.now()}`, label: 'New Field', type: 'text', required: false }]);
  };

  const removeFormField = (index: number) => {
    setLocalFormFields(localFormFields.filter((_, i) => i !== index));
  };
  
  const handleTimeSlotsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const timeSlots = e.target.value.split('\n').filter(slot => slot.trim() !== '');
    setLocalSettings(prev => ({...prev, timeSlots}));
  };
  
  const handleDateBlockToggle = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    if (blockedDates.includes(dateString)) {
        removeBlockedDate(dateString);
    } else {
        addBlockedDate(dateString);
    }
  };

  const handleSaveChanges = () => {
    updateSettings(localSettings);
    updateFormFields(localFormFields);
    updateStylists(localStylists);
    updateStyles(localStyles);
    updateProducts(localProducts);
    if(newPasswordField) {
      updatePassword(newPasswordField);
    }
    alert('Changes saved successfully!');
    onClose();
  };
  
  const resetToDefaults = () => {
    if(window.confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
        updateSettings(initialSettings);
        updateFormFields(initialFormFields);
        updateStylists(initialStylists);
        updateStyles(initialStyles);
        updateProducts(initialProducts);
        setLocalSettings(initialSettings);
        setLocalFormFields(initialFormFields);
        setLocalStylists(initialStylists);
        setLocalStyles(initialStyles);
        setLocalProducts(initialProducts);
        // Note: Blocked dates are not reset here, assuming manual management is preferred.
        alert('Settings have been reset to default.');
    }
  }
  
  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className="mt-1 block w-full bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
  );

  const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} className="mt-1 block w-full bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" />
  );

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-sm font-medium text-gray-700">{children}</label>
  );

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h4 className="font-semibold text-gray-800 text-lg mb-3">{title}</h4>
        <div className="space-y-4">{children}</div>
    </div>
  );

  // Mini Calendar for Booking Tab
  const MiniCalendar: React.FC = () => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const changeMonth = (offset: number) => {
        setCalendarDate(new Date(year, month + offset, 1));
    };
    
    const today = new Date();
    today.setHours(0,0,0,0);

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="p-1"></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateString = date.toISOString().split('T')[0];
            const isBlocked = blockedDates.includes(dateString);
            const isPast = date < today;

            days.push(
                <button 
                    key={day} 
                    onClick={() => handleDateBlockToggle(date)}
                    disabled={isPast}
                    className={`p-1 text-center rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors duration-200 ${
                        isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-200'
                    } ${isBlocked ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="mt-2">
            <div className="flex justify-between items-center mb-2">
                <button onClick={() => changeMonth(-1)} className="px-2 py-1 rounded-md hover:bg-gray-100">&larr;</button>
                <h3 className="font-semibold text-sm">{monthNames[month]} {year}</h3>
                <button onClick={() => changeMonth(1)} className="px-2 py-1 rounded-md hover:bg-gray-100">&rarr;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
                {daysOfWeek.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 place-items-center">
                {renderDays()}
            </div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-[9998] p-4">
      <div className="bg-gray-50 rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b bg-white rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800 font-serif">Admin Panel</h2>
          <div>
            <button onClick={resetToDefaults} className="text-xs text-red-600 hover:text-red-800 mr-4">Reset All</button>
            <button onClick={onClose} className="text-gray-500 text-2xl hover:text-gray-800">&times;</button>
          </div>
        </div>
        
        <div className="flex flex-grow overflow-hidden">
          {/* Sidebar */}
          <nav className="w-1/5 bg-white p-4 border-r">
            <ul className="space-y-1">
              {['general', 'content', 'booking', 'view bookings', 'stylists', 'styles', 'shop', 'form', 'security'].map(tab => (
                <li key={tab}>
                  <button onClick={() => setActiveTab(tab)} className={`w-full text-left p-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab ? 'text-white' : 'text-gray-700 hover:bg-gray-100'}`} style={{backgroundColor: activeTab === tab ? `rgba(var(--color-primary))` : 'transparent'}}>
                    <span className="capitalize">{tab}</span>
                  </button>
                </li>
              ))}
                <li><button onClick={logout} className="w-full text-left p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 mt-4">Logout</button></li>
            </ul>
          </nav>

          {/* Content */}
          <div className="w-4/5 p-6 overflow-y-auto bg-gray-100/50">
            {activeTab === 'general' && (
              <div className="space-y-6">
                 <Section title="General Settings">
                  <div>
                    <Label>Brand Name</Label>
                    <Input type="text" name="brandName" value={localSettings.brandName} onChange={handleSettingsChange}/>
                  </div>
                  <div>
                    <Label>Logo</Label>
                    <div className="mt-1 flex items-center gap-4">
                      <img src={localSettings.logoUrl} alt="Logo Preview" className="h-12 w-12 object-contain rounded-md bg-gray-100 p-1"/>
                      <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden"/>
                      <button onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Change Logo</button>
                    </div>
                     <p className="text-xs text-gray-500 mt-1">Uploading a new logo will automatically update the website's color theme.</p>
                  </div>
                </Section>
              </div>
            )}
            
            {activeTab === 'content' && (
              <div className="space-y-6">
                <Section title="Home Page">
                    <Input type="text" name="home.heroImageUrl" value={localSettings.pages.home.heroImageUrl} onChange={handleSettingsChange} placeholder="Hero Image URL"/>
                    <Input type="text" name="home.heading" value={localSettings.pages.home.heading} onChange={handleSettingsChange} placeholder="Heading"/>
                    <Input type="text" name="home.subheading" value={localSettings.pages.home.subheading} onChange={handleSettingsChange} placeholder="Subheading"/>
                </Section>
                <Section title="About & Contact Page">
                    <Input type="text" name="about.heading" value={localSettings.pages.about.heading} onChange={handleSettingsChange} placeholder="Heading"/>
                    <Textarea name="about.content" value={localSettings.pages.about.content} onChange={handleSettingsChange} rows={4} placeholder="Main Content"></Textarea>
                    <Input type="email" name="about.email" value={localSettings.pages.about.email} onChange={handleSettingsChange} placeholder="Email"/>
                    <Input type="tel" name="about.phone" value={localSettings.pages.about.phone} onChange={handleSettingsChange} placeholder="Phone"/>
                    <Input type="text" name="about.address" value={localSettings.pages.about.address} onChange={handleSettingsChange} placeholder="Address"/>
                </Section>
              </div>
            )}
            
            {activeTab === 'booking' && (
              <div className="space-y-6">
                <Section title="Booking Settings">
                   <div className="flex items-center">
                       <input 
                         type="checkbox"
                         id="enableStylistSelection"
                         name="enableStylistSelection"
                         checked={localSettings.enableStylistSelection}
                         onChange={handleSettingsChange}
                         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                       />
                       <label htmlFor="enableStylistSelection" className="ml-2 block text-sm text-gray-900">
                           Allow clients to select a specific stylist
                       </label>
                   </div>
                </Section>
                <Section title="Available Time Slots">
                    <p className="text-xs text-gray-500 -mt-2 mb-2">Enter one time slot per line. These will be shown to users.</p>
                    <Textarea 
                        value={(localSettings.timeSlots || []).join('\n')} 
                        onChange={handleTimeSlotsChange} 
                        rows={8} 
                        className="font-mono text-sm" 
                        placeholder={"09:00 AM\n10:00 AM\n11:00 AM..."}/>
                </Section>
                <Section title="Block Dates">
                    <p className="text-xs text-gray-500 -mt-2 mb-2">Click on a date to block or unblock it. Changes are saved instantly.</p>
                    <MiniCalendar />
                </Section>
              </div>
            )}
            
            {activeTab === 'view bookings' && (
                <Section title="Client Bookings">
                  <div className="space-y-3">
                    {bookings.length > 0 ? bookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(booking => {
                        const stylist = stylists.find(s => s.id === booking.stylistId);
                        return (
                          <div key={booking.id} className="p-3 border rounded-md bg-gray-50">
                              <p className="font-semibold">{booking.date} at {booking.timeSlot} with {stylist?.name || 'N/A'}</p>
                              <p className="text-sm text-gray-600">Client: {booking.formData.name} ({booking.formData.email})</p>
                          </div>
                        )
                    }) : <p className="text-gray-500">No bookings yet.</p>}
                  </div>
                </Section>
            )}

            {activeTab === 'stylists' && (
                <Section title="Manage Stylists">
                    <div className="space-y-3">
                        {localStylists.map((stylist, index) => (
                            <div key={stylist.id} className="p-3 border rounded-md space-y-3">
                                <Input type="text" value={stylist.name} onChange={(e) => handleStylistChange(index, 'name', e.target.value)} placeholder="Stylist Name" />
                                <div>
                                    <div className="mt-1 flex items-center gap-4">
                                        <img src={stylist.imageUrl} alt={stylist.name} className="h-12 w-12 object-cover rounded-full bg-gray-100 p-1"/>
                                        <input type="file" id={`stylist-img-${index}`} onChange={(e) => handleStylistImageUpload(e, index)} accept="image/*" className="hidden"/>
                                        <button type="button" onClick={() => document.getElementById(`stylist-img-${index}`)?.click()} className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Upload Image</button>
                                    </div>
                                    <Input type="text" value={stylist.imageUrl} onChange={(e) => handleStylistChange(index, 'imageUrl', e.target.value)} placeholder="Or paste Image URL" className="mt-2" />
                                </div>
                                <Input type="text" value={stylist.username} onChange={(e) => handleStylistChange(index, 'username', e.target.value)} placeholder="Username" />
                                <div className="relative">
                                    <Input 
                                      type={passwordVisibility[stylist.id] ? 'text' : 'password'} 
                                      value={stylist.password} 
                                      onChange={(e) => handleStylistChange(index, 'password', e.target.value)} 
                                      placeholder="Password" />
                                    <button 
                                      type="button" 
                                      onClick={() => togglePasswordVisibility(stylist.id)} 
                                      className="absolute inset-y-0 right-0 px-3 flex items-center text-xs text-gray-600 hover:text-gray-900">
                                        {passwordVisibility[stylist.id] ? 'Hide' : 'Show'}
                                    </button>
                                </div>

                                <div className="text-right">
                                    <button onClick={() => removeStylist(index)} className="text-red-500 text-sm hover:text-red-700">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={addStylist} className="mt-4 px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white" style={{ backgroundColor: `rgba(var(--color-secondary))` }}>Add Stylist</button>
                </Section>
            )}

            {activeTab === 'styles' && (
                <Section title="Manage Styles">
                    <div className="space-y-3">
                        {localStyles.map((style, index) => (
                            <div key={style.id} className="p-3 border rounded-md space-y-2">
                                <Input type="text" value={style.name} onChange={(e) => handleStyleChange(index, 'name', e.target.value)} placeholder="Style Name" />
                                <select value={style.category} onChange={(e) => handleStyleChange(index, 'category', e.target.value)} className="mt-1 block w-full bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm p-2">
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                                <Input type="text" value={style.imageUrl} onChange={(e) => handleStyleChange(index, 'imageUrl', e.target.value)} placeholder="Image URL" />
                                <div className="text-right">
                                    <button onClick={() => removeStyle(index)} className="text-red-500 text-sm hover:text-red-700">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={addStyle} className="mt-4 px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white" style={{ backgroundColor: `rgba(var(--color-secondary))` }}>Add Style</button>
                </Section>
            )}
            
            {activeTab === 'shop' && (
                <div className="space-y-6">
                    <Section title="Shop Settings">
                        <Label>Currency Symbol</Label>
                        <Input type="text" name="currencySymbol" value={localSettings.currencySymbol || '£'} onChange={handleSettingsChange} />
                    </Section>
                    <Section title="Manage Products">
                        <div className="space-y-3">
                            {localProducts.map((product, index) => (
                                <div key={product.id} className="p-3 border rounded-md space-y-2">
                                    <Input type="text" value={product.name} onChange={(e) => handleProductChange(index, 'name', e.target.value)} placeholder="Product Name" />
                                    <Input type="text" value={product.category} onChange={(e) => handleProductChange(index, 'category', e.target.value)} placeholder="Product Category (e.g., Hair Care)" />
                                    <Input type="number" value={product.price} onChange={(e) => handleProductChange(index, 'price', parseFloat(e.target.value) || 0)} placeholder="Price" />
                                    <Input type="text" value={product.imageUrl} onChange={(e) => handleProductChange(index, 'imageUrl', e.target.value)} placeholder="Image URL" />
                                    <Textarea value={product.description} onChange={(e) => handleProductChange(index, 'description', e.target.value)} placeholder="Description" rows={2}></Textarea>
                                    <div className="text-right">
                                        <button onClick={() => removeProduct(index)} className="text-red-500 text-sm hover:text-red-700">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={addProduct} className="mt-4 px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white" style={{ backgroundColor: `rgba(var(--color-secondary))` }}>Add Product</button>
                    </Section>
                </div>
            )}

            {activeTab === 'form' && (
              <Section title="Booking Form Fields">
                <div className="space-y-3">
                  {localFormFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-3 gap-2 p-3 border rounded-md">
                        <Input type="text" value={field.label} onChange={(e) => handleFormFieldChange(index, 'label', e.target.value)} className="col-span-2" placeholder="Field Label"/>
                        <select value={field.type} onChange={(e) => handleFormFieldChange(index, 'type', e.target.value)} className="bg-white text-gray-900 border border-gray-300 rounded-md p-1.5 h-full">
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="tel">Phone</option>
                            <option value="textarea">Text Area</option>
                            <option value="select">Select</option>
                        </select>
                        {field.type === 'select' && <Textarea value={field.options?.join('\n')} onChange={(e) => handleFormFieldChange(index, 'options', e.target.value.split('\n'))} className="col-span-3" placeholder="Options (one per line)"/>}
                        <div className="col-span-3 flex justify-between items-center mt-1">
                            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={field.required} onChange={(e) => handleFormFieldChange(index, 'required', e.target.checked)}/> Required</label>
                            <button onClick={() => removeFormField(index)} className="text-red-500 text-sm hover:text-red-700">Remove</button>
                        </div>
                    </div>
                  ))}
                </div>
                <button onClick={addFormField} className="mt-4 px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white" style={{backgroundColor: `rgba(var(--color-secondary))`}}>Add Field</button>
              </Section>
            )}
            
            {activeTab === 'security' && (
               <Section title="Security">
                <div>
                    <Label>New Admin Password</Label>
                    <Input type="password" value={newPasswordField} onChange={(e) => setNewPasswordField(e.target.value)} placeholder="Enter new password"/>
                     <p className="text-xs text-gray-500 mt-1">Leave blank to keep the current password.</p>
                  </div>
               </Section>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t bg-white flex justify-end rounded-b-lg">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 mr-2">Cancel</button>
          <button onClick={handleSaveChanges} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white" style={{backgroundColor: `rgba(var(--color-primary))`}}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;