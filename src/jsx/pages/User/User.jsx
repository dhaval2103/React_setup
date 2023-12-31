import React, { useEffect, useState } from "react";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";
import { Empty, Table } from "antd";
import { Dropdown } from "react-bootstrap";
import moment from "moment";
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import { phoneFormate } from "../helper";

const User = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserList = (value) => {
    dispatch(UserService.getUser(value)).then((res) => {
      var newArr = [];
      for (var i = 0; i < res.data.length; i++) {
        newArr.push({
          key: i,
          first_name: res.data[i].first_name,
          last_name: res.data[i].last_name,
          email: res.data[i].email,
          id: res.data[i]._id,
          createdAt: res.data[i].createdAt,
        });
      }
      setData(newArr);
      setLoading(false);
    })
    .catch((errors) => {
        console.log({ errors })
    })
  };

  // const viewSubUser = (text) => {
  //   props.history.push("/carrier-sub-user-list", { state: text });
  // };
  // const viewlinklist = (text) => {
  //   props.history.push("/carrier-sub-user-Link-list", { state: text });
  // };

  useEffect(() => {
    getUserList();
  }, []);

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
  const columnss = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text) => <div>{text + 1}</div>,
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{moment(text).format("DD MMM YYYY h:mm A")}</div>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text) => (
        <>
          <Dropdown>
            <Dropdown.Toggle
              variant="danger"
              className="light sharp i-false badge_label"
            >
              {svg1}
              {text.readStatusCount > 0 ? (
                <span className="badge light text-white bg-danger rounded-circle">
                  {text.readStatusCount}
                </span>
              ) : (
                ""
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => viewUser(text)}>View</Dropdown.Item>
              <Dropdown.Item onClick={() => viewSubUser(text)}>
                Sub User List
              </Dropdown.Item>
              <Dropdown.Item onClick={() => viewlinklist(text)}>
                Link List
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ),
    },
  ];

  const viewUser = (text) => {
    props.history.push("/user-detail", { userDetail: text });
  };
  // const viewChat = (text) => {
  //     props.history.push("/chat", { userDetail: text })
  // }

  return (
    <>
      <PageLoader loading={loading} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Carrier List</h4>
          {/* <div className="d-flex align-items-center gap-3">
                        <Input placeholder='Search....' onChange={(e) => handleSearch(e)} prefix={<SearchOutlined className="site-form-item-icon" />} />
                        <Button type="primary" onClick={() => editModal()}>
                            Add User
                        </Button>
                    </div> */}
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {data && data.length > 0 ? (
              <Table
                dataSource={data}
                columns={columnss}
                className="table_custom"
              />
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
