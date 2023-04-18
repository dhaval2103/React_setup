import React, { useEffect, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Modal, Table, Button, Input, Form, Empty } from 'antd';
import { Dropdown } from "react-bootstrap";
import ToastMe from '../Common/ToastMe';
import moment from "moment";

const Technicalguide = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState('');
    const [form] = Form.useForm();
    const [uploadedImage, setUploadedImage] = useState([]);
    const [uploadedVideo, setUploadedVideo] = useState([]);
    const [viewImage, setViewImage] = useState([]);
    const [viewVideo, setViewVideo] = useState([]);
    const [urlImage, setUrlImage] = useState([]);

    const editModal = async (text) => {
        form.resetFields();
        setVisible(true)
        setUrlImage([])
        if (text) {
            setId(text.id)
            setViewImage(text.image)
            setViewVideo(text.video)
            form.setFieldsValue({
                title: text.title,
                description: text.description,
            })
        } else {
            setId('')
            setViewImage([])
            setViewVideo([])
            form.setFieldsValue({
                title: '',
                description: '',
            })
        }
    }

    const onSubmit = async (values) => {
        if (id) {
            if (uploadedImage || uploadedVideo) {
                const formData = new FormData();
                if (uploadedImage) {
                    uploadedImage?.map((file) => {
                        formData.append('images', file)
                    })
                }
                if (uploadedVideo) {
                    uploadedVideo?.map((file) => {
                        formData.append('videos', file)
                    })
                }
                dispatch(UserService.uploadMedia(formData))
                    .then((res) => {
                        if (res.data.images) {
                            res.data.images.map((result) => {
                                viewImage.push(result)
                            })
                        }
                        if (res.data.video) {
                            res.data.video.map((result) => {
                                viewVideo.push(result)
                            })
                        }
                        values.image = viewImage
                        values.video = viewVideo
                        values.id = id;
                        dispatch(UserService.editTechnicalguides(values))
                            .then((res) => {
                                getTechnicalGuides();
                                form.setFieldsValue({
                                    title: '',
                                    description: '',
                                })
                                ToastMe(res.data.message, 'success')
                            })
                        setVisible(false)
                            .catch((errors) => {
                                console.log({ errors })
                            })
                    })
                    .catch((errors) => {
                        // console.log({ errors })
                    })
            } else {
                values.image = viewImage
                values.video = viewVideo
                values.id = id;
                dispatch(UserService.editTechnicalguides(values))
                    .then((res) => {
                        getTechnicalGuides();
                        form.setFieldsValue({
                            title: '',
                            description: '',
                        })
                        ToastMe(res.data.message, 'success')
                    })
                setVisible(false)
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        } else {
            if (uploadedImage || uploadedVideo) {
                const formData = new FormData();
                uploadedImage?.map((file) => {
                    formData.append('images', file)
                })
                uploadedVideo?.map((file) => {
                    formData.append('videos', file)
                })
                dispatch(UserService.uploadMedia(formData))
                    .then((res) => {
                        values.image = res.data.images
                        values.video = res.data.video
                        dispatch(UserService.addTechnicalguides(values))
                            .then((res) => {
                                getTechnicalGuides();
                                form.setFieldsValue({
                                    title: '',
                                    description: '',
                                })
                                ToastMe(res.data.message, 'success')
                            })
                        setVisible(false)
                            .catch((errors) => {
                                console.log({ errors })
                            })
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        }
    }

    const uploadImageVideo = async () => {
        if (uploadedImage || uploadedVideo) {
            const formData = new FormData();

            uploadedImage?.map((file) => {
                formData.append('images', file)
            })
            uploadedVideo?.map((file) => {
                formData.append('videos', file)
            })
            dispatch(UserService.uploadMedia(formData))
                .then((res) => {
                    // setMedia(res?.data)
                })
                .catch((errors) => {
                    console.log({ errors })
                })
        }
    }

    const getTechnicalGuides = () => {
        dispatch(UserService.getTechnicalGuides())
            .then((res) => {
                let newArr = [];
                for (var i = 0; i < res?.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            title: res?.data[i].title || '-',
                            description: res?.data[i].description || '-',
                            video: res?.data[i].video || '-',
                            image: res?.data[i].image || '-',
                            id: res?.data[i]._id || '-',
                            createdAt: res?.data[i].createdAt || '-'
                        }
                    )
                }
                setData(newArr);
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }
    const Uid = () => {
        return "_" + Math.random().toString(36).substring(2, 9);
    };
    const handleProfilePicOnChange = (ev) => {
        const fileTypes = [...ev.target.files];
        // setUploadedImage([])
        // setUploadedVideo([])
        fileTypes.map((file) => {
            let userSelectedfiles = [file];
            userSelectedfiles.map((file) => {
                file.id = Uid();
                return file;
            });
            setUrlImage((prev) => [...prev, ...userSelectedfiles]);
            if (file.type.includes('video')) {
                setUploadedVideo((prev) => [...prev, file])
            } else if (file.type.includes('image')) {
                setUploadedImage((prev) => [...prev, file])
            }
        })
    };

    const removeImage = (img) => {
        setViewImage(
            viewImage?.filter((ele) => {
                return ele !== img;
            })
        )
    }
    const removeVideo = (img) => {
        setViewVideo(
            viewVideo?.filter((ele) => {
                return ele !== img;
            })
        )
    }
    const removeVideoUrl = (img) => {
        setUrlImage(
            urlImage?.filter((ele) => {
                return ele !== img;
            })
        )
    }

    useEffect(() => {
        getTechnicalGuides();
    }, [])

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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        // {
        //     title: 'Image',
        //     dataIndex: 'image',
        //     key: 'image',
        //     render: (text) => (
        //         <div className='row'>
        //             {text?.map((item, i) => {
        //                 return (
        //                     <div key={i}>
        //                         <img
        //                             src={process.env.REACT_APP_PROFILE_URL + 'images/' + item}
        //                             alt=""
        //                             width="70px"
        //                             height="70px"
        //                         />
        //                     </div>
        //                 )
        //             })}
        //         </div>
        //     )
        // },
        // {
        //     title: 'Video',
        //     dataIndex: 'video',
        //     key: 'video',
        //     render: (text) => (
        //         <div className='row' >
        //             {text?.map((item, i) => {
        //                 <video
        //                     src={files(process.env.REACT_APP_PROFILE_URL + 'images/' + item.video, "attachments")}
        //                     autoPlay
        //                     controls
        //                     poster={files(process.env.REACT_APP_PROFILE_URL + 'images/' + item.thumbnail, "thumb")}
        //                     loop
        //                 />
        //             })}
        //         </div>
        //     )
        // },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => (
                <div>
                    {moment(text).format("DD MMM YYYY h:mm A")}
                </div>
            ),
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
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Technical guide</h4>
                    <Button type="primary" onClick={() => editModal()}>
                        Add Technical guide
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
            <Modal open={visible} title={id ? "Edit Technical guide" : "Add Technical guide"} okText="Submit" cancelText="Cancel"
                onCancel={() => {
                    setVisible(false);
                }}
                footer={[
                    <Button key="cancel" onClick={() => setVisible(false)}> Cancel </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => {
                            form.validateFields()
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
                className='edit_technical_guide'
            >
                <Form form={form} layout="vertical" name="form_in_modal"
                    initialValues={{
                        modifier: "public"
                    }}
                >
                    <label className="label-name">Title</label>
                    <Form.Item name="title"
                        rules={[{ required: true, message: "Please entre title!" },{ max: 15, message: 'You can not enter more than 15 characters' }]}
                    >
                        <Input type="text" placeholder='Enter title' />
                    </Form.Item>

                    <label className="label-name">Description</label>
                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: "Please enter description!" }]}
                    >
                        <Input type="text" placeholder='Enter description' />
                    </Form.Item>
                    <label className="label-name">Media</label>
                    <Form.Item
                        name="media"
                    // rules={[{ required: true, message: "Please select image or video!" }]}
                    >
                        <Input type="file" id='file-input' multiple onChange={(e) => handleProfilePicOnChange(e)} />
                    </Form.Item>
                    <div className="card-body pb-1">
                        <div id="lightgallery" className="row gx-2">
                            {viewImage?.length > 0 && viewImage.map((item, index) => (
                                <>
                                    <label className="label-name">Images</label>
                                    <a className="col-lg-6 col-md-6 mb-6" key={index}>
                                        <div className='img_video_wrapper'>
                                            <span id="close" onClick={() => removeImage(item)} className='close_icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                                            <img src={process.env.REACT_APP_PROFILE_URL + 'images/' + item} style={{ width: "100%" }} alt="gallery" />
                                        </div>
                                    </a>
                                </>
                            ))}
                            {
                                urlImage?.map((item, index) => {
                                    return (
                                        item.type?.includes("image") ?
                                            <a className="col-lg-6 col-md-6 mb-6" key={index}>
                                                <div className='img_video_wrapper'>
                                                    <span id="close" onClick={() => removeVideoUrl(item)} className='close_icon'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                                                    <img src={URL.createObjectURL(item)} alt="profile" width="190px" height="100px" />
                                                </div>
                                            </a> : <></>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="card-body pb-1">
                        <div id="lightgallery" className="row gx-2">
                            {viewVideo?.map((item, index) => (
                                <>
                                    <label className="label-name">Videos</label>
                                    <a className='col-lg-6 col-md-6 mb-6' key={index}>
                                        <div className='img_video_wrapper'>
                                            <span id="close" onClick={() => removeVideo(item)} className='close_icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                                            <video key={index} src={process.env.REACT_APP_PROFILE_URL + 'images/' + item?.video} controls poster={process.env.REACT_APP_PROFILE_URL + 'thumb/' + item?.thumbnail} width="70px" height="70px" />
                                        </div>
                                    </a>
                                </>
                            ))}
                            {
                                urlImage?.map((item, index) => {
                                    return (
                                        item.type?.includes("video") ?
                                            <a className='col-lg-6 col-md-6 mb-4' key={index}>
                                                <div className='img_video_wrapper'>
                                                    <span id="close" onClick={() => removeVideoUrl(item)} className='close_icon'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                                                    <video loop muted autoPlay width="190px" height="100px">
                                                        <source src={URL.createObjectURL(item)} ></source>
                                                    </video>
                                                </div>
                                            </a> : <></>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default Technicalguide