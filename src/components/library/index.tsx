import { T_topicFields } from "@hooks/use-topic/types";
import type { ColumnsType } from "antd/es/table";
import i18next from "i18next";

export const resourceTableColumns: ColumnsType<T_topicFields> = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "School",
    dataIndex: "schoolName",
    key: "school",
    render: (text) => <a>{text || i18next.t("not_linked")}</a>,
  },
  {
    title: "Program",
    dataIndex: "programName",
    key: "Program",
    render: (text) => <a>{text || i18next.t("not_linked")}</a>,
  },
  {
    title: "Course",
    dataIndex: "courseName",
    key: "Course",
    render: (text) => <a>{text || i18next.t("not_linked")}</a>,
  },
  {
    title: "Unit",
    dataIndex: "unitName",
    key: "Unit",
    render: (text) => <a>{text || i18next.t("not_linked")}</a>,
  },
  {
    title: "Topic",
    dataIndex: "topicName",
    key: "Topic",
    render: (text) => <a>{text || i18next.t("not_linked")}</a>,
  },
  {
    title: "Create By",
    dataIndex: "created_by",
    key: "created_by",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Create At",
    dataIndex: "created_at",
    key: "created_by",
    render: (text) => <a>{text}</a>,
  },
];
