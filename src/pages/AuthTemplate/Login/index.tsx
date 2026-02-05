import {Button, Form, type FormProps, Input, Modal} from "antd";
import type { AuthModalProps, User} from '@types';
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@store/index.ts";
import {loginService} from "@services/login.service.ts";
import {Navigate} from "react-router-dom";

function LoginComponent(props: AuthModalProps) {

    const {isOpen, onClose} = props

    const dispatch: AppDispatch = useDispatch();

    const {loading, data} = useSelector((state: RootState) => state.loginReducer);

    const onSubmit: FormProps<User>['onFinish'] = (values) => {
        dispatch(loginService(values))
    };

    if(loading){
        return <div>Loading...</div>
    }

    if (data?.user?.role === "ADMIN") {
        return <Navigate to="admin"/>
    }else if(data?.user?.role === "USER") {
        console.log("🚀 ~ LoginComponent ~ data?.user?.role: ", data?.user?.role);
    }

    return (
        <Modal
            title="Đăng Nhập"
            open={isOpen}
            footer={null}
            closable={false}
            onCancel={onClose}
        >
            <Form
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Tài khoản"
                    name="email"
                    rules={[{required: true, message: "Vui lòng nhập tài khoản"}]}

                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{required: true, message: "Vui lòng nhập mật khẩu"}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    Đăng nhập
                </Button>
            </Form>
        </Modal>
    );
}

export default LoginComponent;