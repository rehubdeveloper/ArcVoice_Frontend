"use client"


export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Grid Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <main className="relative z-10 pt-20">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Privacy Policy</h1>
                    <p className="text-center text-muted-foreground mb-8">Last Updated: December 4, 2025</p>
                    <p className="text-center text-sm text-muted-foreground mb-12">
                        Owned & Operated by Rehub Developers (Nigeria)
                    </p>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-12">
                    <div className="space-y-12">
                        {/* Section 1 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">1. Introduction</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                ArcVoice ("we", "our", or "us") is an emotionally intelligent AI voice assistant that enables human-like
                                conversations for counseling, guidance, and workflow automation. ArcVoice integrates with Google
                                services such as Gmail, Google Calendar, Google Drive, and other tools to help users manage tasks
                                through advanced LLMs, voice technology, and smart automation.
                            </p>
                            <p className="text-foreground/90 leading-relaxed">
                                This Privacy Policy describes how we collect, use, store, and protect your personal information when you
                                use ArcVoice. By using ArcVoice, you agree to the practices described in this Privacy Policy.
                            </p>
                            <p className="text-foreground/90 leading-relaxed">If you do not agree, please do not use our services.</p>
                        </section>

                        {/* Section 2 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">2. Information We Collect</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                We only collect data that is necessary for the functionality of ArcVoice and only with your consent,
                                especially when connecting your Google account.
                            </p>

                            <h3 className="text-xl font-semibold text-foreground mt-6">Information You Provide Directly</h3>
                            <ul className="space-y-2 ml-4">
                                {["Name", "Email address", "Profile picture"].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="text-xl font-semibold text-foreground mt-6">Information Collected Through Google OAuth</h3>
                            <ul className="space-y-2 ml-4">
                                {[
                                    "Google account profile information",
                                    "Gmail data (for reading or sending emails on your behalf)",
                                    "Google Calendar events",
                                    "Google Drive files and metadata",
                                    "Google Tasks",
                                    "Other Google service data needed for features you activate",
                                ].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="text-xl font-semibold text-foreground mt-6">Automatically Collected Information</h3>
                            <ul className="space-y-2 ml-4">
                                {[
                                    "Usage logs (interactions, preferences, app actions)",
                                    "Audio recordings processed to enable voice interaction",
                                    "IP address and device information",
                                    "Cookies and tracking data (for analytics and user experience)",
                                ].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-foreground/90 leading-relaxed mt-6">
                                We do not use your personal or Google data to build or train AI models.
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">3. How We Use Your Information</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                We use collected information for the following purposes:
                            </p>
                            <ul className="space-y-2 ml-4">
                                {[
                                    "To enable human-like voice interaction",
                                    "To process audio into text for responses",
                                    "To access Google services on your behalf (email, calendar, drive, etc.)",
                                    "To personalize user experience and responses",
                                    "To provide support and communication",
                                    "To improve product functionality and security",
                                    "To comply with legal requirements",
                                ].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-foreground/90 leading-relaxed mt-6">
                                We only access the Google data necessary to perform the exact action you request.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">4. Google API Limited Use Disclosure</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                ArcVoice's use of information received from Google APIs adheres to Google API Services User Data Policy
                                and Limited Use Requirements.
                            </p>
                            <p className="text-foreground/90 leading-relaxed font-semibold">We do not:</p>
                            <ul className="space-y-2 ml-4">
                                {[
                                    "Sell your Google data",
                                    "Transfer your Google data except to deliver core functionality",
                                    "Use your Google data for advertising",
                                    "Combine or store it for unrelated purposes",
                                ].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-foreground/90 leading-relaxed mt-6">
                                Your Google data is used only within ArcVoice, for the feature you explicitly activate.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">5. Sharing of Information</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                We do not sell or rent your personal data. We may share information only in the following cases:
                            </p>

                            <h3 className="text-xl font-semibold text-foreground">Service Providers</h3>
                            <p className="text-foreground/90 leading-relaxed">
                                Trusted third-party vendors who help us operate ArcVoice (e.g., cloud hosting) — bound by
                                confidentiality agreements.
                            </p>

                            <h3 className="text-xl font-semibold text-foreground">Legal Requirements</h3>
                            <p className="text-foreground/90 leading-relaxed">
                                If required to comply with Nigerian or international law.
                            </p>

                            <h3 className="text-xl font-semibold text-foreground">Business Transfers</h3>
                            <p className="text-foreground/90 leading-relaxed">
                                If Rehub Developers undergoes a merger, acquisition, or restructuring.
                            </p>
                        </section>

                        {/* Section 6 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">6. Children & Users Under 18</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                We allow users under 18 but take special safety precautions:
                            </p>
                            <ul className="space-y-2 ml-4">
                                {[
                                    "No explicit, harmful, or adult content is permitted",
                                    "Conversations may be monitored by automated systems for safety",
                                    "We follow COPPA-aligned principles, although ArcVoice is not directed at children under 13",
                                ].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-foreground/90 leading-relaxed mt-6">Parents or guardians should supervise usage.</p>
                        </section>

                        {/* Section 7 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">7. Data Storage & Security</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                We use modern, industry-standard security practices to protect your information:
                            </p>
                            <ul className="space-y-2 ml-4">
                                {[
                                    "Encryption in transit (HTTPS)",
                                    "Secure token handling",
                                    "Access controls",
                                    "Audit logs",
                                    "Minimal data retention policies",
                                ].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-foreground/90 leading-relaxed mt-6">
                                Audio recordings may be temporarily stored for processing but are not used to train AI models.
                            </p>
                        </section>

                        {/* Section 8 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">8. Data Retention</h2>
                            <p className="text-foreground/90 leading-relaxed">
                                We keep your information only as long as needed for functionality or legal requirements. You may request
                                account deletion at any time.
                            </p>
                        </section>

                        {/* Section 9 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">9. Your Rights</h2>
                            <p className="text-foreground/90 leading-relaxed">Depending on your region, you may have the right to:</p>
                            <ul className="space-y-2 ml-4">
                                {[
                                    "Access your data",
                                    "Delete your data",
                                    "Correct inaccurate data",
                                    "Revoke Google OAuth permissions",
                                    "Opt out of analytics",
                                ].map((item) => (
                                    <li key={item} className="flex items-start text-foreground/90">
                                        <span className="text-primary mr-3 mt-1.5">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-foreground/90 leading-relaxed mt-6">
                                To revoke Google access: Visit{" "}
                                <a
                                    href="https://myaccount.google.com/permissions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    https://myaccount.google.com/permissions
                                </a>
                            </p>
                        </section>

                        {/* Section 10 */}
                        <section className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">10. Contact Us</h2>
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
