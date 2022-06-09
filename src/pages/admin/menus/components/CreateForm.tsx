import React, { useState } from 'react';
import { Modal } from 'antd';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { selectMenus } from '@/services/ant-design-pro/menus';

export type FormValueType = Partial<API.MenuListItem>;

export type CreateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  createModalVisible: boolean;
  // values: Partial<API.MenuListItem>;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { createModalVisible, onCancel } = props;
  const [menus, setMenus] = useState<API.MenuListItem[]>([]);
  return (
    <Modal
      destroyOnClose
      title="新建菜单"
      width={420}
      visible={createModalVisible}
      onCancel={() => onCancel()}
      footer={null}
      maskClosable={false}
    >
      <ProForm
        onFinish={async (values) => {
          console.log(values)
          const newValues = { parent: values.parentId, ...values }
          props.onSubmit(newValues);
        }}
      >
        <ProFormText
          name="_id"
          hidden
        />
        <ProFormText
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称' }]}
        />
        <ProFormText
          name="path"
          label="路径"
          rules={[{ required: true, message: '请输入路径' }]}
        />
        <ProFormSelect
          name="parentId"
          label="父类菜单"
          request={async () => {
            const { success, data } = await selectMenus();
            if (success && data) {
              setMenus(data)
              return data!.map(menu => ({ label: menu.name, value: menu._id }))
            }
            return [];
          }}
          placeholder="请选择父类菜单"
          rules={[{ required: true, message: '请选择父类菜单' }]}
        />
        <ProFormText
          name="permission"
          label="权限"
        />
      </ProForm>
    </Modal>
  );
};

export default CreateForm;

