import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { Navigate, useNavigate } from "react-router-dom";
import axio from "../../api/axio";
import { PaypalInterface } from "../../Redux/Interface";
import { CART_CLEAR, foodTypeConverter } from "../../Redux/ActionTypes";
import { Exception } from "sass";
import { hasUncaughtExceptionCaptureCallback } from "process";

const ButtonWrapper = ({
  currency,
  showSpinner,
}: {
  currency: string;
  showSpinner: boolean;
}) => {
  const loggedUser = useSelector((state: RootState) => state.user);
  const cartSumAmount = () => {
    let singlePrice = 0;

    if (loggedUser.user.cart.productsItems.length > 0) {
      singlePrice = loggedUser.user?.cart.productsItems.reduce(
        (acc, product) => {
          let n = foodTypeConverter(product)

        return acc + (product.price * n) * product.cartQuantity;
        },
        0
      );
    } else {
      return 0;
    }

    return Number(singlePrice.toFixed(2));
  };
  const user = useSelector((state: RootState) => state.user.user);
  const ORDER_POSTING = `/api/orders/${user.id}`;
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const style = { layout: "vertical" };
  const shoppingTotal = useSelector(
    (state: RootState) => state.user.user.cart.cartTotalAmount
  );
  const navigate = useNavigate();
  const personalDispatch = useDispatch();

  const shoppingOrder = async (paypalData: PaypalInterface) => {
    const address = {
      address: {
        city: paypalData.purchase_units[0].shipping.address.admin_area_1,
        streetName:
          paypalData.purchase_units[0].shipping.address.address_line_1 +
          paypalData.purchase_units[0].shipping.address.address_line_2,
        postalCode: paypalData.purchase_units[0].shipping.address.postal_code,
        region: paypalData.purchase_units[0].shipping.address.country_code,
      },
      orderLine: user.cart.productsItems.map((el) => ({
        product: {
          id: el.id,
          name: el.name,
          description: el.description,
          image: el.image,
          quantityInStock: el.quantityInStock,
          price: Number((el.price *foodTypeConverter(el)).toFixed(2)),
          productCategory: el.productCategory,
          productVariant:[el.productVariant]
        },
        quantity: el.cartQuantity,
        price: Number(((el.price *foodTypeConverter(el))*el.cartQuantity).toFixed(2)),
        productVariantProduct:el.productVariant.variant
      })),
      shippingMethod: "STANDARD",
      paymentMethod: [
        {
          provider: "PayPal",
          status: paypalData.status,
        },
      ],
    };
    console.log(address);

    try {
      const response = await axio.post(ORDER_POSTING, JSON.stringify(address), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
    } catch (error) {
      
    }
  };

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={false}
        forceReRender={[shoppingTotal, currency, style]}
        fundingSource={undefined}
        createOrder={async (data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: shoppingTotal.toString(),
                    breakdown: {
                      item_total: {
                        currency_code: currency,
                        value: shoppingTotal.toString(),
                      },
                    },
                  },
                  items: user.cart.productsItems.map((el) => {
                    const unitAmount = foodTypeConverter(el);
                    return {
                      name: el.name,
                      unit_amount: {
                        currency_code: currency,
                        value: (el.price * unitAmount).toFixed(2),
                      },
                      quantity: el.cartQuantity.toString(),
                    };
                  }),
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={async (data, actions) => {
          const order: any = await actions.order?.capture();
          const orderPost = shoppingOrder(order);
          
          setTimeout(() => {
            navigate(`/thankYou/`);
            personalDispatch({
              type: CART_CLEAR,
            });
          }, 500);
        }}
      />
    </>
  );
};
export default ButtonWrapper;
