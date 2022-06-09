import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { selectMenus } from '@/services/ant-design-pro/menus'


export type FormValueType = Partial<API.MenuListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.MenuListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [menus, setMenus] = useState<API.MenuListItem[]>([]);

  return (
    <Modal
      width={400}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改权限"
      visible={props.updateModalVisible}
      footer={false}
      cancelText="取消"
      maskClosable={false}
      onCancel={() => props.onCancel()}
    >
      <ProForm
        initialValues={{
          ...props.values
        }}
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
          rules={[{ required: true, message: '请输入权限' }]}
        />
      </ProForm>
    </Modal>
  )
}

export default UpdateForm;