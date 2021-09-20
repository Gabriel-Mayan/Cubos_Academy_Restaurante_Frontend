import { useState } from "react";

import makeStyles from "./style";
import ModalVisualizarPedido from "../ModalVisualizarPedido";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles;

export default function CardPedido({
  idPedido,
  nome,
  endereco,
  totalPedido,
  carrinho,
  open,
  setOpen
})
{
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  const handleHoverOver = () => {
    setHover(true);
  };

  const handleHoverLeave = () => {
    setHover(false);
  };

  return (
    <Paper
      className={classes.paper}
      onMouseOver={handleHoverOver}
      onMouseLeave={handleHoverLeave}
    >
      <div className={classes.infos}>
        <h3 className={classes.nomeProduto}>Cliente: {nome}</h3>
        <p>Endereço: {endereco}</p>
        <div>
          <h3>Preparar:</h3>
          
          <p>{carrinho[0].nome}, {carrinho[0].quantidade} prato{carrinho[0].quantidade > 1 ? 's': ''}</p>
          {
            carrinho.length > 1 ? (<div><p>{carrinho[1].nome}, {carrinho[1].quantidade} prato{carrinho[1].quantidade > 1 ? 's': ''}</p>
            <p>...</p></div>): ""
          }
        </div>
        <div className={classes.tagPreco}>
          Total do pedido: R$ {String((totalPedido / 100).toFixed(2)).replace(".", ",")}
        </div>
      </div>
      <div
        className={classes.hoverCard}
        style={{ display: `${hover ? "flex" : "none"}` }}
      >
        <ModalVisualizarPedido
          id={idPedido}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </Paper>
  );
}
