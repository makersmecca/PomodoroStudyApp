import NavLinks from "../NavLinks";
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <div className="flex justify-between w-full items-center p-4">
        <NavLinks />
      </div>

      <div className="max-w-3xl mx-auto pb-8 mt-20 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-opacity-60">Effective Date: 14.11.2024</p>
        </div>

        {/* Introduction Section */}
        <div className="py-6 px-2 mb-6">
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700">
            HaloFocus ("we", "our", or "us") values your privacy and is
            committed to protecting the personal data you provide to us. This
            privacy policy outlines how we collect, use, and safeguard your data
            when you use the HaloFocus application.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <ol className="space-y-8 pl-4">
            {/* Section 1: Information We Collect */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                Information We Collect
              </h3>
              <ul className="list-disc pl-5 space-y-3">
                <li className="">
                  <strong>Personal Data:</strong> If you create an account, we
                  collect data such as your email address, username, and other
                  information you provide.
                </li>
                <li className="">
                  <strong>Usage Data:</strong> We may collect data on how you
                  use the app, including interaction with features like the
                  timer, to-do lists, and reminders.
                </li>
                <li className="">
                  <strong>Device Data:</strong> Basic information such as your
                  device type, operating system, and app version to improve app
                  functionality.
                </li>
              </ul>
            </li>

            {/* Section 2: How We Use Your Information */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                How We Use Your Information
              </h3>
              <ul className="list-disc pl-5 space-y-3">
                <li className="">
                  To provide and maintain the app's functionality.
                </li>
                <li className="">
                  To improve and personalize your experience.
                </li>
                <li className="">
                  To communicate important updates or changes to the app.
                </li>
              </ul>
            </li>

            {/* Section 3: Data Storage and Security */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Data Storage and Security
              </h3>
              <ul className="list-disc pl-5 space-y-3">
                <li className="">
                  <strong>Storage:</strong> Data is stored securely on Firebase,
                  and we take precautions to protect your information.
                </li>
                <li className="">
                  <strong>Security:</strong> We use industry-standard security
                  measures to prevent unauthorized access to your data.
                </li>
              </ul>
            </li>

            {/* Section 4: Sharing Your Information */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Data Storage and Security
              </h3>
              <div className="list-disc pl-5 space-y-3">
                We do not sell or share your personal information with third
                parties, except as necessary to comply with legal obligations or
                protect our rights.
              </div>
            </li>

            {/* Section 5: Your Rights */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Your Rights</h3>
              <div className="list-disc pl-5 space-y-3">
                You have the right to request access to, correction, or deletion
                of your personal data. Contact us{" "}
                <a
                  href="mailto:thisisayudh@gmail.com"
                  className="decoration-wavy"
                >
                  here
                </a>{" "}
                for any requests.
              </div>
            </li>

            {/* Section 5: Your Rights */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Changes to the Privacy Policy
              </h3>
              <div className="list-disc pl-5 space-y-3">
                We may update our Privacy Policy occasionally. Please check back
                to this page from time to time to stay updated with our Privacy
                Policy
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
