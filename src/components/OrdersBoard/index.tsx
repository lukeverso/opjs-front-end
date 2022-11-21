import { useState } from "react";
import { Order } from "../../types/Order";
import { api } from "../../utils/api";
import { OrderModal } from "../OrderModal";
import { Board, OrderContainer } from "./styles";
import { toast } from 'react-toastify';

interface OrdersBoardProps {
     icon: string;
     title: string;
     orders: Order[];
     onCancelOrder: (orderId: string) => void;
     onOrderStatusChange: (orderId: string, status: Order['status']) => void;
};

export function OrdersBoard(props: OrdersBoardProps) {
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
     const [loading, setLoading] = useState(false);

     function handleOpenModal(order: Order) {
          setIsModalVisible(true);
          setSelectedOrder(order);
     };

     function handleCloseModal() {
          setIsModalVisible(false);
          setSelectedOrder(null);
     };

     async function handleChangeOrderStatus() {
          setLoading(true);
          const status = selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';
          await api.patch(`/orders/${selectedOrder?._id}`, { status });
          toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado.`);
          props.onOrderStatusChange(selectedOrder!._id, status);
          setLoading(false);
          setIsModalVisible(false);
     };

     async function handleCancelOrder() {
          setLoading(true);
          await api.delete(`/order/${selectedOrder?._id}`);
          toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado.`);
          props.onCancelOrder(selectedOrder!._id);
          setLoading(false);
          setIsModalVisible(false);
     };

     return (
          <Board>
               <OrderModal
                    visible={isModalVisible}
                    order={selectedOrder}
                    onClose={handleCloseModal}
                    onCancelOrder={handleCancelOrder}
                    loading={loading}
                    onChangeOrderStatus={handleChangeOrderStatus}
               />
               <header>
                    <span>{props.icon}</span>
                    <strong>{props.title}</strong>
                    <span>({props.orders.length})</span>
               </header>
               {props.orders.length > 0 && (
                    <OrderContainer>
                         {props.orders.map((order) => (
                              <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
                                   <strong>Mesa {order.table}</strong>
                                   <span>{order.products.length} {order.products.length == 0 ? 'Nenhum item' : order.products.length == 1 ? 'item' : 'itens'}</span>
                              </button>
                         ))}
                    </OrderContainer>
               )}
          </Board>
     );
};