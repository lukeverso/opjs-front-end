import { Actions, ModalBody, OrderDetails, Overlay, StatusContainer } from "./styles";
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";
import { useEffect } from "react";

interface OrderModalProps {
     visible: boolean;
     order: Order | null;
     onClose: () => void;
     onCancelOrder: () => Promise<void>;
     loading: boolean;
     onChangeOrderStatus: () => void;
}

export function OrderModal(props: OrderModalProps) {
     useEffect(() => {
          function handleKeyDown(event: KeyboardEvent) {
               if (event.key === 'Escape') {
                    props.onClose();
               };
          };
          document.addEventListener('keydown', handleKeyDown);
          return () => {
               document.removeEventListener('keydown', handleKeyDown);
          };
     }, [props.onClose]);

     if (!props.visible || !props.order) {
          return null;
     };

     const total = props.order.products.reduce((total, { product, quantity }) => {
          return total + (product.price * quantity);
     }, 0);

     return (
          <Overlay>
               <ModalBody>
                    <header>
                         <strong>Mesa {props.order.table}</strong>
                         <button type="button" onClick={props.onClose}>
                              <img src={closeIcon} alt="Ícone de fechar" />
                         </button>
                    </header>
                    <StatusContainer>
                         <small>Status do pedido</small>
                         <div>
                              <span>
                                   {props.order.status === 'WAITING' && '🕑'}
                                   {props.order.status === 'IN_PRODUCTION' && '🧑‍🍳'}
                                   {props.order.status === 'DONE' && '✅'}
                              </span>
                              <strong>
                                   {props.order.status === 'WAITING' && 'Fila de espera'}
                                   {props.order.status === 'IN_PRODUCTION' && 'Em produção'}
                                   {props.order.status === 'DONE' && 'Pronto'}
                              </strong>
                         </div>
                    </StatusContainer>
                    <OrderDetails>
                         <strong>Itens</strong>
                         <div className="order-itens">
                              {props.order.products.map(({ _id, product, quantity }) => (
                                   <div className="item" key={_id}>
                                        <img src={`http://localhost:7000/uploads/${product.imagePath}`} alt={product.name} />
                                        <span className="quantity">{quantity}x</span>
                                        <div className="product-details">
                                             <strong>{product.name}</strong>
                                             <span>{formatCurrency(product.price)}</span>
                                        </div>
                                   </div>
                              ))}
                         </div>
                         <div className="total">
                              <span>Total</span>
                              <strong>{formatCurrency(total)}</strong>
                         </div>
                    </OrderDetails>
                    <Actions>
                         {props.order.status != 'DONE' && (
                              <button
                                   type="button"
                                   className="primary"
                                   disabled={props.loading}
                                   onClick={props.onChangeOrderStatus}
                              >
                                   <span>
                                        {props.order.status === 'WAITING' && '🧑‍🍳'}
                                        {props.order.status === 'IN_PRODUCTION' && '✅'}
                                   </span>
                                   <strong>
                                        {props.order.status === 'WAITING' && 'Iniciar produção'}
                                        {props.order.status === 'IN_PRODUCTION' && 'Concluir pedido'}
                                   </strong>
                              </button>
                         )}
                         <button
                              type="button"
                              className="secondary"
                              onClick={props.onCancelOrder}
                              disabled={props.loading}
                         >
                              Cancelar pedido
                         </button>
                    </Actions>
               </ModalBody>
          </Overlay>
     );
};