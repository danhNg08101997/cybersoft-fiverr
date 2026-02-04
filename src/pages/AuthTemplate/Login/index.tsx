import {Button, Form, Input, Modal} from "antd";
import type {AuthModalProps} from "../../../types.ts";

function LoginComponent(props: AuthModalProps) {

    const {isOpen, onClose} = props

    // const [user, setUser] = useState({
    //     email: "",
    //     password: "",
    // });

    return (
            <Modal
                title="Login"
                open={isOpen}
                footer={null}
                closable={false}
                onCancel={onClose}
            >
                <Form layout="vertical">
                    <Form.Item
                        label="Tài khoản"
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
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

export default LoginComponent;