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
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    Đăng nhập
                </Button>
            </Form>
        </Modal>
    );
}

export default RegisterComponent;