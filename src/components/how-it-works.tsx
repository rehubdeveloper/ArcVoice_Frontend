"use client"

import { ArrowDown } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Voice Command",
    description: "Speak naturally to Arc Voice. Start with the custom agent name to invoke commands.",
  },
  {
    number: "02",
    title: "AI Processing",
    description: "Advanced LLMs process your intent with emotional context and extract actionable items.",
  },
  {
    number: "03",
    title: "Integration",
    description: "Seamlessly connects with Gmail, Google Calendar, Drive, and other services.",
  },
  {
    number: "04",
    title: "Action & Response",
    description: "Executes tasks and provides natural voice responses with human-like conversation flow.",
  },
  {
    number: "05",
    title: "Dashboard Sync",
    description: "All actions, summaries, and reminders appear instantly on your personalized dashboard.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">How Arc Voice Works</h2>
          <p className="text-xl text-gray-600 text-balance">Five simple steps to transform your productivity</p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.number}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="ml-8 mt-8 flex justify-center">
                  <ArrowDown className="w-6 h-6 text-blue-400 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
