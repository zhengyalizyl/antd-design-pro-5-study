import React, { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
import { ProForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { queryPermissions } from '@/services/ant-design-pro/permission';


export type FormValueType = Partial<API.RoleListItem>;

export type RoleFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    permissionModalVisible: boolean;
    values: Partial<API.RoleListItem>;
};



const PermissionForm: React.FC<RoleFormProps> = (props) => {
    const [options, setOptions] = useState<{ label: string, value: string }[]>([])
    const [loading, setLoading] = useState<boolean | undefined>(undefined);

    const getPermissions = async () => {
        const { success, data } = await queryPermissions({});
        if (success && data) {
            setOptions(data.map((role: API.PermissionListItem) => ({ label: role.nameCn, value: role._id })))
        }
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        getPermissions();
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
            title={`给角色 ${props.values.name} 分配权限`}
            visible={props.permissionModalVisible}
            footer={false}
            onCancel={() => props.onCancel()}
        >
            {loading ? <Spin /> : (
                <ProForm
                    initialValues={{
                        permissionIds: props.values.permissions?.map(permission => permission._id),
                        _id: props.values._id
                    }}
                    onFinish={onFinish}
                >
                    <ProFormCheckbox.Group
                        name="permissionIds"
                        options={options}
                    >

                    </ProFormCheckbox.Group>
                    <ProFormText hidden name="_id" />
                </ProForm>
            )}

        </Modal>
    )
}

export default PermissionForm;