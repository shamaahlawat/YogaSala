import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Table, Tabs, Divider } from 'antd';

const TabPane = Tabs.TabPane;

import './index.scss';

// import PhotoGrid from '../../../../components/photogrid';
import PhotoGrid from '../../../../components/photogrid';
import TestimonialList from '../../../testimonials/components/testimoniallist';
import Map from '../map';

let current_page = 'facilitators';

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
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        // render: (text, record) => (
        //     <span>
        //         <span className="tableAction font-color is-cursor-ptr" onClick={() => window.open(record.attachment, "_blank")}>View</span>
        //         <Divider type="vertical" />
        //         <a download href={record.attachment} className="tableAction font-color is-cursor-ptr">Download</a>
        //     </span>
        // )
    }
];
export default class TabContainer extends Component {

    render() {
        const { information_categories, desktop_view } = this.props;

        return (
            <Col xs={24} className="tabContainer tb-pad-50 background-color" >
                <Tabs
                >
                    {
                        information_categories.map((information_category, index) => {
                            return (
                                <TabPane tab={information_category.title} key={index}>
                                    {information_category.title === 'About' &&
                                        <div>
                                            {
                                                information_category.event_informations.map((event_information, index) => {
                                                    return (
                                                        <div
                                                            className={`${desktop_view ? 'l-pad-50' : 'l-pad-30'}`} key={index}>
                                                            <div className="eventTitle">{event_information.title}</div>
                                                            <div className="eventdescription b-pad-20">{event_information.description}</div>
                                                        </div>

                                                    );
                                                })}
                                        </div>
                                    }
                                    {information_category.title === 'Gallery' &&
                                        <div className="flex-row flex-center">
                                            <PhotoGrid desktop_view={desktop_view} images={information_category.event_informations} />
                                        </div>
                                    }
                                    {
                                        information_category.title === 'Reviews' &&
                                        <TestimonialList testimonials={information_category.event_informations} />
                                    }
                                    {
                                        information_category.title === 'Facilitators' &&
                                        <TestimonialList testimonials={information_category.event_informations} current_page={current_page} />
                                    }
                                    {
                                        information_category.title === 'Documents' &&
                                        <div>
                                            <Col xs={{ span: 22, offset: 1 }} className="section tableSection flex-column b-pad-30">
                                                <div className="sectionHeader font-primary b-pad-20">Documents</div>
                                                <div className="sectionList documentList flex-row flex-wrap">
                                                    <Table columns={columns}
                                                        rowKey={record => record.id} dataSource={information_category.event_informations} pagination={false} />
                                                </div>
                                            </Col>
                                        </div>
                                    }
                                    {information_category.title === 'Venue Details' &&
                                        <div className={` ${desktop_view ? '' : 'mrgn-20'}`}>
                                            <Col md={11}
                                            >
                                                <Map marker={{
                                                    name: information_category.event_informations.name,
                                                    lat: information_category.event_informations.latitude,
                                                    lng: information_category.event_informations.longitude
                                                }} />
                                            </Col>
                                            <Col md={{ span: 12, offset: 1 }} className="venueDetails">
                                                <div className={`eventLocation  ${desktop_view ? '' : 't-pad-30'}`}>{information_category.event_informations.description}</div>
                                            </Col>
                                        </div>
                                    }
                                </TabPane>
                            );
                        })}
                </Tabs>
            </Col>
        );
    }
}

TabContainer.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    actions: PropTypes.object,
    testimonials_details: PropTypes.object,
    services_details: PropTypes.object,
    desktop_view: PropTypes.bool,
    information_categories: PropTypes.array
};


