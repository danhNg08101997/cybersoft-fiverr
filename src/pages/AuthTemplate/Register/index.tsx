import type {AuthModalProps} from "../../../types.ts";
import {Button, DatePicker, Form, type FormProps, Input, Modal} from "antd";
import type {AppDispatch, RootState} from "@store/index.ts";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {registerService} from "@services/register.service.ts";
import LoginComponent from "@pages/AuthTemplate/Login";

function RegisterComponent(props: AuthModalProps) {
    const {isOpen, onClose} = props

    const dispatch: AppDispatch = useDispatch();

    const {loading, data} = useSelector((state: RootState) => state.registerReducer);

    const onSubmit: FormProps['onFinish'] = (values) => {
        if (!values) return;

        if (values.birthday){
            values.birthday = dayjs(values.birthday).format("DD-MM-YYYY");
        }

        if(values.skill){
            values.skill = values.skill.split(";");
        }

        if(values.certification){
            values.certification = values.certification.split(";");
        }

        dispatch(registerService(values));
    };

    if (loading) {
        return <div>Loading...</div>
    }

    if(data){
        return <LoginComponent isOpen={!loading} />
    }

    return (
        <Modal
            title="Đăng Ký"
            open={isOpen}
            footer={null}
            closable={false}
            onCancel={onClose}
        >
            <Form layout="vertical" onFinish={onSubmit} autoComplete="off">
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: "Vui lòng nhập username"}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: "Vui lòng nhập mật khẩu"}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, message: "Vui lòng nhập email"}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Birthday"
                    name="birthday"
                >
                    <DatePicker style={{ width: 470 }}/>
                </Form.Item>

                <Form.Item
                    label="Gender"
                    name="gender"
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Skill"
                    name="skill"
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Certification"
                    name="certification"
                >
                    <Input/>
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    Đăng ký
                </Button>
            </Form>
        </Modal>
    );
}

export default RegisterComponent;