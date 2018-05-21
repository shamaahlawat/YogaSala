import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Table, Divider, Icon, message } from 'antd';

import './index.scss';

import { icons } from '../../data/assets/assetsurl';
import { getUserDocuments } from '../../data/config/api';
import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as userActions from '../../data/redux/user_details/actions';
import * as servicesActions from '../../data/redux/services_details/actions';

import PageHeader from '../../components/pageheader';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, userActions, servicesActions), dispatch)
    };
}

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        user_details: state.user_details,
        services_details: state.services_details
    };
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'title',
        sorter: true
    },
    {
        title: 'Details',
        dataIndex: 'description',
    },
    {
        title: 'Upload Date',
        dataIndex: 'created_at',
        render: (text, record) => (
            <span className="postDate">{getFormatedDate(record.created_at)}</span>
        ),
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        render: (text, record) => (
            <span>
                <span className="tableAction font-color is-cursor-ptr" onClick={() => window.open(record.attachment, "_blank")}>View</span>
                <Divider type="vertical" />
                <a download href={record.attachment} className="tableAction font-color is-cursor-ptr">Download</a>
            </span>
        )
    }
];

const getFormatedDate = (post_date) => {
    let date = new Date(post_date * 1000);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

class UserDocuments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_folder: 0,
            data: [],
            loading: false,
        };
    }

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.USER_DOCUMENTS, CONSTANTS.appPages.USER_DOCUMENTS);
        this.props.actions.getServicesDetails();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nxtProps) {
        if (nxtProps.services_details.services !== this.props.services_details.services) {
            if (nxtProps.services_details.services.length > 0) {
                this.handleTableChange(nxtProps.services_details.services[0].id);
            }
        }
    }

    handleTableChange = (current_folder) => {
        const hide = message.loading('Loading your documents..', 0);
        this.setState({
            loading: true,
            current_folder
        });
        let payload = {
            service_id: current_folder
        };
        getUserDocuments(payload, (err, response) => {
            setTimeout(hide, 0);
            if (err) {
                message.error("Fetching documents failed. Please retry!");
                this.setState({
                    loading: false
                });
            } else {
                this.setState({
                    loading: false,
                    data: response.user_notes
                });
            }
        });
    }

    render() {
        const { services_details } = this.props;
        return (
            <div className="full-flex flex-column userDocumentsContainer t-pad-40 ">
                <PageHeader title="My Documents" image={icons.header_bg} />

                <Col xs={{ span: 22, offset: 1 }} className="tb-pad-30">
                    <div className="section folderSection flex-column">
                        <div className="sectionHeader font-primary">Folders</div>
                        <div className="sectionList folderList flex-row flex-wrap">
                            {services_details.loaders.service_details_loading &&
                                <Col xs={24} className="flex-row flex-center">
                                    <Icon type="loading" className="font-40" />
                                </Col>
                            }
                            {!services_details.loaders.service_details_loading &&
                                services_details.services.map(service => {
                                    return (
                                        <Col xs={24} sm={12} md={8} lg={6} key={service.id} className="folderContainer flex-row flex-ac pad-10 b-mrgn-20" onClick={() => { !this.state.loading && this.handleTableChange(service.id); }}>
                                            <div className={`folder full-flex flex-row is-cursor-ptr flex-ac pad-10 ${service.id === this.state.current_folder ? 'active' : ''}`}>
                                                {service.image && <img src={service.image} className="icon img-circular lr-mrgn-10" alt="" />}
                                                <span className="full-flex title">{service.name}</span>
                                            </div>
                                        </Col>
                                    );
                                })
                            }
                        </div>
                    </div>
                </Col>

                <Col xs={{ span: 22, offset: 1 }} className="section tableSection flex-column b-pad-30">
                    <div className="sectionHeader font-primary">Documents</div>
                    <div className="sectionList documentList flex-row flex-wrap">
                        <Table columns={columns} rowKey={record => record.id} dataSource={this.state.data} pagination={false} loading={this.state.loading} onChange={this.handleTableChange} />
                    </div>
                </Col>
            </div>
        );
    }
}

UserDocuments.propTypes = {
    actions: PropTypes.object,
    user_details: PropTypes.object,
    page_details: PropTypes.object,
    services_details: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDocuments);
