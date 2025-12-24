import { Link, useLocation } from "react-router-dom";
import { 
  Briefcase, 
  Droplets, 
  Heart, 
  Wind, 
  AlertTriangle 
} from "lucide-react";

interface ServiceTab {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const serviceTabs: ServiceTab[] = [
  {
    label: "산업보건",
    path: "/industrial-health",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    label: "먹는물검사",
    path: "/water-testing",
    icon: <Droplets className="w-5 h-5" />,
  },
  {
    label: "투석용수",
    path: "/dialysis-water",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    label: "실내공기질",
    path: "/indoor-air-quality",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    label: "석면분석",
    path: "/asbestos",
    icon: <AlertTriangle className="w-5 h-5" />,
  },
];

const ServiceNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-16 md:top-20 z-40">
      <div className="container-custom">
        {/* 데스크톱 탭 */}
        <div className="hidden lg:flex items-center space-x-1 py-3">
          {serviceTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                isActive(tab.path)
                  ? "bg-primary-600 text-white shadow-md"
                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </Link>
          ))}
        </div>

        {/* 모바일 스크롤 탭 */}
        <div className="lg:hidden overflow-x-auto hide-scrollbar py-3">
          <div className="flex items-center space-x-2 min-w-max px-1">
            {serviceTabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isActive(tab.path)
                    ? "bg-primary-600 text-white shadow-md"
                    : "text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700"
                }`}
              >
                {tab.icon}
                <span className="text-sm">{tab.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ServiceNavigation;
