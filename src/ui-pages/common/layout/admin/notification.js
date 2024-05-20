import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import { useGetListNotification } from '../../../../store/notification/use-get-list-notification';
import { REQUEST_STATE } from '../../../../app-config/constants';
import moment from 'moment';
import classNames from 'classnames';

export const Notification = ({ }) => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [listNoficationApiData, requestGetListNotification] = useGetListNotification();

    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        if (listNoficationApiData !== null) {
            if (listNoficationApiData.state === REQUEST_STATE.SUCCESS) {
                setLoading(false);
                setInitLoading(false);
                
                setList(listNoficationApiData.data);
                console.log("listNoficationApiData",listNoficationApiData.data);
            } else if (listNoficationApiData.state === REQUEST_STATE.ERROR) {

            } else if (listNoficationApiData.state === REQUEST_STATE.REQUEST) {
                setLoading(true);
            }
        }
    }, [listNoficationApiData])
    const onLoadMore = () => {

        setLoading(true);
        requestGetListNotification({
            page: page + 1
        })
        setPage(page + 1);
    };
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    cursor: 'pointer',
                    color: 'rgb(24, 144, 255)'
                    // height: 32,
                    // lineHeight: '32px',
                }}
            >
                <span onClick={onLoadMore}>tải thêm</span>

            </div>
        ) : null;
    return (
        <List
            className='list-notification'
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
                <List.Item
                >
                    <Skeleton avatar title={false} loading={loading} active>
                        <div style={{ display: "flex", alignItems: "center", gap:"4px" }}>
                            <div className={classNames('', `${item.read ? "" : "notification_read"}`)}  style={{height:"6px",width:"6px", borderRadius:"50%"}}></div>
                            <div style={{width:'100%'}}>
                                <List.Item.Meta

                                    title={<a target="_blank" href={`http://localhost:3000/admin/approve?importHistoryId=${item.contextId}`}>{item.title}</a>}
                                    description={item.text}
                                />
                                <div className='date_item'>{moment(new Date(item.createdTime)).format('DD-MM-YYYY HH:mm')}</div>
                            </div>
                        </div>


                    </Skeleton>

                </List.Item>
            )}
        />
    );
};
