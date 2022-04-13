import React, {Component} from 'react';
import './ado.css'
import DrawerForm from './updateinvited'
import {Space, Table, DatePicker, Button, Drawer} from "antd";
import moment from 'moment';
import ajax from "../../api/ajax";
const dateFormat = 'HH:mm DD-MM-YYYY';
const GET = 'GET'
const POST = 'POST'
const UPDATE = 'PUT'
const DELETE = 'POST'

export default class Invitedrecord extends Component{
    constructor(props) {
        super(props);
        let adoId = window.sessionStorage.getItem("adoId") || false;
        let athId = window.sessionStorage.getItem("athId") || false;
        let ajaxData = [];

        /**
         * 等待接口完成
         */
        // let isADO = 获取是否是ADO
        // if (adoId && athId)
        //     ajaxData = ajax(url,{adoId: athId, athId: athId} , GET) // 调用机构查询其下某个运动员邀请记录的接口
        // else if(adoId != false && athId == false)
        //     ajaxData = ajax(url,{id: adoId} , GET) // 调用机构查询其下全部运动员邀请记录的接口
        // else if(adoId == false && athId != false)
        //     ajaxData = ajax(url,{id: athId} , GET) // 调用运动员查询自己的所有邀请记录的接口
        // else
        //     ajaxData = ajax(url,{} , GET) // 调用查询所有机构所有运动员的记录接口

       ajaxData = [{
           key: '1',
           id: '1111111',
           name: 'John Brown',
           age: 32,
           address: 'New York No. 1 Lake Park',
           date: '22:22 02-03-2022',
           adoName: 'Apple Ado',
       },
            {
                key: '2',
                id: '2222222222',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                date: '22:22 04-04-2022',
                adoName: 'Big Ado',
            },
            {
                key: '3',
                id: '333333333333',
                name: 'Joe Black3',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                date: '22:22 08-04-2022',
                adoName: 'Cup Ado',
            }];
        this.state = {
            visible: false,
            data: ajaxData,
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
                {
                    title: 'Age',
                    dataIndex: 'age',
                    key: 'age',
                }, {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                }, {
                    title: 'Invitation Date',
                    dataIndex: 'date',
                    key: 'date',
                }, {
                    title: 'Ado Name',
                    dataIndex: 'adoName',
                    key: 'adoName',
                }, {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            {/*<a val={record.id} onClick={this.onUpdate.bind(this, record)}>Update ID: {record.id}</a>*/}
                            {/*<DrawerForm id={record.id} name={record.name} age={record.age} address={} date={} />*/}
                            <DrawerForm record={record}/>
                            {/*<a val={record.id} onClick={this.onDelete.bind(this)}>Delete</a>*/}
                        </Space>
                    ),
                }]
            };
    }

    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.state.data} />
        )
    }
}


