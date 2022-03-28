import "antd/dist/antd.css";
import {Form, Input, Button, message, InputNumber,Radio,Select} from "antd";
import React,{Component} from "react";
import '../../api'
const { Option } = Select;



class  RegistrationForm extends Component{
    state = {
        experience:'1 month',
        gender:'male',
        activity_level_ratio:0,
        dietary_restrictions:'no',
        gym_equipment: ['no'],
        weight_goals:'weight gain',
    }
     formItemLayout = {
        labelCol: {
            xs: {
                span: 24
            },
            sm: {
                span: 8
            }
        },
        wrapperCol: {
            xs: {
                span: 24
            },
            sm: {
                span: 16
            }
        }
    };
     tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0
            },
            sm: {
                span: 16,
                offset: 8
            }
        }
    };


    /**
     * @function：onFinish
     * @parameter：After clicking the register button
     * @description：
     */
     onFinish = async (v) => {
         console.log(v)
         //await register(v.email, v.password, v)
     };


    render() {

        const genderChange = (value)=> {
            console.log("genderChange:"+value.target.value)
            this.setState({gender:value})
        }

        return(
            <Form
                {...this.formItemLayout}
                form={this.form}
                name="register"
                onFinish={this.onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!"
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!"
                        },{
                            min: 6,
                            message: "Please enter a length of at least 6 digits"
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!"
                        },
                        {
                            min: 6,
                            message: "Please enter a length of at least 6 digits"
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    "The two passwords that you entered do not match!"
                                );
                            }
                        })
                    ]}
                >
                    <Input.Password/>
                </Form.Item>


                <Form.Item name={'age'} label="Age" rules={[{ required: true,type: 'number', min: 0, max: 99 }]}>
                    <InputNumber/>
                </Form.Item>



                <Form.Item name={'gender'} label="Gender" initialValue={"male"}>
                    <Radio.Group onChange={genderChange} defaultValue={'male'}>
                        <Radio value={'male'}>Male</Radio>
                        <Radio value={'female'}>Female</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name={'usertype'}  label={"User Types"} initialValue={"athlete"} rules={[{ required: true, message: '' }]}>
                    <Radio.Group onChange={genderChange} defaultValue={'athlete'}>
                        <Radio value={'athlete'}>Athlete</Radio>
                        <Radio value={'ado'}>ADO</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item {...this.tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>

            </Form>
        )
    }
}
export default RegistrationForm;