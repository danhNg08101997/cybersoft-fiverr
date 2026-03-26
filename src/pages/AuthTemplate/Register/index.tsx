import type { AuthModalProps, RegisterFormValues } from '@types';
import {
  Alert,
  Button,
  DatePicker,
  Form,
  type FormProps,
  Input,
  Modal,
  Select,
} from 'antd';
import type { AppDispatch, RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { registerService, resetRegisterState } from '@services/register.service';
import React from 'react';
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';

export default function RegisterComponent(
  props: AuthModalProps,
): React.JSX.Element {
  const { isOpen, onClose, onSwitchToLogin } = props;

  const [form] = Form.useForm<RegisterFormValues>();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.register);

  const handleCancel = (): void => {
    form.resetFields();
    dispatch(resetRegisterState());
    onClose?.();
  };

  const onSubmit: FormProps<RegisterFormValues>['onFinish'] = async (values) => {
    const payload = {
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
      phone: values.phone?.trim() || undefined,
      birthday: values.birthday
        ? dayjs(values.birthday).format('DD-MM-YYYY')
        : undefined,
      gender: values.gender,
      role: 'USER' as const,
      skill: [...new Set((values.skill ?? []).map((item) => item.trim()).filter(Boolean))],
      certification: [
        ...new Set((values.certification ?? []).map((item) => item.trim()).filter(Boolean)),
      ],
    };

    try {
      await dispatch(registerService(payload)).unwrap();
      form.resetFields();
      dispatch(resetRegisterState());
      onClose?.();
      onSwitchToLogin?.();
    } catch {
      // redux state đã giữ lỗi
    }
  };

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
            </div>
          </div>
        </div>

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
                description={error.message}
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
                    { required: true, message: 'Vui lòng nhập họ và tên' },
                    {
                      validator(_, value) {
                        const normalized = value?.trim();
                        if (!normalized) {
                          return Promise.reject(
                            new Error('Họ và tên không được để trống'),
                          );
                        }
                        if (normalized.length < 2) {
                          return Promise.reject(
                            new Error('Họ và tên phải có ít nhất 2 ký tự'),
                          );
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
                    { required: true, message: 'Vui lòng nhập email' },
                    { type: 'email', message: 'Email không đúng định dạng' },
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
                    { required: true, message: 'Vui lòng nhập mật khẩu' },
                    {
                      pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                      message: 'Mật khẩu tối thiểu 8 ký tự, gồm chữ và số',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-slate-400" />}
                    placeholder="Create password"
                    className="h-12 rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="font-medium text-slate-700">Confirm password</span>}
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
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
                >
                  <Input
                    prefix={<PhoneOutlined className="text-slate-400" />}
                    placeholder="0123456789"
                    className="h-12 rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="font-medium text-slate-700">Birthday</span>}
                  name="birthday"
                >
                  <DatePicker className="h-12 w-full rounded-xl" format="DD-MM-YYYY" />
                </Form.Item>

                <Form.Item
                  label={<span className="font-medium text-slate-700">Gender</span>}
                  name="gender"
                >
                  <Select
                    placeholder="Select gender"
                    className="h-12"
                    options={[
                      { label: 'Male', value: 'male' },
                      { label: 'Female', value: 'female' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="font-medium text-slate-700">Skills</span>}
                  name="skill"
                >
                  <Select
                    mode="tags"
                    placeholder="Add skills"
                    className="min-h-12"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="font-medium text-slate-700">Certification</span>}
                  name="certification"
                >
                  <Select
                    mode="tags"
                    placeholder="Add certifications"
                    className="min-h-12"
                  />
                </Form.Item>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="mt-3 h-12! rounded-xl! border-0! bg-emerald-500! text-sm! font-semibold! hover:!bg-emerald-600!"
              >
                Create account
              </Button>
            </Form>

            <div className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <button
                type="button"
                className="cursor-pointer font-semibold text-emerald-600 hover:text-emerald-700"
                onClick={() => {
                  handleCancel();
                  onSwitchToLogin?.();
                }}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}