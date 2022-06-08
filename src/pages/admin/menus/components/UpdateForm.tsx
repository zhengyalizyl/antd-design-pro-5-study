import React from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormText,
} from '@ant-design/pro-form';


export type FormValueType = Partial<API.MenuListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.MenuListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
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
        name: props.values.name,
        nameCn: props.values.nameCn,
        _id: props.values._id,
        permission: props.values.permission,
        path: props.values.parent

      }}
      onFinish={async (values) => {
        props.onSubmit(values);
      }}
    >
      <ProFormText
        name="_id"
        hidden
      />
      <ProFormText
        name="nameCn"
        label="中文描述"
        rules={[{ required: true, message: '请输入中文描述' }]}
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
      <ProFormText
        name="permission"
        label="权限"
        rules={[{ required: true, message: '请输入权限' }]}
      />
    </ProForm>
  </Modal>
);

export default UpdateForm;