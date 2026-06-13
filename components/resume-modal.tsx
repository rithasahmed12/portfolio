"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Download, ExternalLink } from "lucide-react"
import { useEffect } from "react"

const RESUME_PATH = "/Rithas_Ahmed_Resume.pdf"
const RESUME_FILENAME = "Rithas_Ahmed_Resume.pdf"

export function ResumeModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  // Lock body scroll + close on Escape while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold">Resume</h2>
                <p className="text-xs text-muted-foreground">Rithas Ahmed · Software Engineer</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={RESUME_PATH}
                  download={RESUME_FILENAME}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in new tab"
                  className="hidden items-center justify-center rounded-full border border-border p-2 transition-colors hover:bg-secondary sm:inline-flex"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="inline-flex items-center justify-center rounded-full border border-border p-2 transition-colors hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* PDF preview */}
            <div className="flex-1 bg-secondary/40">
              <iframe
                src={`${RESUME_PATH}#toolbar=0&navpanes=0&view=FitH`}
                title="Resume preview"
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
