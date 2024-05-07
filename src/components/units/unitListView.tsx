'use client';

import { AdminTable } from '@components/admin/AdminTable/AdminTable';
import { AdminPageTitle } from '@components/layouts';
import useUnit, { transformRawUnit } from '@hooks/useUnit';
import { Modal } from 'flowbite-react';
import i18next from 'i18next';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { unitTableColumns } from '.';
import CreateUnitView from './create-unit-view';
import EditUnitView from './edit-unit-view';
import { useAdminListViewData } from '@hooks/useAdmin/useAdminListViewData';
import { API_LINKS } from 'app/links';
import { T_UnitFields } from '@hooks/useUnit/types';

const UnitListView: React.FC = observer(() => {
  const { selectedUnitIds, setSelectedProgramIds, searchQuery, onSearchQueryChange, deleteUnits } = useUnit();
  const [creatingUnit, setCreatingUnit] = useState(false);
  const [edittingUnitWithId, setEdittingUnitWithId] = useState<string | null>(null);

  const {
    items: units,
    isLoading,
    mutate,
  } = useAdminListViewData(API_LINKS.FETCH_UNITS, 'units', transformRawUnit, searchQuery);

  const rowSelection = {
    selectedRowKeys: selectedUnitIds,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedProgramIds(selectedRowKeys);
    },
  };

  return (
    <>
      <AdminPageTitle title={i18next.t('units')} />

      <AdminTable<T_UnitFields>
        deleteItems={deleteUnits}
        rowSelection={rowSelection}
        items={units}
        isLoading={isLoading}
        createNew={() => setCreatingUnit(true)}
        editItem={(id) => setEdittingUnitWithId(id)}
        columns={unitTableColumns}
        onSearchQueryChange={onSearchQueryChange}
      />
      <Modal dismissible show={creatingUnit} onClose={() => setCreatingUnit(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <CreateUnitView
            onSuccessfullyDone={() => {
              mutate();
              setCreatingUnit(false);
            }}
          />
        </Modal.Body>
      </Modal>
      <Modal dismissible show={!!edittingUnitWithId} onClose={() => setEdittingUnitWithId(null)} popup>
        <Modal.Header />
        <Modal.Body>
          {edittingUnitWithId ? (
            <EditUnitView
              unitId={edittingUnitWithId}
              onSuccessfullyDone={() => {
                mutate();
                setEdittingUnitWithId(null);
              }}
            />
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
});

export default UnitListView;
