import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, Radio, Spin } from 'antd';
import { queryRoles } from '@/services/ant-design-pro/roles';


export type FormValueType = Partial<API.RuleListItem>;

export type RoleFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    roleModalVisible: boolean;
    values: Partial<API.RuleListItem>;
};



const RoleForm: React.FC<RoleFormProps> = (props) => {
    const [options, setOptions] = useState<{ label: string, value: string }[]>([])
    const [loading, setLoading] = useState<boolean | undefined>(undefined);

    const getRoles = async () => {
        const { success, data } = await queryRoles({});
        if (success && data) {
            setOptions(data.map((role: API.RoleListItem) => ({ label: role.nameCn, value: role._id })))
        }
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        getRoles();
    }, []);
    const onFinish = (values: any) => {
        console.log('Success:', values);
        props.onSubmit(values)
    };
    return (
        <Modal
            width={400}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title="分配角色"
            visible={props.roleModalVisible}
            footer={false}
            onCancel={() => props.onCancel()}
        >
            {loading ? <Spin /> : (
                <Form
                    initialValues={{
                        roleIds: props.values.roles,
                        _id: props.values._id
                    }}
                    onFinish={onFinish}>
                    <Form.Item name="roleIds">
                        <Checkbox.Group options={options} />
                    </Form.Item>
                    <Form.Item hidden name="_id" label={false}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            )}

        </Modal>
    )
}

export default RoleForm;