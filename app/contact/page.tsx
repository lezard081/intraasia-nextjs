// @ts-nocheck
import ContactForm from "@/app/ui/contact-form";
import PageTransition from "@/app/ui/PageTransition";
import AnimatedSection from '@/app/ui/AnimatedSection';

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="max-w-2xl mx-auto py-12 px-4">
        <AnimatedSection>
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        </AnimatedSection>
        <AnimatedSection>
          <ContactForm />
        </AnimatedSection>
      </main>
    </PageTransition>
  );
}
