import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const productFAQs = [
  {
    question: "How do I power the LED base?",
    answer:
      "All our lamps come with a USB-C cable and can be powered by any USB port, power bank, or wall adapter (not included). The LED base has a touch-sensitive button to change colors and turn on/off.",
  },
  {
    question: "What LED color options are available?",
    answer:
      "Our LED bases offer multiple lighting modes: warm white (2700K), cool white (6500K), and 7-color RGB mode with options for static colors or smooth color cycling.",
  },
  {
    question: "How do I clean the crystal?",
    answer:
      "Use a soft, lint-free microfiber cloth to gently wipe the crystal. For deeper cleaning, slightly dampen the cloth with distilled water. Avoid harsh chemicals or abrasive materials that could scratch the surface.",
  },
  {
    question: "Is this suitable as a gift?",
    answer:
      "Absolutely! Our lamps make beautiful spiritual gifts. We offer optional gift messaging at checkout, and all products come in premium packaging. You can add a personalized message that will be printed on an elegant card.",
  },
  {
    question: "What is K9 crystal?",
    answer:
      "K9 crystal is an optical-grade borosilicate glass known for its exceptional clarity, brilliance, and light refraction properties. It's the same material used in high-end optical instruments and luxury decorative items.",
  },
  {
    question: "How long do the LEDs last?",
    answer:
      "Our premium LED bases are rated for 50,000+ hours of use. With typical usage of 4-6 hours per day, the LEDs will last over 20 years.",
  },
];

export const ProductFAQ = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-serif text-xl font-semibold text-foreground">
        Frequently Asked Questions
      </h3>
      
      <Accordion type="single" collapsible className="w-full">
        {productFAQs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-foreground hover:text-primary">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
