/*
routing component of personal page
 */
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import React,{Component} from "react";
import {Redirect,Link,Route,Switch} from 'react-router-dom'
import {message,Image,Button,Modal} from "antd";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
   ExclamationCircleOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './personal.css'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { withRouter } from 'react-router-dom';
import {formateDate} from "../../utils/dateUtils";
import About from "../about/about";
import PersonalInformation from "../personalinformation/personalinformation"
import Athleteslist from "../ado/athleteslist"
import Invitedrecord from "../ado/invitedrecord"
import Adolist from "../athletes/adolist"
const { confirm } = Modal;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

 class Personal extends Component{
    state = {
        collapsed: false,
        currentTime:formateDate(Date.now()),
        current: 'mail',
    };
      this = this
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
     /**
      * @function：showDeleteConfirm
      * @parameter：null
      * @description： User logout operation
      */
      showDeleteConfirm =()=> {
         confirm({
             title: 'Warning notices',
             icon: <ExclamationCircleOutlined />,
             content: 'Are you really ready to log out?',
             okText: 'Yes',
             okType: 'danger',
             cancelText: 'No',
             onOk:()=> {
                 console.log('OK');
                 //Deletes user information stored locally
                 storageUtils.removeUser();
                 memoryUtils.user={};
                 memoryUtils.userID = {};

                 message.success("log out success!");
                 //Page jump
                 this.props.history.replace('/');
                 this.forceUpdate();

             },
             onCancel() {
                 console.log('Cancel');
             },
         });
     }

     /**
      * @function：getTime
      * @parameter：null
      * @description： Gets the current time and date
      */
     getTime=()=>{
          setInterval(()=>{
              //Format time and date
              const currentTime = formateDate(Date.now())
              this.setState({currentTime})
          },1000)
     }
     componentDidMount() {
        this.getTime();
     }

     render() {
        const{currentTime} = this.state
        // const user = memoryUtils.user.username;
        // console.log("per:"+user)
        // //Check whether to log in
        // if(!user){
        //     return <Redirect to = '/login'/>
        // }

        const { collapsed } = this.state;

        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        {/*<Menu.Item key="1"> <Link to ='/personal/about'>About</Link> </Menu.Item>*/}
                        {/*<Menu.Item key="2"> <Link to ='/personal/personalinformation'>Personal information</Link></Menu.Item>*/}
                        {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                        <Menu.Item key="4"> <Link to ='/personal/ado/athleteslist'>Ath List</Link> </Menu.Item>
                        <Menu.Item key="5"> <Link to ='/personal/ado/invitedrecord'>inveted Record</Link> </Menu.Item>
                        <Menu.Item key="6"> <Link to ='/personal/athletes/adolist'>ADO List</Link> </Menu.Item>
                    </Menu>
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <div>
                            <Button onClick={this.showDeleteConfirm} type="dashed">Log out</Button>
                            <span> &ensp;   &ensp;   </span>
                            <span style={{ right: '80px' }}>{currentTime}</span>
                        </div>
                    </Breadcrumb>
                    <div>
                        {/*Routing management for personal pages*/}
                        <Switch>
                            <Route path='/personal/personalinformation' component={PersonalInformation}/>
                            <Route path='/personal/about' component={About}/>
                            <Route path='/personal/ado/athleteslist' component={Athleteslist}/>
                            <Route path='/personal/ado/invitedrecord' component={Invitedrecord}/>
                            <Route path='/personal/athletes/adolist' component={Adolist}/>
                            {/*<Route path='/personal/athletes/submitedrecord' component={Submitedrecord}/>*/}
                            <Redirect to='/personal/about'/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Distributed Systems Group 5 Exercise 2 © 2022</Footer>
            </Layout>
        )
    }
}
export default withRouter(Personal);