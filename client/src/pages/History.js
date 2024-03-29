import React, { useEffect, useState } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Form, Radio, Space, Switch, Table, Tag } from 'antd';
import HistoryStyled from '../theme/pages/History';

import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// import Chip from '@mui/material/Chip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import TabPanel from '@mui/joy/TabPanel';
import Divider from '@mui/joy/Divider';
import { DefaultParagraph } from '../theme/base/Typography';
import { HeadingPrimary } from '../theme/base/Typography';
import Popover from '@mui/material/Popover';
import Sheet from '@mui/joy/Sheet';

import { Descriptions } from 'antd';

// import LoadingButton from '@mui/lab/LoadingButton';
// import { DataGrid } from '@mui/x-data-grid';
// import { useMovieData } from '@mui/x-data-grid-generator';

// import { Button, Popover } from 'antd';

import {
  DefaultButton,
  LoginButton,
  Button83,
  ContactButton,
  DownloadButton,
  ButtonAccountEdit,
  MUIButtonCustom01,
  MUIButtonCustom02,
  MUIButtonCustom03,
  MUIButtonCustom04,
  MUIButtonLoading01,
} from '../theme/components/Buttons';
import { useGlobalContext } from '../context/appContext';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const data = [];
for (let i = 1; i <= 20; i++) {
  data.push({
    key: i,
    type: `Transfer ${i}`,
    money: Number(`${i}2`),
    date: '12-12-2021',
    status: i % 2 === 0 ? ['success'] : i % 3 === 0 ? ['processing'] : ['fail'],
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}
const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};
const defaultTitle = () => 'Here is title';
const defaultFooter = () => 'Here is footer';

const History = () => {
  const {
    getHistoryByUser,
    dataHistoryByUser,
    getHistoryById,
    historyById,
    getAllHistoryUsers,
    historyAllUsers,
    historyAllUsersData,
    user,
    allowTransferMoney,
    isAllowTransfer,
    isAllowWithdraw,
    allowWithdrawMoney,
    isLoadingForm,
  } = useGlobalContext();

  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState('large');
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [showTitle, setShowTitle] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [showfooter, setShowFooter] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState(undefined);
  const [top, setTop] = useState('none');
  const [bottom, setBottom] = useState('bottomRight');
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState(undefined);

  const [test, setTest] = useState('');

  const [open, setOpen] = React.useState(false);

  const [openNested, setOpenNested] = React.useState(false);
  const [openNested2, setOpenNested2] = React.useState(false);

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        {
          text: 'Transfer',
          value: 'TRANSFER',
        },
        {
          text: 'Recharge',
          value: 'RECHARGE',
        },
        {
          text: 'Withdraw',
          value: 'WITHDRAW',
        },
        {
          text: 'Buy-card',
          value: 'BUY MOBILE CARD',
        },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Money',
      dataIndex: 'money',
      sorter: (a, b) => a.money - b.money,
    },
    {
      title: 'Date/Time',
      dataIndex: 'date',
      sorter: (dateA, dateB) => new Date(dateA.date) - new Date(dateB.date),
      // return new Date(b.date) - new Date(a.date);
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      // sorter: (a, b) => a.money - b.money,
      filters: [
        {
          text: 'Success',
          value: 'SUCCESS',
        },
        {
          text: 'Processing',
          value: 'PROCESSING',
        },
        {
          text: 'Cancel',
          value: 'CANCEL',
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, { status }) => (
        <>
          {/* {status.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'success') {
              color = 'green';
            } else if (tag === 'processing') {
              color = 'blue';
            } else {
              color = 'red';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })} */}

          {status === 'SUCCESS' ? (
            <Tag color={'green'}>{status}</Tag>
          ) : status === 'PROCESSING' ? (
            <Tag color={'yellow'}>{status}</Tag>
          ) : (
            <Tag color={'red'}>{status}</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: '',
      key: 'x',
      sorter: true,
      render: ({ key }) => (
        <Space size="middle">
          <Button
            component="a"
            onClick={(e) => {
              // console.log(e);
              console.log(key);
              setOpen(true);

              getHistoryById(key);
            }}
            startDecorator={<OpenInNew />}
            variant="soft"
            color="info"
          >
            <Space>
              View Detail
              <DownOutlined />
            </Space>
          </Button>
        </Space>
      ),
    },
  ];

  const handleBorderChange = (enable) => {
    setBordered(enable);
  };
  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleTableLayoutChange = (e) => {
    setTableLayout(e.target.value);
  };
  const handleExpandChange = (enable) => {
    setExpandable(enable ? defaultExpandable : undefined);
  };
  const handleEllipsisChange = (enable) => {
    setEllipsis(enable);
  };
  const handleTitleChange = (enable) => {
    setShowTitle(enable);
  };
  const handleHeaderChange = (enable) => {
    setShowHeader(enable);
  };
  const handleFooterChange = (enable) => {
    setShowFooter(enable);
  };
  const handleRowSelectionChange = (enable) => {
    setRowSelection(enable ? {} : undefined);
  };
  const handleYScrollChange = (enable) => {
    setYScroll(enable);
  };
  const handleXScrollChange = (e) => {
    setXScroll(e.target.value);
  };
  const handleDataChange = (newHasData) => {
    setHasData(newHasData);
  };
  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = '100vw';
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }
  const tableProps = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: showfooter ? defaultFooter : undefined,
    rowSelection,
    scroll,
    tableLayout,
  };

  // useEffect(() => {
  //   getHistoryByUser();
  //   if (user.role === 'admin') {
  //     getAllHistoryUsers();
  //   }
  // }, []);

  return (
    <HistoryStyled>
      <section className="section-history">
        <Table
          {...tableProps}
          pagination={{
            position: [top, bottom],
          }}
          columns={tableColumns}
          // dataSource={hasData ? historyAllUsersData : []}\
          dataSource={
            hasData && user?.role === 'admin'
              ? historyAllUsersData
              : hasData && user?.role === 'user'
              ? dataHistoryByUser
              : []
          }
          scroll={scroll}
        />
      </section>

      <Modal open={!!open} onClose={() => setOpen('')}>
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          // variant={open || undefined}
          sx={{
            width: '72rem',
            height: '40rem',
            padding: '3.2rem 4.8rem',
            display: 'grid',
            gridTemplateRows: 'repeat(2, max-content) 1fr',
            // gap: '1.6rem 0',
          }}
          // {...(random && {
          //   sx: {
          //     top: `${randomBetween(25, 75)}%`,
          //     left: `${randomBetween(25, 75)}%`,
          //   },
          // })}
        >
          <ModalClose />
          <HeadingPrimary>Detail history</HeadingPrimary>
          <Divider orientation="horizontal" sx={{ marginBottom: '1.6rem' }} />
          <Tabs
            aria-label="Icon tabs"
            defaultValue={0}
            orientation="vertical"
            // sx={{ display: 'grid' }}
          >
            <TabList variant="soft" color="neutral">
              <Tab
                sx={{
                  padding: '1.2rem 2.4rem',
                  display: 'grid',
                  gridTemplateRows: 'min-content max-content',
                  justifyItems: 'center',
                  alignContent: 'center',
                  gap: '0.4rem 0',
                  fontSize: '1.2rem',
                  // backgroundColor: 'red',
                }}
              >
                <ListItemDecorator>
                  <PhoneIcon sx={{ fontSize: '2rem' }} />
                </ListItemDecorator>
                Information
              </Tab>
              <Tab
                sx={{
                  fontSize: '1.2rem',
                  padding: '1.2rem 2.4rem',
                  display: 'grid',
                  gridTemplateRows: 'min-content max-content',
                  justifyItems: 'center',
                  alignContent: 'center',
                  gap: '0.4rem 0',
                }}
              >
                <ListItemDecorator>
                  <FavoriteIcon sx={{ fontSize: '2rem' }} />
                </ListItemDecorator>
                Message
              </Tab>
              <Tab
                sx={{
                  padding: '1.2rem 2.4rem',
                  display: 'grid',
                  gridTemplateRows: 'min-content max-content',
                  justifyItems: 'center',
                  alignContent: 'center',
                  gap: '0.4rem 0',
                  fontSize: '1.2rem',
                }}
              >
                <ListItemDecorator>
                  <PersonPinIcon sx={{ fontSize: '2rem' }} />
                </ListItemDecorator>
                Others
              </Tab>
            </TabList>

            <TabPanel
              value={0}
              sx={{ padding: '1.6rem 2.4rem', fontSize: '1.4rem' }}
            >
              <Box
                sx={{
                  // backgroundColor: 'orange',
                  height: '100%',
                  padding: '1.6rem 3.2rem',
                }}
              >
                <Descriptions title={'Information'}>
                  <Descriptions.Item label="ID">
                    {historyById?._id}
                  </Descriptions.Item>
                  <Descriptions.Item label="From">
                    {historyById?.fromUser}
                  </Descriptions.Item>
                  <Descriptions.Item label="To">
                    {historyById?.toUser}
                  </Descriptions.Item>
                  <Descriptions.Item label="Money">
                    {historyById?.money}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    {historyById?.status}
                  </Descriptions.Item>
                </Descriptions>
              </Box>
            </TabPanel>
            <TabPanel
              value={1}
              sx={{ padding: '1.6rem 2.4rem', fontSize: '1.4rem' }}
            >
              <Box
                sx={{
                  // backgroundColor: 'orange',
                  height: '100%',
                  padding: '1.6rem 3.2rem',
                }}
              >
                <Descriptions title="Message">
                  {/* <Descriptions.Item label="ID">13434343434</Descriptions.Item>
                  <Descriptions.Item label="To">Zhou Maomao</Descriptions.Item>
                  <Descriptions.Item label="Money">
                    100,000vnd
                  </Descriptions.Item> */}
                  <Descriptions.Item label="Text">
                    {historyById?.message}
                  </Descriptions.Item>
                </Descriptions>
              </Box>
            </TabPanel>
            <TabPanel
              value={2}
              sx={{ padding: '1.6rem 2.4rem', fontSize: '1.4rem' }}
            >
              <Box
                sx={{
                  // backgroundColor: 'orange',
                  height: '100%',
                  padding: '1.6rem 3.2rem',
                }}
              >
                {historyById?.status === 'PROCESSING' && (
                  <>
                    <p>Transfer is more than 5000000vnd.</p>
                    <p>Do you want to alow it?</p>
                  </>
                )}

                <Button
                  variant="contained"
                  type="button"
                  onClick={(event) => {
                    setOpenNested(true);
                    console.log('Open nested modal here');
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  type="button"
                  onClick={(event) => {
                    setOpenNested2(true);
                    console.log('Open nested modal here');
                  }}
                >
                  Cancel
                </Button>

                <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-desc"
                  open={openNested}
                  onClose={() => setOpenNested(false)}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '20000',
                  }}
                >
                  <Sheet
                    variant="outlined"
                    sx={{
                      maxWidth: 500,
                      borderRadius: 'md',
                      p: 3,
                      boxShadow: 'lg',
                      display: 'grid',
                      // backgroundColor: 'orange',
                    }}
                  >
                    <ModalClose
                      variant="outlined"
                      sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body',
                      }}
                    />
                    <LoadingButton
                      loading={isLoadingForm}
                      type="button"
                      onClick={() => {
                        if (historyById?.type === 'WITHDRAW') {
                          allowWithdrawMoney(historyById?._id, 'SUCCESS');
                        }
                        if (historyById?.type === 'TRANSFER') {
                          allowTransferMoney(historyById?._id, 'SUCCESS');
                        }
                      }}
                    >
                      Confirm
                    </LoadingButton>
                    <LoadingButton type="button">Close</LoadingButton>
                  </Sheet>
                </Modal>

                <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-desc"
                  open={openNested2}
                  onClose={() => setOpenNested2(false)}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '20000',
                  }}
                >
                  <Sheet
                    variant="outlined"
                    sx={{
                      maxWidth: 500,
                      borderRadius: 'md',
                      p: 3,
                      boxShadow: 'lg',
                      display: 'grid',
                      // backgroundColor: 'orange',
                    }}
                  >
                    <ModalClose
                      variant="outlined"
                      sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body',
                      }}
                    />
                    <LoadingButton
                      loading={isLoadingForm}
                      type="button"
                      onClick={() => {
                        if (historyById?.type === 'WITHDRAW') {
                          allowWithdrawMoney(historyById?._id, 'CANCEL');
                        }
                        if (historyById?.type === 'TRANSFER') {
                          allowTransferMoney(historyById?._id, 'CANCEL');
                        }
                      }}
                    >
                      Confirm
                    </LoadingButton>
                    <LoadingButton type="button">Close</LoadingButton>
                  </Sheet>
                </Modal>
              </Box>
            </TabPanel>
          </Tabs>
          {/* <DefaultParagraph>This is paragraph</DefaultParagraph> */}
        </ModalDialog>
      </Modal>
    </HistoryStyled>
  );
};

export default History;
