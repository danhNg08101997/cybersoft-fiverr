import type {AuthModalProps, RegisterFormValues} from "@types";
import {Alert, Button, DatePicker, Form, type FormProps, Input, Modal, Select} from "antd";
import type {AppDispatch, RootState} from "@store/index.ts";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {registerService, resetRegisterState} from "@services/register.service.ts";
import React from "react";
import {LockOutlined, MailOutlined, PhoneOutlined, UserOutlined,} from "@ant-design/icons";

export default function RegisterComponent(props: AuthModalProps): React.JSX.Element {
    const { isOpen, onClose, onSwitchToLogin } = props;

    const [form] = Form.useForm<RegisterFormValues>();

    const dispatch = useDispatch<AppDispatch>();

    const {loading, error} = useSelector((state: RootState) => state.registerReducer);


    const handleCancel = (): void => {
        form.resetFields();
        dispatch(resetRegisterState());
        onClose?.();
    };

    const onSubmit: FormProps<RegisterFormValues>["onFinish"] = async  (values) => {
        const payload = {
            name: values.name.trim(),
            email: values.email.trim().toLowerCase(),
            password: values.password,
            phone: values.phone?.trim() || undefined,
            birthday: values.birthday ? dayjs(values.birthday).format("DD-MM-YYYY") : undefined,
            gender: values.gender,
            role: "USER" as const,
            skill: [...new Set((values.skill ?? []).map((item) => item.trim()).filter(Boolean))],
            certification: [...new Set((values.certification ?? []).map((item) => item.trim()).filter(Boolean))],
        };

        try {
            await dispatch(registerService(payload)).unwrap();
            form.resetFields();
            dispatch(resetRegisterState());
            onClose?.();
            onSwitchToLogin?.();
        } catch {
            // error đã được lưu ở redux
        }
    };

    const errorMessage =
        error?.message
            ? "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin."
            : error?.message || "Đăng ký thất bại.";

    return (
        <Modal
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
            centered
            destroyOnHidden
            width={980}
            className="[&_.ant-modal-content]:overflow-hidden [&_.ant-modal-content]:rounded-3xl [&_.ant-modal-content]:p-0"
        >
            <div className="grid min-h-160 grid-cols-1 md:grid-cols-2">
                {/* LEFT IMAGE */}
                <div className="relative hidden md:block">
                    <img
                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80"
                        alt="Register visual"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-black/70 via-emerald-900/40 to-black/30" />

                    <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">
                        <div className="text-3xl font-extrabold tracking-tight">
                            fiverr<span className="text-emerald-400">.</span>
                        </div>

                        <div>
                            <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm backdrop-blur-sm">
                                Start your journey today
                            </div>

                            <h2 className="text-4xl font-extrabold leading-tight">
                                Join a marketplace built for modern freelance work
                            </h2>

                            <p className="mt-4 max-w-md text-sm leading-6 text-white/85">
                                Create your account to connect with clients, discover services,
                                and build projects faster with trusted talent worldwide.
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                                    <div className="text-2xl font-bold">50M+</div>
                                    <div className="text-white/80">Projects completed</div>
                                </div>
                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                                    <div className="text-2xl font-bold">4.9/5</div>
                                    <div className="text-white/80">User satisfaction</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="flex items-center bg-white px-6 py-8 md:px-10">
                    <div className="w-full">
                        <div className="mb-6">
                            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">
                                Create account
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Join now and start exploring services for your business.
                            </p>
                        </div>

                        {error && (
                            <Alert
                                className="mb-5 rounded-xl"
                                type="error"
                                showIcon
                                message="Register failed"
                                description={errorMessage}
                            />
                        )}

                        <Form<RegisterFormValues>
                            form={form}
                            layout="vertical"
                            onFinish={onSubmit}
                            autoComplete="off"
                            requiredMark={false}
                            size="large"
                        >
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Form.Item
                                    label={<span className="font-medium text-slate-700">Full name</span>}
                                    name="name"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập họ và tên" },
                                        {
                                            validator(_, value) {
                                                const normalized = value?.trim();
                                                if (!normalized) {
                                                    return Promise.reject(new Error("Họ và tên không được để trống"));
                                                }
                                                if (normalized.length < 2) {
                                                    return Promise.reject(new Error("Họ và tên phải có ít nhất 2 ký tự"));
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<UserOutlined className="text-slate-400" />}
                                        placeholder="Nguyen Van A"
                                        className="h-12 rounded-xl"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="font-medium text-slate-700">Email</span>}
                                    name="email"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập email" },
                                        { type: "email", message: "Email không đúng định dạng" },
                                        {
                                            validator(_, value) {
                                                if (value && value.trim() !== value) {
                                                    return Promise.reject(new Error("Email không được có khoảng trắng ở đầu hoặc cuối"));
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<MailOutlined className="text-slate-400" />}
                                        placeholder="name@example.com"
                                        className="h-12 rounded-xl"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="font-medium text-slate-700">Password</span>}
                                    name="password"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập mật khẩu" },
                                        { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
                                        {
                                            pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                                            message: "Mật khẩu phải chứa ít nhất 1 chữ cái và 1 chữ số",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="text-slate-400" />}
                                        placeholder="Enter password"
                                        className="h-12 rounded-xl"
                                        autoComplete="new-password"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="font-medium text-slate-700">Confirm password</span>}
                                    name="confirmPassword"
                                    dependencies={["password"]}
                                    rules={[
                                        { required: true, message: "Vui lòng xác nhận mật khẩu" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error("Mật khẩu xác nhận không khớp")
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="text-slate-400" />}
                                        placeholder="Confirm password"
                                        className="h-12 rounded-xl"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="font-medium text-slate-700">Phone</span>}
                                    name="phone"
                                    rules={[
                                        {
                                            pattern: /^(0|\+84)\d{9,10}$/,
                                            message: "Số điện thoại không hợp lệ",
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<PhoneOutlined className="text-slate-400" />}
                                        placeholder="0901234567"
                                        className="h-12 rounded-xl"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="font-medium text-slate-700">Birthday</span>}
                                    name="birthday"
                                >
                                    <DatePicker
                                        format="DD-MM-YYYY"
                                        placeholder="Chọn ngày sinh"
                                        style={{ width: "100%", height: 48 }}
                                        disabledDate={(current) => current && current.isAfter(dayjs(), "day")}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="font-medium text-slate-700">Gender</span>}
                                    name="gender"
                                >
                                    <Select
                                        placeholder="Chọn giới tính"
                                        options={[
                                            { label: "Male", value: true },
                                            { label: "Female", value: false },
                                        ]}
                                        className="h-12"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<span className="font-medium text-slate-700">Role</span>}
                                >
                                    <p className="text-xs text-slate-500">
                                        Tài khoản của bạn sẽ được tạo với vai trò người dùng.
                                    </p>
                                </Form.Item>
                            </div>

                            <Form.Item
                                label={<span className="font-medium text-slate-700">Skills</span>}
                                name="skill"
                                tooltip="Nhập từng kỹ năng rồi nhấn Enter"
                                rules={[
                                    {
                                        validator(_, value: string[]) {
                                            if (!value) return Promise.resolve();
                                            if (value.length > 15) {
                                                return Promise.reject(new Error("Tối đa 15 kỹ năng"));
                                            }
                                            if (value.some((item) => item.trim().length > 30)) {
                                                return Promise.reject(new Error("Mỗi kỹ năng tối đa 30 ký tự"));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="Ví dụ: React, TypeScript, UI/UX"
                                    tokenSeparators={[";", ","]}
                                    options={[]}
                                    className="[&_.ant-select-selector]:min-h-12 [&_.ant-select-selector]:rounded-xl [&_.ant-select-selector]:py-1"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="font-medium text-slate-700">Certifications</span>}
                                name="certification"
                                tooltip="Nhập từng chứng chỉ rồi nhấn Enter"
                                rules={[
                                    {
                                        validator(_, value: string[]) {
                                            if (!value) return Promise.resolve();
                                            if (value.length > 15) {
                                                return Promise.reject(new Error("Tối đa 15 chứng chỉ"));
                                            }
                                            if (value.some((item) => item.trim().length > 30)) {
                                                return Promise.reject(new Error("Mỗi chứng chỉ tối đa 30 ký tự"));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="Ví dụ: IELTS 7.0, Google Ads, AWS CCP"
                                    tokenSeparators={[";", ","]}
                                    options={[]}
                                    className="[&_.ant-select-selector]:min-h-12 [&_.ant-select-selector]:rounded-xl [&_.ant-select-selector]:py-1"
                                />
                            </Form.Item>

                            <Button
                                htmlType="submit"
                                type="primary"
                                block
                                loading={loading}
                                className="mt-2! h-12! rounded-xl! border-0! bg-emerald-500! text-sm! font-semibold! hover:bg-emerald-600!"
                            >
                                Create account
                            </Button>

                            <div className="mt-5 text-center text-sm text-slate-500">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleCancel();
                                        onSwitchToLogin?.();
                                    }}
                                    className="font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                                >
                                    Sign in
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Modal>
    );
}