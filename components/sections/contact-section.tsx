"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react"
import { MagneticButton } from "../magnetic-button"

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [formData, setFormData] = useState({ name: "", email: "", message: "", botcheck: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot — if filled, silently treat as success (bot)
    if (formData.botcheck) {
      setFormState("success")
      return
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setErrorMsg("Form is not configured yet. Please email me directly.")
      setFormState("error")
      return
    }

    setFormState("loading")
    setErrorMsg("")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New portfolio enquiry from ${formData.name}`,
          from_name: "Portfolio Contact Form",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          replyto: formData.email,
        }),
      })
      const data = await res.json()

      if (data.success) {
        setFormState("success")
        setFormData({ name: "", email: "", message: "", botcheck: "" })
        setTimeout(() => setFormState("idle"), 4000)
      } else {
        setErrorMsg(data.message || "Something went wrong. Please try again.")
        setFormState("error")
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.")
      setFormState("error")
    }
  }

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground">
            Have a project in mind? Let&apos;s work together to bring your ideas to life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field — hidden from humans, traps bots */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              checked={!!formData.botcheck}
              onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked ? "1" : "" })}
              className="hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-0 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                placeholder="Your name"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-0 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                placeholder="your@email.com"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-0 outline-none transition-all duration-300 resize-none text-foreground placeholder:text-muted-foreground"
                placeholder="Tell me about your project..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <MagneticButton className="w-full">
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full py-4 px-8 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 disabled:opacity-70"
                >
                  <AnimatePresence mode="wait">
                    {formState === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Send Message
                        <Send className="w-4 h-4" />
                      </motion.span>
                    )}
                    {formState === "loading" && (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Sending...
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </motion.span>
                    )}
                    {formState === "success" && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Message Sent!
                        <CheckCircle className="w-4 h-4" />
                      </motion.span>
                    )}
                    {formState === "error" && (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Try Again
                        <AlertCircle className="w-4 h-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </MagneticButton>
            </motion.div>

            <AnimatePresence>
              {formState === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm text-primary"
                >
                  Thanks! Your message landed in my inbox — I&apos;ll get back to you soon.
                </motion.p>
              )}
              {formState === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm text-destructive"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Or reach out directly at{" "}
          <a
            href="mailto:ahmedrithas48@gmail.com"
            className="text-primary hover:underline"
          >
            ahmedrithas48@gmail.com
          </a>
        </motion.p>
      </div>
    </section>
  )
}
