import React from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormText,
} from '@ant-design/pro-form';


export type FormValueType = Partial<API.RoleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.RoleListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
  <Modal
    width={400}
    bodyStyle={{ padding: '32px 40px 48px' }}
    destroyOnClose
    title="修改角色"
    visible={props.updateModalVisible}
    footer={false}
    onCancel={() => props.onCancel()}
  >
    <ProForm
      initialValues={{
        name: props.values.name,
        _id: props.values._id
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
        name="name"
        label="名称"
        rules={[{ required: true, message: '请输入密码！' }]}
      />
    </ProForm>
  </Modal>
);

export default UpdateForm;