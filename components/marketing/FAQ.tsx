'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our AI assistant.
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="model">
            <AccordionTrigger>About Optimus Alpha Model</AccordionTrigger>
            <AccordionContent>
              Optimus Alpha is a powerful large language model provided by OpenRouter, with excellent natural language understanding and generation capabilities. It excels in code generation, text analysis, creative writing, and problem-solving, providing users with accurate, relevant, and insightful responses.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="difference">
            <AccordionTrigger>What makes your AI assistant different?</AccordionTrigger>
            <AccordionContent>
              Our AI assistant is powered by Optimus Alpha, one of the most advanced language models available. It excels in understanding context, handling complex tasks, and providing detailed, accurate responses. Unlike other solutions, we offer enterprise-grade security, custom training capabilities, and deep integration options with your existing tools.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="security">
            <AccordionTrigger>How do you ensure data security?</AccordionTrigger>
            <AccordionContent>
              We implement multiple layers of security: end-to-end encryption, SOC 2 Type II compliance, custom data retention policies, and regular security audits. Your data is processed in isolated environments, and we offer options for data residency in specific regions. We never use customer data for model training without explicit consent.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

export default FAQ; 