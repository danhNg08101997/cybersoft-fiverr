import type {AuthModalProps} from "../../../types.ts";
import {Button, Form, Input, Modal} from "antd";

function RegisterComponent(props: AuthModalProps) {
    const {isOpen, onClose} = props

    return (
        <Modal
            title="Register"
            open={isOpen}
            footer={null}
            closable={false}
            onCancel={onClose}
        >
            <Form layout="vertical">
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: "Vui lòng nhập username" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Vui lòng nhập email" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Birthday"
                    name="birthday"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Gender"
                    name="gender"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                >
                    <Input />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    Đăng ký
                </Button>
            </Form>
        </Modal>
    );
}

export default RegisterComponent;