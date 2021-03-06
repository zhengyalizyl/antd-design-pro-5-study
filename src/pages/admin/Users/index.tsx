import { addUser, removeRule, queryUsers, updateUser, updateRoles } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl, useAccess } from 'umi';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import moment from 'moment';
import CreateForm from './components/CreateForm';
import RoleForm from './components/RoleForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    console.log()
    await addUser({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleRole = async (fields: FormValueType) => {
  const hide = message.loading('正在分配角色');
  try {
    await updateRoles({
      ...fields
    });
    hide();

    message.success('分配角色 is successful');
    return true;
  } catch (error) {
    hide();
    message.error('分配角色 failed, please try again!');
    return false;
  }
};


const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  console.log(fields)
  try {
    await updateUser({
      username: fields.username,
      password: fields.password,
      _id: fields._id,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      ids: selectedRows.map((row) => row._id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [roleModalVisible, handleRoleModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.nameLabel"
          defaultMessage="Rule name"
        />
      ),
      formItemProps: {
        rules: [
          {
            required: true,
            message: '用户名为必填项',
          },
        ],
      },
      dataIndex: 'username',
      tip: 'username 是唯一的',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '角色',
      dataIndex: 'roles',
      hideInForm: true,
      renderText: (roles: API.RoleListItem[]) => {
        return roles.map(role => role.name).join(',')
      },
    },
    {
      title: '密码',
      hideInTable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '密码为必填项',
          },
        ],
      },
      dataIndex: 'password'
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleCallNo"
          defaultMessage="Number of service calls"
        />
      ),
      dataIndex: 'isAdmin',
      filters: true,
      hideInForm: true,
      renderText: (val: string) => val ? '是' : '否',
      initialValue: 'all',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        true: { text: '是', status: 'Default' },
        false: { text: '否', status: '123' }
      }
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleCreatedAt"
          defaultMessage="上次创建的时间"
        />
      ),
      sorter: true,
      dataIndex: 'createdAt',
      hideInForm: true,
      valueType: 'dateTime',
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleUpdatedAt"
          defaultMessage="上次更新的时间"
        />
      ),
      sorter: true,
      dataIndex: 'updatedAt',
      // valueType: 'dateTime',
      hideInForm: true,
      renderText: (val: string) => moment(val).fromNow(),
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration" />
        </a>,
        <a
          key="config2"
          onClick={() => {
            handleRoleModalVisible(true);
            setCurrentRow(record);
          }}
        >
          分配角色
        </a>
      ],
    },
  ];

  const access = useAccess();
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="员工列表"
        actionRef={actionRef}
        rowKey="_id"
        search={{
          labelWidth: 120,
        }}
        pagination={{ defaultPageSize: 2 }}
        toolBarRender={() => [
          (access.canAdmin && (
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> 新建员工
            </Button>
          )
          )
        ]}
        request={async (params, sort, filter) => {
          console.log(params, sort)
          const data = await queryUsers(params, { sort, filter });
          return data
        }}
        // request={queryUsers}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<API.RuleListItem, API.PageParams>
          onSubmit={async (value) => {
            const success = await handleAdd(value as API.RuleListItem);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="_id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {currentRow && Object.keys(currentRow).length && (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            if (!showDetail) {
              setCurrentRow(undefined);
            }
          }}
          updateModalVisible={updateModalVisible}
          values={currentRow || {}}
        />
      )}
      {currentRow && Object.keys(currentRow).length && (
        <RoleForm
          onSubmit={async (value) => {
            const success = await handleRole(value);
            if (success) {
              handleRoleModalVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleRoleModalVisible(false);
            if (!showDetail) {
              setCurrentRow(undefined);
            }
          }}
          roleModalVisible={roleModalVisible}
          values={currentRow || {}}
        />
      )}

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.username && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={`${currentRow?.username}的详情`}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?._id,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
