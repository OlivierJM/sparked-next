/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ADMIN_LINKS } from "@components/layouts/adminLayout/links";
import { TschoolFields } from "@components/school/types";
import useNavigation from "@hooks/useNavigation";
import { message } from "antd";
import { API_LINKS } from "app/links";
import i18next from "i18next";
import { useEffect, useState } from "react";
import UiStore from "@state/mobx/uiStore";
import { TcreateCourseFields, TfetchCourses, TcourseFields } from "./types";

const useCourse = (form?: any) => {
  const { getChildLinkByKey, router } = useNavigation();

  const [isLoading, setLoaderStatus] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [courses, setCourses] = useState<Array<TschoolFields>>([]);
  const [tempPrograms, setTempCourses] = useState<Array<TschoolFields>>([]);
  const [course, setCourse] = useState<TcourseFields | null>(null);
  const [selecetedCourseIds, setSelectedProgramIds] = useState<React.Key[]>([]);

  useEffect(() => {
    UiStore.confirmDialogStatus &&
      selecetedCourseIds.length &&
      deleteCourse();
  }, [UiStore.confirmDialogStatus]);

  const createCourse = async (fields: TcreateCourseFields) => {
    const url = API_LINKS.CREATE_COURSE;
    const formData = {
      body: JSON.stringify({ ...fields }),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const resp = await fetch(url, formData);

      if (!resp.ok) {
        message.warning(i18next.t("unknown_error"));
        return false;
      }

      const responseData = await resp.json();

      if (responseData.isError) {
        message.warning(responseData.code);
        return false;
      }

      router.push(ADMIN_LINKS.courses.link);

      message.success(i18next.t("course_created"));
    } catch (err: any) {
      message.error(`${i18next.t("unknown_error")}. ${err.msg ? err.msg : ""}`);
      return false;
    }
  };

  const editCourse = async (fields: TschoolFields) => {
    const url = API_LINKS.EDIT_COURSE;
    const formData = {
      //spread course in an event that it is not passed by the form due to the fact that the first 1000 records didn't contain it. See limit on fetch schools and programs
      body: JSON.stringify({...course, ...fields, courseId: course?._id }),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const resp = await fetch(url, formData);

      if (!resp.ok) {
        message.warning(i18next.t("unknown_error"));
        return false;
      }

      const responseData = await resp.json();


      if (responseData.isError) {
        message.warning(responseData.code);
        return false;
      }

      router.push(ADMIN_LINKS.courses.link);

      message.success(i18next.t("success"));
    } catch (err: any) {
      message.error(`${i18next.t("unknown_error")}. ${err.msg ? err.msg : ""}`);
      return false;
    }
  };

  const fetchCourses = async ({ limit = 1000, skip = 0 }: TfetchCourses) => {
    const url = API_LINKS.FETCH_COURSES;
    const formData = {
      body: JSON.stringify({ limit, skip, withMetaData: true }),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const resp = await fetch(url, formData);

      if (!resp.ok) {
        message.warning(i18next.t("unknown_error"));
        return false;
      }

      const responseData = await resp.json();

      if (responseData.isError) {
        message.warning(responseData.code);
        return false;
      }

      const _courses = responseData.courses?.map(
        (i: TcourseFields, index: number) => ({
          index: index + 1,
          key: i._id,
          _id: i._id,
          name: i.name,
          school: i.school,
          schoolId: i.school?._id,
          schoolName: i.school?.name,
          programName: i.program?.name,
          programId: i.program?._id,
          created_by: i.user?.email,
          created_at: new Date(i.created_at).toDateString(),
        })
      );

      setCourses(_courses);
      setTempCourses(_courses);
      return _courses;
    } catch (err: any) {
      message.error(`${i18next.t("unknown_error")}. ${err.msg ? err.msg : ""}`);
      return false;
    }
  };

  const fetchCourseById = async ({
    courseId,
    withMetaData = false,
  }: {
    courseId: string;
    withMetaData: boolean;
  }) => {
    const url = API_LINKS.FETCH_COURSE_BY_ID;
    const formData = {
      body: JSON.stringify({ courseId, withMetaData }),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const resp = await fetch(url, formData);

      if (!resp.ok) {
        message.warning(i18next.t("unknown_error"));
        return false;
      }

      const responseData = await resp.json();

      if (responseData.isError) {
        message.warning(responseData.code);
        return false;
      }

      if (responseData.course) {
        const { _id, name, description, school, program } =
          responseData.course as TcourseFields;

        const _course = {
          _id,
          name,
          description,
          schoolId: school?._id,
          programId: program?._id,
        };

        setCourse(_course as TcourseFields);
        form && form.setFieldsValue(_course);
        return _course;
      } else {
        return null;
      }
    } catch (err: any) {
      message.error(`${i18next.t("unknown_error")}. ${err.msg ? err.msg : ""}`);
      return false;
    }
  };

  const triggerDelete = async () => {
    if (!selecetedCourseIds.length) {
      return message.warning(i18next.t("select_items"));
    }

    UiStore.setConfirmDialogVisibility(true);
  };

  const deleteCourse = async () => {
    if (UiStore.isLoading) return;

    const url = API_LINKS.DELETE_courses;
    const formData = {
      body: JSON.stringify({ programIds: selecetedCourseIds }),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      UiStore.setLoaderStatus(true);
      const resp = await fetch(url, formData);
      UiStore.setLoaderStatus(false);

      if (!resp.ok) {
        message.warning(i18next.t("unknown_error"));
        return false;
      }

      const responseData = await resp.json();

      if (responseData.isError) {
        message.warning(responseData.code);
        return false;
      }

      UiStore.setConfirmDialogVisibility(false);
      message.success(i18next.t("success"));

      setCourses(
        courses.filter((i) => selecetedCourseIds.indexOf(i._id) == -1)
      );

      return responseData.results;
    } catch (err: any) {
      UiStore.setLoaderStatus(false);

      message.error(`${i18next.t("unknown_error")}. ${err.msg ? err.msg : ""}`);
      return false;
    }
  };
  const findProgramsByName = async ({
    withMetaData = false,
  }: {
    withMetaData: boolean;
  }) => {
    if (isLoading) {
      return message.warning(i18next.t("wait"));
    } else if (!searchQuery.trim().length) {
      return message.warning(i18next.t("search_empty"));
    }

    const url = API_LINKS.FIND_courses_BY_NAME;
    const formData = {
      body: JSON.stringify({
        name: searchQuery.trim(),
        limit: 1000,
        skip: 0,
        withMetaData,
      }),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoaderStatus(true);
      const resp = await fetch(url, formData);
      setLoaderStatus(false);

      if (!resp.ok) {
        message.warning(i18next.t("unknown_error"));
        return false;
      }

      const responseData = await resp.json();

      if (responseData.isError) {
        message.warning(responseData.code);
        return false;
      }
      message.success(
        responseData.programs.length + " " + i18next.t("programs_found")
      );

      setCourses(responseData.programs);

      return responseData.programs;
    } catch (err: any) {
      setLoaderStatus(false);
      message.error(`${i18next.t("unknown_error")}. ${err.msg ? err.msg : ""}`);
      return false;
    }
  };

  const onSearchQueryChange = (text: string) => {
    setSearchQuery(text);

    if (!text.trim().length) {
      setCourses(tempPrograms);
    }
  };

  const triggerEdit = async () => {
    if (!selecetedCourseIds.length) {
      return message.warning(i18next.t("select_item"));
    } else if (selecetedCourseIds.length > 1) {
      return message.warning(i18next.t("select_one_item"));
    }

    router.push(
      getChildLinkByKey("edit", ADMIN_LINKS.courses) +
        `?courseId=${selecetedCourseIds[0]}`
    );
  };

  return {
    createCourse,
    fetchCourses,
    courses,
    setCourses,
    setSelectedProgramIds,
    selecetedCourseIds,
    triggerDelete,
    triggerEdit,
    fetchCourseById,
    router,
    course,
    isLoading,
    editCourse,
    findProgramsByName,
    onSearchQueryChange,
    searchQuery,
    tempPrograms,
  };
};

export default useCourse;
