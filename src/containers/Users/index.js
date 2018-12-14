import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/users/actions';
import Input from '../../components/uielements/input';
import Select, {
    SelectOption as Option,
} from '../../components/uielements/select';
import Modal from '../../components/feedback/modal';
import { Row, Col } from 'antd';

import {
    Form,
    Icon,
    Button,
    Upload,
    message
} from 'antd';


import LayoutContentWrapper from '../../components/utility/layoutWrapper.js';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import Popconfirms from '../../components/feedback/popconfirm';
import {
    ActionBtn,
    Fieldset,
    Label,
    TitleWrapper,
    ButtonHolders,
    ActionWrapper,
    ComponentTitle,
    TableWrapper,
    StatusTag,
    AvatarUpload,
} from './users.style';
import clone from 'clone';
import FileUploader from "react-firebase-file-uploader";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function getBlob(img) {
    const reader = new FileReader();
    let blob = new Blob([reader.result], { type: "image/jpeg" });
    return blob;
}

class Users extends Component {
    state = {
        files : [],
        avatarURL: '',
        fileList: [],
        uploading: false,
        file: []
    };

    componentDidMount() {
        this.props.loadFromFireStore();
    }

    onRecordChange = (key, event) => {
        let { user } = clone(this.props);
        if (key) user[key] = event.target.value;
        this.props.update(user);
    };

    onSelectChange = (key, value) => {
        let { user } = clone(this.props);
        if (key) user[key] = value;
        this.props.update(user);
    };

    onImageChange = (key, value) => {
        let { user } = clone(this.props);
        if (key) user[key] = value;
        this.props.update(user);
    };

    handleRecord = (actionName, user) => {
        if (user.key && actionName !== 'delete') actionName = 'update';
        // var test =this.props.saveImageToFirestore(this.state.file, actionName, 'users');
        // console.log(test);
        // console.log(this.state.file);
        this.props.saveIntoFireStore(user, this.state.file, actionName);
    };
    handleModal = (user = null) => {
        this.props.toggleModal(user);
    };

    /**
     * Custom onChange event handler
     * Store selected files in the state
     */
    // customOnChangeHandler = (event) => {
    //     const { target: files } = event;
    //     const filesToStore = [];
    //     filesToStore.push(files);
    //     this.setState({ files: filesToStore });
    // };
    //
    // /**
    //  * Start download handler using the file uploader reference
    //  */
    // startUploadManually = () => {
    //     const { files } = this.state;
    //     console.log(this.state);
    //     files.forEach(file => {
    //         this.fileUploader.startUpload(file)
    //     });
    // };


    /**
     * Custom onChange event handler
     * Store selected files in the state
     */
    customOnChangeHandler = (event) => {
        const { target: { files } } = event;
        const filesToStore = [];

        files.forEach(file => filesToStore.push(file));

        this.setState({ files: filesToStore });
    };

    /**
     * Start download handler using the file uploader reference
     */
    startUploadManually = () => {
        const { files } = this.state;
        files.forEach(file => {
            this.fileUploader.startUpload(file)
        });
    };


    render() {
        const { users } = this.props;
        const { user } = clone(this.props);
        const dataSource = [];
        const { modalActive } = this.props;
        Object.keys(users).map((user, index) => {
            return dataSource.push({
                ...users[user],
                key: user,
            });
        });

        const { fileList, avatarURL } = this.state;

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {},
        };
        const columns = [
            {
                title: 'First Name',
                dataIndex: 'firstname',
                key: 'firstname',
                width: '200px',
                sorter: (a, b) => {
                    if (a.firstname < b.firstname) return -1;
                    if (a.firstname > b.firstname) return 1;
                    return 0;
                },
                render: (text, row) => {
                    // const trimByWord = sentence => {
                    //     let result = sentence;
                    //     let resultArray = result.split(' ');
                    //     if (resultArray.length > 7) {
                    //         resultArray = resultArray.slice(0, 7);
                    //         result = resultArray.join(' ') + '...';
                    //     }
                    //     return result;
                    // };
                    return row.firstname;
                },
            },
            {
                title: 'Last Name',
                dataIndex: 'lastname',
                key: 'lastname',
                width: '360px',
                sorter: (a, b) => {
                    if (a.lastname < b.lastname) return -1;
                    if (a.lastname > b.lastname) return 1;
                    return 0;
                },
                render: (text, row) => {
                    // const trimByWord = sentence => {
                    //     let result = sentence;
                    //     let resultArray = result.split(' ');
                    //     if (resultArray.length > 20) {
                    //         resultArray = resultArray.slice(0, 20);
                    //         result = resultArray.join(' ') + '...';
                    //     }
                    //     return result;
                    // };

                    return row.lastname;
                },
            },
            {
                title: 'Role',
                dataIndex: 'userRole',
                className: 'noWrapCell',
                key: 'userRole',
                sorter: (a, b) => {
                    if (a.userRole < b.userRole) return -1;
                    if (a.userRole > b.userRole) return 1;
                    return 0;
                },

                render: (text, row) => {
                    let className;
                    if (row.status === ('draft' || 'Draft' || 'DRAFT')) {
                        className = 'draft';
                    } else if (row.status === ('publish' || 'Publish' || 'PUBLISH')) {
                        className = 'publish';
                    }
                    return <StatusTag className={className}>{row.userRole}</StatusTag>;
                },
            },
            {
                title: 'Company',
                dataIndex: 'companyName',
                width: '170px',
                key: 'companyName',
                sorter: (a, b) => {
                    if (a.companyName < b.companyName) return -1;
                    if (a.companyName > b.companyName) return 1;
                    return 0;
                },
                render: (text, row) => {
                    // const trimByWord = sentence => {
                    //     let result = sentence;
                    //     let resultArray = result.split(' ');
                    //     if (resultArray.length > 7) {
                    //         resultArray = resultArray.slice(0, 7);
                    //         result = resultArray.join(' ') + '...';
                    //     }
                    //     return result;
                    // };
                    return row.companyName;
                },
            },
            {
                title: 'Actions',
                key: 'action',
                width: '60px',
                className: 'noWrapCell',
                render: (text, row) => {
                    return (
                        <ActionWrapper>
                            <a onClick={this.handleModal.bind(this, row)} href="#">
                                <i className="ion-android-create" />
                            </a>

                            <Popconfirms
                                title="Are you sure to delete this user？"
                                okText="Yes"
                                cancelText="No"
                                placement="topRight"
                                onConfirm={this.handleRecord.bind(this, 'delete', row)}
                            >
                                <a className="deleteBtn" href="# ">
                                    <i className="ion-android-delete" />
                                </a>
                            </Popconfirms>
                        </ActionWrapper>
                    );
                },
            },
        ];

        const props = {
            onChange: (info) => {
                let fileList = info.fileList;
                fileList = fileList.slice(-1);
                if (fileList !== undefined || fileList != 0) {
                    const newFileList = fileList.slice(-1);
                    this.setState({
                        fileList: newFileList,
                        uploading: true,
                    });
                }
                getBase64(info.file, avatarURL => this.setState({
                    avatarURL,
                }));
                const newFile = info.file;
                this.setState({
                    file: newFile
                })
            },
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                        avatarURL: ''
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
            multiple: false,
            showUploadList:false,
            accept: 'jpg, png'
        };

        return (
            <LayoutContentWrapper>
                <Box>
                    <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
                        <TitleWrapper>
                            <ComponentTitle>users</ComponentTitle>

                            <ButtonHolders>
                                <ActionBtn
                                    type="primary"
                                    onClick={this.handleModal.bind(this, null)}
                                >
                                    Add User
                                </ActionBtn>

                            </ButtonHolders>
                        </TitleWrapper>

                        <Modal
                            visible={modalActive}
                            onClose={this.props.toggleModal.bind(this, null)}
                            title={user.key ? 'Update User' : 'Add New User'}
                            okText={user.key ? 'Update User' : 'Add User'}
                            onOk={this.handleRecord.bind(this, 'insert', user)}
                            onCancel={this.props.toggleModal.bind(this, null)}
                            style={{ top: 20 }}
                            width = '80%'
                        >
                            <Form>
                                <div>
                                    <Row type="flex" justify="start">
                                        <Col xs={24} sm={24} md={18} >
                                            <Fieldset>
                                                <Label>First Name</Label>
                                                <Input
                                                    label="First Name"
                                                    placeholder="First Name"
                                                    value={user.firstname}
                                                    onChange={this.onRecordChange.bind(this, 'firstname')}
                                                />
                                            </Fieldset>
                                            <Fieldset>

                                                <Label>Last Name</Label>
                                                <Input
                                                    label="Last Name"
                                                    placeholder="Last Name"
                                                    value={user.lastname}
                                                    onChange={this.onRecordChange.bind(this, 'lastname')}
                                                />
                                            </Fieldset>
                                        </Col>
                                        <Col xs={24} sm={24} md={6}>

                                            {/*<FileUploader*/}
                                                {/*accept="image/*"*/}
                                                {/*name="avatar"*/}
                                                {/*randomizeFilename*/}
                                                {/*onChange= {this.customOnChangeHandler} // ⇐ Call your handler*/}
                                                {/*ref={instance => { this.fileUploader = instance; } }  // ⇐ reference the component*/}
                                                {/*// onUploadStart={this.handleUploadStart}*/}
                                                {/*// onUploadError={this.handleUploadError}*/}
                                                {/*// onUploadSuccess={this.handleUploadSuccess}*/}
                                                {/*// onProgress={this.handleProgress}*/}
                                            {/*/>*/}
                                            {/*<button onClick={this.startUploadManually}>Upload all the things</button>*/}



                                            <AvatarUpload>

                                                <div className="avatar-wrapper">
                                                    <img className= 'profile-pic' src={user.profilePictureUrl} />
                                                    <div className="upload-button">
                                                        <i className="icon ion-ios-contact"></i>
                                                    </div>
                                                </div>
                                                <Upload {...props}>
                                                    <Button>
                                                        <Icon type="upload" /> Select File
                                                    </Button>
                                                </Upload>
                                            </AvatarUpload>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col xs={24} sm={24} md={12}>
                                            <Fieldset>
                                                <Label>Email</Label>
                                                <Input
                                                    label="Email"
                                                    placeholder="Email"
                                                    value={user.email}
                                                    type="email"
                                                    onChange={this.onRecordChange.bind(this, 'email')}
                                                />
                                            </Fieldset>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Fieldset>
                                                <Label>Company Name</Label>
                                                <Input
                                                    label="Company Name"
                                                    placeholder="Company Name"
                                                    value={user.companyName}
                                                    onChange={this.onRecordChange.bind(this, 'companyName')}
                                                />
                                            </Fieldset>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>ant-modal-footer
                                            <Fieldset>
                                                <Label>User Group</Label>
                                                <Select
                                                    defaultValue={user.userGroup}
                                                    placeholder="User Group"
                                                    onChange={this.onSelectChange.bind(this, 'userGroup')}
                                                    style={{ width: '170px' }}
                                                >
                                                    <Option value="employee">Employee</Option>
                                                    <Option value="none">None</Option>
                                                </Select>
                                            </Fieldset>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Fieldset>
                                                <Label>User Role</Label>
                                                <Select
                                                    defaultValue={user.userRole}
                                                    placeholder="User Group"
                                                    onChange={this.onSelectChange.bind(this, 'userRole')}
                                                    style={{ width: '170px' }}
                                                >
                                                    <Option value="admin">Admin</Option>
                                                    <Option value="staff">Staff</Option>
                                                    <Option value="bartender">Bartender</Option>
                                                    <Option value="visitor">Visitor</Option>
                                                </Select>
                                            </Fieldset>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Fieldset>
                                                <Label>Expertise</Label>
                                                <Input
                                                    label="Expertise"
                                                    placeholder="Expertise"
                                                    value={user.expertise}
                                                    onChange={this.onRecordChange.bind(this, 'expertise')}
                                                />
                                            </Fieldset>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Fieldset>
                                                <Label>Available</Label>
                                                <Select
                                                    defaultValue={user.available}
                                                    placeholder="Agreed Terms"
                                                    onChange={this.onSelectChange.bind(this, 'available')}
                                                    style={{ width: '170px' }}
                                                >
                                                    <Option value="1">Yes</Option>
                                                    <Option value="0">No</Option>
                                                </Select>
                                            </Fieldset>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Fieldset>
                                                <Label>Agreed Terms</Label>
                                                <Select
                                                    defaultValue={user.agreedTerms}
                                                    placeholder="Agreed Terms"
                                                    onChange={this.onSelectChange.bind(this, 'agreedTerms')}
                                                    style={{ width: '170px' }}
                                                >
                                                    <Option value="1">Yes</Option>
                                                    <Option value="0">No</Option>
                                                </Select>
                                            </Fieldset>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Fieldset>
                                                <Label>Agreed Terms Version</Label>
                                                <Input
                                                    label="Agreed Terms Version"
                                                    placeholder="0"
                                                    value={user.agreedTermsVersion}
                                                    type="number"
                                                    onChange={this.onRecordChange.bind(this, 'agreedTermsVersion')}
                                                />
                                            </Fieldset>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>
                        </Modal>


                        <TableWrapper
                            rowKey="key"
                            rowSelection={rowSelection}
                            columns={columns}
                            bordered={true}
                            dataSource={dataSource}
                            loading={this.props.isLoading}
                            className="isoSimpleTable"
                            pagination={{
                                // defaultPageSize: 1,
                                hideOnSinglePage: true,
                                total: dataSource.length,
                                showTotal: (total, range) => {
                                    return `Showing ${range[0]}-${range[1]} of ${
                                        dataSource.length
                                        } Results`;
                                },
                            }}
                        />
                    </ContentHolder>
                </Box>
            </LayoutContentWrapper>
        );
    }
}

export default connect(
    state => ({
        ...state.Users,
    }),
    actions
)(Users);



