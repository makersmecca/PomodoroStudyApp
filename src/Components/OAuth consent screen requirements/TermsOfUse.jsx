import NavLinks from "../NavLinks";
import { Link } from "react-router-dom";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen">
      <div className="flex justify-between w-full items-center p-4">
        <NavLinks />
      </div>

      <div className="max-w-3xl mx-auto pb-8 mt-20 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Terms of Use for HaloFocus
          </h1>
          <p className="text-opacity-60 font-semibold">Effective Date: 14.11.2024</p>
        </div>

        {/* Introduction Section */}
        <div className="py-6 px-2 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700">
            By using HaloFocus (“the app”), you agree to these terms of use.
            Please read them carefully.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <ol className="space-y-8 pl-4">
            {/* Section 1: Acceptance of Terms */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-xl font-semibold mb-4">
                Acceptance of Terms
              </div>
              <div className="md:pl-5 space-y-3">
                By accessing or using HaloFocus, you agree to be bound by these
                Terms of Use and our{" "}
                <Link to="/PrivacyPolicy">Privacy Policy</Link>.
              </div>
            </li>

            {/* Section 2:  License to Use the App */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                License to Use the App
              </h3>
              <div className="md:pl-5 space-y-3">
                We grant you a limited, non-exclusive, non-transferable license
                to use HaloFocus for personal, non-commercial purposes.
              </div>
            </li>

            {/* Section 3: Prohibited Conduct */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Prohibited Conduct</h3>
              You agree not to misuse the app, including but not limited to:
              <ul className="list-disc pl-5 space-y-3">
                <li className="">Using the app for any unlawful purposes.</li>
                <li className="">
                  Attempting to interfere with the app’s functionality.
                </li>
                <li className="">Sharing your account with others.</li>
              </ul>
            </li>

            {/* Section 4: Intellectual Property */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Intellectual Property
              </h3>
              <div className="md:pl-5 space-y-3">
                All content, features, and functionality in HaloFocus are the
                exclusive property of HaloFocus. You may not duplicate,
                distribute, or otherwise use our content without permission.
              </div>
            </li>

            {/* Section 5: Limitation of Liability */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Limitation of Liability
              </h3>
              <div className="md:pl-5 space-y-3">
                HaloFocus is provided “as is,” without warranties of any kind.
                We are not liable for any indirect or consequential damages
                arising from your use of the app.
              </div>
            </li>

            {/* Section 6: Changes to Terms */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Changes to Terms</h3>
              <div className="md:space-y-3">
                We may update these Terms of Use from time to time. Your
                continued use of HaloFocus following changes constitutes
                acceptance of the new terms.
              </div>
            </li>

            {/* Section 7: Contact Us */}
            <li className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="md:pl-5 space-y-3">
                Contact For questions or concerns, please contact us at{" "}
                <a href="">here</a>.
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
