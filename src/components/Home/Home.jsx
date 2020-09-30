import { Divider, Form, Input, List, message, Space } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as Globe } from "../../icons/globe.svg";
import { ReactComponent as Phone } from "../../icons/phone.svg";
import { ReactComponent as Mark } from "../../icons/mark.svg";
import { ReactComponent as Search } from "../../icons/search.svg";

import "./Home.scss";
import utils from "../../common/utils";

const Home = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [listComplete, setListComplete] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${utils.SERVER}/unimeds`);
      setList(data);
      setListComplete(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const onSearch = async (event) => {
    const value = event.target.value;
    if (!value) setList(listComplete);
    else {
      const listTemp = listComplete.filter((item) => item.nmUnimed.toUpperCase().indexOf(value.toUpperCase()) != -1);
      setList(listTemp);
    }
  };

  return (
    <React.Fragment>
      <Form form={form}>
        <Form.Item name="search">
          <Input prefix={<Search />} placeholder="Pesquisar" onChange={onSearch} className="search-input" />
        </Form.Item>
      </Form>

      <List
        className="list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.nmUnimed}
              description={
                <React.Fragment>
                  {item.site && (
                    <span>
                      <Globe /> {item.site}
                    </span>
                  )}
                  {item.telefone && (
                    <span>
                      <Phone /> {item.telefone}
                    </span>
                  )}
                  {item.endereco && (
                    <span>
                      <Mark /> {item.endereco} {item.cidade}, {item.uf}
                    </span>
                  )}
                </React.Fragment>
              }
            />
          </List.Item>
        )}
      />
    </React.Fragment>
  );
};

export default Home;
