"use client";

import { ArrowUpRight, Paperclip, Send, Check } from "lucide-react";
import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

type Member = {
  name: string;
  role: string;
  href: string;
  initials: string;
  color: string;
  avatarUrl?: string;
};

const MEMBERS: Member[] = [
  {
    name: "Rahul V",
    role: "Fullstack Developer",
    href: "https://portfolio-rahul-29.web.app/",
    initials: "R",
    color: "#2563EB",
    avatarUrl: "/rahul.png",
  },

  {
    name: "Sathya Narayanan",
    role: "Growth Marketer",
    href: "https://sathyanarayanan.co/",
    initials: "S",
    color: "#EA580C",
    avatarUrl: "/sathya.png",
  },

  {
    name: "Sooraj Paranthaman",
    role: "Collaborator & Specialist",
    href: "http://soorajparanthaman.com/",
    initials: "S",
    color: "#16A34A",
    avatarUrl: "/sooraj.png",
  },
  {
    name: "Akhil Sutheesh",
    role: "Collaborator & Specialist",
    href: "https://akhilsutheesh.com/",
    initials: "A",
    color: "#7C3AED",
    avatarUrl: "/akhil.png",
  },
  {
    name: "Gurudharman",
    role: "Collaborator & Specialist",
    href: "https://gurudharman.com/",
    initials: "G",
    color: "#059669",
    avatarUrl: "/guru.png",
  },

];

export function Team(): ReactNode {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("access_key", "f23dc381-88cc-4186-9836-c2ab83a4dd4f");
      formData.append("name", name);
      formData.append("portfolio_link", link || "Not provided");
      formData.append("subject", `New Collaboration Request from ${name}`);
      formData.append("from_name", "Govind Portfolio Site");
      if (selectedFile) {
        formData.append("attachment", selectedFile);
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setName("");
        setLink("");
        setSelectedFile(null);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setErrorMessage(data.message || "Submission failed. Please try again.");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        We work together
      </h3>
      <div className="border-foreground/5 bg-foreground/1.5 dark:bg-foreground/3 flex-1 rounded-4xl border p-4 sm:p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <ul className="flex flex-col gap-2">
            {MEMBERS.map((member) => (
              <motion.li
                key={member.href}
                whileHover={{ y: -2, scale: 1.012 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative list-none"
              >
                <a
                  href={member.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border-foreground/5 flex items-center gap-3.5 rounded-3xl border p-2 w-full transition-all duration-300 hover:bg-foreground/2 hover:border-foreground/12 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] focus-ring"
                >
                  <span
                    className="ring-foreground/8 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white font-bold text-md select-none transition-transform duration-300 group-hover:scale-105 overflow-hidden"
                    aria-hidden="true"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    ) : (
                      member.initials
                    )}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-foreground text-[15px] font-semibold tracking-tight truncate group-hover:text-foreground">
                      {member.name}
                    </span>
                    <span className="text-foreground/65 mt-0.5 text-[12px] tracking-tight truncate">
                      {member.role}
                    </span>
                  </div>
                  <span
                    className="ml-auto text-[11px] font-medium text-foreground/50 transition-colors group-hover:text-foreground border border-foreground/8 hover:bg-foreground/5 rounded-xl px-2.5 py-1 inline-flex items-center gap-0.5"
                  >
                    Visit
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/60 px-1">
            We collaborate with specialized design, engineering, and digital growth partners to deliver outstanding results.
          </p>
          
          <div className="mt-4 border-t border-foreground/5 pt-4">
            <h4 className="text-[13px] font-semibold tracking-tight text-foreground/75 mb-3">
              Want to collaborate? Join us
            </h4>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-2xl p-4 flex items-center justify-center gap-2 text-[13px] font-medium"
              >
                <Check className="h-4 w-4 text-green-500" />
                Application sent directly to Govind!
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                {errorMessage && (
                  <p className="text-red-500 text-[12px] px-1">{errorMessage}</p>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background border border-foreground/8 rounded-2xl px-3 py-2 text-[13px] w-1/2 focus:outline-none focus:border-foreground/20 text-foreground"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Portfolio Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="bg-background border border-foreground/8 rounded-2xl px-3 py-2 text-[13px] w-1/2 focus:outline-none focus:border-foreground/20 text-foreground"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer bg-background hover:bg-foreground/5 border border-foreground/8 border-dashed rounded-2xl px-3 py-2 text-[12px] text-center text-foreground/55 transition-colors flex items-center justify-center gap-1.5 select-none truncate max-w-[200px] sm:max-w-none">
                    <Paperclip className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">
                      {selectedFile ? selectedFile.name : "Upload your work"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg,.zip"
                      onChange={handleFileChange}
                    />
                  </label>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-foreground text-background hover:opacity-90 transition-opacity font-semibold text-[13px] rounded-2xl px-4 py-2 flex items-center gap-1 shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                    <Send className="h-3 w-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

