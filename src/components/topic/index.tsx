import { T_ColumnData } from '@components/admin/AdminTable/types';
import { T_TopicFields } from '@hooks/use-topic/types';
import i18next from 'i18next';

export const topicTableColumns: T_ColumnData<T_TopicFields>[] = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Unit',
    dataIndex: 'unitName',
    key: 'school',
    render: (text) => <a>{text || i18next.t('not_linked')}</a>,
  },
];
