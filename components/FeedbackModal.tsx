import React, { useState } from 'react';
import { Icons } from './Icon';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send feedback via Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: name,
          email: email,
          message: message,
          subject: `OptiPix Feedback from ${name}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setName('');
          setEmail('');
          setMessage('');
          onClose();
        }, 2000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '48rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-(--border)">
          <h3 className="text-lg font-semibold text-(--text-main)">Send a Message</h3>
          <button onClick={onClose} className="btn btn-ghost p-2 rounded-lg">
            <Icons.Close className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 pb-12">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-(--success)/10 flex items-center justify-center">
                <Icons.Check className="w-8 h-8 text-(--success)" />
              </div>
              <p className="text-lg font-medium text-(--success)">Thank you for your feedback!</p>
              <p className="text-sm text-(--text-muted) text-center">
                We'll review your message and get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-(--text-main) mb-1.5"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-(--text-main) mb-1.5"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-(--text-main) mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field min-h-[100px] resize-none"
                  placeholder="Share your feedback, suggestions, or report a bug..."
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="btn btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  <Icons.TrendingUp className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
