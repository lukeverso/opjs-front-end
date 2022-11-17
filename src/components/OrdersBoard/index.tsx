import { useState } from "react";
import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal";
import { Board, OrderContainer } from "./styles";

interface OrdersBoardProps {
     icon: string;
     title: string;
     orders: Order[];
};

export function OrdersBoard(props: OrdersBoardProps) {
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

     function handleOpenModal(order: Order) {
          setIsModalVisible(true);
          setSelectedOrder(order);
     };

     function handleCloseModal() {
          setIsModalVisible(false);
          setSelectedOrder(null);
     }

     return (
          <Board>
               <OrderModal
                    visible={isModalVisible}
                    order={selectedOrder}
                    onClose={handleCloseModal}
               />
               <header>
                    <span>{props.icon}</span>
                    <strong>{props.title}</strong>
                    <span>({props.orders.length})</span>
               </header>
               {props.orders.length > 0 && (<OrderContainer>
                    {props.orders.map((order) => (
                         <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
                              <strong>Mesa {order.table}</strong>
                              <span>{order.products.length} {order.products.length == 0 ? 'Nenhum item' : order.products.length == 1 ? 'item' : 'itens'}</span>
                         </button>
                    ))}
               </OrderContainer>)}
          </Board>
     );
};