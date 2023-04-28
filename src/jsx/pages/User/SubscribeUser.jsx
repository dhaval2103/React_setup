import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Modal, Table, Button, Input, Form, Empty, Space, Select } from 'antd';
import { Dropdown } from "react-bootstrap";
import ToastMe from '../Common/ToastMe';
import dummy from "../../../images/dummy.png"
import SubscriptionService from '../../../services/subscription';
import { SearchOutlined } from '@ant-design/icons';

const SubscribeUser = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const [form] = Form.useForm();
  const [userImg, setUserImg] = useState('');
  const [imageName, setImageName] = useState();
  const [serverErrors, setServerErrors] = useState({});
  const [userData, setuserData] = useState([]);
  const [plans, setplanData] = useState([]);
  const [userId, setuserId] = useState();
  const [planId, setplanId] = useState();

  const editModal = () => {
    setVisible(true);
    setplanId('');
    setuserId('');
    form.resetFields();
  }

  const onSubmit = (values) => {
    dispatch(UserService.addSubscribeUser(values))
      .then((res) => {
        ToastMe("Subscribe User Added Successfully", 'success')
        setVisible(false);
        getSubscribeUser();
        setplanId('');
        setuserId('');
        form.resetFields();
      })
      .catch((errors) => {
        console.log(errors)
      })

  }

  const getSubscribeUser = (value) => {
    dispatch(UserService.listSubscribeUser(value))
      .then((res) => {
        let newArr = [];
        for (var i = 0; i < res.data.length; i++) {
          newArr.push(
            {
              key: i,
              name: res.data[i].user.fullName || '-',
              email: res.data[i].user.email || '-',
              mobile: res.data[i].user.mobile || '-',
              packageName: res.data[i].subscription.packageName || '-',
              price: res.data[i].subscription.price || '-',
              duration: res.data[i].subscription.duration || '-',
              id: res.data[i]._id || '-',
              createdAt: res.data[i].createdAt || '-'
            }
          )
        }
        setData(newArr);
      })
      .catch((errors) => {
        console.log({ errors })
      })
  }
  const getSearchValue = (e) => {
    getSubscribeUser(e.target.value)
  }
  const getUser = (value = '') => {
    dispatch(UserService.getUser(value))
      .then((res) => {
        const newArr = [];
        for (let i = 0; i < res.data.length; i++) {
          newArr.push({
            label: res.data[i].fullName,
            value: res.data[i]._id,
          });
        }
        setuserData(newArr);
      })
      .catch((errors) => {
        console.log({ errors })
      })
  }

  const getPlans = () => {
    dispatch(SubscriptionService.getSubscription())
      .then((res) => {
        const newArr = [];
        for (let i = 0; i < res.data.length; i++) {
          newArr.push({
            label: res.data[i].packageName,
            value: res.data[i]._id,
          });
        }
        setplanData(newArr);
      })
      .catch((errors) => {
        console.log({ errors })
      })
  }

  const handleChangeName = (e) => {
    setuserId(e);
    form.setFieldValue('userId', e)
  }
  const handlePlanName = (e) => {
    setplanId(e);
    form.setFieldValue('planId', e)
  }
  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );

  useEffect(() => {
    getSubscribeUser();
    getUser();
    getPlans();
  }, [])

  const columnss = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      render: (text) => (
        <div>
          {text + 1}
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'PackageName',
      dataIndex: 'packageName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text) => (
        <>
          <Dropdown>
            <Dropdown.Toggle
              variant="danger"
              className="light sharp i-false"
            >
              {svg1}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => editModal(text)}>Edit</Dropdown.Item>
              {/* <Dropdown.Item onClick={() => deleteCms(text)}>Delete</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </>
      )
    },
  ];

  return (
    <>
      {/* <PageTitle activeMenu="Filtering" motherMenu="Table" /> */}
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Subscribe User List</h4>
          <div className="d-flex align-items-center gap-3"> <Input placeholder='Search....' onChange={(e) => getSearchValue(e)}
            prefix={<SearchOutlined className="site-form-item-icon" />} />
            <Button type="primary" onClick={() => editModal()}>
              Add Subscribe User
            </Button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {
              data && data.length > 0 ?
                <Table dataSource={data} columns={columnss} /> : <Empty />
            }
          </div>
        </div>
      </div>
      <Modal
        open={visible}
        title={id != null ? 'Add Subscribe User' : 'Edit Subscribe User'}
        okText="Submit"
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false);
        }}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"

            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  onSubmit(values);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
          >
            Submit
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public"
          }}
        >
          <label className="label-name">Select User</label>
          <div>
            <Form.Item
              name="userId"
              rules={[{ required: true, message: "Please select User name!" }]}
            >
              <Space
                style={{
                  width: '100%',
                }}
                direction="vertical"
              >
                <Select
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  showSearch
                  placeholder="Please select"
                  value={userId}
                  onChange={handleChangeName}
                  options={userData}
                  filterOption={(inputValue, option) =>
                    option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Space>

            </Form.Item>
          </div>

          <label className="label-name">Select Subscription Plan</label>
          <div>
            <Form.Item
              name="planId"
              rules={[{ required: true, message: "Please select Plan!" }]}
            >
              <Space
                style={{
                  width: '100%',
                }}
                direction="vertical"
              >
                <Select
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  showSearch
                  placeholder="Please select"
                  value={planId}
                  onChange={handlePlanName}
                  options={plans}
                  filterOption={(inputValue, option) =>
                    option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Space>

            </Form.Item>
          </div>

        </Form>
      </Modal>
    </>
  )
}

export default SubscribeUser