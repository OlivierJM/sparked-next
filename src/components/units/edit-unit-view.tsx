/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { AdminPageTitle } from '@components/layouts';
import useProgram from '@hooks/useProgram';
import { Button, Spinner } from 'flowbite-react';
import i18next from 'i18next';
import { useSearchParams } from 'next/navigation';
import { FormEventHandler, useEffect, useState } from 'react';
import { UNIT_FORM_FIELDS } from './constants';
import useSchool from '@hooks/useSchool';
import useUnit, { transformRawUnit } from '@hooks/useUnit';
import useCourse, { transformRawCourse } from '@hooks/useCourse';
import { AdminFormInput } from '@components/admin/AdminForm/AdminFormInput';
import { AdminFormSelector } from '@components/admin/AdminForm/AdminFormSelector';
import { T_UnitFields } from '@hooks/useUnit/types';
import { extractValuesFromFormEvent } from 'utils/helpers';
import { useAdminListViewData } from '@hooks/useAdmin/useAdminListViewData';
import { API_LINKS } from 'app/links';
import { useAdminItemById } from '@hooks/useAdmin/useAdminItemById';
import { LibraryErrorMessage } from '@components/library/LibraryErrorMessage/LibraryErrorMessage';
import { DeletionWarningModal } from '@components/admin/AdminTable/DeletionWarningModal';
import { UpdateButtons } from '@components/atom/UpdateButtons/UpdateButtons';

const EditUnitView = ({ unit, onSuccessfullyDone }: { unit: T_UnitFields; onSuccessfullyDone: () => void }) => {
  const { editUnit, deleteUnits } = useUnit();
  const [uploading, setUploading] = useState(false);
  const [showDeletionWarning, setShowDeletionWarning] = useState(false);
  const toggleDeletionWarning = () => setShowDeletionWarning((value) => !value);

  // const { item: unit, isLoading } = useAdminItemById(
  //   API_LINKS.FETCH_UNIT_BY_ID,
  //   unitId || (searchParams.get('unitId') as string),
  //   'unit',
  //   transformRawUnit,
  // );

  const { items: courses, isLoading: loadingCourses } = useAdminListViewData(
    API_LINKS.FETCH_COURSES,
    'courses',
    transformRawCourse,
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      setUploading(true);

      e.preventDefault();
      const keys = [UNIT_FORM_FIELDS.name.key, UNIT_FORM_FIELDS.description.key, UNIT_FORM_FIELDS.course.key];
      let result = extractValuesFromFormEvent<T_UnitFields>(e, keys);
      await editUnit({ ...unit, ...result }, onSuccessfullyDone);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <AdminPageTitle title={i18next.t('edit_unit')} />

      {unit === null ? (
        <div className="flex items-center justify-center h-[400px]">
          <Spinner size="xl" />
        </div>
      ) : unit instanceof Error ? (
        <LibraryErrorMessage>{unit.message}</LibraryErrorMessage>
      ) : (
        <form className="flex flex-col items-start" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 md:max-w-xl w-full">
            <AdminFormInput
              disabled={uploading}
              name={UNIT_FORM_FIELDS.name.key}
              label={UNIT_FORM_FIELDS.name.label}
              required
              defaultValue={unit.name}
            />

            <AdminFormInput
              disabled={uploading}
              name={UNIT_FORM_FIELDS.description.key}
              label={UNIT_FORM_FIELDS.description.label}
              required
              defaultValue={unit.description}
            />

            <AdminFormSelector
              loadingItems={loadingCourses}
              disabled={uploading || loadingCourses}
              options={courses}
              label={UNIT_FORM_FIELDS.course.label}
              name={UNIT_FORM_FIELDS.course.key}
              defaultValue={unit.courseId}
            />

            <UpdateButtons uploading={uploading} toggleDeletionWarning={toggleDeletionWarning} />
          </div>
        </form>
      )}

      <DeletionWarningModal
        showDeletionWarning={showDeletionWarning}
        toggleDeletionWarning={toggleDeletionWarning}
        deleteItems={async () => {
          try {
            setUploading(true);
            const successful = await deleteUnits([unit]);
            if (successful) {
              onSuccessfullyDone();
            }
          } finally {
            setUploading(false);
          }
        }}
        numberOfElements={1}
      />
    </>
  );
};

export default EditUnitView;
