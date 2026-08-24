import "./App.css";

function Support() {
  return (
    <div className="legal-page">
      <div className="legal-container">

        <a className="back-link" href="/">
          ← Back to CodeAFM
        </a>

        <div className="legal-header">
          <div className="app-icon">🧪</div>

          <div>
            <p className="eyebrow">Bottle Sort</p>
            <h1>Support</h1>
          </div>
        </div>

        <p className="updated">
          Bottle Sort Help & Support
        </p>

        <section>
          <h2>About Bottle Sort</h2>

          <p>
            Bottle Sort is a casual puzzle game where the objective is to sort
            colored liquids into bottles until each bottle contains only one
            color.
          </p>

          <p>
            The game includes multiple levels designed to provide a simple,
            relaxing, and progressively challenging puzzle experience.
          </p>
        </section>

        <section>
          <h2>How to Play</h2>

          <ol>
            <li>Tap a bottle to select it.</li>

            <li>
              Tap another bottle to pour the liquid into it.
            </li>

            <li>
              Liquid can only be poured when the move is allowed by the game
              rules.
            </li>

            <li>
              Continue sorting until every bottle contains a single color.
            </li>

            <li>
              Complete the level to unlock and continue to the next puzzle.
            </li>
          </ol>
        </section>

        <section>
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <h3>Do I need an account?</h3>

            <p>
              No. Bottle Sort does not require registration or login. You can
              start playing immediately after opening the app.
            </p>
          </div>

          <div className="faq-item">
            <h3>Does Bottle Sort require an internet connection?</h3>

            <p>
              Core gameplay may be available without an internet connection.
              Some features, including advertisements, may require internet
              access.
            </p>
          </div>

          <div className="faq-item">
            <h3>Why am I seeing advertisements?</h3>

            <p>
              Bottle Sort may use advertisements to support development and
              maintenance of the game.
            </p>
          </div>

          <div className="faq-item">
            <h3>The game is not working correctly. What should I do?</h3>

            <p>
              First, close and reopen Bottle Sort. You can also restart your
              device and make sure you are using the latest available version
              of the application.
            </p>
          </div>
        </section>

        <section>
          <h2>Technical Support</h2>

          <p>
            If you experience a problem with Bottle Sort, please include the
            following information when contacting support:
          </p>

          <ul>
            <li>Your iPhone or iPad model</li>
            <li>Your iOS or iPadOS version</li>
            <li>The Bottle Sort app version</li>
            <li>A short description of the problem</li>
            <li>A screenshot or screen recording, if available</li>
          </ul>
        </section>

        <section>
          <h2>Contact</h2>

          <p>
            For questions, technical support, or feedback regarding Bottle Sort,
            please contact:
          </p>

          <a
            className="email-button"
            href="mailto:YOUR_EMAIL@codeafm.dev"
          >
            YOUR_EMAIL@codeafm.dev
          </a>

          <p className="small-text">
            Please replace the email address above with your real support email
            before publishing this page.
          </p>
        </section>

        <section>
          <h2>Privacy</h2>

          <p>
            Information about how Bottle Sort handles user information is
            available in our Privacy Policy.
          </p>

          <a
            className="primary-link"
            href="/bottle-sort/privacy"
          >
            View Privacy Policy
          </a>
        </section>

        <footer>
          <p>© 2026 CodeAFM. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}

export default Support;