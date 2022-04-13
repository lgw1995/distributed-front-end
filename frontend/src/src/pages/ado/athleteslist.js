import React, {Component} from 'react';
import './ado.css'
import DrawerForm from './updateathlete'
import { Table, Tag, Space } from 'antd';
import moment from 'moment';
import ajax from "../../api/ajax";
const dateFormat = 'HH:mm DD-MM-YYYY';
const GET = 'GET'
const POST = 'POST'
const UPDATE = 'PUT'
const DELETE = 'POST'

export default class Athleteslist extends Component{

    constructor(props) {
        super(props);
        window.sessionStorage.setItem("athId", "");
        window.sessionStorage.setItem("adoId", "");
        let ajaxData = [];

        // let isADO = 获取是否是ADO
        // if(isADO){
        //     // let adoId = getAdoID()
        //     window.sessionStorage.setItem("adoId", adoId);
        //     // ajaxData = ajax(url,{id: adoId} , GET)
        // } else if(!isADO) {
        //     // let athId = getAthID()
        //     window.sessionStorage.setItem("athId", athId);
        //     // ajaxData = ajax(url,{id: athId} , GET)
        // } else {
        //     alert("Error! You are neither ADO nor ATH!")
        // }

        ajaxData = [{
            key: '1',
            id: '11112121',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
            {
                key: '2',
                id: '223232323232',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
            },
            {
                key: '3',
                id: '34343434434',
                name: 'Joe Black3',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            }]


        this.state = {
            data: ajaxData,
            columns:[{
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    render: text => <a>{text}</a>,
                },
                {
                    title: 'Age',
                    dataIndex: 'age',
                    key: 'age',
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                },{
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            <DrawerForm record={record} />
                        </Space>
                    ),
                }]};
    }

    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.state.data} />
        )
    }
}















