import Smallcard from "../components/Smallcard"

const SupportPage = () => {
  return (
    <>
    <Smallcard topMessage="Support Page" />

    <div>
        <div className="p-5 space-y-3">
            <div className="font-semibold">Need Help? We’re Here for You!</div>

            <div>At [Your Blog Platform Name], we are committed to ensuring your experience is as smooth as possible. Whether you're facing a technical issue, have questions about features, or need guidance on improving your content, we're always here to help.</div>

            <div className="space-y-2">
                <strong>Common Questions</strong> <br />
                We’ve curated answers to some of the most frequently asked questions in our FAQ section, covering topics such as:
                
                <li>Creating and Editing Posts</li>
                <li>User Authentication and Password Recovery</li>
                <li>Formatting and Media Integration</li>
                <li>Managing Comments and Interactions</li>
            </div>

            <div className="space-y-2">
                Reach Out to Us
                For personalized support, feel free to reach out to our dedicated support team. We aim to respond within 24 hours. You can contact us through:
                
                Email: [support@yourblogplatform.com]
                Live Chat: Available Monday to Friday from 9 AM to 6 PM (your time zone)
                Community Forums: Join discussions with fellow bloggers and our support team to find quick solutions and share tips.
            </div>

            <div className="mt-4">
                <strong>Feedback</strong> <br />
                    We are constantly working to improve our platform and would love to hear your thoughts! Whether it's a feature suggestion or feedback on your experience, we welcome your input. You can drop us a message via the Feedback Form on your profile.
                    
                    Thank you for being part of the <strong>EM Blogs</strong> community—we’re excited to see what you create!
            </div>
        </div>
    </div>
    </>
  )
}

export default SupportPage