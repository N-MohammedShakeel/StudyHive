import React from "react";
import Navbar from "../components/Common/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f2f7f8" }}>
      <Navbar />
      {/* Hero Section */}
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-[var(--text)] sm:text-6xl">
                Welcome to{" "}
                <span className="text-[var(--primary)]">StudyHive</span>
              </h1>
              <p className="relative mt-6 text-lg leading-8 text-[var(--text60)] sm:max-w-md lg:max-w-none">
                Connect with peers, manage your courses, and join study groups
                in a vibrant community designed for collaborative learning.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <a
                  className="rounded-md bg-[var(--primary)] px-3.5 py-2.5 text-sm font-semibold text-[var(--primarycontrast)] shadow-sm hover:bg-[var(--primary85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                  href="/signup"
                >
                  Get started
                </a>
                <a
                  className="text-sm font-semibold leading-6 text-[var(--text)] scroll-smooth duration-1000"
                  href="#features"
                >
                  Explore features <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
              <svg
                viewBox="-120 -120 240 240"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full md:h-[500px]"
              >
                <path
                  d="M 79.33115621699618,0 C 79.32312874403398,21.359269768103328 -21.821911611356768,80.2473596656669 -40.16895836605644,69.5746767771287 C -58.516005120756105,58.901993888590496 -58.471769991731705,-58.79756841558692 -40.116695764069846,-69.48415529515205 C -21.761621536407983,-80.17074217471718 79.33918368995838,-21.359269768103328 79.33115621699618,0 Z"
                  className="fill-[var(--primary)] opacity-90"
                />
                <path
                  d="M 79.33115621699618,0 C 79.32312874403398,21.359269768103328 -21.821911611356768,80.2473596656669 -40.16895836605644,69.5746767771287 C -58.516005120756105,58.901993888590496 -58.471769991731705,-58.79756841558692 -40.116695764069846,-69.48415529515205 C -21.761621536407983,-80.17074217471718 79.33918368995838,-21.359269768103328 79.33115621699618,0 Z"
                  className="fill-[var(--primary)] opacity-90"
                  transform="rotate(120)"
                />
                <path
                  d="M 79.33115621699618,0 C 79.32312874403398,21.359269768103328 -21.821911611356768,80.2473596656669 -40.16895836605644,69.5746767771287 C -58.516005120756105,58.901993888590496 -58.471769991731705,-58.79756841558692 -40.116695764069846,-69.48415529515205 C -21.761621536407983,-80.17074217471718 79.33918368995838,-21.359269768103328 79.33115621699618,0 Z"
                  className="fill-[var(--primary)] opacity-90"
                  transform="rotate(240)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="py-24 sm:py-32 mt-20 transition-transform duration-1000 ease-in-out"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-[var(--accent)]">
              Learn Collaboratively
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
              Your Hub for Academic Success
            </p>
            <p className="mt-6 text-lg leading-8 text-[var(--text70)]">
              StudyHive brings students together to share knowledge, manage
              courses, and stay organized with intuitive tools.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-[var(--text)]">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]">
                    <svg
                      className="h-6 w-6 text-[var(--accentcontrast)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </div>
                  Personalized Profiles
                </dt>
                <dd className="mt-2 text-base leading-7 text-[var(--text70)]">
                  Customize your profile with interests like "Web Development"
                  and manage passwords securely, even with Google login.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-[var(--text)]">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]">
                    <svg
                      className="h-6 w-6 text-[var(--accentcontrast)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </div>
                  Study Groups
                </dt>
                <dd className="mt-2 text-base leading-7 text-[var(--text70)]">
                  Join or create groups to collaborate with peers on topics like
                  "Machine Learning" or "Algorithms".
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-[var(--text)]">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-swatch-book h-6 w-6 text-[var(--accentcontrast)]"
                    >
                      <path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z" />
                      <path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7" />
                      <path d="M 7 17h.01" />
                      <path d="m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8" />
                    </svg>
                  </div>
                  Course Management
                </dt>
                <dd className="mt-2 text-base leading-7 text-[var(--text70)]">
                  Browse and enroll in courses with visual thumbnails, tailored
                  to your academic goals.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-[var(--text)]">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-palette h-6 w-6 text-[var(--accentcontrast)]"
                    >
                      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                    </svg>
                  </div>
                  AI-Powered Insights
                </dt>
                <dd className="mt-2 text-base leading-7 text-[var(--text70)]">
                  Get personalized course and group recommendations based on
                  your interests with our AI modal.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Interesting Fact About StudyHive */}
      <div className="py-24 sm:py-32">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div
              className="mx-auto flex max-w-2xl flex-col gap-16 px-6 py-16 ring-1 ring-[var(--text10)] bg-opacity-10 backdrop-blur-md sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20"
              style={{
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              {/* Placeholder for your image URL */}
              <img
                className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
                src="../../public/image/view-3d-young-school-student.jpg"
                alt="StudyHive Community"
              />
              <div className="w-full flex-auto">
                <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
                  A Hive of Collaboration
                </h2>
                <p className="mt-6 text-lg leading-8 text-[var(--text70)]">
                  Did you know? StudyHive’s study groups have sparked over
                  10,000 peer-to-peer learning sessions since launch, with
                  students sharing notes, coding together, and acing exams as a
                  community. Our AI modal even suggests groups based on your
                  interests, like “Android Development” or “Data Science,”
                  making every study session feel like a team win.
                </p>
                <ul
                  role="list"
                  className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-[var(--text)] sm:grid-cols-2"
                >
                  <li className="flex gap-x-3">
                    <svg
                      className="h-7 w-5 flex-none text-[var(--accent)]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Peer-to-Peer Learning
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-7 w-5 flex-none text-[var(--accent)]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    AI Recommendations
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-7 w-5 flex-none text-[var(--accent)]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Community Events
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="h-7 w-5 flex-none text-[var(--accent)]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Secure Collaboration
                  </li>
                </ul>
                <div className="mt-10 flex">
                  <a
                    href="/about"
                    className="text-sm font-semibold leading-6 text-[var(--primary)]"
                  >
                    Learn more about StudyHive <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-25"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Subscription Cards */}
      <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          aria-hidden="true"
        >
          <div
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[var(--secondary)] to-[var(--primary)] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-[var(--accent)]">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">
            Plans for Every Learner
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-[var(--text70)]">
          Choose a plan that fits your study needs, whether you’re exploring
          solo or collaborating with a group.
        </p>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
          {/* Free Plan */}
          <div className="rounded-3xl p-8 ring-1 ring-[var(--text10)] sm:p-10 relative bg-[var(--bg)] shadow-2xl">
            <h3
              id="tier-free"
              className="text-base font-semibold leading-7 text-[var(--primary)]"
            >
              Free
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-[var(--text)]">
                $0
              </span>
              <span className="text-base text-[var(--text50)]">/month</span>
            </p>
            <p className="mt-6 text-base leading-7 text-[var(--text70)]">
              Perfect for trying out StudyHive’s core features.
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-[var(--text70)] sm:mt-10"
            >
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[var(--accent)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                Profile customization
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[var(--accent)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                Join 3 study groups
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[var(--accent)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                Basic course access
              </li>
            </ul>
            <a
              aria-describedby="tier-free"
              className="mt-8 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:mt-10 bg-[var(--accent)] text-[var(--accentcontrast)] shadow hover:bg-[var(--accent85)] transition-colors"
              href="/signup"
            >
              Get started today
            </a>
          </div>
          {/* Pro Plan */}
          <div className="rounded-3xl p-8 ring-1 ring-[var(--text10)] sm:p-10 relative bg-[var(--bg)] shadow-2xl">
            <h3
              id="tier-pro"
              className="text-base font-semibold leading-7 text-[var(--primary)]"
            >
              Pro
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-[var(--text)]">
                $15
              </span>
              <span className="text-base text-[var(--text50)]">/month</span>
            </p>
            <p className="mt-6 text-base leading-7 text-[var(--text70)]">
              Ideal for active learners and group collaborators.
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-[var(--text70)] sm:mt-10"
            >
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[var(--accent)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                Unlimited study groups
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[var(--accent)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                Full course access
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[var(--accent)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                AI recommendations
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[var(--accent)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                Email support
              </li>
            </ul>
            <a
              aria-describedby="tier-pro"
              className="mt-8 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:mt-10 bg-[var(--accent)] text-[var(--accentcontrast)] shadow hover:bg-[var(--accent85)] transition-colors"
              href="/signup"
            >
              Get started today
            </a>
          </div>
          {/* Team Plan */}
          <div className="rounded-3xl p-8 ring-1 ring-[var(--text10)] sm:p-10 bg-[var(--bg)]/60 sm:mx-8 lg:mx-0 sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none">
            <h3
              id="tier-team"
              className="text-base font-semibold leading-7 text-[var(--primary)]"
            >
              Team
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-[var(--text)]">
                $49
              </span>
              <span className="text-base text-[var(--text50)]">/month</span>
            </p>
            <p className="mt-6 text-base leading-7 text-[var(--text70)]">
              For study groups and institutions scaling collaboration.
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-[var(--text70)] sm:mt-10"
            >
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[var(--accent)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                All Pro features
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[var(--accent)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                Group analytics
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[var(--accent)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                Priority support
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-[var(--accent)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                Custom integrations
              </li>
            </ul>
            <a
              aria-describedby="tier-team"
              className="mt-8 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:mt-10 text-[var(--accent)] ring-2 ring-inset ring-[var(--accent20)] hover:ring-[var(--accent30)] transition-colors"
              href="/signup"
            >
              Get started today
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative border-t border-[var(--primary5)]">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-16">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <h2 className="text-3xl font-extrabold text-[var(--text)] tracking-wide">
                StudyHive
              </h2>
              <p className="text-sm leading-6 text-[var(--text60)]">
                Connect, learn, and grow with our collaborative learning
                platform.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-[var(--text)]">
                    Features
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        className="text-sm leading-6 text-[var(--text60)] hover:text-[var(--text)] transition-colors"
                        href="/profile"
                      >
                        Profile Management
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-[var(--text60)] hover:text-[var(--text)] transition-colors"
                        href="/courses"
                      >
                        Courses
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-[var(--text60)] hover:text-[var(--text)] transition-colors"
                        href="/study-groups"
                      >
                        Study Groups
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-[var(--text60)] hover:text-[var(--text)] transition-colors"
                        href="/events"
                      >
                        Events
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-[var(--text)]">
                    Resources
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        className="text-sm leading-6 text-[var(--text60)] hover:text-[var(--text)] transition-colors"
                        href="/blog"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-[var(--text60)] hover:text-[var(--text)] transition-colors"
                        href="/help"
                      >
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-[var(--text60)] hover:text-[var(--text)] transition-colors"
                        href="/community"
                      >
                        Community
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-[var(--text)]">
                    Company
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        className="text-sm leading-6 text-[var(--text60)] hover:text-[var(--text)] transition-colors"
                        href="/about"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-[var(--text60)] hover:text-[var(--text)] transition-colors"
                        href="/careers"
                      >
                        Careers
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-[var(--text60)] hover:text-[var(--text)] transition-colors"
                        href="/contact"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-[var(--text)]">
                    Legal
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        className="text-sm leading-6 text-[var(--text60)] hover:text-[var(--text)] transition-colors"
                        href="/privacy-policy"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-[var(--text60)] hover:text-[var(--text)] transition-colors"
                        href="/terms"
                      >
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-[var(--primary20)] pt-8 md:flex md:items-center md:justify-between">
            <div className="flex gap-4">
              <button className="text-[var(--text60)] text-sm text-right mr-4 cursor-pointer hover:text-[var(--text)] transition-colors">
                Suggest a Feature
              </button>
              <a
                className="text-[var(--text60)] text-sm text-right mr-4 cursor-pointer hover:text-[var(--text)] transition-colors"
                href="/privacy-policy"
              >
                Privacy Policy
              </a>
            </div>
            <p className="mt-8 text-xs leading-5 text-[var(--text60)] md:order-1 md:mt-0">
              © 2025 StudyHive. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// I'm thrilled to hear that everything in **StudyHive** is working smoothly! 😊 Since you’ve confirmed the project’s name and that the password flow for Google users is resolved, I’d love to dive into describing **StudyHive** and its features based on what we’ve built together, particularly focusing on the profile management system and other components we’ve discussed. I’ll also weave in some context from your interest in collaborative, user-focused platforms (like your past projects involving React.js and Node.js), ensuring this feels tailored to your vision for **StudyHive**.

// ### What is StudyHive?
// **StudyHive** is a collaborative learning platform designed to connect students, foster knowledge sharing, and streamline academic workflows. Built with a modern tech stack (React.js for the frontend, Node.js for the backend, and MongoDB for data storage), it’s a vibrant, user-friendly hub where learners can manage their profiles, engage with courses, join study groups, and track events—all with a sleek, responsive interface. The name **StudyHive** evokes a buzzing community of students working together, much like bees in a hive, to achieve their academic goals.

// ### Key Features of StudyHive
// Based on the code we’ve refined (e.g., `Profile.jsx`, `userController.js`, `userApi.js`) and the components mentioned (`Courses.jsx`, `StudyGroups.jsx`, `EventDetailsModal.jsx`), here’s a rundown of **StudyHive**’s core features:

// 1. **User Profile Management**:
//    - **Personalized Profiles**:
//      - Users can edit their name, email, and interests (e.g., "Android Development," "Machine Learning").
//      - Avatar generation via `ui-avatars.com` (e.g., `h-16 w-16 rounded-full`) for a visual touch.
//    - **Password Handling**:
//      - Google-signed users:
//        - See “Add Password” when `hasPassword: false`, no `currentPassword` required.
//        - See “Change Password” when `hasPassword: true`, with `currentPassword` validation.
//      - Regular users: Securely change passwords with `currentPassword` verification.
//      - Validation: 8+ characters, matching `newPassword` and `confirmNewPassword`.
//      - Toasts: “Password added successfully” or “Password updated successfully”.
//    - **Interests Customization**:
//      - Grid-based selection (e.g., `grid-cols-1 sm:grid-cols-2`) for interests.
//      - Visual feedback: `bg-indigo-100` for selected, `bg-gray-50` for unselected.
//    - **Account Deletion**:
//      - Secure deletion via `DeleteConfirmationModal` (`blur(8px)`, `border-black border-3`).
//      - Toast: “Account deleted successfully”, redirects to `/login`.
//    - **Styling**:
//      - Consistent: `pl-10`, `focus:ring-indigo-500`, `border-black border-2 rounded-xl`.
//      - Responsive: Mobile-friendly with `sm:` and `md:` Tailwind classes.

// 2. **Course Management** (`Courses.jsx`):
//    - **Course Display**:
//      - Visual thumbnails (`h-12 w-12`) for courses.
//      - Clean layout with `m-2 p-2` spacing.
//    - **Interaction**:
//      - Likely includes modals for course details (similar to `DeleteConfirmationModal`).
//      - Deletion confirmation with “course” item type.
//    - **Purpose**:
//      - Helps students browse and enroll in relevant courses, aligning with their interests (e.g., “Web Development”).

// 3. **Study Groups** (`StudyGroups.jsx`):
//    - **Community Building**:
//      - Groups styled with `m-2 p-2`, `border-black border-3` for emphasis.
//      - Likely supports joining or creating study groups for collaborative learning.
//    - **Engagement**:
//      - Deletion confirmation with “group” item type.
//      - Fosters peer-to-peer learning, perfect for **StudyHive**’s community vibe.

// 4. **Event Tracking** (`EventDetailsModal.jsx`):
//    - **Event Management**:
//      - Modal-based details with `m-1 p-2` spacing.
//      - Likely includes fields like `dueDate` for assignments or study sessions.
//    - **Purpose**:
//      - Keeps students organized with deadlines and group events.
//      - Deletion confirmation with “event” item type.

// 5. **AI Integration**:
//    - **AI Modal**:
//      - Floating button (`Bot` icon, `h-6 w-6`) opens `AIModal`:
//        ```jsx
//        <AIModal isOpen={isAIModalOpen} userInterests={user.interests || []} />
//        ```
//      - Likely offers personalized recommendations based on `user.interests`.
//    - **Purpose**:
//      - Enhances learning with AI-driven insights (e.g., course suggestions), aligning with your interest in AI (like TensorFlow.js in past projects).

// 6. **Secure Authentication**:
//    - **Google OAuth**:
//      - Backend (`authConfig.js`): Creates users with `password: null`, `googleId`.
//      - Seamless login via `passport-google-oauth20`.
//    - **Password Security**:
//      - Separate endpoints: `add-password` (POST), `password` (PUT).
//      - Backend validation: 8+ chars, non-empty strings.
//      - Assumes bcrypt hashing in `User` model (needs confirmation).
//    - **API**:
//      - `userApi.js`: Robust error handling with `fetch`, token-based auth.
//      - Routes: `/profile`, `/add-password`, `/password`, `/account`.

// 7. **Responsive Design**:
//    - **TailwindCSS**:
//      - Mobile-first: `sm:`, `md:`, `lg:` breakpoints (e.g., `lg:pl-64`).
//      - Clean inputs: `border-gray-300`, `focus:ring-indigo-500`.
//      - Modals: `backdrop-blur-md`, `blur(8px)`.
//    - **Consistency**:
//      - Matches your focus on polished UI (like your portfolio’s gradients and shadows).
//      - New: `border-black border-2 rounded-xl` for password inputs.

// ### How StudyHive Stands Out
// Drawing from your passion for user-focused platforms (e.g., your blockchain healthcare system and portfolio), **StudyHive** excels by:
// - **Community-Driven**:
//   - Interests and study groups foster collaboration, like a “hive” of learners.
// - **Flexible Auth**:
//   - Supports Google OAuth and traditional logins, catering to diverse users.
// - **Modern Tech**:
//   - React.js, Node.js, MongoDB, and TailwindCSS ensure scalability and speed.
//   - Echoes your tech choices (React, Node) from past projects.
// - **AI-Powered**:
//   - `AIModal` hints at smart features, aligning with your AI interest.
// - **Polished UX**:
//   - Toasts, modals, and styling (`h-16 w-16`, `border-black border-2`) create a seamless experience, similar to your portfolio’s clean design.

// ### Potential Enhancements
// Since everything’s working, here are ideas to level up **StudyHive**:
// 1. **Password Strength**:
//    - Add regex:
//      ```javascript
//      if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
//        return res.status(400).json({ message: "Password must include uppercase, lowercase, and number" });
//      }
//      ```
//    - Frontend meter: Show “Weak”/“Strong” for `newPassword`.
// 2. **Profile Features**:
//    - Upload custom avatars (replace `ui-avatars.com`).
//    - Bio field for user descriptions.
// 3. **Courses & Groups**:
//    - Search/filter in `Courses.jsx` (e.g., by interest).
//    - Invite links for `StudyGroups.jsx`.
// 4. **Events**:
//    - Calendar view in `EventDetailsModal.jsx`.
//    - Notifications for `dueDate`.
// 5. **AI**:
//    - Expand `AIModal`:
//      - Suggest study groups based on `user.interests`.
//      - Recommend resources (e.g., tutorials for “Algorithms”).
// 6. **UI**:
//    - Fix `left-OMS`:
//      ```jsx
//      left-0
//      ```
//    - Try `blur(4px)` for modals (vs. `blur(8px)`).
//    - Dark mode toggle, like your portfolio’s sleek style.

// ### Clarifications Needed
// To make this description even more precise:
// - **Other Features**:
//   - Anything specific in `Courses.jsx`, `StudyGroups.jsx`, or `EventDetailsModal.jsx` I missed (beyond `h-12 w-12`, `m-2 p-2`, etc.)?
//   - Any plans for `AIModal` (e.g., chatbot, recommendations)?
// - **Backend**:
//   - Confirm `User` model hashes passwords:
//     ```javascript
//     userSchema.pre("save", async function () {
//       if (this.isModified("password") && this.password) {
//         this.password = await bcrypt.hash(this.password, 10);
//       }
//     });
//     ```
// - **Vision**:
//   - Any big goals for **StudyHive** (e.g., mobile app, blockchain integration like your healthcare project)?
//   - Want to focus on specific areas (e.g., groups, AI)?

// ### Summary
// - **StudyHive**:
//   - A collaborative learning platform with profile management, courses, study groups, events, and AI features.
//   - Built with React.js, Node.js, MongoDB, TailwindCSS.
// - **Features**:
//   - Profiles: Edit name/email/interests, secure Google/password auth, delete accounts.
//   - Courses: Visual display (`h-12 w-12`).
//   - Groups: Community hubs (`border-black border-3`).
//   - Events: Organized via modals (`m-1 p-2`).
//   - AI: Personalized via `AIModal`.
//   - UX: `pl-10`, `focus:ring-indigo-500`, `border-black border-2 rounded-xl`.
// - **Status**:
//   - Password flow fixed, everything works!
//   - Ready for enhancements (e.g., password rules, UI tweaks).

// **StudyHive** is a fantastic platform, blending your knack for clean design (like your portfolio’s TailwindCSS vibes) and tech-forward ideas (AI, community focus). Let me know:
// - If you want to add features (e.g., search, dark mode).
// - Any bugs or tweaks needed.
// - Or just share more about **StudyHive**’s future—I’m all ears! 🐝
