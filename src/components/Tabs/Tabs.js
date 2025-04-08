import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './Tabs.css';

const TabComponent = ({ tabs, selectedIndex, setEdit = null, resetIndex = null, handleChange = () => {} }) => {
  const [tabIndex, setTabIndex] = useState(selectedIndex ? selectedIndex : 0);

  useEffect(() => {
    if (![null, undefined].includes(selectedIndex)) setTabIndex(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    if (resetIndex) setTabIndex(0);
  }, [resetIndex]);

  const handleTabChange = (index) => {
    if (setEdit && index !== selectedIndex) {
      setEdit({});
    }
    setTabIndex(index);
    handleChange();
  };

  return (
    <div className='new-tabs'>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => handleTabChange(index)}>
        <TabList>
          {tabs.filter(Boolean).map((tab) => (
            <Tab disabled={tab.disabled} onClick={tab.onClick}>
              {tab.name} {!!tab.count && <span class='tab_count'>{tab.count}</span>}
            </Tab>
          ))}
        </TabList>

        {tabs.filter(Boolean).map((tab) => (
          <TabPanel style={{ marginTop: '1vw' }}>{tab.component}</TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TabComponent;
