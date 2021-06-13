import Box from '@material-ui/core/Box';

const TabPanel = ({ currentTab, index, children }) => {
  return (
    <div role='tabpanel' hidden={currentTab !== index}>
      {currentTab === index && (
        <Box sx={{ p: 3, px: { xs: 0, md: 3 } }}>{children}</Box>
      )}
    </div>
  );
};

export default TabPanel;
