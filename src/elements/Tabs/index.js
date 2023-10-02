import { useState, memo } from "react";
import Skeleton from "react-loading-skeleton";
import "./styles.scss";

const tabData = [
  {
    name: "Description",
    content:
      "Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare euismod arcu, ac laoreet metus pulvinar feugiat. Praesent in feugiat ante, a dictum nunc. Pellentesque convallis tortor quis purus finibus aliquet. In hac habitasse platea dictumst. Proin vestibulum ante ac faucibus tristique. Integer quis efficitur dolor, at dignissim dolor. In hac habitasse platea dictumst. Proin vestibulum ante ac faucibus tristique. Integer quis efficitur dolor, at dignissim dolor.",
  },
  {
    name: "Details",
    content:
      "Details Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare euismod arcu, ac laoreet metus pulvinar feugiat. Praesent in feugiat ante, a dictum nunc. Pellentesque convallis tortor quis purus finibus aliquet. In hac habitasse platea dictumst. Proin vestibulum ante ac faucibus tristique. Integer quis efficitur dolor, at dignissim dolor.",
  },
  {
    name: "Reviews(0)",
    content:
      "Reviews Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare euismod arcu, ac laoreet metus pulvinar feugiat. Praesent in feugiat ante, a dictum nunc. Pellentesque convallis tortor quis purus finibus aliquet. In hac habitasse platea dictumst. Proin vestibulum ante ac faucibus tristique. Integer quis efficitur dolor, at dignissim dolor.",
  },
];

const TabPanel = ({ content, isLoading }) =>
  isLoading ? (
    <Skeleton height={90} className="tabs__tabpanel skeleton" />
  ) : (
    <div className="tabs__tabpanel">
      <p className="tabs__content">{content}</p>
    </div>
  );

const TabItem = ({ setCurrentTab, text, isSelected, idx }) => {
  return (
    <li
      key={idx}
      className={`${isSelected ? " is-selected" : ""} tabs__item`}
      onClick={() => setCurrentTab(idx)}
    >
      {text}
    </li>
  );
};

const TabList = ({ tabData, setCurrentTab, currentTab, isLoading }) => {
  return (
    <ul className="tabs__list">
      {isLoading
        ? Array(3)
            .fill()
            .map((item, idx) => (
              <Skeleton key={idx} width={130} className="tabs__item skeleton" />
            ))
        : tabData.map(({ name }, idx) => {
            return (
              <TabItem
                key={idx}
                idx={idx}
                text={name}
                isSelected={currentTab === idx}
                setCurrentTab={setCurrentTab}
              />
            );
          })}
    </ul>
  );
};

const Tabs = ({ isLoading }) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="tabs">
      <TabList
        tabData={tabData}
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
        isLoading={isLoading}
      />
      <TabPanel content={tabData[currentTab].content} isLoading={isLoading} />
    </div>
  );
};

export default memo(Tabs);
