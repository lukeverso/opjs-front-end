import styled from "styled-components";

export const Overlay = styled.div`
     width: 100%;
     height: 100%;
     position: fixed;
     left: 0;
     top: 0;
     background: rgba(0, 0, 0, 0.8);
     backdrop-filter: blur(4.5px);
     display: flex;
     justify-content: center;
     align-items: center;
`;

export const ModalBody = styled.div`
     width: 480px;
     background: #FFFFFF;
     border-radius: 8px;
     padding: 32px;

     header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          
          strong {
               font-size: 24px;
          }

          button {
               line-height: 0;
               border: 0;
               background: transparent;
          }
     }
`;

export const StatusContainer = styled.div`
     margin-top: 32px;

     small {
          font-size: 14px;
          opacity: 0.8;
     }

     div {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-top: 8px;
     }
`;

export const OrderDetails = styled.div`
     margin-top: 32px;

     > strong {
          font-weight: 500;
          font-size: 14px;
          opacity: 0.8;
     }

     .order-itens {
          margin-top: 16px;
          
          .item {
               display: flex;

               & + .item {
                    margin-top: 16px;
               }

               img {
                    border-radius: 6px;
                    object-fit: cover;
                    width: 80px;
                    height: 60px;
               }

               .quantity {
                    font-size: 14px;
                    color: #666666;
                    display: block;
                    min-width: 20px;
                    margin-left: 12px;
               }

               .product-details {
                    margin-left: 4px;

                    strong {
                         display: block;
                         margin-bottom: 4px;
                    }

                    span {
                         font-size: 14px;
                         color: #666666;
                    }
               }
          }
     }

     .total {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 24px;
          
          span {
               font-weight: 500;
               font-size: 14px;
               opacity: 0.8;
          }
     }
`;

export const Actions = styled.footer`
     display: flex;
     flex-direction: column;
     margin-top: 32px;

     button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
     }

     .primary {
          background: #333333;
          border-radius: 48px;
          border: 0;
          color: #FFFFFF;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
     }

     .secondary {
          padding: 14px 24px;
          color: #D73035;
          font-weight: bold;
          border-radius: 48px;
          border: 0;
          background: transparent;
          margin-top: 12px;
     }
`;