import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, Radio, Spin } from 'antd';
import { queryRoles } from '@/services/ant-design-pro/roles';
import { ProForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';


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
            setOptions(data.map((role: API.RoleListItem) => ({ label: role.name, value: role._id })))
        }
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        getRoles();
    }, []);
    const onFinish = async (values: any) => {
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
                <ProForm
                    initialValues={{
                        roleIds: props.values.roles?.map(role => role._id),
                        _id: props.values._id
                    }}
                    onFinish={onFinish}
                >
                    <ProFormCheckbox.Group
                        name="roleIds"
                        options={options}
                        rules={[{ required: true, message: '请选择角色' }]}
                    >

                    </ProFormCheckbox.Group>
                    <ProFormText hidden name="_id" />
                </ProForm>
            )}

        </Modal>
    )
}

export default RoleForm;