import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Tabs, Tab } from '@material-ui/core';

import TabPanel from '../components/Admin/TabPanel';
import PostsTab from '../components/Admin/PostsTab';
import FeaturedTab from '../components/Admin/FeaturedTab';
import UserTab from '../components/Admin/UserTab';

const Admin = ({ setSnackBar, adminUser }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const adminTabs = [
    {
      label: 'Posts',
      component: <PostsTab setSnackBar={setSnackBar} token={adminUser.token} />,
    },
    {
      label: 'Featured',
      component: (
        <FeaturedTab setSnackBar={setSnackBar} token={adminUser.token} />
      ),
    },
    {
      label: 'Admin User',
      component: <UserTab setSnackBar={setSnackBar} adminUser={adminUser} />,
    },
  ];

  const handleTabChange = (e, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box mt={3}>
      <Box display='flex'>
        <Typography variant='h4' sx={{ margin: 'auto' }}>
          Admin Dashboard
        </Typography>
      </Box>
      <Box my={2}>
        <Link to='/create'>
          <Button variant='contained'>New Post</Button>
        </Link>
      </Box>
      <Box sx={{ width: '100' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            {adminTabs.map((tab) => (
              <Tab key={tab.label} label={tab.label} />
            ))}
          </Tabs>
        </Box>
        {adminTabs.map((tab, idx) => (
          <TabPanel key={idx} currentTab={currentTab} index={idx}>
            {tab.component}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default Admin;
