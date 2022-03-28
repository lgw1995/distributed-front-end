import {Form, Input, Drawer, Button, Checkbox, message, Modal, Divider, Radio} from 'antd';
import React,{Component} from "react";
import DrawerForm from './registrationDrawer'
import { withRouter } from 'react-router-dom';
class  LoginHome extends Component{
    state = { visible: false };
     layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
     onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    /**
     * @function：onFinish
     * @parameter： User account email and password
     * @description： Authenticate
     */
     onFinish = async (e) => {
         withRouter(LoginHome)
         //Authentication request
         this.props.history.replace('/personal');
     };

    render(){
        const genderChange = (value)=> {

        }
        return(
            <Form
                {...this.layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >

                <Form.Item
                    label="Email"
                    name="username"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name={'usertype'}  label={"Type"} initialValue={"athlete"} rules={[{ required: true, message: '' }]}>
                    <Radio.Group onChange={genderChange} defaultValue={'athlete'}>
                        <Radio value={'athlete'}>Athlete</Radio>
                        <Radio value={'ado'}>ADO</Radio>
                    </Radio.Group>
                </Form.Item>




                <Form.Item {...this.tailLayout}>
                    <Button type="primary" htmlType="submit">Login</Button>
                    <DrawerForm/>
                </Form.Item>

            </Form>
        )
    }
}

export default withRouter(LoginHome);

