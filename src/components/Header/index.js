import { useState, Fragment, lazy, useEffect } from "react";
import { Row, Col, Drawer, Card, Space } from "antd";
import Button from "../../common/Button";
import { DeleteOutlined } from "@ant-design/icons";

import * as S from "./styles";

const SvgIcon = lazy(() => import("../../common/SvgIcon"));
// const Button = lazy(() => import("../../common/Button"));

const Header = () => {
  const [visible, setVisibility] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const MenuItem = () => {
    return (
      <Fragment>
        <S.CustomNavLinkSmall>
          <S.Span href="/categories">categories</S.Span>
        </S.CustomNavLinkSmall>
        <S.CustomNavLinkSmall>
          <S.Span href="/about">about us</S.Span>
        </S.CustomNavLinkSmall>
        <S.CustomNavLinkSmall>
          <S.Span href="/contact">contact</S.Span>
        </S.CustomNavLinkSmall>
        <S.CustomNavLinkSmall>
          <S.Span href="/reviews">reviews</S.Span>
        </S.CustomNavLinkSmall>
        <S.CustomNavLinkSmall>
          <S.Span href="/blogs">blogs</S.Span>
        </S.CustomNavLinkSmall>
      </Fragment>
    );
  };

  const MenuItemRight = () => {
    return (
      <Fragment>
        <S.CustomNavLinkSmall>
          <S.Span onClick={() => showChildrenDrawer()}>
            <S.CartIcon />
          </S.Span>
        </S.CustomNavLinkSmall>
      </Fragment>
    );
  };

  const CartItems = () => {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
      setCartProducts(JSON.parse(localStorage.getItem("products")));
    }, []);

    return (
      <>
        <Space direction="vertical">
          {cartProducts !== null && cartProducts.length !== 0 ? (
            cartProducts.map((product, index) => {
              return (
                <Card
                  key={index}
                  cover={
                    <img
                      alt={product.name}
                      src={`data:image/${
                        product.image.contentType
                      };base64,${new Buffer.from(product.image.data).toString(
                        "base64"
                      )}`}
                    />
                  }
                >
                  <strong>{product.name}</strong>
                  <br />
                  <span>
                    Price : ₹{product.discountedPrice * product.quantity}
                  </span>
                  <br />
                  <span>Quantity : {product.quantity}</span>
                  <br />
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      const allItems = JSON.parse(
                        localStorage.getItem("products")
                      );
                      const filteredItems = allItems.filter(
                        (items) => items.id !== product.id
                      );
                      localStorage.setItem(
                        "products",
                        JSON.stringify(filteredItems)
                      );
                      setCartProducts(filteredItems);
                    }}
                  >
                    Remove
                    <DeleteOutlined />
                  </span>
                </Card>
              );
            })
          ) : (
            <span style={{ fontSize: "18px" }}>No Items in the cart</span>
          )}
        </Space>
      </>
    );
  };

  return (
    <S.Header>
      <S.Container>
        <Row align="middle" type="flex" justify="space-between" gutter={20}>
          <S.LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.svg" width="100" height="50" />
          </S.LogoContainer>
          <S.NotHidden>
            <MenuItem />
          </S.NotHidden>
          <S.NotHidden>
            <MenuItemRight />
          </S.NotHidden>
          <S.Burger>
            <S.CartIcon onClick={showChildrenDrawer} />
            <S.Outline onClick={showDrawer} />
          </S.Burger>
        </Row>

        <Drawer closable={false} visible={visible} onClose={onClose}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <S.Label onClick={onClose}>
              <Col span={12}>
                <S.Menu>Menu</S.Menu>
              </Col>
              <Col span={12}>
                <S.Outline padding="true" />
              </Col>
            </S.Label>
          </Col>
          <MenuItem />
        </Drawer>
        <Drawer
          closable={false}
          onClose={onChildrenDrawerClose}
          visible={childrenDrawer}
        >
          <Space direction="vertical" style={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                window.location.pathname = "/checkout";
              }}
            >
              Checkout
            </Button>
            <CartItems />
          </Space>
        </Drawer>
      </S.Container>
    </S.Header>
  );
};

export default Header;
