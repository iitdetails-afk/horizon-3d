import React, { useState } from 'react'
import { X, Mail, User, MessageSquare, CheckCircle2, Sparkles, Send } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'inquiry' | 'beta' | 'partner'>('inquiry')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && name) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        onClose()
        setName('')
        setEmail('')
        setMessage('')
      }, 3000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#171717] border border-[#262626] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#111111] border border-[#FF5A00]/40 flex items-center justify-center text-[#FF5A00]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Get In Touch with Horizon 3D
              </h3>
              <p className="text-xs text-[#A0A0A0]">
                Engineering, Beta Access & Hardware Support
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A0A0A0] hover:text-white hover:bg-[#222222]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#262626] text-xs font-semibold pt-2">
          <button
            onClick={() => setTab('inquiry')}
            className={`flex-1 py-2.5 border-b-2 transition-colors ${
              tab === 'inquiry'
                ? 'border-[#FF5A00] text-[#FF5A00]'
                : 'border-transparent text-[#A0A0A0] hover:text-white'
            }`}
          >
            General Inquiry
          </button>
          <button
            onClick={() => setTab('beta')}
            className={`flex-1 py-2.5 border-b-2 transition-colors ${
              tab === 'beta'
                ? 'border-[#FF5A00] text-[#FF5A00]'
                : 'border-transparent text-[#A0A0A0] hover:text-white'
            }`}
          >
            Early Access Beta
          </button>
          <button
            onClick={() => setTab('partner')}
            className={`flex-1 py-2.5 border-b-2 transition-colors ${
              tab === 'partner'
                ? 'border-[#FF5A00] text-[#FF5A00]'
                : 'border-transparent text-[#A0A0A0] hover:text-white'
            }`}
          >
            Hardware Partner
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#FF5A00] text-[#FF5A00] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Transmission Received</h4>
            <p className="text-xs text-[#A0A0A0] max-w-xs mx-auto">
              Thank you for connecting with Horizon 3D. An engineering specialist will review your inquiry shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A0A0A0]">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs bg-[#111111] border border-[#262626] rounded-xl py-2.5 pl-9 pr-3 text-white outline-none focus:border-[#FF5A00]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A0A0A0]">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs bg-[#111111] border border-[#262626] rounded-xl py-2.5 pl-9 pr-3 text-white outline-none focus:border-[#FF5A00]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A0A0A0]">
                {tab === 'beta' ? 'Target 3D Printer Hardware' : 'Message or Proposal'}
              </label>
              <textarea
                rows={3}
                required
                placeholder={
                  tab === 'beta'
                    ? 'e.g. CoreXY high speed printer, custom Cartesian, Voron 2.4, etc.'
                    : 'Tell us how we can assist you...'
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs bg-[#111111] border border-[#262626] rounded-xl p-3 text-white outline-none focus:border-[#FF5A00] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#FF5A00] via-[#E52B00] to-[#FFD000] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#FF5A00]/20 hover:shadow-[#FF5A00]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
