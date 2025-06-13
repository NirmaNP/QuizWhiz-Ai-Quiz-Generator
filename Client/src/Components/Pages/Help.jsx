import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

function Help() {
  const faqs = [
    {
      question: "How does QuizWhiz generate questions?",
      answer:
        "Our AI analyzes thousands of reliable sources to create fresh, accurate questions tailored to your chosen topic every time.",
    },
    {
      question: "Can I customize quiz difficulty?",
      answer:
        "Yes! When generating a quiz, you can select from Easy, Medium, or Hard difficulty levels.",
    },
    {
      question: "Is there a time limit for quizzes?",
      answer:
        "No, you can take quizzes at your own pace. Timed mode is coming soon!",
    },
    {
      question: "How are scores calculated?",
      answer:
        "You get +10 points for correct answers. Bonus points are awarded for quick responses in timed mode.",
    },
    {
      question: "Can I retake quizzes?",
      answer:
        "Absolutely! Our AI generates new questions each time, even on the same topic.",
    },
    {
      question: "Do I need to sign up to use QuizWhiz?",
      answer:
        "You can try quizzes without an account, but signing up unlocks features like saving scores, tracking progress, and customizing your profile.",
    },
    {
      question: "Can I share my quiz results?",
      answer:
        "Yes! After completing a quiz, you can share your score and leaderboard position on social media.",
    },
    {
      question: "Are there topic-specific quizzes?",
      answer:
        "Yes! You can choose from a wide range of topics like Science, History, Pop Culture, and more when generating a quiz.",
    },
    {
      question: "Is QuizWhiz free to use?",
      answer:
        "Yes, QuizWhiz is completely free. Premium features may be introduced in the future with enhanced personalization.",
    },
    {
      question: "Can I report incorrect or outdated questions?",
      answer:
        "At the moment, there's no direct way to report questions. However, we're working on adding a feedback option so users can flag issues easily in the future.",
    },
  ];
  const yourEmail = "support@quizwhiz.com"; // Replace with your actual email
  const defaultSubject = "Question about QuizWhiz";

  const handleContactClick = () => {
    const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(
      defaultSubject
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-blue-50 p-10 ">
      <div className="pt-6 container max-w-4xl space-y-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">Frequently Asked Questions</h2>

        {/* FAQ Section */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Disclosure key={faq.question}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left bg-white rounded-lg mb-2">
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDownIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 text-gray-600">
                    {faq.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>

        {/* Simple Contact Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <EnvelopeIcon className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold">
              Still need help? Contact Us
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Email us directly at:{" "}
              <a
                href={`mailto:${yourEmail}`}
                className="text-blue-600 hover:underline"
              >
                {yourEmail}
              </a>
            </p>

            <button
              onClick={handleContactClick}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              Open Email App
            </button>

            <p className="text-sm text-gray-500">
              Clicking this button will open your default email application with
              our support email pre-filled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
