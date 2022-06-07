import React from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormText,
} from '@ant-design/pro-form';


export type FormValueType = {
  password?: string
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.RuleListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
  <Modal
    width={400}
    bodyStyle={{ padding: '32px 40px 48px' }}
    destroyOnClose
    title="修改员工"
    visible={props.updateModalVisible}
    footer={false}
    onCancel={() => props.onCancel()}
  >
    <ProForm
      initialValues={{
        username: props.values.username,
        password: props.values.password,
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
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名！' }]}
      />
      <ProFormText
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码！' }]}
      />
    </ProForm>
  </Modal>
);

export default UpdateForm;