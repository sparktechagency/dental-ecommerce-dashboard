import React, { useState } from "react";
import { Mail, Plus, X } from "lucide-react";
import PageHeading from "../../shared/PageHeading";

const ContactForm = () => {
  const [emails, setEmails] = useState([
    { id: "1", value: "" },
    { id: "2", value: "" },
  ]);

  const [socials, setSocials] = useState([
    { id: "1", platform: "facebook", value: "" },
    { id: "2", platform: "twitter", value: "" },
    { id: "3", platform: "instagram", value: "" },
  ]);

  const addEmailField = () => {
    const newEmail = {
      id: Date.now().toString(),
      value: "",
    };
    setEmails([...emails, newEmail]);
  };

  const removeEmailField = (id) => {
    if (emails.length > 1) {
      setEmails(emails.filter((email) => email.id !== id));
    }
  };

  const updateEmailField = (id, value) => {
    setEmails(
      emails.map((email) => (email.id === id ? { ...email, value } : email))
    );
  };

  const addSocialField = () => {
    const platforms = ["facebook", "twitter", "instagram"];
    const existingPlatforms = socials.map((s) => s.platform);
    const availablePlatforms = platforms.filter(
      (p) => !existingPlatforms.includes(p)
    );

    if (availablePlatforms.length > 0) {
      const newSocial = {
        id: Date.now().toString(),
        platform: availablePlatforms[0],
        value: "",
      };
      setSocials([...socials, newSocial]);
    } else {
      // If all platforms exist, add Facebook as default
      const newSocial = {
        id: Date.now().toString(),
        platform: "facebook",
        value: "",
      };
      setSocials([...socials, newSocial]);
    }
  };

  const removeSocialField = (id) => {
    setSocials(socials.filter((social) => social.id !== id));
  };

  const updateSocialField = (id, value) => {
    setSocials(
      socials.map((social) =>
        social.id === id ? { ...social, value } : social
      )
    );
  };

  const formatPlatformName = (platform) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  const getPlatformPlaceholder = (platform) => {
    return `Enter ${formatPlatformName(platform)} URL`;
  };

  return (
    <main className="pb-10">
      <PageHeading title="Contact Us" />
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

            <div className="space-y-6">
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
                      onChange={(e) =>
                        updateEmailField(email.id, e.target.value)
                      }
                      placeholder="example@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 pr-12 text-gray-900 placeholder-gray-500"
                    />
                    {emails.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEmailField(email.id)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-200 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors duration-200 group-hover:opacity-100 opacity-70"
                        title="Remove this email"
                        aria-label={`Remove email ${index + 1}`}
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
                title="Add another email"
              >
                <Plus className="w-5 h-5" />
                <span>Add Another Email</span>
              </button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-xl font-semibold">Social Media Links</h2>
            </div>

            <div className="space-y-6">
              {socials.map((social, index) => (
                <div key={social.id} className="space-y-2">
                  <label
                    htmlFor={`social-${social.id}`}
                    className="block text-sm font-medium text-gray-300"
                  >
                    {formatPlatformName(social.platform)} URL
                  </label>
                  <div className="relative group">
                    <input
                      id={`social-${social.id}`}
                      type="url"
                      value={social.value}
                      onChange={(e) =>
                        updateSocialField(social.id, e.target.value)
                      }
                      placeholder={`https://${social.platform}.com/yourusername`}
                      className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 pr-12 text-gray-900 placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeSocialField(social.id)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-200 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors duration-200 group-hover:opacity-100 opacity-70"
                      title={`Remove ${formatPlatformName(
                        social.platform
                      )} link`}
                      aria-label={`Remove ${formatPlatformName(
                        social.platform
                      )} link`}
                    >
                      <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addSocialField}
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                title="Add another social media link"
              >
                <Plus className="w-5 h-5" />
                <span>Add Another Social Media</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactForm;
