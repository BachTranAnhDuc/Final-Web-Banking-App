import React, { useState } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Form, Radio, Space, Switch, Table, Tag } from 'antd';
import ManageAccountStyled from '../theme/pages/ManageAccount';

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
import { Descriptions } from 'antd';

// import { DataGrid } from '@mui/x-data-grid';
// import { useMovieData } from '@mui/x-data-grid-generator';

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

const data = [];
for (let i = 1; i <= 20; i++) {
  data.push({
    key: i,
    name: `Transfer ${i}`,
    email: Number(`${i}2`),
    username: '12-12-2021',
    fail: `${i}`,
    identify: ['success'],
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}
const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};
const defaultTitle = () => 'Here is title';
const defaultFooter = () => 'Here is footer';

const ManageAccount = () => {
  const { users, userById, getSingleUser } = useGlobalContext();

  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState('large');
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [showTitle, setShowTitle] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [showfooter, setShowFooter] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [hasData, setHasData] = useState(users ? true : false);
  const [tableLayout, setTableLayout] = useState(undefined);
  const [top, setTop] = useState('none');
  const [bottom, setBottom] = useState('bottomRight');
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState(undefined);

  const [test, setTest] = useState('');

  const [open, setOpen] = React.useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Number fail',
      dataIndex: 'loginFail',
    },
    {
      title: 'Identify',
      key: 'identify',
      dataIndex: 'identify',
      render: (_, { identify }) => (
        <Tag
          color={
            identify === 'success'
              ? 'green'
              : identify === 'processing'
              ? 'yellow'
              : 'red'
          }
        >
          {identify}
        </Tag>
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
              getSingleUser(key);
              setOpen(true);
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

  return (
    <ManageAccountStyled>
      <section className="section-manageAccount">
        <Form
          layout="inline"
          className="components-table-demo-control-bar"
          style={{
            marginBottom: 16,
          }}
        >
          <Form.Item label="Bordered">
            <Switch checked={bordered} onChange={handleBorderChange} />
          </Form.Item>
          <Form.Item label="loading">
            <Switch checked={loading} onChange={handleLoadingChange} />
          </Form.Item>
          <Form.Item label="Title">
            <Switch checked={showTitle} onChange={handleTitleChange} />
          </Form.Item>
          <Form.Item label="Column Header">
            <Switch checked={showHeader} onChange={handleHeaderChange} />
          </Form.Item>
          <Form.Item label="Footer">
            <Switch checked={showfooter} onChange={handleFooterChange} />
          </Form.Item>
          <Form.Item label="Expandable">
            <Switch checked={!!expandable} onChange={handleExpandChange} />
          </Form.Item>
          <Form.Item label="Checkbox">
            <Switch
              checked={!!rowSelection}
              onChange={handleRowSelectionChange}
            />
          </Form.Item>
          <Form.Item label="Fixed Header">
            <Switch checked={!!yScroll} onChange={handleYScrollChange} />
          </Form.Item>
          <Form.Item label="Has Data">
            <Switch checked={!!hasData} onChange={handleDataChange} />
          </Form.Item>
          <Form.Item label="Ellipsis">
            <Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
          </Form.Item>
          <Form.Item label="Size">
            <Radio.Group value={size} onChange={handleSizeChange}>
              <Radio.Button value="large">Large</Radio.Button>
              <Radio.Button value="middle">Middle</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Table Scroll">
            <Radio.Group value={xScroll} onChange={handleXScrollChange}>
              <Radio.Button value={undefined}>Unset</Radio.Button>
              <Radio.Button value="scroll">Scroll</Radio.Button>
              <Radio.Button value="fixed">Fixed Columns</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Table Layout">
            <Radio.Group value={tableLayout} onChange={handleTableLayoutChange}>
              <Radio.Button value={undefined}>Unset</Radio.Button>
              <Radio.Button value="fixed">Fixed</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Pagination Top">
            <Radio.Group
              value={top}
              onChange={(e) => {
                setTop(e.target.value);
              }}
            >
              <Radio.Button value="topLeft">TopLeft</Radio.Button>
              <Radio.Button value="topCenter">TopCenter</Radio.Button>
              <Radio.Button value="topRight">TopRight</Radio.Button>
              <Radio.Button value="none">None</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Pagination Bottom">
            <Radio.Group
              value={bottom}
              onChange={(e) => {
                setBottom(e.target.value);
              }}
            >
              <Radio.Button value="bottomLeft">BottomLeft</Radio.Button>
              <Radio.Button value="bottomCenter">BottomCenter</Radio.Button>
              <Radio.Button value="bottomRight">BottomRight</Radio.Button>
              <Radio.Button value="none">None</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
        <Table
          {...tableProps}
          pagination={{
            position: [top, bottom],
          }}
          columns={tableColumns}
          dataSource={hasData ? users : []}
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
        >
          <ModalClose />
          <HeadingPrimary>This is heading</HeadingPrimary>
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
                  backgroundColor: 'orange',
                  height: '100%',
                  padding: '1.6rem 3.2rem',
                }}
              >
                <Descriptions title="Information">
                  <Descriptions.Item label="ID">
                    {userById ? userById._id : 'ID is loading'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Name">
                    {userById ? userById.name : 'Name is loading'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {userById ? userById.email : 'Email is loading'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">Success</Descriptions.Item>
                </Descriptions>
              </Box>
            </TabPanel>
            <TabPanel
              value={1}
              sx={{ padding: '1.6rem 2.4rem', fontSize: '1.4rem' }}
            >
              <Box
                sx={{
                  backgroundColor: 'orange',
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
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quam eos, ad modi dicta placeat esse praesentium voluptates?
                    Ipsam quisquam iusto dolor perferendis autem, illum dolore
                    ipsum animi praesentium, assumenda dolores.
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
                  backgroundColor: 'orange',
                  height: '100%',
                  padding: '1.6rem 3.2rem',
                }}
              >
                <b>Third</b> tab panel
              </Box>
            </TabPanel>
          </Tabs>
          {/* <DefaultParagraph>This is paragraph</DefaultParagraph> */}
        </ModalDialog>
      </Modal>
    </ManageAccountStyled>
  );
};

export default ManageAccount;
