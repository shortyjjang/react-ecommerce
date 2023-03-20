import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import SaveMarket from '../../components/shopinfo/SaveMarket';
import SaveTree from '../../components/shopinfo/SaveTree';

const { TabPane } = Tabs;

export default function SaveEarth(props) {
  const user = useSelector((state) => state.user);
  const isLogin = useSelector((state) => state.user.authenticated);
  const { hash } = window.location;
  useEffect(() => {}, []);
  return (
    <>
      <div id="contents" className="saveEarth">
        <h1 className="titleArea">WE Save</h1>
        {isLogin ? (
          <Tabs defaultActiveKey={hash === '#save' ? '2' : '1'}>
            <TabPane tab="#지구" key="1">
              <h2 className="titleArea">#지구</h2>
              <SaveTree username={user.username} isLogin={isLogin} />
            </TabPane>
            <TabPane tab="#장보기" key="2">
              <h2 className="titleArea">#장보기</h2>
              <SaveMarket username={user.username} />
            </TabPane>
          </Tabs>
        ) : (
          <>
            <h2 className="titleArea">#지구</h2>
            <SaveTree username={user.username} isLogin={isLogin} />
          </>
        )}
      </div>
    </>
  );
}
