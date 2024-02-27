import React from "react";
import {
  DislikeOutlined,
  EditOutlined,
  EllipsisOutlined,
  LikeOutlined,
  SettingOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Image from "next/image";


const { Meta } = Card;

const ContentDetailsCardView: React.FC = () => (
  <Card
    style={{ width: 300 }}
    cover={
      <Image
        alt="example"
        src="https://cdn.pixabay.com/photo/2023/06/16/11/47/books-8067850_1280.jpg"
      />
    }
    actions={[
      <LikeOutlined key={1} />,
      <DislikeOutlined key={2} />,
      <ShareAltOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={
        <Avatar src="https://cdn.pixabay.com/photo/2017/09/21/13/32/girl-2771936_1280.jpg" />
      }
      title="Card title"
      description="This is the description"
    />
  </Card>
);

export default ContentDetailsCardView;
