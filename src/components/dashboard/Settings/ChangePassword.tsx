import {
    Button,
    Form,
    Input
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { CiLock } from "react-icons/ci";

export const ChangePassword = () => {
  const [form] = Form.useForm();
  // Static profile form submission handler
  const onFinish = async (values: any) => {
    console.log("Form submitted with values:", values);
    // Replace with static handling if needed
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-xl p-6 shadow-md rounded-xl max-w-xl border bg-white border-borderColor">
        <h2 className="text-xl flex items-center gap-3 justify-center font-semibold mb-4 text-primary">
          Change Password <CiLock size={25} />
        </h2>

        <Form layout="vertical" form={form} onFinish={onFinish} className="">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-4">
            <FormItem
              name="currentPassword"
              label={<p className=" font-semibold text-lg">Current Password</p>}
              rules={[{ message: "Enter current password" }]}
            >
              <Input.Password
                placeholder="Enter current password"
                style={{ height: 48 }}
              />
            </FormItem>
            <FormItem
              name="password"
              label={<p className=" font-semibold text-lg">New Password</p>}
              rules={[{ message: "Please enter your new" }]}
            >
              <Input.Password
                placeholder="Enter Password"
                style={{ height: 48 }}
              />
            </FormItem>

            <FormItem
              name="confirmPassword"
              label={<p className=" font-semibold text-lg">Confirm Password</p>}
              rules={[{ message: "Please enter your phone" }]}
            >
              <Input.Password
                placeholder="Enter confirm Password"
                style={{ height: 48 }}
              />
            </FormItem>
          </div>

          <div className="flex justify-center">
            <Button type="primary" size="large" style={{background: "#3ab8bb"}} htmlType="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
