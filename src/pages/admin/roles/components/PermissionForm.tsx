import React, { useEffect, useState } from 'react';
import { Col, Form, Modal, Row, Spin, Checkbox } from 'antd';
import { ProForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { queryPermissions } from '@/services/ant-design-pro/permission';
import { groupBy, keys } from 'lodash';

export type FormValueType = Partial<API.RoleListItem>;

export type RoleFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    permissionModalVisible: boolean;
    values: Partial<API.RoleListItem>;
};



const PermissionForm: React.FC<RoleFormProps> = (props) => {
    // const [options, setOptions] = useState<{ label: string, value: string }[]>([])
    const [loading, setLoading] = useState<boolean | undefined>(undefined);
    const [permissions, setPermissions] = useState<API.PermissionListItem[]>([]);
    const [permissionIds, setPermissionIds] = useState<string[]>(props.values.permissions ? props.values.permissions.map(permission => permission._id) : [])

    const getPermissions = async () => {
        const { success, data } = await queryPermissions({});
        if (success && data) {
            setPermissions(data);
            // setOptions(data.map((role: API.PermissionListItem) => ({ label: role.nameCn, value: role._id })))
        }
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        getPermissions();
    }, []);
    const onFinish = async (values: any) => {
        console.log('Success:', values);


        props.onSubmit({ ...values, permissionIds })
    };

    const permissionsByGroup = groupBy(permissions, (perimission: API.PermissionListItem) => {
        return perimission.name.split(' ').slice(-1)[0]
    })
    const NAME = { admin: '员工', role: '角色', permission: '权限' };
    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked && permissionIds.every(id => id !== value)) {
            console.log([...permissionIds, value])
            setPermissionIds([...permissionIds, value])
        } else {
            setPermissionIds(permissionIds.filter(id => id !== value))
        }
    }
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
                    {/* <ProFormCheckbox.Group
                        name="permissionIds"
                        options={options}
                    >
                    </ProFormCheckbox.Group> */}

                    {keys(permissionsByGroup).map(name => (
                        <div key={name} style={{ marginBottom: 20 }}>
                            <Row style={{ marginBottom: 10 }}>{NAME[name]}</Row>
                            <Row>
                                {permissionsByGroup[name].map(permission => (
                                    <Col key={permission._id} span={10}>
                                        <input type="checkbox"
                                            onChange={onchange}
                                            value={permission._id}
                                            defaultChecked={!!props.values.permissions?.find(p => p._id === permission._id)} />
                                        {permission.nameCn}
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))}


                    <ProFormText hidden name="_id" />
                </ProForm>
            )}

        </Modal>
    )
}

export default PermissionForm;