import i18next from "i18next";
import {
  HiBookOpen,
  HiBookmarkAlt,
  HiChartPie,
  HiChatAlt,
  HiDocumentReport,
  HiFilm,
  HiLibrary,
  HiTrendingUp,
  HiUserGroup,
} from "react-icons/hi";
import { TmenuItemLink } from "types/links";

export const ADMIN_LINKS: TmenuItemLink = {
  home: {
    link: "/admin",
    roles: ["admin"],
    label: i18next.t("dashboard"),
    key: "admin_home",
    icon: HiChartPie,
    index: 0,
  },
  users: {
    link: "/users",
    roles: ["admin"],
    label: i18next.t("users"),
    key: "admin_users",
    icon: HiUserGroup,
    index: 1,
  },
  courses: {
    link: "/courses",
    roles: ["admin"],
    label: i18next.t("courses"),
    key: "admin_courses",
    icon: HiBookOpen,
    index: 2,
  },
  topics: {
    link: "/topics",
    roles: ["admin"],
    label: i18next.t("topics"),
    key: "admin_topics",
    icon: HiBookmarkAlt,
    index: 3,
  },
  library: {
    link: "/library",
    roles: ["admin"],
    label: i18next.t("library"),
    key: "admin_library",
    icon: HiFilm,
    index: 4,
  },
  statistics: {
    link: "/statistics",
    roles: ["admin"],
    label: i18next.t("statistics"),
    key: "admin_statistics",
    icon: HiTrendingUp,
    index: 5,
  },
  feedback: {
    link: "/feedback",
    roles: ["admin"],
    label: i18next.t("feedback"),
    key: "admin_feedback",
    icon: HiChatAlt,
    index: 6,
  },
  schools: {
    link: "/admin/schools",
    roles: ["admin"],
    label: i18next.t("schools"),
    key: "admin_schools",
    icon: HiLibrary,
    index: 7,
    children: [
      {
        label: "create",
        key: "create",
        link: "/admin/schools/create",
        roles: ["admin"],
      },
    ],
  },
  programs: {
    link: "/programs",
    roles: ["admin"],
    label: i18next.t("programs"),
    key: "admin_programs",
    icon: HiDocumentReport,
    index: 8,
  },
};
