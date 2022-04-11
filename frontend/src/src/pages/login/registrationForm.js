import "antd/dist/antd.css";
import {Form, Input, Button, InputNumber,Radio,Select} from "antd";
import React,{Component} from "react";
import '../../api'
import ajax from "../../api/ajax";
const { Option,OptGroup} = Select;




class  RegistrationForm extends Component{
    state = {
        experience:'1 month',
        gender:'male',
        activity_level_ratio:0,
        dietary_restrictions:'no',
        gym_equipment: ['no'],
        weight_goals:'weight gain',
        location_list:[],

    }
    constructor(props) {
        super(props);

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


     async componentDidMount() {

         var test = await ajax("/location", "1", 'GET')
         this.setState({tlocation_list:test})

         this.setState({location_list:[{ "region": "Asia", "country":"India"},{ "region": "Asia", "country":"China"}]})

     }

    /**
     * @function：onFinish
     * @parameter：After clicking the register button
     * @description：
     */
     onFinish = async (v) => {
         console.log(v)
         //await register(v.email, v.password, v)
         if(v.usertype == 'athlete')
         {
            v.usertype = true
         }
         else {
             v.usertype = false
         }

         var userdata = {
             name:v.username,
             email:v.email,
             password:v.password,
             isAthlete:v.usertype,
             location:{
                 region:v.location.split("-")[0],
                 country:v.location.split("-")[1]
             }
         }


         console.log(userdata);
         //var response =  await ajax("/user/register",userdata,'POST')
         //console.log("Registration Response:"+response.data)
     };


    render() {


        const genderChange = (value)=> {
            console.log("genderChange:"+value.target.value)
            this.setState({gender:value})
        }

        const handleChange = (value)=> {
            console.log(`selected ${value}`);
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
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!"
                        }
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail(@wada)"
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



                <Form.Item name={'location'} label="Location">

                    <Select style={{ width: 200 }} onChange={handleChange}>

                        {
                            this.state.location_list.map((result)=>{
                                console.log(result)
                                return <Option value={result.region+"-"+result.country}>{result.region+"-"+result.country}</Option>
                            })
                        }
                    </Select>

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