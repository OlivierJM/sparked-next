import { T_MenuItemLink } from 'types/navigation/links';
import React from 'react';
import i18next from 'i18next';
import {
  AiOutlineBarChart,
  AiOutlineBlock,
  AiOutlineBook,
  AiOutlineBulb,
  AiOutlineContainer,
  AiOutlineDashboard,
  AiOutlineHdd,
  AiOutlineMessage,
  AiOutlineUser,
} from 'react-icons/ai';

// Todo:
// - Add logout link
// - Add profile details

export const ADMIN_LINKS: T_MenuItemLink = {
  home: {
    link: '/admin',
    roles: ['admin'],
    label: i18next.t('dashboard'),
    key: 'admin_home',
    icon: () => <AiOutlineDashboard />,
    index: 1,
  },
  users: {
    link: '/admin/users',
    roles: ['admin'],
    label: i18next.t('users'),
    key: 'admin_users',
    icon: () => <AiOutlineUser />,
    index: 2,
    children: [
      {
        label: 'create',
        key: 'create',
        link: '/admin/users/create',
        roles: ['admin'],
      },
      {
        label: 'edit',
        key: 'edit',
        link: '/admin/users/edit',
        roles: ['admin'],
      },
    ],
  },
  // We won't need list of courses for now, This should be configurable in settings page
  // courses: {
  //   link: '/admin/courses',
  //   roles: ['admin'],
  //   label: i18next.t('courses'),
  //   key: 'admin_courses',
  //   icon: () => <AiOutlineBook />,
  //   index: 2,
  //   children: [
  //     {
  //       label: 'create',
  //       key: 'create',
  //       link: '/admin/courses/create',
  //       roles: ['admin'],
  //     },
  //     {
  //       label: 'edit',
  //       key: 'edit',
  //       link: '/admin/courses/edit',
  //       roles: ['admin'],
  //     },
  //   ],
  // },
  grades: {
    link: '/admin/grades',
    roles: ['admin'],
    label: i18next.t('grades'),
    key: 'admin_grades',
    icon: () => <AiOutlineBook />,
    index: 3,
    children: [
      {
        label: 'create',
        key: 'create',
        link: '/admin/grades/create',
        roles: ['admin'],
      },
      {
        label: 'edit',
        key: 'edit',
        link: '/admin/grades/edit',
        roles: ['admin'],
      },
    ],
  },
  subjects: {
    link: '/admin/subjects',
    roles: ['admin'],
    label: i18next.t('subjects'),
    key: 'admin_subjects',
    icon: () => <AiOutlineHdd />,
    index: 4,
    children: [
      {
        label: 'create',
        key: 'create',
        link: '/admin/subjects/create',
        roles: ['admin'],
      },
      {
        label: 'edit',
        key: 'edit',
        link: '/admin/subjects/edit',
        roles: ['admin'],
      },
    ],
  },
  topics: {
    link: '/admin/topics',
    roles: ['admin'],
    label: i18next.t('topics'),
    key: 'admin_topics',
    icon: () => <AiOutlineBulb />,
    index: 5,
    children: [
      {
        label: 'create',
        key: 'create',
        link: '/admin/topics/create',
        roles: ['admin'],
      },
      {
        label: 'edit',
        key: 'edit',
        link: '/admin/topics/edit',
        roles: ['admin'],
      },
    ],
  },
  // schools: {
  //   link: '/admin/schools',
  //   roles: ['admin'],
  //   label: i18next.t('schools'),
  //   key: 'admin_schools',
  //   icon: () => <AiOutlineHome />,
  //   index: 7,
  //   children: [
  //     {
  //       label: 'create',
  //       key: 'create',
  //       link: '/admin/schools/create',
  //       roles: ['admin'],
  //     },
  //     {
  //       label: 'edit',
  //       key: 'edit',
  //       link: '/admin/schools/edit',
  //       roles: ['admin'],
  //     },
  //   ],
  // },
  // programs: {
  //   link: '/admin/programs',
  //   roles: ['admin'],
  //   label: i18next.t('programs'),
  //   key: 'admin_programs',
  //   icon: () => <AiOutlineAppstoreAdd />,
  //   index: 8,
  //   children: [
  //     {
  //       label: 'create',
  //       key: 'create',
  //       link: '/admin/programs/create',
  //       roles: ['admin'],
  //     },
  //     {
  //       label: 'edit',
  //       key: 'edit',
  //       link: '/admin/programs/edit',
  //       roles: ['admin'],
  //     },
  //   ],
  // },
  units: {
    link: '/admin/units',
    roles: ['admin'],
    label: i18next.t('units'),
    key: 'admin_units',
    icon: () => <AiOutlineBlock />,
    index: 6,
    children: [
      {
        label: 'create',
        key: 'create',
        link: '/admin/units/create',
        roles: ['admin'],
      },
      {
        label: 'edit',
        key: 'edit',
        link: '/admin/units/edit',
        roles: ['admin'],
      },
    ],
  },
  media_content: {
    link: '/admin/media-content',
    roles: ['admin'],
    label: 'Media Content',
    key: 'admin_media-content',
    icon: () => <AiOutlineContainer />,
    index: 7,
    children: [
      {
        label: 'create',
        key: 'create',
        link: '/admin/media-content/create',
        roles: ['admin'],
      },
      {
        label: 'edit',
        key: 'edit',
        link: '/admin/media-content/edit',
        roles: ['admin'],
      },
    ],
  },
  statistics: {
    link: '/statistics',
    roles: ['admin'],
    label: i18next.t('statistics'),
    key: 'admin_statistics',
    icon: () => <AiOutlineBarChart />,
    index: 8,
  },
  feedback: {
    link: '/feedback',
    roles: ['admin'],
    label: i18next.t('feedback'),
    key: 'admin_feedback',
    icon: () => <AiOutlineMessage />,
    index: 9,
  },
};
