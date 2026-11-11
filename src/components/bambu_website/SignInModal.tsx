import React, { useState } from 'react'
import { X, Mail, Lock, User, ArrowRight, CheckCircle2, Shield, Eye, EyeOff } from 'lucide-react'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
  user: { name: string; email: string } | null
  onSignIn: (name: string, email: string) => void
  onSignOut: () => void
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  user,
  onSignIn,
  onSignOut
}) => {
  const [tab, setTab] = useState<'signin' | 'signup' | 'forgot'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    if (!email || !password) {
      setErrorMessage('Please fill in all required fields.')
      return
    }
    const displayName = email.split('@')[0]
    onSignIn(displayName, email)
    setSuccessMessage(`Welcome back to Horizon 3D, ${displayName}!`)
    setTimeout(() => {
      setSuccessMessage(null)
      onClose()
    }, 1200)
  }

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    if (!name || !email || !password) {
      setErrorMessage('Please fill in all required fields.')
      return
    }
    if (!agreeTerms) {
      setErrorMessage('Please accept the Horizon 3D Terms of Service.')
      return
    }
    onSignIn(name, email)
    setSuccessMessage(`Account created successfully! Welcome to Horizon 3D, ${name}!`)
    setTimeout(() => {
      setSuccessMessage(null)
      onClose()
    }, 1200)
  }

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setErrorMessage('Please enter your account email.')
      return
    }
    setSuccessMessage(`Password recovery link has been sent to ${email}.`)
    setTimeout(() => {
      setSuccessMessage(null)
      setTab('signin')
    }, 2500)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00AE42] flex items-center justify-center text-white font-bold">
              H
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 leading-tight">
                Horizon 3D Account
              </h3>
              <p className="text-xs text-neutral-500">
                Cloud Slicing & Device Synchronization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Already Signed In */}
        {user ? (
          <div className="p-6 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00AE42] font-bold text-2xl flex items-center justify-center mx-auto border-2 border-emerald-300">
              {user.name.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <h4 className="text-lg font-bold text-neutral-900">{user.name}</h4>
              <p className="text-xs text-neutral-500">{user.email}</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-emerald-50 text-[#00AE42] text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Horizon 3D Cloud Connected
              </div>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 text-xs text-neutral-600 text-left space-y-2">
              <div className="flex justify-between">
                <span>Cloud Slicing Quota:</span>
                <span className="font-semibold text-neutral-900">Unlimited (Free Tier)</span>
              </div>
              <div className="flex justify-between">
                <span>Connected 3D Printers:</span>
                <span className="font-semibold text-emerald-600">2 Devices Online</span>
              </div>
              <div className="flex justify-between">
                <span>Filament Sync:</span>
                <span className="font-semibold text-neutral-900">Active</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  onSignOut()
                  onClose()
                }}
                className="w-full py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs transition-colors"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[#00AE42] hover:bg-[#009638] text-white font-semibold text-xs shadow-sm transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Tabs Selector */}
            <div className="flex border-b border-neutral-200 bg-neutral-50/50 text-xs font-semibold">
              <button
                onClick={() => {
                  setTab('signin')
                  setErrorMessage(null)
                }}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  tab === 'signin'
                    ? 'border-[#00AE42] text-[#00AE42] bg-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setTab('signup')
                  setErrorMessage(null)
                }}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  tab === 'signup'
                    ? 'border-[#00AE42] text-[#00AE42] bg-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Create Account
              </button>
              <button
                onClick={() => {
                  setTab('forgot')
                  setErrorMessage(null)
                }}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  tab === 'forgot'
                    ? 'border-[#00AE42] text-[#00AE42] bg-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Recovery
              </button>
            </div>

            {/* Error & Success Alerts */}
            {errorMessage && (
              <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[#00AE42] text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> {successMessage}
              </div>
            )}

            {/* TAB 1: SIGN IN */}
            {tab === 'signin' && (
              <form onSubmit={handleSignInSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-[#00AE42] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setTab('forgot')}
                      className="text-[11px] text-[#00AE42] hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl py-2.5 pl-9 pr-9 outline-none focus:border-[#00AE42] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded accent-[#00AE42]"
                    />
                    <span>Keep me signed in</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#00AE42] hover:bg-[#009638] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
                >
                  <span>Sign In to Horizon 3D</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Social Login Options */}
                <div className="pt-2 text-center">
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider mb-3">
                    Or continue with
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        onSignIn('Google User', 'user@gmail.com')
                        onClose()
                      }}
                      className="py-2 px-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 flex items-center justify-center gap-2 font-medium text-neutral-700 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span>Google</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSignIn('Apple User', 'user@icloud.com')
                        onClose()
                      }}
                      className="py-2 px-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 flex items-center justify-center gap-2 font-medium text-neutral-700 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.06-.51 2.59-1.26z"/>
                      </svg>
                      <span>Apple ID</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 2: CREATE ACCOUNT */}
            {tab === 'signup' && (
              <form onSubmit={handleSignUpSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Alex Maker"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-[#00AE42] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-[#00AE42] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700">Create Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl py-2.5 pl-9 pr-9 outline-none focus:border-[#00AE42] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-2 text-xs text-neutral-600 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded accent-[#00AE42]"
                  />
                  <span>
                    I agree to the Horizon 3D Terms of Service and Privacy Policy.
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#00AE42] hover:bg-[#009638] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
                >
                  <span>Register Horizon 3D Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* TAB 3: FORGOT PASSWORD */}
            {tab === 'forgot' && (
              <form onSubmit={handleForgotSubmit} className="p-6 space-y-4">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs text-neutral-600">
                  Enter your email address and we will send a password reset link to your inbox.
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700">Account Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl py-2.5 pl-9 pr-3 outline-none focus:border-[#00AE42] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#00AE42] hover:bg-[#009638] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  Send Recovery Link
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setTab('signin')}
                    className="text-xs text-[#00AE42] font-semibold hover:underline"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
