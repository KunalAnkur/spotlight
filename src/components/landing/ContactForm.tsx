"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fieldClassName =
    "h-12 rounded-[1rem] border-0 bg-white/[0.04] px-4 text-[15px] text-white/88 shadow-none outline-none placeholder:text-white/26 focus-visible:border-transparent focus-visible:ring-0 focus-visible:bg-white/[0.06]";
  const errorFieldClassName =
    "h-12 rounded-[1rem] border-0 bg-red-500/[0.07] px-4 text-[15px] text-white shadow-none placeholder:text-white/28 focus-visible:border-transparent focus-visible:ring-0 focus-visible:bg-red-500/[0.08]";
  const messageFieldClassName =
    "min-h-[180px] rounded-[1.15rem] border-0 bg-white/[0.04] px-4 py-3 text-[15px] text-white/88 shadow-none outline-none placeholder:text-white/26 focus-visible:border-transparent focus-visible:ring-0 focus-visible:bg-white/[0.06]";
  const errorMessageFieldClassName =
    "min-h-[180px] rounded-[1.15rem] border-0 bg-red-500/[0.07] px-4 py-3 text-[15px] text-white shadow-none placeholder:text-white/28 focus-visible:border-transparent focus-visible:ring-0 focus-visible:bg-red-500/[0.08]";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });

      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/38">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            {...register("name")}
            disabled={isSubmitting}
            className={errors.name ? errorFieldClassName : fieldClassName}
          />
          {errors.name && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/38">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register("email")}
            disabled={isSubmitting}
            className={errors.email ? errorFieldClassName : fieldClassName}
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/38">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us what's on your mind..."
          rows={6}
          {...register("message")}
          disabled={isSubmitting}
          className={errors.message ? errorMessageFieldClassName : messageFieldClassName}
        />
        {errors.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        disabled={isSubmitting}
        className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white hover:from-rose-400 hover:via-pink-400 hover:to-fuchsia-400"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
