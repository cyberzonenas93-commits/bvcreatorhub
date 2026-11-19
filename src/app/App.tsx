import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { PortfolioDashboard } from "./components/PortfolioDashboard";
import { EventDashboard } from "./components/EventDashboard";
import { CheckInView } from "./components/CheckInView";
import { EventsListView } from "./components/EventsListView";
import { CreateEventView } from "./components/CreateEventView";
import { ContactsView } from "./components/ContactsView";
import { PromotersView } from "./components/PromotersView";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { SettingsView } from "./components/SettingsView";
import { PaymentsPayoutsView } from "./components/PaymentsPayoutsView";
import { SignupLoginView } from "./components/SignupLoginView";
import { NotificationsPopout } from "./components/NotificationsPopout";
import {
  Menu,
  Bell,
  User,
  ChevronDown,
  Settings,
  LayoutDashboard,
  CheckCircle2,
  Plus,
  Search,
  Calendar,
  ArrowLeft,
} from "lucide-react";

type ViewType =
  | "signup-login"
  | "onboarding"
  | "portfolio"
  | "events"
  | "event-dashboard"
  | "event-edit"
  | "event-attendees"
  | "event-invitations"
  | "event-discounts"
  | "event-boost"
  | "event-checkin"
  | "event-payouts"
  | "contacts"
  | "promoters"
  | "payments-payouts"
  | "settings"
  | "create-event"
  | "content-management";

interface SignupData {
  email: string;
  password: string;
  businessName: string;
  contactPerson: string;
  phone: string;
}

export default function App() {
  const [currentView, setCurrentView] =
    useState<ViewType>("signup-login");
  const [selectedEventId, setSelectedEventId] = useState<
    string | null
  >(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signupData, setSignupData] = useState<
    SignupData | undefined
  >(undefined);

  const handleNavigate = (
    view: string,
    eventId: string | null = null,
  ) => {
    setCurrentView(view as ViewType);
    if (eventId) {
      setSelectedEventId(eventId);
    } else if (view === "portfolio" || view === "events") {
      setSelectedEventId(null);
    }
    setIsSidebarOpen(false);
    setIsNotificationsOpen(false);
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentView("portfolio");
  };

  const handleSignupComplete = (data: SignupData) => {
    setSignupData(data);
    setIsAuthenticated(true);
    setCurrentView("onboarding");
  };

  const handleLoginComplete = () => {
    setIsAuthenticated(true);
    setHasCompletedOnboarding(true);
    setCurrentView("portfolio");
  };

  const renderContent = () => {
    switch (currentView) {
      case "signup-login":
        return (
          <SignupLoginView
            onSignupComplete={handleSignupComplete}
            onLoginComplete={handleLoginComplete}
          />
        );
      case "onboarding":
        return (
          <OnboardingFlow
            onComplete={handleOnboardingComplete}
            signupData={signupData}
          />
        );
      case "portfolio":
        return (
          <PortfolioDashboard onNavigate={handleNavigate} />
        );
      case "events":
        return <EventsListView onNavigate={handleNavigate} />;
      case "contacts":
        return <ContactsView />;
      case "promoters":
        return <PromotersView />;
      case "payments-payouts":
        return <PaymentsPayoutsView />;
      case "settings":
        return <SettingsView onNavigate={handleNavigate} />;
      case "event-dashboard":
        return (
          <EventDashboard
            eventId={selectedEventId || ""}
            onNavigate={handleNavigate}
          />
        );
      case "event-checkin":
        return <CheckInView />;
      case "create-event":
        // Mocking initial data if an eventId is provided for editing
        const mockEditData = selectedEventId
          ? {
              name: "Afrochella 2026",
              description:
                "The biggest Afrobeats and culture festival in Accra, featuring top artists and performers from across West Africa.",
              startDate: "2026-12-28",
              startTime: "16:00",
              locationType: "physical",
              location: "El Wak Stadium, Accra",
              eventType: "ticketed",
              ticketTiers: [
                {
                  name: "Early Bird",
                  price: 150,
                  capacity: 500,
                  salesStartDate: "2026-06-01",
                  salesEndDate: "2026-09-30",
                  absorbFee: true,
                  waitlistEnabled: true,
                },
                {
                  name: "General Admission",
                  price: 300,
                  capacity: 2000,
                  salesStartDate: "2026-07-15",
                  salesEndDate: "2026-12-27",
                  absorbFee: false,
                  waitlistEnabled: false,
                },
                {
                  name: "VIP Experience",
                  price: 800,
                  capacity: 200,
                  salesStartDate: "2026-07-15",
                  salesEndDate: "2026-12-27",
                  absorbFee: true,
                  waitlistEnabled: true,
                },
              ],
            }
          : undefined;

        return (
          <CreateEventView
            onBack={() =>
              handleNavigate(
                selectedEventId ? "event-dashboard" : "events",
                selectedEventId,
              )
            }
            onSave={(data, status) => {
              console.log("Saving event:", data, status);
              handleNavigate(
                selectedEventId ? "event-dashboard" : "events",
                selectedEventId,
              );
            }}
            initialData={mockEditData}
          />
        );
      default:
        return (
          <div className="p-12 text-center bg-[#232326] rounded-2xl border border-[#424249] shadow-sm">
            <h2 className="text-xl font-bold text-[#f8f9fa] font-['Kamerik205:Regular_3',sans-serif]">
              Module Under Development
            </h2>
            <p className="text-[#9caab8] mt-2">
              The{" "}
              <strong>
                {currentView
                  .replace("event-", "")
                  .replace("-", " ")}
              </strong>{" "}
              section for {selectedEventId || "this event"} is
              coming soon.
            </p>
            <button
              onClick={() => handleNavigate("portfolio")}
              className="mt-6 bg-[#feff1c] text-[#121214] px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  const getBreadcrumbs = () => {
    const items = [{ label: "Overview", view: "portfolio" }];

    if (selectedEventId && currentView.startsWith("event-")) {
      items.push({ label: "Events", view: "events" });
      items.push({
        label: "Afrochella",
        view: "event-dashboard",
      });

      if (currentView !== "event-dashboard") {
        items.push({
          label: currentView
            .replace("event-", "")
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          view: currentView,
        });
      }
    } else if (currentView === "create-event") {
      items.push({
        label: "Create Event",
        view: "create-event",
      });
    } else if (currentView === "onboarding") {
      items.push({ label: "Onboarding", view: "onboarding" });
    }

    return items;
  };

  return (
    <div className="flex min-h-screen bg-[#121214] font-['Inter:Regular',sans-serif] text-[#f8f9fa]">
      {currentView !== "onboarding" &&
        currentView !== "signup-login" && (
          <Sidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        {currentView !== "onboarding" &&
          currentView !== "signup-login" && (
            <header className="h-16 bg-[#121214] border-b border-[#424249] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 text-[#f8f9fa] lg:hidden hover:bg-[#232326] rounded-lg"
                >
                  <Menu size={24} />
                </button>

                <nav className="hidden sm:flex items-center text-sm font-medium"></nav>
              </div>

              <div className="flex items-center gap-4 lg:gap-6">
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsNotificationsOpen(
                        !isNotificationsOpen,
                      )
                    }
                    className={`p-2 rounded-lg relative transition-colors ${isNotificationsOpen ? "bg-[#232326] text-[#feff1c]" : "text-[#f8f9fa] hover:bg-[#232326]"}`}
                  >
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#feff1c] rounded-full border border-[#121214]"></span>
                  </button>

                  <NotificationsPopout
                    isOpen={isNotificationsOpen}
                    onClose={() =>
                      setIsNotificationsOpen(false)
                    }
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-2 py-1 hover:bg-[#232326] rounded-lg transition-colors cursor-pointer group">
                    <div className="w-9 h-9 bg-[#232326] text-[#f8f9fa] border border-[#424249] rounded-full flex items-center justify-center font-bold text-sm group-hover:border-[#feff1c]">
                      DA
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-semibold leading-none">
                        Delasie Ametepey
                      </p>
                    </div>
                    <ChevronDown
                      size={16}
                      className="text-[#9caab8]"
                    />
                  </div>
                </div>
              </div>
            </header>
          )}

        {/* Content Area */}
        <div
          className={`flex-1 overflow-y-auto ${currentView !== "onboarding" && currentView !== "signup-login" ? "p-4 lg:p-8" : ""}`}
        >
          <div
            className={
              currentView !== "onboarding" &&
              currentView !== "signup-login"
                ? "max-w-7xl mx-auto"
                : ""
            }
          >
            {(() => {
              if (
                currentView === "onboarding" ||
                currentView === "signup-login"
              )
                return null;
              const crumbs = getBreadcrumbs();
              if (crumbs.length <= 1) return null;
              const backTarget = crumbs[crumbs.length - 2];
              return (
                <button
                  onClick={() =>
                    handleNavigate(
                      backTarget.view,
                      backTarget.view === "event-dashboard"
                        ? selectedEventId
                        : null,
                    )
                  }
                  className="flex items-center gap-2 text-[#9caab8] hover:text-[#feff1c] transition-colors text-sm font-medium mb-4"
                >
                  <ArrowLeft size={16} />
                  <span>Back to {backTarget.label}</span>
                </button>
              );
            })()}
            {renderContent()}
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        {currentView !== "onboarding" &&
          currentView !== "signup-login" && (
            <nav className="lg:hidden h-16 bg-[#121214] border-t border-[#424249] flex items-center justify-around px-2 sticky bottom-0 z-30">
              <button
                onClick={() => handleNavigate("portfolio")}
                className={`flex flex-col items-center gap-1 ${currentView === "portfolio" ? "text-[#feff1c]" : "text-[#9caab8]"}`}
              >
                <div className="p-1">
                  <LayoutDashboard size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase">
                  Overview
                </span>
              </button>
              <button
                onClick={() => handleNavigate("events")}
                className={`flex flex-col items-center gap-1 ${currentView === "events" ? "text-[#feff1c]" : "text-[#9caab8]"}`}
              >
                <div className="p-1">
                  <Calendar size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase">
                  Events
                </span>
              </button>
              <button
                onClick={() => handleNavigate("contacts")}
                className={`flex flex-col items-center gap-1 ${currentView === "contacts" ? "text-[#feff1c]" : "text-[#9caab8]"}`}
              >
                <div className="p-1">
                  <User size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase">
                  Contacts
                </span>
              </button>
            </nav>
          )}
      </main>
    </div>
  );
}