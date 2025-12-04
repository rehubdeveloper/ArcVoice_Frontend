"use client"


export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* Grid Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <main className="relative z-10 pt-20">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Terms & Conditions</h1>
                    <p className="text-center text-muted-foreground mb-8">Last Updated: December 4, 2025</p>
                    <p className="text-center text-sm text-muted-foreground mb-12">ArcVoice by Rehub Developers</p>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-12">
                    <div className="space-y-12">
                        {/* Section 1 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">1. Introduction</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                Welcome to ArcVoice, an AI voice assistant developed by Rehub Developers ("we", "our", "us"). By
                                accessing or using ArcVoice, you agree to these Terms and Conditions.
                            </p>
                            <p className="text-foreground/90 leading-relaxed">If you do not agree, do not use the service.</p>
                        </section>

                        {/* Section 2 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">2. Use of the Service</h2>
                            <p className="text-foreground/90 leading-relaxed">You agree to:</p>
                            <ul className="space-y-2 ml-4">
                                {[
                                    "Use ArcVoice only for lawful purposes",
                                    "Not abuse, disrupt, or attempt to reverse-engineer the service",
                                    "Not upload harmful or malicious content",
                                    "Not use ArcVoice to harass, impersonate, or harm others",
                                ].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-foreground/90 leading-relaxed mt-6">
                                Users under 18 may use the platform but must not access or request explicit content.
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">3. Google Integrations</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                By connecting your Google account, you grant ArcVoice limited access to specific Gmail, Drive, Calendar,
                                and other Google data. You may revoke access at any time via your Google Account.
                            </p>
                            <p className="text-foreground/90 leading-relaxed">
                                ArcVoice will never use your Google data for advertising, selling, or unrelated uses.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">4. User Accounts & Security</h2>
                            <p className="text-foreground/90 leading-relaxed">You are responsible for:</p>
                            <ul className="space-y-2 ml-4">
                                {[
                                    "Keeping your login credentials secure",
                                    "All activities performed under your account",
                                    "Not sharing your tokens with others",
                                ].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-foreground/90 leading-relaxed mt-6">
                                We may suspend or terminate accounts that violate these Terms.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">5. Acceptable Use Policy</h2>
                            <p className="text-foreground/90 leading-relaxed">You agree not to use ArcVoice for:</p>
                            <ul className="space-y-2 ml-4">
                                {[
                                    "Generating harmful or illegal content",
                                    "Cyberattacks or unauthorized access",
                                    "Violence, hate speech, or harassment",
                                    "Requests for explicit/adult content",
                                    "Deepfakes or impersonation of minors",
                                ].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-foreground/90 leading-relaxed mt-6">
                                ArcVoice is designed to promote safe, ethical AI use.
                            </p>
                        </section>

                        {/* Section 6 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">6. Intellectual Property</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                All trademarks, logos, UI designs, audio models, and software belong to Rehub Developers.
                            </p>
                            <p className="text-foreground/90 leading-relaxed">
                                You may not copy, modify, sell, or resell ArcVoice technologies.
                            </p>
                        </section>

                        {/* Section 7 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">7. Limitation of Liability</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                ArcVoice is provided "as-is", without warranties of any kind. We are not responsible for:
                            </p>
                            <ul className="space-y-2 ml-4">
                                {[
                                    "Loss of data",
                                    "Financial damages",
                                    "Misinterpretation of AI responses",
                                    "Third-party service outages (e.g., Google)",
                                ].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-foreground/90 leading-relaxed mt-6">
                                <span className="font-semibold">Important:</span> AI-generated guidance should not replace professional
                                mental, medical, or legal advice.
                            </p>
                        </section>

                        {/* Section 8 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">8. Termination</h2>
                            <p className="text-foreground/90 leading-relaxed">We may suspend or terminate access if:</p>
                            <ul className="space-y-2 ml-4">
                                {[
                                    "You violate these Terms",
                                    "You misuse Google integrations",
                                    "Your account poses a security risk",
                                ].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-foreground/90 leading-relaxed mt-6">You may request deletion at any time.</p>
                        </section>

                        {/* Section 9 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">9. Updates to These Terms</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                We may update these Terms occasionally. Continued use of ArcVoice means you accept the updated version.
                            </p>
                        </section>

                        {/* Section 10 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">10. Contact Information</h2>
                            <p className="text-foreground/90 leading-relaxed">For questions or complaints:</p>
                            <div className="bg-secondary/50 border border-border rounded-lg p-6">
                                <p className="text-foreground font-semibold">Rehub Developers</p>
                                <p className="text-foreground/90">Nigeria</p>
                                <p className="text-foreground/90">
                                    Email:{" "}
                                    <a href="mailto:tech@rehubdevelopers.com" className="text-primary hover:underline">
                                        tech@rehubdevelopers.com
                                    </a>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

        </div>
    )
}
