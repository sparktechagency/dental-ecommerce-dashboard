import React, { useState, useEffect } from 'react';
import { Mail, Plus, X, Phone } from 'lucide-react';
import PageHeading from '../../shared/PageHeading';
import {
  useAddEmailMutation,
  useAddPhonesMutation,
  useDeleteEmailMutation,
  useDeletePhoneMutation,
  useGetContactUsQuery,
  useUpdateSocialLinkMutation,
} from '../redux/api/metaDataApi';

const ContactForm = () => {
  const { data: contactUs, isLoading: isContactLoading } = useGetContactUsQuery();
  const [addEmails, { isLoading: isEmailLoading, error: emailError }] = useAddEmailMutation();
  const [addPhones, { isLoading: isPhoneLoading, error: phoneError }] = useAddPhonesMutation();
  const [deleteEmail, { isLoading: isDeleteEmailLoading, error: deleteEmailError }] = useDeleteEmailMutation();
  const [deletePhone, { isLoading: isDeletePhoneLoading, error: deletePhoneError }] = useDeletePhoneMutation();
  const [updateSocialLink, { isLoading: isSocialLoading, error: socialError }] = useUpdateSocialLinkMutation();

  // State for emails, phones, and socials
  const [emails, setEmails] = useState([
    { id: '1', value: '', disabled: true },
    { id: '2', value: '', disabled: true },
  ]);

  const [phones, setPhones] = useState([
    { id: '1', value: '', disabled: true },
    { id: '2', value: '', disabled: true },
  ]);

  const [socials, setSocials] = useState([
    { id: '1', platform: 'facebook', value: '' },
    { id: '2', platform: 'twitter', value: '' },
    { id: '3', platform: 'instagram', value: '' },
  ]);

  // Populate form fields with contactUs data
  useEffect(() => {
    if (contactUs) {
      // Set emails
      if (contactUs.emails?.length > 0) {
        setEmails(
          contactUs.emails.map((email, index) => ({
            id: `${index + 1}`,
            value: email,
            disabled: true,
          }))
        );
      }
      // Set phones
      if (contactUs.phone?.length > 0) {
        setPhones(
          contactUs.phone.map((phone, index) => ({
            id: `${index + 1}`,
            value: phone,
            disabled: true,
          }))
        );
      }
      // Set socials
      setSocials([
        { id: '1', platform: 'facebook', value: contactUs.facebook || '' },
        { id: '2', platform: 'twitter', value: contactUs.twitter || '' },
        { id: '3', platform: 'instagram', value: contactUs.instagram || '' },
      ]);
    }
  }, [contactUs]);

  // Email Handlers
  const addEmailField = () => {
    const newEmail = { id: Date.now().toString(), value: '', disabled: false };
    setEmails([...emails, newEmail]);
  };

  const removeEmailField = async (id) => {
    if (emails.length > 1) {
      const emailToDelete = emails.find((email) => email.id === id);
      if (emailToDelete.value) {
        try {
          await deleteEmail({ items: [emailToDelete.value] }).unwrap();
          setEmails(emails.filter((email) => email.id !== id));
          alert('Email deleted successfully!');
        } catch (err) {
          console.error('Email deletion error:', err);
          alert('Failed to delete email. Please try again.');
        }
      } else {
        // Remove empty fields without API call
        setEmails(emails.filter((email) => email.id !== id));
      }
    }
  };

  const updateEmailField = (id, value) => {
    setEmails(
      emails.map((email) =>
        email.id === id && !email.disabled ? { ...email, value } : email
      )
    );
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const data = { emails: emails.map((email) => email.value).filter((value) => value) };
    try {
      await addEmails(data).unwrap();
      setEmails(emails.map((email) => ({ ...email, disabled: true })));
      alert('Emails updated successfully!');
    } catch (err) {
      console.error('Email submission error:', err);
      alert('Failed to update emails. Please try again.');
    }
  };

  // Phone Handlers
  const addPhoneField = () => {
    const newPhone = { id: Date.now().toString(), value: '', disabled: false };
    setPhones([...phones, newPhone]);
  };

  const removePhoneField = async (id) => {
    if (phones.length > 1) {
      const phoneToDelete = phones.find((phone) => phone.id === id);
      if (phoneToDelete.value) {
        try {
          await deletePhone({ items: [phoneToDelete.value] }).unwrap();
          setPhones(phones.filter((phone) => phone.id !== id));
          alert('Phone number deleted successfully!');
        } catch (err) {
          console.error('Phone deletion error:', err);
          alert('Failed to delete phone number. Please try again.');
        }
      } else {
        // Remove empty fields without API call
        setPhones(phones.filter((phone) => phone.id !== id));
      }
    }
  };

  const updatePhoneField = (id, value) => {
    setPhones(
      phones.map((phone) =>
        phone.id === id && !phone.disabled ? { ...phone, value } : phone
      )
    );
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    const data = { phones: phones.map((phone) => phone.value).filter((value) => value) };
    try {
      await addPhones(data).unwrap();
      setPhones(phones.map((phone) => ({ ...phone, disabled: true })));
      alert('Phone numbers updated successfully!');
    } catch (err) {
      console.error('Phone submission error:', err);
      alert('Failed to update phone numbers. Please try again.');
    }
  };

  // Social Handlers
  const updateSocialField = (id, value) => {
    setSocials(socials.map((social) => (social.id === id ? { ...social, value } : social)));
  };

  const handleSocialSubmit = async (e) => {
    e.preventDefault();
    const data = {
      facebook: socials.find((s) => s.platform === 'facebook')?.value || '',
      twitter: socials.find((s) => s.platform === 'twitter')?.value || '',
      instagram: socials.find((s) => s.platform === 'instagram')?.value || '',
    };
    try {
      await updateSocialLink(data).unwrap();
      alert('Social links updated successfully!');
    } catch (err) {
      console.error('Social submission error:', err);
      alert('Failed to update social links. Please try again.');
    }
  };

  const formatPlatformName = (platform) => platform.charAt(0).toUpperCase() + platform.slice(1);

  return (
    <main className="pb-10" id="contact">
      <PageHeading title="Contact Us" />

      {isContactLoading ? (
        <div className="text-center text-gray-300">Loading...</div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto p-5 bg-[#575757] text-white mt-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Email Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold">Contact Emails</h2>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  {emails.map((email, index) => (
                    <div key={email.id} className="space-y-2">
                      <label
                        htmlFor={`email-${email.id}`}
                        className="block text-sm font-medium text-gray-300"
                      >
                        Email Address {index + 1}
                      </label>
                      <div className="relative group">
                        <input
                          id={`email-${email.id}`}
                          type="email"
                          value={email.value}
                          onChange={(e) => updateEmailField(email.id, e.target.value)}
                          placeholder="example@example.com"
                          disabled={email.disabled}
                          className={`w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 pr-12 text-gray-900 placeholder-gray-500 ${
                            email.disabled ? 'bg-gray-200 cursor-not-allowed' : ''
                          }`}
                        />
                        {emails.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEmailField(email.id)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-200 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            title="Remove this email"
                            disabled={isDeleteEmailLoading}
                          >
                            <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addEmailField}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    disabled={isEmailLoading || isDeleteEmailLoading}
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Another Email</span>
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-500"
                    disabled={isEmailLoading || isDeleteEmailLoading}
                  >
                    {isEmailLoading ? 'Submitting...' : 'Submit Emails'}
                  </button>
                  {emailError && (
                    <p className="text-red-400 text-sm">
                      Error: {emailError?.data?.message || 'Failed to submit emails'}
                    </p>
                  )}
                  {deleteEmailError && (
                    <p className="text-red-400 text-sm">
                      Error: {deleteEmailError?.data?.message || 'Failed to delete email'}
                    </p>
                  )}
                </form>
              </div>

              {/* Phone Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold">Phone Numbers</h2>
                </div>

                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                  {phones.map((phone, index) => (
                    <div key={phone.id} className="space-y-2">
                      <label
                        htmlFor={`phone-${phone.id}`}
                        className="block text-sm font-medium text-gray-300"
                      >
                        Phone Number {index + 1}
                      </label>
                      <div className="relative group">
                        <input
                          id={`phone-${phone.id}`}
                          type="text"
                          value={phone.value}
                          onChange={(e) => updatePhoneField(phone.id, e.target.value)}
                          placeholder="Enter Phone Number"
                          disabled={phone.disabled}
                          className={`w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 pr-12 text-gray-900 placeholder-gray-500 ${
                            phone.disabled ? 'bg-gray-200 cursor-not-allowed' : ''
                          }`}
                        />
                        {phones.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePhoneField(phone.id)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-200 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            title="Remove this phone"
                            disabled={isDeletePhoneLoading}
                          >
                            <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addPhoneField}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    disabled={isPhoneLoading || isDeletePhoneLoading}
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Another Phone</span>
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-500"
                    disabled={isPhoneLoading || isDeletePhoneLoading}
                  >
                    {isPhoneLoading ? 'Submitting...' : 'Submit Phones'}
                  </button>
                  {phoneError && (
                    <p className="text-red-400 text-sm">
                      Error: {phoneError?.data?.message || 'Failed to submit phones'}
                    </p>
                  )}
                  {deletePhoneError && (
                    <p className="text-red-400 text-sm">
                      Error: {deletePhoneError?.data?.message || 'Failed to delete phone'}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-6 bg-[#575757] text-white max-w-7xl mx-auto p-5 mt-8">
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-xl font-semibold">Social Media Links</h2>
            </div>

            <form onSubmit={handleSocialSubmit} className="space-y-6">
              {socials.map((social) => (
                <div key={social.id} className="space-y-2">
                  <label
                    htmlFor={`social-${social.id}`}
                    className="block text-sm font-medium text-gray-300"
                  >
                    {formatPlatformName(social.platform)} URL
                  </label>
                  <input
                    id={`social-${social.id}`}
                    type="url"
                    value={social.value}
                    onChange={(e) => updateSocialField(social.id, e.target.value)}
                    placeholder={`https://${social.platform}.com/yourusername`}
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-500"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-500"
                disabled={isSocialLoading}
              >
                {isSocialLoading ? 'Submitting...' : 'Submit Social Links'}
              </button>
              {socialError && (
                <p className="text-red-400 text-sm">
                  Error: {socialError?.data?.message || 'Failed to submit social links'}
                </p>
              )}
            </form>
          </div>
        </>
      )}
    </main>
  );
};

export default ContactForm;