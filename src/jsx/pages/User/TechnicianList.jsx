import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Modal, Table, Button, Input, Form, Empty } from 'antd';
import { Dropdown } from "react-bootstrap";
import ToastMe from '../Common/ToastMe';
import dummy from "../../../images/dummy.png"


const TechnicianList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const [form] = Form.useForm();
  const [userImg, setUserImg] = useState('');
  const [imageName, setImageName] = useState();
  const [serverErrors, setServerErrors] = useState({});
  const [test, setTest] = useState('');

  const editModal = (text) => {
    setVisible(true)
    setTest('')
    if (text) {
      form.setFieldsValue({
        name: text?.name || '',
        about: text?.about || '',
        email: text?.email || '',
      })
      setId(text.id);
      setImageName(text.image)
    } else {
      form.resetFields();
      setId('')
    }
  }

  const handleServerErrors = (errors) => {
    const newErrors = {};
    Object.keys(errors).forEach((key) => {
      console.log(errors[key]);
      newErrors[key] = {
        validateStatus: 'error',
        help: errors[key].join(' '),
      };
    });
    console.log(newErrors);

    setServerErrors(newErrors);
  };

  const onSubmit = (values) => {
    values['image'] = imageName;
    if (id) {
      values.technicianId = id;
      console.log(values)
      dispatch(UserService.updateTechician(values))
        .then((res) => {
          getTechnician();
          ToastMe("Techician Updated Successfully", 'success')
          setVisible(false);
          form.resetFields();
          setId('')
        })
        .catch((errors) => {
          console.log({ errors })
        })
    } else {
      dispatch(UserService.addTechician(values))
        .then((res) => {
          getTechnician();
          ToastMe("Techician Added Successfully", 'success')
          setVisible(false);
          setTest('');
          form.resetFields();
        })
        .catch((errors) => {
          console.log(errors)
          setTest(errors.errors.email);
        })
    }
  }

  const getTechnician = () => {
    dispatch(UserService.getTechnician())
      .then((res) => {
        let newArr = [];
        for (var i = 0; i < res.data.length; i++) {
          newArr.push(
            {
              key: i,
              name: res.data[i].name || '-',
              email: res.data[i].email || '-',
              about: res.data[i].about || '-',
              image: res.data[i].image || '-',
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

  const previewUserImageOnChange = (ev) => {
    let userImgSrc = URL.createObjectURL(ev.target.files[0]);
    let filesPath = ev.target.files[0];
    setUserImg(userImgSrc);
    const image = new FormData();
    image.append('image', filesPath);
    dispatch(UserService.uploadUserProfile(image))
      .then((res) => {
        if (res.data) {
          setImageName(res.data.imageWithName)
        }
      })
      .catch((errors, statusCode) => {
        setUserImg('')
        ToastMe(errors.errorData, "error");
      });
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
    getTechnician();
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
      title: 'About',
      dataIndex: 'about',
      key: 'about',
      render: (text) => {
        if (text.length > 40) {
          return (
            <div className='col-6'>
              {text.substring(0, 40) + "...."}
            </div>
          )
        } else {
          return (
            <div className='col-6'>
              {text}
            </div>
          )
        }
      }
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => (
        <div className='col-6'>
          <img src={text == '-' ? dummy : process.env.REACT_APP_PROFILE_URL + 'images/' + text} alt="" width="70px" height="70px" />
        </div>
      ),
    },
    // {
    //     title: 'Created At',
    //     dataIndex: 'createdAt',
    //     key: 'createdAt',
    //     render: (text) => (
    //         <div>
    //             {moment(text).format("DD MMM YYYY h:mm A")}
    //         </div>
    //     ),
    // },
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
          <h4 className="card-title">Technician List</h4>

          <Button type="primary" onClick={() => editModal()}>
            Add Technician
          </Button>
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
        title={id != null ? 'Add Technician' : 'Edit Technician'}
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
          <label className="label-name">Technician Name</label>
          <Form.Item
            className='mb-2'
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter name!",
              },
              {
                pattern: new RegExp(/^[^-\s][a-zA-Z_\s-]+$/),
                message: "Enter only characters"
              }
            ]}
          >
            <Input type="text" placeholder='Enter name' />
          </Form.Item>

          <label className="label-name">Email</label>
          <Form.Item
            className='mb-2'
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter email!"
              }
            ]}
          >
            <Input type="text" placeholder='Enter email' />
          </Form.Item>
          <span style={{ color: 'red' }}>{test}</span><br></br>
          <label className="label-name">About</label>
          <Form.Item
            className='mb-2'
            name="about"
            rules={[
              {
                required: true,
                message: "Please enter about!"
              }
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <label className="label-name">Image</label>
          <Form.Item
            className='mb-2'
            name="image"
          >
            <Input type="file" name='image' className="file-input-control" id='file-input-control' onChange={previewUserImageOnChange} accept="image/*" />
          </Form.Item>
          {userImg != '' ? <img src={userImg} style={{ width: "20%" }} alt="gallery" /> :''}

        </Form>
      </Modal>
    </>
  )
}

export default TechnicianList