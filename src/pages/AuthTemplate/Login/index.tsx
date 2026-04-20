import type { FormProps } from "antd";
import { Alert, Button, Form, Input, Modal } from "antd";
import type { LoginPayload } from "@types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@store/index";
import { loginService, resetLoginState } from "@services/login.service";
import React from "react";
import { useNavigate } from "react-router-dom";
import type {AuthModalProps} from "@components/Navbar/types.ts";

function LoginComponent(props: AuthModalProps): React.JSX.Element {
  const { isOpen, onClose, onSwitchToRegister } = props;

  const [form] = Form.useForm<LoginPayload>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const onSubmit: FormProps<LoginPayload>["onFinish"] = async (values) => {
    try {
      const result = await dispatch(
        loginService({
          ...values,
          email: values.email.trim().toLowerCase(),
        }),
      ).unwrap();

      form.resetFields();
      dispatch(resetLoginState());
      onClose?.();

      if (result.user.role === "ADMIN") {
        navigate("/admin/dashboard");
        return;
      }

      navigate("/");
    } catch {
      // lỗi đã lưu ở redux
    }
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(resetLoginState());
    onClose?.();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      width={920}
      destroyOnHidden
      className="[&_.ant-modal-content]:overflow-hidden [&_.ant-modal-content]:rounded-2xl [&_.ant-modal-content]:p-0"
    >
      <div className="grid min-h-140 grid-cols-1 md:grid-cols-2">
        <div className="flex items-center bg-white px-8 py-10 md:px-10">
          <div className="w-full">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Sign in to continue exploring freelance services for your
                business.
              </p>
            </div>

            {error && (
              <Alert
                type="error"
                showIcon
                className="mb-5"
                message="Đăng nhập thất bại"
                description={error.message}
              />
            )}

            <Form<LoginPayload>
              form={form}
              layout="vertical"
              onFinish={onSubmit}
              autoComplete="off"
              requiredMark={false}
              size="large"
            >
              <Form.Item
                label={
                  <span className="font-medium text-slate-700">Email</span>
                }
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không đúng định dạng" },
                ]}
              >
                <Input
                  placeholder="name@example.com"
                  className="h-12 rounded-xl"
                  autoComplete="email"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="font-medium text-slate-700">Password</span>
                }
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="h-12 rounded-xl"
                  autoComplete="current-password"
                />
              </Form.Item>

              <div className="mb-6 mt-2 flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <button
                  type="button"
                  className="font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="h-12! rounded-xl! border-0! bg-emerald-500! text-sm! font-semibold! hover:!bg-emerald-600!"
              >
                Sign In
              </Button>
            </Form>

            <div className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="cursor-pointer font-semibold text-emerald-600 hover:text-emerald-700"
                onClick={() => {
                  handleCancel();
                  onSwitchToRegister?.();
                }}
              >
                Join now
              </button>
            </div>
          </div>
        </div>

        <div className="relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
            alt="Login visual"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-black/65 via-black/35 to-emerald-700/40" />

          <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">
            <div className="text-3xl font-extrabold tracking-tight">
              fiverr<span className="text-emerald-400">.</span>
            </div>

            <div>
              <div className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm backdrop-blur-sm">
                Trusted by freelancers & businesses
              </div>

              <h3 className="text-4xl font-extrabold leading-tight">
                Hire the right talent for every project
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
                Connect with professionals in design, development, writing,
                marketing, video editing and more.
              </p>

              <div className="mt-8 flex gap-6 text-sm text-white/90">
                <div>
                  <div className="text-2xl font-bold">4.9/5</div>
                  <div>User rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">50M+</div>
                  <div>Projects delivered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LoginComponent;
