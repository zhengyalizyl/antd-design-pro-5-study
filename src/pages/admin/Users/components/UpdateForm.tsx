import { Form, Button, Input, Modal } from 'antd';
import React, { useState } from 'react';

export type FormValueType = {
  password?: string
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.RuleListItem>;
};
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const FormItem = Form.Item;

const UpdateForm: React.FC<UpdateFormProps> = props => {
  console.log(1222)
  const [formVals, setFormVals] = useState<FormValueType>({
    _id: props.values._id,
    username: props.values.username,
    password: props.values.password
  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    handleUpdate(fieldsValue);
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名！', min: 1 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="_id" label={false}>
          <Input type="hidden" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          保存
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改员工"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          _id: formVals._id,
          username: formVals.username,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};


export default UpdateForm;